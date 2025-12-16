import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { ShoppingCart, Eye } from "lucide-react";
import Swal from 'sweetalert2';
import useWishlist from '../../../../hooks/useWishlist';

const WishlistCard = ({product}) => {
      const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const [, refetch] = useWishlist();

  const handleAddToCart = (product) => {
    if (user && user.email) {
      const cartItem = {
        productId: product._id,
        email: user.email,
        name: product.name,
        image: product.image,
        price: product.price
      };

      axiosSecure.post("/carts", cartItem)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.name} added successfully.`,
              showConfirmButton: false,
              timer: 1500,
            });
            // refetch();
          } else if (res.data.message === "Item already in cart") {
            Swal.fire({
              position: "top-end",
              icon: "info",
              title: `${product.name} is already in your cart 🛒`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

    const handleDeleteFromWishlist=(id)=>{
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
          axiosSecure.delete(`/wishlist/${id}`)
          .then((res)=>{
            console.log(res.data);
            if (res.data.deletedCount>0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Product has been deleted from Wishlist.",
                  icon: "success",
                });
                refetch();
            }
          })
        }
      });
    }

  return (
    <div className="group relative dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-3 flex flex-col justify-between border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
      {/* 🖼️ Product Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* 🔍 Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <Eye size={18} /> View Details
          </button>
        </div>
      </div>

      {/* 📋 Product Info */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mt-1">
            {product.description?.slice(0, 60) || "Stylish and modern product"}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price}
          </span>
          {product.rating && (
            <span className="text-yellow-500 text-sm font-medium">
              ⭐ {product.rating}
            </span>
          )}
        </div>
      </div>

      {/* 🛍️ Buttons */}
      <div className="mt-4 mx-auto flex gap-2 text-center">
        <Link onClick={()=>handleAddToCart(product)} className="btn btn-sm py-2 flex-1 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            AddToCart
        </Link>

        <Link to={`/products/productDetails/${product.productId}`} className="btn btn-sm py-2 flex-1 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            View
        </Link>

        <Link onClick={()=>handleDeleteFromWishlist(product._id)} className="btn btn-sm py-2 flex-1 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            Delete
        </Link>

      </div>
    </div>
  );
}

export default WishlistCard
