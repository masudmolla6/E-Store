import React from "react";

const MyOrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 animate-pulse">
      
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-6">

        {/* Title */}
        <div className="flex justify-center">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="table w-full">

            {/* Head */}
            <thead>
              <tr>
                {Array.from({ length: 6 }).map((_, i) => (
                  <th key={i}>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {Array.from({ length: 6 }).map((_, row) => (
                <tr key={row}>

                  {/* # */}
                  <td>
                    <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>

                  {/* Product */}
                  <td className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>

                  {/* Transaction */}
                  <td>
                    <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>

                  {/* Total */}
                  <td>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                  </td>

                  {/* Status */}
                  <td>
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto"></div>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex gap-2 justify-center">
                      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default MyOrdersSkeleton;