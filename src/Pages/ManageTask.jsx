import { useEffect, useState } from "react";
import Loading from "../Component/Loading";
import useGetTasks from "../Hooks/useGetTasks";
import ToDoTask from "../Component/ToDoTask";
import InProgress from "../Component/InProgress";
import DoneTask from "../Component/DoneTask";

const ManageTask = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const { tasks, taskLoading} = useGetTasks();

  useEffect(() => {
    setTodoTasks(tasks?.filter((task) => task.category === "To-Do") || []);
    setInProgressTasks(tasks?.filter((task) => task.category === "In Progress") || []);
    setDoneTasks(tasks?.filter((task) => task.category === "Done") || []);
  }, [tasks]);
  if (taskLoading) {
    return <Loading />;
  }
  return (
    <div className="my-8 font-roboto mx-4">
      <h1 className="text-xl md:text-3xl font-poppins font-bold text-center text-Primary dark:text-white">
        Manage Task
      </h1>
      <p className="max-w-4xl mx-auto text-center text-base md:text-lg text-gray-600 dark:text-gray-300 mt-3">
        Effortlessly manage your tasks by adding, editing, and dragging them
        between To-Do, In Progress, and Done columns. Stay organized, track
        progress, and ensure tasks are completed on time with a seamless
        drag-and-drop interface.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 xl:max-w-3/4 mx-auto ">
        <ToDoTask task={todoTasks}/>
        <InProgress task={inProgressTasks}/>
        <DoneTask task={doneTasks}/>
      </div>
    </div>
  );
};

export default ManageTask;
