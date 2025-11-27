import React from "react";
import useCarts from "../../../../hooks/useCarts";
import { Trash2, RefreshCcw, ShoppingBag } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyCarts = () => {
  const [carts, refetch] = useCarts();
  const axiosSecure=useAxiosSecure();
  console.log(carts);
  const total = carts?.reduce((sum, item) => sum + item.price, 0);

  const handleDelete=(id)=>{
    console.log(id);
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
        axiosSecure.delete(`/carts/${id}`)
        .then((res)=>{
          console.log(res.data);
          if (res.data.deletedCount>0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Cart has been deleted.",
                icon: "success",
              });
              refetch();
          }
        })
      }
    });
  }
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag className="text-indigo-600 w-7 h-7" />
          My Cart
        </h1>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* Empty Cart */}
      {carts.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-2xl shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <p className="text-gray-500 text-lg font-medium">
            তোমার কার্ট খালি আছে 🛒
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
            <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-indigo-600 text-white font-semibold text-sm">
              <p className="col-span-3">Product</p>
              <p className="text-center">Price</p>
              <p className="text-center">Quantity</p>
              <p className="text-center">Action</p>
            </div>

            {carts.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 p-4 md:px-6 border-b hover:bg-gray-50 transition-all"
              >
                {/* Product */}
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                  <div>
                    <h3 className="text-gray-800 font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {item.description || "No description available"}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-gray-700 font-medium text-center">
                  ${item.price}
                </p>

                {/* Quantity */}
                <p className="text-gray-700 text-center">
                  {item.quantity || 1}
                </p>

                {/* Action */}
                <div className="flex justify-center">
                  <button onClick={()=>handleDelete(item._id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                    title="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white border rounded-2xl shadow-sm p-5">
            <p className="text-lg font-semibold text-gray-700">
              Total:{" "}
              <span className="text-indigo-600 text-xl">
                ${total.toFixed(2)}
              </span>
            </p>

            <Link to="/dashboard/payments" className="mt-3 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCarts;
