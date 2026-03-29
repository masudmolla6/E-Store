import React from "react";

const PaymentHistorySkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Title */}
        <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4 mx-auto"></div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-800 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {["Date", "Transaction ID", "Amount", "Status"].map((_, i) => (
                  <th key={i} className="p-3 border-b">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, row) => (
                <tr key={row} className="border-b">
                  <td className="p-3">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
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

export default PaymentHistorySkeleton;