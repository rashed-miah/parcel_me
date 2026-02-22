import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ParcelPointLogo from "./ParcelPointLogo/ParcelPointLogo";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `flex items-center mr-2 text-base md:text-xl rounded-lg px-3 py-1
   ${isActive ? "bg-primary " : "hover:bg-primary "}`;
  const navItems = (
    <>
      <li>
        <NavLink className={linkClass} to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={linkClass} to="/coverage">
          Coverage
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className={linkClass} to="/sendparcel">
            Send a Parcel
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink className={linkClass} to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink className={linkClass} to="/be-a-rider">
            Be A Rider
          </NavLink>
        </li>
      )}

      <li>
        <NavLink className={linkClass} to="/aboutUs">
          About Us
        </NavLink>
      </li>
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "Logout successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  return (
    <div className="navbar bg-base-100 sticky top-0 z-40 shadow-md h-16 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <span to="/">
          <ParcelPointLogo></ParcelPointLogo>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 gap-2">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink
                    to="/dashboard/update-profile"
                    className="justify-between mb-2"
                  >
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>

                <li className="bg-red-500 text-white text-base md:text-xl rounded">
                  <NavLink onClick={handleLogOut}>Logout</NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <button className="btn rounded mr-2">
              <NavLink to="/login">Sign In</NavLink>
            </button>
            <button className="btn rounded">
              <NavLink to="/register">Register</NavLink>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
