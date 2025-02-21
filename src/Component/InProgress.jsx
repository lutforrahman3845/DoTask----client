import PropTypes from "prop-types";
import Task from "./Task";

const InProgress = ({ task }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4 font-roboto border border-gray-500">
      <h3 className="text-lg md:text-xl font-bold text-center font-poppins">
      In Progress
      </h3>
      {task.length === 0 ? (
        <p className="text-center text-red-500 mt-2">
          No tasks to show
        </p>
      ) : (
        <div>
          {task.map((task, index) => (
            <Task
              key={task._id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              taskId={task._id}
              id={index + 1}
              category={task.category}
              timestamp={task.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
};
InProgress.propTypes = {
  task: PropTypes.object.isRequired,
};

export default InProgress;