import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ImageIcon,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useAuth from "../../../../hooks/useAuth";
import Typewriter from "typewriter-effect";
import { Link } from "react-router";

const AdminHome = () => {
  const { user } = useAuth();

  // Dummy chart data
  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 7000 },
  ];

  // Stats cards
  const stats = [
    { title: "Total Users", value: "1,245", icon: <Users size={26} /> },
    { title: "Products", value: "320", icon: <Package size={26} /> },
    { title: "Orders", value: "875", icon: <ShoppingBag size={26} /> },
    { title: "Revenue", value: "$12,340", icon: <DollarSign size={26} /> },
  ];

  // Control panel sections
  const controlPanels = [
    {
      title: "Banner",
      description: "Manage website banners",
      gradient: "from-pink-500 to-red-500",
      icon: <ImageIcon size={22} />,
      actions: [
        { name: "Add", route: "/dashboard/addBanner" },
        { name: "Manage", route: "/dashboard/manageBanner" },
      ],
    },
    {
      title: "Products",
      description: "Add or update products",
      gradient: "from-indigo-500 to-purple-600",
      icon: <Package size={22} />,
      actions: [
        { name: "Add", route: "/dashboard/addProducts" },
        { name: "Manage", route: "/dashboard/manageProducts" },
      ],
    },
    {
      title: "Orders",
      description: "Track customer orders",
      gradient: "from-emerald-400 to-teal-500",
      icon: <ShoppingBag size={22} />,
      actions: [
        { name: "View Orders", route: "/dashboard/manageOrders" },
      ],
    },
    {
      title: "Users",
      description: "Manage users",
      gradient: "from-yellow-400 to-orange-400",
      icon: <Users size={22} />,
      actions: [
        { name: "View Users", route: "/dashboard/manageUsers" },
      ],
    },
  ];

  return (
    <div className="space-y-8">

      {/* ===== Welcome Section ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:flex sm:justify-center sm:items-center gap-2">
          Welcome back,
          <span className="text-black">
            <Typewriter
              options={{
                strings: [user?.displayName || "Admin"],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 60
              }}
            />
          </span>
        </h1>
        <p className="text-white/80 mt-2 text-center">
          Here’s what’s happening in your store today.
        </p>
      </motion.div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-300 to-purple-300 text-white flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Sales Overview Chart ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp size={20} /> Sales Overview
          </h2>
          <span className="text-sm text-gray-500">Last 6 months</span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ===== Control Panel ===== */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center">Control Panel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {controlPanels.map((panel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-gradient-to-r ${panel.gradient} text-white rounded-xl p-6 shadow-lg flex flex-col justify-between`}
            >
              <div>
                <h2 className="font-bold text-lg flex items-center gap-2">
                  {panel.icon} {panel.title}
                </h2>
                <p className="text-sm mt-1 opacity-80">{panel.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {panel.actions.map((action, idx) => (
                  <Link
                    key={idx}
                    to={action.route}
                    className="bg-gray-300 text-black px-3 py-1 rounded shadow hover:shadow-md transition flex items-center gap-1"
                  >
                    {action.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;