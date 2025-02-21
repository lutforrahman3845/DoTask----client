import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useGetTasks from "../Hooks/useGetTasks";

const EditTaskModal = ({ task }) => {
  const axiosPublic = useAxiosPublic();
  const {taskRefetch} = useGetTasks();
  const [errort, setErrort] = useState("");
  const [errord, setErrord] = useState("");

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(
    task?.deadline ? new Date(task.deadline) : null
  );
  const [taskId, setTaskId] = useState(task?.taskId || "");

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setDeadline(task?.deadline ? new Date(task.deadline) : "");
    setTaskId(task?.taskId || "");
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrort("");
    setErrord("");
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    title.length > 50 && setErrort("Title is too long");
    description.length > 200 && setErrord("Description is too long");
  };
  console.log(task?.taskId)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = {
      title: title,
      description: description,
      deadline: deadline ? deadline.toISOString() : "",
      category: formData.get("category"),
      timestamp: new Date().toISOString(),
    };
    axiosPublic.patch(`/tasks/${taskId}`, task).then((res) => {
      if (res.data?.modifiedCount === 1) {
        toast.success("Succsessfully Update task", {
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
        taskRefetch();
        document.getElementById("my_modal_1").close();
    });
  };
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 ">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-2">Update Task</h2>
            <input
              type="text"
              name="title"
              value={title || ""}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {errort && <p className="text-red-500 text-sm">{errort}</p>}
            <textarea
              name="description"
              value={description || ""}
              onChange={handleChange}
              placeholder="Task Description (optional)"
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            {errord && (
              <p className="text-red-500 text-sm font-normal">{errord}</p>
            )}
            <DatePicker
              minDate={new Date()}
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              placeholderText="Deadline (optional)"
              className="w-full p-2 border rounded mb-2"
              wrapperClassName="w-full"
            />
            <select
              name="category"
              className="w-full p-2 border rounded mb-2 dark:bg-gray-800"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className=" bg-blue-500 text-white p-2 rounded"
              >
                Update Task
              </button>
              <p
                onClick={() => {
                  const modal = document.getElementById("my_modal_1");
                  modal.close();
                }}
                className=" bg-red-500 text-white p-2 rounded"
              >
                Close
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};
EditTaskModal.propTypes = {
  task: PropTypes.object.isRequired,
};
export default EditTaskModal;
