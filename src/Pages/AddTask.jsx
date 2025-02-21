import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const AddTask = () => {
  const [deadline, setDeadline] = useState("");
  const [errort, setErrort] = useState("");
  const [errord, setErrord] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrort("");
    setErrord("");
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    title.length > 50 && setErrort("Title is too long");
    description.length > 200 && setErrord("Description is too long");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = {
      title: title,
      description: description,
      deadline: deadline ? deadline.toISOString() : "",
      category: formData.get("category"),
      timestamp: new Date().toISOString(),
      userId: user.uid,
    };
    axiosPublic.post("/tasks", task).then((res) => {
      if (res.data?.insertedId) {
        toast.success("Succsessfully add task", {
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
      formData.set("category", "To-Do");
      setTitle("");
      setDescription("");
      setDeadline("");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 mt-16 max-w-4xl mx-auto shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-bold mb-2">Add New Task</h2>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full p-2 border rounded mb-2"
        required
      />
      {errort && <p className="text-red-500 text-sm">{errort}</p>}
      <textarea
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Task Description (optional)"
        className="w-full p-2 border rounded mb-2"
      ></textarea>
      {errord && <p className="text-red-500 text-sm">{errord}</p>}
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
