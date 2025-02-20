import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <div className="container mx-auto ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
