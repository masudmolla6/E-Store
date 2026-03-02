import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { FaEnvelope, FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      {/* Page Title */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          My Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-10">

          {/* Left Side - Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2kR8z2Q/user.png"
                }
                alt="User"
                className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md"
              />
            </div>

            <span className="mt-4 px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Active Member
            </span>
          </div>

          {/* Right Side - Info */}
          <div className="flex-1 w-full space-y-5">
            <div>
              <h3 className="text-2xl font-semibold">
                {user?.displayName || "User Name"}
              </h3>
              <p className="flex items-center gap-2 text-gray-500 mt-2">
                <FaEnvelope />
                {user?.email || "No Email Provided"}
              </p>
            </div>

            {/* Extra Info Section (Future Ready) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-base-200 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">User</p>
              </div>

              <div className="bg-base-200 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium text-green-600">Verified</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button className="btn btn-primary flex items-center gap-2">
                <FaUserEdit />
                Edit Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;