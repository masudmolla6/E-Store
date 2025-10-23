// ProductsCard.jsx
import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router";

const ProductsCard = ({ product }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 flex flex-col justify-between border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
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
      <div className="mt-4 flex gap-3 text-center">
        <Link className="flex-1 sm:text-sm py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> Add to Cart
        </Link>

        <Link to={`/products/productDetails/${product._id}`} className="flex-1 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
            <Eye size={16} /> View
        </Link>

      </div>
    </div>
  );
};

export default ProductsCard;
