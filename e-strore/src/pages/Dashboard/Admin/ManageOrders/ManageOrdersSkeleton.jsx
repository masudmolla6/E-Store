import React from "react";

const ManageOrdersSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-60 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra w-full">

          {/* Table Head */}
          <thead>
            <tr>
              {Array.from({ length: 9 }).map((_, i) => (
                <th key={i}>
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: 9 }).map((_, col) => (
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

export default ManageOrdersSkeleton;