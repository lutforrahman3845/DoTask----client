import { useContext } from "react";
import logo from "../assets/logo2.png";
import { ThemeContext } from "../Context/ThemeProvider";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import userIcon from "../assets/photo.png";
import { NavLink } from "react-router";
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, singout } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={'/'} className={({ isActive }) =>
            `px-3 py-2 rounded-md font-roboto text-base font-medium hover:bg-none text-white  ${
              isActive
                ? "font-blod bg-gray-800"
                : "fonts-emibold "
            }`
          }>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/manage-task'} className={({ isActive }) =>
            `px-3 py-2 rounded-md font-roboto text-base font-medium hover:bg-none text-white  ${
              isActive
                ? "font-blod bg-gray-800"
                : "font-semibold "
            }`
          }>Manage Task</NavLink>
      </li>
      <li>
        <NavLink to={'/add-task'} className={({ isActive }) =>
            `px-3 py-2 rounded-md font-roboto text-base font-medium hover:bg-none text-white  ${
              isActive
                ? "font-blod bg-gray-800"
                : "font-semibold "
            }`
          }>Add task</NavLink>
      </li>
      
    </>
  );
  return (
    <>
      <div className="navbar  bg-Primary shadow-sm text-white px-4 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-Primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-7" src={logo} alt="Logo" />
            <h4 className="text-2xl font-poppins font-semibold  text-white">
              DoTask
            </h4>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="">
              {theme === "dark" ? (
                <svg
                  className="swap-off h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                <svg
                  className="swap-on h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </button>
            <div>
              {user && user?.email ? (
                <div className="dropdown  dropdown-end">
                  {user?.photoURL ? (
                    <div tabIndex={1} role="button" className="w-10 h-10 ">
                      <img
                        className="w-full h-full object-cover rounded-full border border-Primary"
                        src={user?.photoURL}
                        alt="User imge"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div tabIndex={1} role="button" className="w-10 h-10 ">
                      <img
                        className="w-full h-full rounded-full border border-Primary p-[2px]"
                        src={userIcon}
                        alt="Default User Icon"
                      />
                    </div>
                  )}
                  <div
                    tabIndex={1}
                    className="dropdown-content menu bg-Primary rounded-box z-50 w-52 py-6 px-3 space-y-3 shadow "
                  >
                    <div className="text-base text-white cursor-pointer rounded-lg font-semibold flex items-center gap-2">
                      <p>{user?.displayName}</p>
                    </div>
                    <div
                      onClick={() =>
                        singout().then(() => {
                          toast.success("Succsessfully sign out", {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        })
                      }
                      className="text-base text-white  rounded-lg cursor-pointer  font-semibold flex items-center gap-2"
                    >
                      <p>sign out</p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
