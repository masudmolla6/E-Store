import React from "react";
import useMyPayments from "../../../../hooks/useMyPayments";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const [myPayments] = useMyPayments();
  const isLoading = !myPayments;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 w-full"
    >
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        {isLoading ? (
          <div className="flex justify-center py-10 text-gray-600 font-medium">
            Loading...
          </div>
        ) : myPayments.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No payment records found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Transaction ID</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {myPayments.map((payment, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 border-b">{payment.date}</td>
                    <td className="p-3 border-b">{payment.transactionId}</td>
                    <td className="p-3 border-b">${payment.amount}</td>
                    <td className="p-3 border-b font-medium text-green-600">{payment.status}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentHistory;