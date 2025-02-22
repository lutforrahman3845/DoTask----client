import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Loading from "../Component/Loading";
import useGetTasks from "../Hooks/useGetTasks";
import ToDoTask from "../Component/ToDoTask";
import InProgress from "../Component/InProgress";
import DoneTask from "../Component/DoneTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ManageTask = () => {
  const queryClient = useQueryClient();
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const { tasks, taskLoading } = useGetTasks();
  const axiosPublic = useAxiosPublic();
  const [changeTaskId, setChangeTaskId] = useState("");
  const { mutateAsync } = useMutation({
    mutationFn: async (category) => {
      const res = await axiosPublic.patch(`/tasks/${changeTaskId}`, category);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Category update successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error) => {
      toast.error(`${error.response?.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  useEffect(() => {
    setTodoTasks(tasks?.filter((task) => task.category === "To-Do") || []);
    setInProgressTasks(
      tasks?.filter((task) => task.category === "In Progress") || []
    );
    setDoneTasks(tasks?.filter((task) => task.category === "Done") || []);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (taskLoading) return <Loading />;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find which list the active item belongs to
    let sourceList = todoTasks;
    let destinationList = todoTasks;
    let setSourceList = setTodoTasks;
    let setDestinationList = setTodoTasks;
    let newCategory = "To-Do";

    if (inProgressTasks.find((task) => task._id === activeId)) {
      sourceList = inProgressTasks;
      setSourceList = setInProgressTasks;
    } else if (doneTasks.find((task) => task._id === activeId)) {
      sourceList = doneTasks;
      setSourceList = setDoneTasks;
    }

    if (todoTasks.find((task) => task._id === overId) || todoTasks.length === 0) {
      destinationList = todoTasks;
      setDestinationList = setTodoTasks;
      newCategory = "To-Do";
    } else if (inProgressTasks.find((task) => task._id === overId) || inProgressTasks.length === 0) {
      destinationList = inProgressTasks;
      setDestinationList = setInProgressTasks;
      newCategory = "In Progress";
    } else if (doneTasks.find((task) => task._id === overId) || doneTasks.length === 0) {
      destinationList = doneTasks;
      setDestinationList = setDoneTasks;
      newCategory = "Done";
    }

    if (sourceList === destinationList) {
      // Reorder within the same list
      const oldIndex = sourceList.findIndex((task) => task._id === activeId);
      const newIndex = destinationList.findIndex((task) => task._id === overId);
      const updatedList = arrayMove(sourceList, oldIndex, newIndex);
      setSourceList(updatedList);
    } else {
      // Move between lists
      const taskToMove = sourceList.find((task) => task._id === activeId);
      const newSourceList = sourceList.filter((task) => task._id !== activeId);
      const newDestinationList = [
        ...destinationList,
        { ...taskToMove, category: newCategory },
      ];

      setSourceList(newSourceList);
      setDestinationList(newDestinationList);
      if (activeId && newCategory) {
        setChangeTaskId(activeId);
        mutateAsync({ category: newCategory });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="my-8 font-roboto mx-4">
        <h1 className="text-xl md:text-3xl font-poppins font-bold text-center text-Primary dark:text-white">
          Manage Task
        </h1>
        <p className="max-w-4xl mx-auto text-center text-base md:text-lg text-gray-600 dark:text-gray-300 mt-3">
          Effortlessly manage your tasks by adding, editing, and dragging them
          between To-Do, In Progress, and Done columns.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 xl:max-w-3/4 mx-auto">
          <ToDoTask task={todoTasks} />
          <InProgress task={inProgressTasks} />
          <DoneTask task={doneTasks} />
        </div>
      </div>
    </DndContext>
  );
};

export default ManageTask;
