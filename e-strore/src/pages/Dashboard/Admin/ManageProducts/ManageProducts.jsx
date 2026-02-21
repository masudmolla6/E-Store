import React, { useState } from "react";
import useAllProducts from "../../../../hooks/useAllProducts";
import ManageProductRow from "./ManageProductRow";
import { Package } from "lucide-react";

const ManageProducts = () => {
  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState("");

  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  // 📦 Fetch products (no filter/sort for admin)
  const {
    products,
    totalPages,
    isLoading,
    isError,
    error,
  } = useAllProducts(searchTerm, null, currentPage, limit);

  // ⏮️ ⏭️ Pagination handler
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

// ⏳ Loading state (Skeleton)
if (isLoading) {
  return (
    <div className="p-6 space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="skeleton h-6 w-48"></div>
        <div className="skeleton h-10 w-64"></div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th><div className="skeleton h-4 w-6"></div></th>
              <th><div className="skeleton h-4 w-12"></div></th>
              <th><div className="skeleton h-4 w-24"></div></th>
              <th><div className="skeleton h-4 w-16"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
              <th><div className="skeleton h-4 w-20"></div></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td><div className="skeleton h-4 w-6"></div></td>
                <td><div className="skeleton h-14 w-14"></div></td>
                <td><div className="skeleton h-4 w-32"></div></td>
                <td><div className="skeleton h-4 w-20"></div></td>
                <td><div className="skeleton h-4 w-24"></div></td>
                <td><div className="skeleton h-8 w-20"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


  // ❌ Error state
  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products: {error.message}
      </p>
    );
  }

  return (
    <div className="">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"> <Package size={18}/> Manage Products</h2>

        {/* 🔍 Search input (only feature required) */}
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          className="w-full md:w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30"
        />
      </div>

      {/* ===== Products Table ===== */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product, index) => (
                <ManageProductRow
                  key={product._id}
                  product={product}
                  index={(currentPage - 1) * limit + index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            className="px-5 py-2 rounded-lg border hover:bg-gray-500 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-5 py-2 rounded-lg border hover:bg-gray-500 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;