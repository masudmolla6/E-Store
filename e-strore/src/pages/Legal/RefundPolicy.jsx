import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-10 lg:px-20 py-10">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-10 space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Refund Policy
        </h1>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We want you to be completely satisfied with your purchase. If you are
          not satisfied, you may be eligible for a refund under the conditions
          outlined below.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            1. Eligibility for Refund
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You may request a refund if:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1 mt-2">
            <li>The product is damaged or defective</li>
            <li>You received the wrong item</li>
            <li>The product is significantly different from the description</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            2. Refund Timeframe
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Refund requests must be submitted within <span className="font-semibold">7 days</span> of receiving your order.
            Requests made after this period may not be accepted.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. Non-Refundable Items
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Certain items are not eligible for refunds:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1 mt-2">
            <li>Items that have been used or damaged by the user</li>
            <li>Digital/downloadable products</li>
            <li>Items purchased on final sale</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            4. Refund Process
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            To request a refund, please contact our support team with your order
            details. Once your request is approved, we will process your refund.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            5. Refund Method
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Refunds will be issued to the original payment method used during
            the purchase. Processing time may take 5–10 business days depending
            on your payment provider.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            6. Shipping Costs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Shipping costs are non-refundable unless the return is due to our
            error (e.g., wrong or defective item).
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We reserve the right to update or modify this Refund Policy at any
            time. Changes will be posted on this page with an updated date.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            If you have any questions regarding refunds, please contact us:
          </p>
          <p className="mt-2 text-indigo-600 font-medium">
            support@yourbrand.com
          </p>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;