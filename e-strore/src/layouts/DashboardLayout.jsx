import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  User,
  Heart,
  Settings,
  CreditCard,
  FileText,
  Users,
  PlusCircle,
  Package,
  BarChart3,
  Home,
} from "lucide-react"; // ✅ All valid, modern icons
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  // 🧠 TODO: Replace this with your real admin check (custom hook)
  const isAdmin = false;

  // 🧍‍♂️ USER SIDEBAR LINKS
  const userLinks = [
    { name: "User Home", path: "/dashboard/userHome", icon: <LayoutDashboard size={20} /> },
    { name: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
    { name: "My Carts", path: "/dashboard/myCart", icon: <ShoppingCart size={20} /> },
    { name: "My Orders", path: "/dashboard/myOrders", icon: <ClipboardList size={20} /> },
    { name: "Order Details", path: "/dashboard/orderDetails", icon: <FileText size={20} /> },
    { name: "Payment History", path: "/dashboard/userPaymentHistory", icon: <CreditCard size={20} /> },
    { name: "Wishlist", path: "/dashboard/wishlist", icon: <Heart size={20} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  // 🧑‍💼 ADMIN SIDEBAR LINKS
  const adminLinks = [
    { name: "Admin Home", path: "/dashboard/adminHome", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Users", path: "/dashboard/manageUsers", icon: <Users size={20} /> },
    { name: "Add Product", path: "/dashboard/addProducts", icon: <PlusCircle size={20} /> },
    { name: "Manage Products", path: "/dashboard/manageProducts", icon: <Package size={20} /> },
    { name: "Manage Orders", path: "/dashboard/manageOrders", icon: <ClipboardList size={20} /> },
    { name: "Payment History", path: "/dashboard/paymentHistory", icon: <CreditCard size={20} /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 size={20} /> },
  ];

  // 🌍 SHARED LINKS (For everyone)
  const sharedLinks = [{ name: "Home", path: "/", icon: <Home size={20} /> }];

  const linksToRender = isAdmin ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          {/* Logo / Title */}
          <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">
            Dashboard
          </h2>

          {/* Dynamic Nav Links */}
          <nav className="space-y-2">
            {linksToRender.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Shared links (like Home, Logout, etc.) */}
        <div className="mt-10 border-t border-gray-700 pt-4">
          {sharedLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "hover:bg-gray-700"
                }`
              }
            >
              {link.icon}
              <span className="text-sm font-medium">{link.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
