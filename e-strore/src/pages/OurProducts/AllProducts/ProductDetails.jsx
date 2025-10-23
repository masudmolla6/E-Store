import React from "react";
import { useLoaderData } from "react-router";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductDetails = () => {
  const product = useLoaderData();

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-10 p-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <Star className="text-yellow-500 fill-yellow-400" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {product.ratings} / 5.0
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ৳{product.discountPrice}
              </span>
              <span className="text-gray-500 line-through">
                ৳{product.price}
              </span>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-3 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Available Options:
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, i) => (
                    <div
                      key={i}
                      className="border dark:border-gray-600 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      {variant.color} - {variant.size} ({variant.stock} left)
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <p
              className={`text-sm font-medium ${
                product.stock > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2">
              <Heart size={18} /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Product Details
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Subcategory:</strong> {product.subcategory}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
