import React from "react";

const ProductsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
    </div>
  );
};

export default ProductsSkeleton;