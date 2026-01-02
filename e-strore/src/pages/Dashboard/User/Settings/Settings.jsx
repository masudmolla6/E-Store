import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const Settings = () => {
  const { user,logOut } = useAuth();

  const [emailNotify, setEmailNotify] = useState(true);
  const [orderNotify, setOrderNotify] = useState(true);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Settings ⚙️</h2>

      {/* Account Info */}
      <div className="bg-gray-700 shadow rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Account Information</h3>

        <div className="">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {user?.displayName || "N/A"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user?.email || "N/A"}
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-700 shadow rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Notifications 🔔</h3>

        <label className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            checked={emailNotify}
            onChange={() => setEmailNotify(!emailNotify)}
            className="checkbox checkbox-primary"
          />
          Email notifications
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={orderNotify}
            onChange={() => setOrderNotify(!orderNotify)}
            className="checkbox checkbox-primary"
          />
          Order updates
        </label>
      </div>

      {/* Theme (future ready) */}
      <div className="bg-gray-700 shadow rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Appearance 🌗</h3>
        <p className="text-sm">
          Theme switch coming soon...
        </p>
      </div>

      {/* Logout */}
      <div className="bg-gray-700 shadow rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3 text-red-500">
          Danger Zone
        </h3>

        <button onClick={logOut} className="btn btn-error btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
