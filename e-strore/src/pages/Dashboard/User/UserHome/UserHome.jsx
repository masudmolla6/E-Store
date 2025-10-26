import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, Package, User } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";

const UserHome = () => {
  const {user}=useAuth();
  console.log(user);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 md:p-10">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome Back, <span className="text-blue-600 dark:text-blue-400">{user?.displayName}</span> 🛍️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Here’s your personalized shopping dashboard.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { icon: <ShoppingBag size={28} />, title: "Total Orders", value: "25" },
          { icon: <Heart size={28} />, title: "Wishlist Items", value: "12" },
          { icon: <Star size={28} />, title: "Reviews Given", value: "8" },
          { icon: <Package size={28} />, title: "Pending Deliveries", value: "3" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-blue-500 dark:text-blue-400 mb-3">{item.icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activities
          </h2>
          <button className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            View All
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            "You added 'Nike Air Max 270' to your wishlist.",
            "Your order #12345 has been shipped.",
            "You reviewed 'Apple Watch Series 8'.",
            "Your payment for order #12489 was successful.",
          ].map((activity, i) => (
            <div
              key={i}
              className="py-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
            >
              {activity}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserHome;
