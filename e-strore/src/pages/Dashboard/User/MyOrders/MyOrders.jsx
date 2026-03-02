import React from "react";
import useMyOrders from "../../../../hooks/useMyOrders";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

const MyOrders = () => {
  const [myOrders, refetch, isLoading] = useMyOrders();
  console.log(myOrders);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          My Orders
        </h2>

        {/* Empty State */}
        {myOrders.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">
              No Orders Found 😔
            </h3>
            <p className="text-gray-500">
              Looks like you haven't placed any orders yet.
            </p>
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base font-semibold">
                  <th>#</th>
                  <th>Product</th>
                  <th>Transaction ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {myOrders.map((item, index) => (
                  <tr key={item._id} className="hover">
                    
                    <td>{index + 1}</td>

                    {/* Product Info */}
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-xl">
                            <img
                              src={item.items[0]?.image}
                              alt="product"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {item.items[0]?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.items.length} item(s)
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Transaction */}
                    <td className="font-mono text-sm">
                      {item.paymentInfo?.transactionId}
                    </td>

                    {/* Total */}
                    <td className="font-semibold text-primary">
                      ৳ {item?.orderSummary?.grandTotal}
                    </td>

                    {/* Status */}
                    <td>
                      <span className="badge badge-success badge-outline">
                        Paid
                      </span>
                    </td>

                    {/* Action */}
                    <td>
                      <Link
                        to={`/dashboard/myOrders/${item._id}`}
                        className="btn btn-sm btn-info flex items-center gap-2"
                      >
                        <FaEye />
                        Details
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;