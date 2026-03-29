import React from "react";

const ManageProductsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="h-8 w-52 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-full md:w-80 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 rounded-xl bg-gray-300 dark:bg-gray-700 h-24"></div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i}>
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: 6 }).map((_, col) => (
                  <td key={col}>
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded my-2"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ManageProductsSkeleton;