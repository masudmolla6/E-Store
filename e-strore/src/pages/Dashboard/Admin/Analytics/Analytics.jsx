import React from "react";
import { BarChart3, Users, CreditCard, TrendingUp } from "lucide-react";
import useAllUsers from "../../../../hooks/useAllUsers";
import useAllOrders from "../../../../hooks/useAllOrders";

const Analytics = () => {
  const [users] = useAllUsers();
  const [allOrders] = useAllOrders();

  /* -------------------- Calculations -------------------- */

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
    totalOrders > 0
      ? ((successfulOrders / totalOrders) * 100).toFixed(1)
      : 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `৳ ${totalRevenue?.toLocaleString()}`,
      icon: <CreditCard size={22} />,
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: <Users size={22} />,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <BarChart3 size={22} />,
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: <TrendingUp size={22} />,
    },
  ];

  /* -------------------- UI -------------------- */

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2"><TrendingUp size={22}/> Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-sm p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-xl font-semibold">{stat.value}</h2>
            </div>
            <div className="text-gray-600">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Order Breakdown */}
      <div className="rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Order Breakdown</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-lg font-semibold">{totalOrders}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-lg font-semibold">{pendingOrders}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Successful Orders</p>
            <p className="text-lg font-semibold">{successfulOrders}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-lg font-semibold">
              ৳ {totalRevenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {allOrders?.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-3">{order.userInfo?.name}</td>
                  <td>{order.userInfo?.email}</td>
                  <td>
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