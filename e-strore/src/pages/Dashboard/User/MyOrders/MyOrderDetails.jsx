import { useLoaderData } from "react-router";
import { FcViewDetails } from "react-icons/fc";
import { FaUser, FaBoxOpen, FaCreditCard, FaCalculator } from "react-icons/fa";

const MyOrderDetails = () => {
  const order = useLoaderData();

  const {
    _id,
    userInfo,
    items,
    paymentInfo,
    orderSummary,
    status,
    createdAt,
  } = order;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FcViewDetails size={28} />
        Order Details
      </h2>

      {/* Order Info */}
      <div className="shadow rounded-lg p-4 mb-6">
        <p><span className="font-semibold">Order ID:</span> {_id}</p>
        <p><span className="font-semibold">Order Date:</span> {new Date(createdAt).toLocaleString()}</p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`capitalize font-medium ${
              status === "pending" ? "text-orange-500" : "text-green-600"
            }`}
          >
            {status}
          </span>
        </p>
      </div>

      {/* User Info */}
      <div className="shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaUser />
          Customer Info
        </h3>
        <p><span className="font-medium">Name:</span> {userInfo.name}</p>
        <p><span className="font-medium">Email:</span> {userInfo.email}</p>
      </div>

      {/* Items */}
      <div className="shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaBoxOpen />
          Ordered Items
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Price: ৳{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Info */}
      <div className="shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaCreditCard />
          Payment Info
        </h3>
        <p>
          <span className="font-medium">Transaction ID:</span>{" "}
          {paymentInfo.transactionId}
        </p>
        <p>
          <span className="font-medium">Payment Status:</span>{" "}
          <span className="text-green-600 font-semibold">
            {paymentInfo.status}
          </span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaCalculator />
          Order Summary
        </h3>
        <p>Items Total: ৳{orderSummary.itemsTotal}</p>
        <p>Shipping Charge: ৳{orderSummary.shippingCharge}</p>
        <p className="font-bold text-lg">
          Grand Total: ৳{orderSummary.grandTotal}
        </p>
      </div>
    </div>
  );
};

export default MyOrderDetails;
