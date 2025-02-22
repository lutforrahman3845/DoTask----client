import PropTypes from "prop-types";
import Task from "./Task";
import { useState } from "react";
import DoneTaskEditModal from "./DoneTaskEditModal";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const DoneTask = ({ task }) => {
  const [doneTaskInfo, setDoneTaskInfo] = useState(null);
 const { setNodeRef } = useDroppable({ id: "Done" });
  return (
    <div ref={setNodeRef} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4 font-roboto border border-gray-500">
      <h3 className="text-lg md:text-xl font-bold text-center font-poppins">
        Done
      </h3>
      <SortableContext items={task} strategy={verticalListSortingStrategy}>
        {task.length === 0 ? (
          <div className="min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-400">
            <p className="text-red-500">No tasks to show</p>
          </div>
        ) : (
          task.map((task, index) => (
            <Task
              key={task._id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              taskId={task._id}
              id={index + 1}
              category={task.category}
              timestamp={task.timestamp}
              onEdit={(taskDetails) => {
                setDoneTaskInfo(taskDetails);
                setTimeout(() => {
                  document.getElementById("my_modal_3").showModal();
                }, 0);
              }}
            />
          ))
        )}
      </SortableContext>

      {doneTaskInfo && <DoneTaskEditModal doneTask={doneTaskInfo} />}
    </div>
  );
};
DoneTask.propTypes = {
  task: PropTypes.object.isRequired,
};

export default DoneTask;
