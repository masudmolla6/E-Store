import React, { useEffect } from "react";
import { BarChart3, Users, CreditCard, TrendingUp } from "lucide-react";
import useAllUsers from "../../../../hooks/useAllUsers";
import useAllOrders from "../../../../hooks/useAllOrders";
import AOS from "aos";

const Analytics = () => {
  const [users] = useAllUsers();
  const [allOrders] = useAllOrders();

  useEffect(() => {
    AOS.refresh();
  }, []);

  // -------------------- Calculations --------------------
  const totalRevenue = allOrders?.reduce(
    (sum, order) => sum + (order?.orderSummary?.grandTotal || 0),
    0
  );
  const totalOrders = allOrders?.length || 0;
  const pendingOrders =
    allOrders?.filter((order) => order.status === "pending").length || 0;
  const successfulOrders =
    allOrders?.filter(
      (order) => order.paymentInfo?.status === "succeeded"
    ).length || 0;
  const successRate =
    totalOrders > 0 ? ((successfulOrders / totalOrders) * 100).toFixed(1) : 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `৳ ${totalRevenue?.toLocaleString()}`,
      icon: <CreditCard size={22} />,
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-100 text-green-600",
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: <Users size={22} />,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <BarChart3 size={22} />,
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: <TrendingUp size={22} />,
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-8 px-2 md:px-4 lg:px-6 pb-10">

      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-primary" /> Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div
        data-aos="fade-right"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl text-white shadow-lg p-5 bg-gradient-to-r ${stat.color} hover:scale-105 transition duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Breakdown */}
      <div data-aos="fade-left" className="bg-base-100 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold mt-1">{totalOrders}</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-xl font-bold mt-1 text-yellow-600">{pendingOrders}</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Successful Orders</p>
            <p className="text-xl font-bold mt-1 text-green-600">{successfulOrders}</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold mt-1 text-primary">
              ৳ {totalRevenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div data-aos="fade-up" className="bg-base-100 rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {/* ✅ Responsive wrapper */}
        <div className="w-full min-w-[480px]">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover">
                  <td className="font-semibold">{order.userInfo?.name}</td>
                  <td>{order.userInfo?.email}</td>
                  <td className="font-semibold text-green-600">
                    ৳ {order.orderSummary?.grandTotal?.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Analytics;