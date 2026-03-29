import React from 'react'

const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <div className="flex justify-center">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col gap-2">
              
              {/* Image */}
              <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              
              {/* Title */}
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              
              {/* Price */}
              <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              
              {/* Button */}
              <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistSkeleton;