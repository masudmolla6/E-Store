import React, { useEffect } from "react";
import useCarts from "../../../../hooks/useCarts";
import { Trash2, RefreshCcw, ShoppingBag } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import AOS from "aos";
import MyCartsSkeleton from "./MyCartsSkeleton";

const MyCarts = () => {
  const [carts, isLoading, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const total = carts?.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Item removed from your cart.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <MyCartsSkeleton />;

  return (
    <div className="min-h-screen md:px-8 lg:px-12 py-2 space-y-8">
      
      {/* Header */}
      <div className="flex  sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-700 flex items-center gap-2">
          <ShoppingBag className="text-indigo-600 w-7 h-7" /> My Cart
        </h1>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:opacity-90 text-white px-5 py-2.5 rounded-xl shadow-md transition-all duration-300"
        >
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      {/* Empty Cart */}
      {carts.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-800">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <p className="text-gray-500 text-lg font-medium">
            Your Cart Is Empty.
          </p>
        </div>
      ) : (
        <>
          {/* DaisyUI Table */}
          <div className="overflow-x-auto rounded-2xl shadow-md border bg-white dark:bg-gray-900">
            <table className="table w-full md:min-w-full">
              <thead className="bg-indigo-100 dark:bg-indigo-900 text-gray-700 dark:text-gray-200">
                <tr className="text-base font-semibold text-center">
                  <th>#</th>
                  <th className="text-center">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody data-aos="fade-left">
                {carts.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                    {/* Serial */}
                    <td className="text-center">{index + 1}</td>

                    {/* Product */}
                    <td className="flex items-center gap-4 text-left">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                        {item.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="text-center font-medium text-gray-700 dark:text-gray-300">
                      ${item.price}
                    </td>

                    {/* Quantity */}
                    <td className="text-center text-gray-700 dark:text-gray-300">{item.quantity || 1}</td>

                    {/* Action */}
                    <td className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-400 hover:text-white transition"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total + Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border rounded-2xl shadow-md p-5 bg-white dark:bg-gray-900">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 sm:mb-0">
              Total: <span className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">${total.toFixed(2)}</span>
            </p>

            <Link
              to="/dashboard/payments"
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full sm:w-auto text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCarts;