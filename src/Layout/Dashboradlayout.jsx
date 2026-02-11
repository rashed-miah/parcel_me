import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyBillWave,
  FaSearchLocation,
  FaUserEdit,
  FaCog,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
} from "react-icons/fa";
import ParcelPointLogo from "../SharedPages/ParcelPointLogo/ParcelPointLogo";
import useUserRole from "../Hook/useUserRole";

const DashboardLayout = () => {
  const { role } = useUserRole();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 text-sm rounded transition
   ${isActive ? "bg-primary  font-semibold" : "hover:bg-primary "}`;
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle (used only on small devices) */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar → ONLY for small devices */}
        <nav className="navbar bg-base-300 lg:hidden">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
            ☰
          </label>
          <span className="px-4 font-semibold">Dashboard</span>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        {/* Overlay → only works on small screens */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay lg:hidden"
        ></label>

        {/* Fixed sidebar for md & lg */}
        <aside className="w-62 bg-base-200 min-h-screen fixed lg:static">
          <div className="p-4 flex sm:justify-center lg:justify-start">
            <ParcelPointLogo></ParcelPointLogo>
          </div>
          <ul className="menu p-4 w-full space-y-2">
            <li>
              <NavLink to="/" className={linkClass}>
                <FaHome className="text-lg" />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-parcels" className={linkClass}>
                <FaBoxOpen className="text-lg" />
                My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/paymentHistory" className={linkClass}>
                <FaMoneyBillWave className="text-lg" />
                Payment History
              </NavLink>
            </li>

            <li>
              <NavLink to="/trace-parcel" className={linkClass}>
                <FaSearchLocation className="text-lg" />
                Trace a Parcel
              </NavLink>
            </li>
            {role == "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/active-riders" className={linkClass}>
                    <FaUserCheck className="text-lg" />
                    Active Riders
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/pending-riders" className={linkClass}>
                    <FaUserClock className="text-lg" />
                    Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/make-admin" className={linkClass}>
                    <FaUserShield className="text-lg" />
                    Make Admin
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/update-profile" className={linkClass}>
                <FaUserEdit className="text-lg" />
                Update Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
