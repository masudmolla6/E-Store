import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, Package, ShoppingCart } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useMyPayments from "../../../../hooks/useMyPayments";
import useMyOrders from "../../../../hooks/useMyOrders";
import useWishlist from "../../../../hooks/useWishlist";
import Typewriter from "typewriter-effect";
import AOS from "aos";
import useCarts from "../../../../hooks/useCarts";
import MyCarts from "../MyCarts/MyCarts";

const UserHome = () => {
  const { user } = useAuth();

  const [myPayments = []] = useMyPayments();
  const [myOrders = []] = useMyOrders();
  const [wishlist = []] = useWishlist();
  const [carts, refetch] = useCarts();

  // ✅ Toggle state
  const [showAll, setShowAll] = useState(false);

  const isLoading = !myPayments || !myOrders || !wishlist || !carts;

  useEffect(() => {
    AOS.refresh();
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading... ⏳</p>;
  }

  // ✅ Stats
  const stats = [
    {
      icon: <ShoppingBag size={28} />,
      title: "Total Orders",
      value: myOrders.length,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Heart size={28} />,
      title: "Wishlist Items",
      value: wishlist.length,
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: <Star size={28} />,
      title: "Payments",
      value: myPayments.length,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <Package size={28} />,
      title: "Pending Deliveries",
      value: myOrders.filter((o) => o?.status !== "delivered").length,
      color: "from-green-400 to-green-600",
    },
  ];

  // ✅ Activities including myCarts
  const activities = [
    ...wishlist.map((item) => ({
      type: "wishlist",
      message: `You added '${item?.name}' to your wishlist.`,
      date: item?.createdAt || new Date(),
    })),

    ...myOrders.map((order) => ({
      type: "order",
      message: `Your order #${order?._id?.slice(-5)} has been ${
        order?.status === "delivered" ? "delivered" : "placed"
      }.`,
      date: order?.createdAt || new Date(),
    })),

    ...myPayments.map((payment) => {
      const transactionId =
        payment?.paymentInfo?.transactionId ||
        payment?.transactionId;

      return {
        type: "payment",
        message: `Your payment for order #${
          transactionId?.slice(-6) || "N/A"
        } was successful.`,
        date: payment?.createdAt || new Date(),
      };
    }),

    // ✅ Add myCarts info
    ...carts.map((cartItem) => ({
      type: "cart",
      message: `You added '${cartItem?.name}' to your cart.`,
      date: cartItem?.createdAt || new Date(),
    })),
  ];

  // ✅ FIX: clone before sort
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ✅ Show 4 or all
  const visibleActivities = showAll
    ? sortedActivities
    : sortedActivities.slice(0, 4);

  // ✅ Toggle handler
  const handleToggle = () => {
    setShowAll(!showAll);
  };


  // ✅ Icon handler with Lucide icons
  const getIcon = (type, size = 24, className = "text-white") => {
    switch (type) {
      case "wishlist":
        return <Heart size={size} className={className} />;
      case "order":
        return <Package size={size} className={className} />;
      case "payment":
        return <Star size={size} className={className} />;
      case "cart":
        return <ShoppingCart size={size} className={className} />;
      default:
        return <Star size={size} className={className} />;
    }
  };

  return (
    <div className="min-h-screen lg:px-6 lg:py-4 py-2 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 space-y-10">
      
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
              }}
            />
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Here’s your personalized shopping dashboard
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center justify-center text-white text-center`}
          >
            <div className="mb-3">{stat.icon}</div>
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activities
          </h2>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {visibleActivities.length > 0 ? (
            visibleActivities.map((activity, idx) => (
              <motion.div
                key={idx}
                className="py-3 text-gray-700 dark:text-gray-300 flex items-center"
              >
                <span className="mr-2">{getIcon(activity.type)}</span>
                {activity.message}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent activity 😶
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserHome;