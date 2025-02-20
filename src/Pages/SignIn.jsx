import { GoogleAuthProvider } from "firebase/auth";
import googleIcon from "../assets/Google.png";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SignIn = () => {
  const { createNewUserWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = () => {
    createNewUserWithGoogle(googleProvider)
    .then((result) => {
      const user = result.user;
      const userInfo = {
        userName: user?.displayName,
        userEmail: user?.email,
        userPhoto: user?.photoURL,
      };
      axiosPublic.post("/add-user", userInfo)
      toast.success("Succsessfully sing in", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto  p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6  text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Welcome to <span className="text-blue-500">DoTas</span></h1>
        <p className="text-gray-600 dark:text-gray-200 mt-2">
          Organize your tasks efficiently and boost productivity.
        </p>
        <p className="text-lg text-blue-500 font-bold mt-8">Sign in to get started!</p>
        <button
          onClick={handleSignIn}
          className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-white dark:bg-gray-900  rounded-lg shadow-md border border-gray-300 cursor-pointer"
        >
          <img className="w-6" src={googleIcon} alt="Google Icon" />
          <span className="text-gray-700 font-medium dark:text-white">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
