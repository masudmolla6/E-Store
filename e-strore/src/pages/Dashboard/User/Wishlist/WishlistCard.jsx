import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import { ShoppingCart, Eye, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';
import useWishlist from '../../../../hooks/useWishlist';

const WishlistCard = ({ product }) => {
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
      axiosSecure.post("/carts", cartItem).then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${product.name} added successfully.`,
            showConfirmButton: false,
            timer: 1500,
          });
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

  const handleDeleteFromWishlist = (id) => {
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
        axiosSecure.delete(`/wishlist/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted from Wishlist.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div
      className="group relative rounded-2xl transition-all duration-300 p-3 flex flex-col justify-between hover:-translate-y-1 h-full"
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <Link
            to={`/products/productDetails/${product.productId}`}
            className="bg-white/90 text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-white transition text-sm"
          >
            <Eye size={16} /> View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-1">
            {product.description?.slice(0, 60) || "Stylish and modern product"}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price}
          </span>
          {product.rating && (
            <span className="text-xs font-medium text-amber-700 bg-amber-100/70 dark:bg-amber-900/40 dark:text-amber-300 px-2.5 py-1 rounded-full">
              ★ {product.rating}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 40px' }}>
        {/* Add to Cart */}
        <button
          onClick={() => handleAddToCart(product)}
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-white bg-gray-900/80 dark:bg-white/20 rounded-xl py-2.5 hover:bg-gray-900 dark:hover:bg-white/30 active:scale-95 transition-all backdrop-blur-sm"
        >
          <ShoppingCart size={13} /> Add to Cart
        </button>

        {/* View */}
        <Link
          to={`/products/productDetails/${product.productId}`}
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-800 dark:text-gray-100 bg-white/40 dark:bg-white/10 rounded-xl py-2.5 hover:bg-white/60 dark:hover:bg-white/20 active:scale-95 transition-all border border-white/30"
        >
          <Eye size={13} /> View
        </Link>

        {/* Delete */}
        <button
          onClick={() => handleDeleteFromWishlist(product._id)}
          title="Remove from wishlist"
          className="flex items-center justify-center rounded-xl py-2.5 text-red-500 bg-red-50/60 dark:bg-red-900/20 border border-red-200/40 dark:border-red-800/40 hover:bg-red-100/80 dark:hover:bg-red-900/40 active:scale-95 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;