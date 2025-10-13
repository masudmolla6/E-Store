import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

const AllProducts = () => {
  const { searchTerm, sortOption } = useOutletContext(); // ✅ from parent layout
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 8; // ✅ number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/products?search=${searchTerm}&sort=${sortOption}&page=${currentPage}&limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, sortOption, currentPage]);

  // ✅ Handle page navigation
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      {/* ✅ Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
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
                  <p className="text-gray-500 dark:text-gray-400">${product.price}</p>
                </div>
                <button className="mt-3 w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      )}

      {/* ✅ Simple Pagination (Only Prev & Next) */}
      <div className="flex justify-center items-center mt-8 space-x-6">
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

export default AllProducts;
