import React, { useState } from "react";
import { useLocation } from "react-router";
import { useOutletContext } from "react-router";
import useAllProducts from "../../../hooks/useAllProducts";

const CategoryProducts = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // ✅ Get searchTerm & sortOption from parent layout
  const { searchTerm, sortOption } = useOutletContext();

  // 🧠 Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  // 🧩 Fetch data using your custom hook
  const {
    products,
    totalPages,
    isLoading,
    isError,
    error,
  } = useAllProducts(searchTerm, sortOption, currentPage, limit, category);

  // 🔁 Pagination logic
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 🌀 Loading & Error states
  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading products: {error.message}
      </p>
    );

  return (
    <div className="p-6">
      {/* 🏷️ Header */}
      <h1 className="text-2xl font-bold mb-6 text-center capitalize">
        {category ? `${category} Products` : "Category Products"}
      </h1>

      {/* 🛒 Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl h-48 w-full object-cover mb-3 hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ${product.price}
                </p>
              </div>
              <button className="mt-3 w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products found for this category.
        </p>
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-6 mb-16 sm:mb-16 md:mb-0 lg:mb-0">
        <button
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryProducts;
