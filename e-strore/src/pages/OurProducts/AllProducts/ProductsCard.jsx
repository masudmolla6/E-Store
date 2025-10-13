// ProductsCard.jsx
import React from "react";

const ProductsCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ৳{product.discountPrice}
          </span>
          <span className="text-gray-500 line-through dark:text-gray-400">
            ৳{product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
