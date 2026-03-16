import React, { useEffect, useState } from "react";
import { FaTrash, FaUserShield, FaSearch } from "react-icons/fa";
import useAllUsers from "../../../../hooks/useAllUsers";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AOS from "aos";
import { Users, ShieldCheck, UserCheck } from "lucide-react";

const ManageUsers = () => {

  const [users, refetch] = useAllUsers();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const filteredUsers = users?.filter((user) => {

    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      filter === "all" || user.role === filter;

    return matchesSearch && matchesRole;

  });

  const handleMakeAdmin = (user) => {

    setLoading(true);

    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {

        if (res.data.modifiedCount > 0) {

          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now`,
            showConfirmButton: false,
            timer: 1500
          });

        }

      })
      .finally(() => setLoading(false));

  };

  const handleDeleteUser = (user) => {

    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete"
    }).then((result) => {

      if (result.isConfirmed) {

        setLoading(true);

        axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {

            if (res.data.deletedCount > 0) {

              Swal.fire({
                icon: "success",
                title: "User deleted"
              });

              refetch();

            }

          })
          .finally(() => setLoading(false));

      }

    });

  };

  return (

    <div className="space-y-10 pb-20">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-500"/>
          Manage Users
        </h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

          <label className="input input-bordered flex items-center gap-2 w-full md:w-64">
            <FaSearch/>
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="grow"
            />
          </label>

          <select
            className="select select-bordered w-full md:w-auto"
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>

        </div>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4">

          <Users className="w-10 h-10"/>

          <div>
            <p className="text-sm opacity-80">Total Users</p>
            <h3 className="text-2xl font-bold">{users?.length}</h3>
          </div>

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4">

          <ShieldCheck className="w-10 h-10"/>

          <div>
            <p className="text-sm opacity-80">Admins</p>
            <h3 className="text-2xl font-bold">
              {users?.filter(u => u.role === "admin").length}
            </h3>
          </div>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4">

          <UserCheck className="w-10 h-10"/>

          <div>
            <p className="text-sm opacity-80">Customers</p>
            <h3 className="text-2xl font-bold">
              {users?.filter(u => !u.role || u.role === "customer").length}
            </h3>
          </div>

        </div>

      </div>

      {/* Users Table */}

      <div
        data-aos="fade-up"
        className="w-full overflow-x-auto rounded-xl shadow-lg border bg-base-100"
      >

        <table className="table table-zebra w-full">

          <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
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

                  <td className="font-semibold">{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span
                      className={`badge
                        ${user.role === "admin"
                          ? "badge-error text-white"
                          : user.role === "seller"
                          ? "badge-secondary"
                          : "badge-outline"}
                      `}
                    >
                      {user.role || "customer"}
                    </span>

                  </td>

                  <td>

                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center">

                      {user.role !== "admin" && (

                        <button
                          onClick={()=>handleMakeAdmin(user)}
                          disabled={loading}
                          className="btn btn-sm btn-success text-white"
                        >
                          <FaUserShield/>
                          Admin
                        </button>

                      )}

                      <button
                        onClick={()=>handleDeleteUser(user)}
                        disabled={loading}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FaTrash/>
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 font-medium"
                >
                  No users found 😕
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {loading && (

        <div className="flex justify-center">

          <span className="loading loading-spinner text-primary"></span>

        </div>

      )}

    </div>

  );

};

export default ManageUsers;