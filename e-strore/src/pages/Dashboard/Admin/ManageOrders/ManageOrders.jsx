import React from 'react'
import useAllOrders from '../../../../hooks/useAllOrders'
import { ClipboardList } from 'lucide-react'

const ManageOrders = () => {
  const [allOrders, refetch] = useAllOrders()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-warning'
      case 'processing':
        return 'badge-info'
      case 'shipped':
        return 'badge-primary'
      case 'delivered':
        return 'badge-success'
      default:
        return 'badge-ghost'
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"> 
          <ClipboardList size={18} />
          Manage Orders ({allOrders?.length})
        </h2>
      </div>

      {/* Empty State */}
      {allOrders?.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allOrders?.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                {/* Short Order ID */}
                <td className="font-mono">
                  {order._id.slice(0, 6)}...
                </td>

                {/* User Info */}
                <td>
                  <p className="font-medium">
                    {order.userInfo?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.userInfo?.email}
                  </p>
                </td>

                {/* Items Count */}
                <td>{order.items?.length}</td>

                {/* Price */}
                <td>৳ {order.orderSummary?.grandTotal}</td>

                {/* Payment */}
                <td>
                  <span className="badge badge-success">
                    Paid
                  </span>
                </td>

                {/* Order Status */}
                <td>
                  <span
                    className={`badge ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td>
                  <button className="btn btn-xs btn-outline btn-primary">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageOrders
