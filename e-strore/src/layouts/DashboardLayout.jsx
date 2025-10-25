import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { LayoutDashboard, ShoppingBag, Users, PlusCircle, Home } from "lucide-react"; // 🔹 custom hook to check if user is admin
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

//   todo
  const isAdmin=true;

  // 🔹 user sidebar links
  const userLinks = [
    { name: "User Home", path: "/dashboard/userHome", icon: <LayoutDashboard /> },
    { name: "My Orders", path: "/dashboard/myOrders", icon: <ShoppingBag /> },
  ];

  // 🔹 admin sidebar links
  const adminLinks = [
    { name: "Admin Home", path: "/dashboard/adminHome", icon: <LayoutDashboard /> },
    { name: "Manage Users", path: "/dashboard/manageUsers", icon: <Users /> },
    { name: "Add Product", path: "/dashboard/addProduct", icon: <PlusCircle /> },
  ];

  // 🔹 shared nav items for all roles
  const sharedLinks = [
    { name: "Home", path: "/", icon: <Home /> },
  ];

  const linksToRender = isAdmin ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          {/* Logo / Title */}
          <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">
            Dashboard
          </h2>

          {/* Dynamic Nav Links */}
          <nav className="space-y-3">
            {linksToRender.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                  ${isActive ? "bg-indigo-500 text-white shadow-lg" : "hover:bg-gray-700"}`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Shared links (Home, etc.) */}
        <div className="mt-10 border-t border-gray-700 pt-4">
          {sharedLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                ${isActive ? "bg-indigo-500 text-white shadow-lg" : "hover:bg-gray-700"}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
