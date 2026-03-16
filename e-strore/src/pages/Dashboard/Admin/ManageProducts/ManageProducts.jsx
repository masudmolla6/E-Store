import React, { useEffect, useState } from "react";
import useAllProducts from "../../../../hooks/useAllProducts";
import ManageProductRow from "./ManageProductRow";
import { Package, Search, Layers } from "lucide-react";
import AOS from "aos";

const ManageProducts = () => {

  useEffect(() => {
    AOS.refresh();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const {
    products,
    totalPages,
    isLoading,
    isError,
    error,
  } = useAllProducts(searchTerm, null, currentPage, limit);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-10 text-lg font-medium">
        Loading Products...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-8">

      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Package className="w-8 h-8 text-primary"/>
          Manage Products
        </h2>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e)=>{
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Products */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">

          <div className="bg-white/20 p-3 rounded-lg">
            <Package className="w-8 h-8"/>
          </div>

          <div>
            <p className="text-sm opacity-80">Total Products</p>
            <h3 className="text-2xl font-bold">{products?.length}</h3>
          </div>

        </div>

        {/* Categories */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">

          <div className="bg-white/20 p-3 rounded-lg">
            <Layers className="w-8 h-8"/>
          </div>

          <div>
            <p className="text-sm opacity-80">Categories</p>
            <h3 className="text-2xl font-bold">6</h3>
          </div>

        </div>

        {/* Current Page */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">

          <div className="bg-white/20 p-3 rounded-lg">
            <Package className="w-8 h-8"/>
          </div>

          <div>
            <p className="text-sm opacity-80">Current Page</p>
            <h3 className="text-2xl font-bold">{currentPage}</h3>
          </div>

        </div>

      </div>

      {/* ===== Products Table ===== */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">

        <table className="table w-full">

          <thead className="bg-base-200 text-sm">
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
                  No products found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-6">

          <button
            className="px-6 py-2 rounded-lg border hover:bg-base-200 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} / {totalPages}
          </span>

          <button
            className="px-6 py-2 rounded-lg border hover:bg-base-200 disabled:opacity-40"
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