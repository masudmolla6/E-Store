import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, Package } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useMyPayments from "../../../../hooks/useMyPayments";
import useMyOrders from "../../../../hooks/useMyOrders";
import useWishlist from "../../../../hooks/useWishlist";
import Typewriter from "typewriter-effect";
import AOS from "aos";

const UserHome = () => {
  const { user } = useAuth();
  const [myPayments] = useMyPayments();
  const [myOrders] = useMyOrders();
  const [wishlist] = useWishlist();


  const isLoading = !myPayments || !myOrders || !wishlist;

  useEffect(() => {
    AOS.refresh();
  }, []);

  
  if (isLoading) {
    return <p className="text-center">Loading... ⏳</p>;
  }

  console.log(myPayments);


  // ✅ Stats
  const stats = [
    {
      icon: <ShoppingBag size={28} />,
      title: "Total Orders",
      value: myOrders?.length ?? 0,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Heart size={28} />,
      title: "Wishlist Items",
      value: wishlist?.length ?? 0,
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: <Star size={28} />,
      title: "Payments",
      value: myPayments?.length ?? 0,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <Package size={28} />,
      title: "Pending Deliveries",
      value:
        myOrders?.filter((o) => o?.status !== "delivered")?.length ?? 0,
      color: "from-green-400 to-green-600",
    },
  ];

  // ✅ Build Activities (FIXED)
  const activities = [
    ...(wishlist?.map((item) => ({
      type: "wishlist",
      message: `You added '${item?.name}' to your wishlist.`,
      date: item?.createdAt || new Date(),
    })) || []),

    ...(myOrders?.map((order) => ({
      type: "order",
      message: `Your order #${order?._id?.slice(-5)} has been ${
        order?.status === "delivered" ? "delivered" : "placed"
      }.`,
      date: order?.createdAt || new Date(),
    })) || []),

  ...(myPayments.map((payment) => {
    const transactionId = payment?.transactionId;

    return {
        type: "payment",
        message: `Your payment for order #${transactionId?.slice(-6) || "N/A"} was successful.`,
        date: payment?.createdAt || new Date(),
      };
    }) || []),
  ];

  // ✅ Sort Latest First
  const sortedActivities = activities.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ✅ Icon Handler
  const getIcon = (type) => {
    switch (type) {
      case "wishlist":
        return "❤️";
      case "order":
        return "📦";
      case "payment":
        return "💳";
      default:
        return "🔔";
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 space-y-10">
      
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-900 dark:text-white flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>Welcome Back,</span>
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
            <Typewriter
              options={{
                strings: [user?.displayName || "User"],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 80,
              }}
            />
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Here’s your personalized shopping dashboard
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center justify-center text-white text-center`}
            whileHover={{ y: -5 }}
          >
            <div className="mb-3">{stat.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold">
              {stat.title}
            </h3>
            <p className="text-3xl sm:text-4xl font-bold mt-1">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activities
          </h2>
          <button className="mt-3 sm:mt-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition">
            View All
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedActivities.length > 0 ? (
            sortedActivities.slice(0, 6).map((activity, idx) => (
              <motion.div
                key={idx}
                className="py-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base flex items-center"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(0,0,0,0.02)",
                }}
              >
                <span className="mr-2">{getIcon(activity.type)}</span>
                {activity.message}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent activity found 😶
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserHome;