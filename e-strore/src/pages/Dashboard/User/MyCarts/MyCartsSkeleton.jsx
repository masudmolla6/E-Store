import React from "react";

const MyCartsSkeleton = () => {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-6 space-y-8 animate-pulse">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>

      {/* Cart Items */}
      <div className="rounded-2xl shadow-md overflow-hidden border bg-white dark:bg-gray-900">

        {/* Table Head */}
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-gray-300 dark:bg-gray-700">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-20 bg-gray-400 dark:bg-gray-600 rounded"></div>
          ))}
        </div>

        {/* Items */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 p-4 md:px-6 border-b"
          >
            {/* Product */}
            <div className="col-span-3 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-60 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Price */}
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>

            {/* Quantity */}
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>

            {/* Action */}
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center border rounded-2xl shadow-md p-5 bg-white dark:bg-gray-900">
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-xl mt-3 sm:mt-0"></div>
      </div>

    </div>
  );
};

export default MyCartsSkeleton;