import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
    return (
      <div className="relative w-full mt-16  flex items-center justify-center text-Primary dark:text-white text-center px-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold font-poppins">Effortless Task Management</h1>
          <p className="mt-2 text-base md:text-lg max-w-4xl mx-auto font-normal font-roboto">
            Add tasks easily and drag them between categories—To-Do, In Progress, and Done.  
            Stay organized with a simple, intuitive workflow.
          </p>
          <button onClick={()=> navigate('/add-task')} className="mt-8 py-2 px-3 bg-indigo-500 font-roboto font-semibold text-white rounded-sm cursor-pointer">Add Task Now</button>
        </div>
      </div>
    );
  };
  
  export default Banner;
  