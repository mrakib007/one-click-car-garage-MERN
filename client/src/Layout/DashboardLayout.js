import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
          <label htmlFor="my-drawer-2" className="drawe"></label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to={"/dashboard/myBookings"}>My Bookings</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/addService">Add Service</Link>
                </li>
                <li>
                  <Link to={"/dashboard/manageUsers"}>Manage Users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
