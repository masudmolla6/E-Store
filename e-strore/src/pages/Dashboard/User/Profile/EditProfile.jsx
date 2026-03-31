import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { Link } from "react-router";

const Profile = () => {
  // 👉 dummy data (later backend থেকে আনবা)
  const user = {
    name: "Masud Rana",
    email: "masud@example.com",
    photo:
      "https://i.ibb.co/4pDNDk1/avatar.png",
    joinDate: "2024-01-10",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden"
      >
        {/* Cover Section */}
        <div className="h-40 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
          <div className="absolute -bottom-14 left-6">
            <img
              src={user.photo}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* User Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name}
              </h2>

              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail size={16} /> {user.email}
              </p>

              <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm">
                <Calendar size={14} /> Joined: {user.joinDate}
              </p>
            </div>

            {/* Edit Button */}
            <Link
              to="/dashboard/profile/editProfile"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <Edit size={16} />
              Edit Profile
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Orders</p>
              <h3 className="text-xl font-semibold text-gray-800">12</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Payments</p>
              <h3 className="text-xl font-semibold text-gray-800">8</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Wishlist</p>
              <h3 className="text-xl font-semibold text-gray-800">5</h3>
            </div>

          </div>

          {/* Extra Section */}
          <div className="mt-6 bg-cyan-50 border border-cyan-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">
              👋 Welcome back! This is your profile overview. You can manage your
              orders, payments, and wishlist from the dashboard.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;