import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  Activity,
  TrendingUp,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useAuth from "../../../../hooks/useAuth";

const AdminHome = () => {
  const {user}=useAuth();
  // Dummy chart data (you can replace later with real API data)
  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 7000 },
  ];

  const stats = [
    { title: "Total Users", value: "1,245", icon: <Users className="text-blue-500" size={26} /> },
    { title: "Products", value: "320", icon: <Package className="text-purple-500" size={26} /> },
    { title: "Orders", value: "875", icon: <ShoppingBag className="text-emerald-500" size={26} /> },
    { title: "Revenue", value: "$12,340", icon: <DollarSign className="text-yellow-500" size={26} /> },
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
        <h1 className="text-3xl font-bold">Welcome back, {user.displayName}</h1>
        <p className="text-white/80 mt-2">Here’s what’s happening in your store today.</p>
      </motion.div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">{item.icon}</div>
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

      {/* ===== Recent Activity ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Activity size={20} /> Recent Activities
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>✅ New product <b>“Wireless Earbuds”</b> added.</li>
          <li>🛒 User <b>Rana</b> placed a new order.</li>
          <li>💰 Received payment of <b>$149.99</b>.</li>
          <li>📦 12 orders shipped successfully.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminHome;
