import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useGetTasks from "../Hooks/useGetTasks";

const Task = ({
  title,
  description,
  deadline,
  id,
  category,
  timestamp,
  taskId,
  onEdit,
}) => {
  const axiosPublic = useAxiosPublic();
  const { taskRefetch } = useGetTasks();
  const today = new Date();
  const taskDate = new Date(deadline);
  let diffTime = taskDate - today;
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (today.toLocaleDateString() === taskDate.toLocaleDateString()) {
    diffDays = 0;
  }
  const isOverdue = diffTime < 0;
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/tasks/${taskId}`);
          if (res.data?.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            taskRefetch();
          }
        } catch (error) {
          toast.success(`${error}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  const taskDetails = { title, description, deadline, category, taskId };
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md mt-4 border-l-4 border-blue-500">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2">
            <p className="font-semibold text-gray-900 dark:text-white">{id}.</p>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">{description}</p>

              <p className="text-sm font-medium text-gray-500 mt-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Category:
                </span>{" "}
                {category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Created At:
                </span>{" "}
                {new Date(timestamp).toLocaleString()}
              </p>
              {deadline && (
                <p
                  className={`text-sm font-medium mt-1  py-1 px-2 w-fit rounded-md ${
                    diffDays === 0
                      ? "bg-orange-500 text-Primary"
                      : isOverdue
                      ? "bg-red-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {diffDays === 0
                    ? "Last Date"
                    : isOverdue
                    ? "Overdue"
                    : `Due in ${diffDays} days`}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(taskDetails)}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <FaEdit size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
