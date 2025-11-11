import React, { useState } from "react";
import { FaTrash, FaUserShield, FaSearch } from "react-icons/fa";
import useAllUsers from "../../../../hooks/useAllUsers";

const ManageUsers = () => {
  const [users, refetch] = useAllUsers();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Filter + search logic
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filter === "all" || user.role === filter;
    return matchesSearch && matchesRole;
  });

  // handle admin role assign
  const handleMakeAdmin = async (user) => {
    setLoading(true);
    try {
      await fetch(`https://your-api-url/users/admin/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // handle delete user
  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(`Delete ${user.name}?`);
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await fetch(`https://your-api-url/users/${user._id}`, {
        method: "DELETE",
      });
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">👥 Manage Users</h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2 w-full md:w-64">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              className="grow"
              placeholder="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          {/* Filter */}
          <select
            className="select select-bordered"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length ? (
              filteredUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-error text-white"
                          : user.role === "seller"
                          ? "badge-secondary"
                          : "badge-outline"
                      }`}
                    >
                      {user.role || "customer"}
                    </div>
                  </td>
                  <td className="text-center">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        disabled={loading}
                        className="btn btn-sm btn-outline btn-success mr-2"
                      >
                        <FaUserShield className="mr-1" />
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      disabled={loading}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  No users found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
