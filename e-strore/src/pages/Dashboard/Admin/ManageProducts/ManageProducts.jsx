import React, { useState } from 'react'
import useAllProducts from '../../../../hooks/useAllProducts'

const ManageProducts = () => {
  // Admin controls
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState('')

  const {
    products,
    totalPages,
    isLoading,
    refetch,
  } = useAllProducts(searchTerm, sortOption, currentPage, 10, category)

  const getStockBadge = (stock) => {
    if (stock === 0) return 'badge-error'
    if (stock <= 5) return 'badge-warning'
    return 'badge-success'
  }

  if (isLoading) {
    return <p className="p-6">Loading products...</p>
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Manage Products ({products.length})
        </h2>

        <button className="btn btn-primary btn-sm">
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="input input-bordered input-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />

        <select
          className="select select-bordered select-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>

        <select
          className="select select-bordered select-sm"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="">All Categories</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Headphone">Headphone</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>

                <td>{product.category}</td>
                <td>৳ {product.price}</td>

                <td>
                  <span className={`badge ${getStockBadge(product.stock)}`}>
                    {product.stock > 0 ? product.stock : 'Out'}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button className="btn btn-xs btn-outline btn-primary">
                    Edit
                  </button>
                  <button className="btn btn-xs btn-outline btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {/* Previous */}
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ◀ Prev
        </button>

        {/* Page Numbers (max 5 visible) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => {
            if (totalPages <= 5) return true
            if (page === 1 || page === totalPages) return true
            return Math.abs(page - currentPage) <= 1
          })
          .map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${
                currentPage === page ? 'btn-primary' : 'btn-outline'
              }`}
            >
              {page}
            </button>
          ))}

        {/* Next */}
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  )
}

export default ManageProducts
