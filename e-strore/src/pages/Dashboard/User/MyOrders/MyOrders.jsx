import React, { useEffect, useState } from "react";
import useMyOrders from "../../../../hooks/useMyOrders";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import AOS from "aos";
import { Package } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const [myOrders, refetch, isLoading] = useMyOrders();
  const axiosSecure=useAxiosSecure();

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

  const reviewData = {
    productId: selectedProduct?._id,
    productName: selectedProduct?.name,
    rating,
    comment,
  };

  try {
    // API call to backend
    const response = await axiosSecure.post(
      "/reviews",
      reviewData
    );

    console.log("Review submitted:", response.data);

    // Show SweetAlert success
    if(response?.data?.insertedId)
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your review has been submitted successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    // Reset form
    setRating(0);
    setComment("");

    // Close modal
    document.getElementById("feedback_modal").close();
  } catch (error) {
    console.error("Failed to submit review:", error);

    // Show SweetAlert error
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Failed to submit your review. Try again.",
    });
  }
};

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
        <h2 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-1">
          <Package className="w-8 h-8" /> My Orders
        </h2>

        {/* Empty */}
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
                  <th className="text-center">#</th>
                  <th className="text-center">Product</th>
                  <th className="text-center">Transaction ID</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody data-aos="fade-left">

                {myOrders.map((order) =>
                  order.items.map((product, index) => (
                    <tr key={product._id} className="hover">

                      {/* Serial */}
                      <td>{index + 1}</td>

                      {/* Product */}
                      <td>
                        <div className="flex items-center gap-4">

                          <div className="avatar">
                            <div className="w-14 h-14 rounded-xl">
                              <img
                                src={product?.image}
                                alt="product"
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="font-semibold">
                              {product?.name}
                            </div>
                          </div>

                        </div>
                      </td>

                      {/* Transaction */}
                      <td
                        className="font-mono text-sm max-w-[150px] truncate tooltip cursor-pointer"
                        data-tip={order.paymentInfo?.transactionId}
                      >
                        {order.paymentInfo?.transactionId?.slice(0, 12)}...
                      </td>

                      {/* Total */}
                      <td className="font-semibold text-primary">
                        ৳ {order?.orderSummary?.grandTotal}
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge badge-success badge-outline">
                          Paid
                        </span>
                      </td>

                      {/* Action */}
                      <td className="flex gap-2 items-center">

                        <Link
                          to={`/dashboard/myOrders/${order._id}`}
                          className="btn btn-sm btn-info flex items-center gap-2"
                        >
                          <FaEye />
                          Details
                        </Link>

                        <button
                          onClick={() => handleOpenFeedback(product)}
                          className="btn btn-sm btn-outline btn-primary"
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
        )}
      </div>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">

        <div className="modal-box">

          <h3 className="font-bold text-lg mb-4">
            Write Your Review
          </h3>

          <form onSubmit={handleSubmitReview}>

            {/* Rating */}
            <div className="rating mb-4">

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
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className="modal-action">

              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("feedback_modal").close()
                }
              >
                Close
              </button>

              <button type="submit" className="btn btn-primary">
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