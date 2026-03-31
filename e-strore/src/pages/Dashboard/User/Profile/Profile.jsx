import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useMyOrders from "../../../../hooks/useMyOrders";
import useWishlist from "../../../../hooks/useWishlist";
import useMyPayments from "../../../../hooks/useMyPayments";

const Profile = () => {
  const { user } = useAuth();

  // Hooks
  const [myOrders,] = useMyOrders();
  const [wishlist] = useWishlist();
  const [myPayments,isLoading,refetch] = useMyPayments();
  console.log(myPayments);

  if(isLoading){
    return <p>Loading....</p>
  }

  const statusColor =
    user?.status === "active" ? "text-green-600" : "text-red-500";

  // Real stats
    const totalSpent = myPayments?.reduce(
      (acc, payment) => acc + (payment.price || 0),
      0
    ) || 0;
  const stats = {
    totalOrders: myOrders?.length || 0,
    totalSpent: totalSpent,
    wishlistItems: wishlist?.length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-blue-400 p-2 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden"
      >
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
          <div className="absolute -bottom-16 left-6">
            <motion.img
              src={user?.photoURL}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-6 pb-6">
          {/* User Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {user?.displayName}{" "}
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  Verified
                </span>
              </h2>

              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail size={16} /> {user?.email}
              </p>

              <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm">
                <Calendar size={14} /> Joined:{" "}
                {new Date(user?.metadata?.creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Status */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-xl shadow-lg flex items-center gap-3 transition"
            >
              <div className="p-3 bg-white rounded-full animate-bounce">
                <span className="text-green-600 text-lg font-bold">✔</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <h3 className={`text-lg font-semibold ${statusColor}`}>
                  Verified
                </h3>
              </div>
            </motion.div>

            {/* Role */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-blue-400 to-blue-100 p-4 rounded-xl shadow-lg flex items-center gap-3 transition"
            >
              <div className="p-3 bg-white rounded-full animate-pulse">
                <span className="text-blue-600 text-lg font-bold">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <h3 className="text-lg font-semibold text-blue-600 capitalize">
                  User
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md p-4 rounded-xl text-center transition hover:shadow-xl"
            >
              <p className="text-sm text-gray-400">Total Orders</p>
              <h3 className="text-xl font-bold text-indigo-600">
                {stats.totalOrders}
              </h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md p-4 rounded-xl text-center transition hover:shadow-xl"
            >
              <p className="text-sm text-gray-400">Total Spent</p>
              <h3 className="text-xl font-bold text-green-600">
                ${stats.totalSpent.toLocaleString()}
              </h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md p-4 rounded-xl text-center transition hover:shadow-xl"
            >
              <p className="text-sm text-gray-400">Wishlist Items</p>
              <h3 className="text-xl font-bold text-pink-600">
                {stats.wishlistItems}
              </h3>
            </motion.div>
          </div>

          {/* Extra Info */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 bg-cyan-50 border border-cyan-100 p-4 rounded-xl shadow-sm transition"
          >
            <p className="text-sm text-gray-600 text-center">
              Welcome back! This is your profile overview. You can explore your
              dashboard, check your stats, and manage your account easily.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;