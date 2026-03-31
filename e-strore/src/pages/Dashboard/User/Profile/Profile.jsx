import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Edit } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const Profile = () => {
  const {user}=useAuth();
  console.log(user);

  const statusColor =
    user.status === "active" ? "text-green-600" : "text-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-blue-400 p-2 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden"
      >
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
          <div className="absolute -bottom-14 left-6">
            <img
              src={user.photoURL}
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
                {user.displayName}
              </h2>

              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail size={16} /> {user.email}
              </p>

              <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm">
                <Calendar size={14} /> Joined: {user.metadata.creationTime}
              </p>
            </div>

            {/* Edit Button */}
            {/* <Link
              to="/dashboard/editProfile"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <Edit size={16} />
              Edit Profile
            </Link> */}
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Account Status */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-green-600 text-lg font-bold">✔</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <h3 className={`text-lg font-semibold ${statusColor}`}>
                  Verified
                </h3>
              </div>
            </div>

            {/* Role */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-blue-600 text-lg font-bold">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <h3 className="text-lg font-semibold text-blue-600 capitalize">
                  User
                </h3>
              </div>
            </div>

          </div>

          {/* Extra Info */}
          <div className="mt-6 bg-cyan-50 border border-cyan-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">
              Welcome back! This is your profile overview. You can explore
              your dashboard and manage your account easily.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;