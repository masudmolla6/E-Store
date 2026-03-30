import React, { useEffect, useState } from "react";
import useMyOrders from "../../../../hooks/useMyOrders";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import AOS from "aos";
import { DollarSign, Package } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyOrdersSkeleton from "./MyOrdersSkeleton";

const MyOrders = () => {
  const [myOrders,isLoading,refetch] = useMyOrders();
  const axiosSecure = useAxiosSecure();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleOpenFeedback = (product) => {
    setSelectedProduct(product);
    document.getElementById("feedback_modal").showModal();
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const reviewData = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      rating,
      comment,
    };

    try {
      const response = await axiosSecure.post("/reviews", reviewData);

      if (response?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your review has been submitted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      setRating(0);
      setComment("");
      document.getElementById("feedback_modal").close();
    } catch (error) {
      console.error("Failed to submit review:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to submit your review. Try again.",
      });
    }
  };

  if (isLoading) {
    return <MyOrdersSkeleton></MyOrdersSkeleton>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-5">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-2">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-2 text-gray-800 dark:text-gray-100">
          <Package className="w-8 h-8 text-indigo-600" /> My Orders
        </h2>
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="table w-full min-w-[600px] md:min-w-full">
              <thead className="bg-indigo-100 dark:bg-indigo-900 text-gray-700 dark:text-gray-200">
                <tr className="text-base font-semibold text-center">
                  <th>#</th>
                  <th className="text-center">Product</th>
                  <th>Transaction ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

            <tbody data-aos="fade-left">
              {myOrders.map((order) =>
                order.items.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    {/* Serial */}
                    <td className="text-center py-3">{index + 1}</td>

                    {/* Product */}
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[150px]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Transaction */}
                    <td className="font-mono text-sm truncate text-center max-w-[140px] py-3" title={order.paymentInfo?.transactionId}>
                      {order.paymentInfo?.transactionId?.slice(0, 12)}...
                    </td>

                    {/* Total */}
                    <td className="font-semibold text-gray-400 text-center py-3">
                      $ {order.orderSummary?.grandTotal}
                    </td>

                    {/* Status */}
                    <td className="text-center py-3">
                      <span className="badge badge-success badge-outline px-3 py-1">
                        Paid
                      </span>
                    </td>

                    {/* Action */}
                    <td className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <Link
                        to={`/dashboard/myOrders/${order._id}`}
                        className="btn btn-sm btn-info flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        <FaEye /> Details
                      </Link>
                      <button
                        onClick={() => handleOpenFeedback(product)}
                        className="btn btn-sm btn-outline btn-primary w-full sm:w-auto"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
      </div>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">

            {/* Rating */}
            <div className="rating justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className="modal-action flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                className="btn btn-outline w-full sm:w-auto"
                onClick={() => document.getElementById("feedback_modal").close()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>

    </div>
  );
};

export default MyOrders;