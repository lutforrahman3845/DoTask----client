import { Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Root = () => {
  return (
    <div className="container mx-auto ">
      <Navbar/>
      <div className="min-h-[calc(100vh-70px)]"><Outlet /></div>
      <Footer/>
    </div>
  );
};

export default Root;
