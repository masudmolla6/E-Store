import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-10 lg:px-20 py-10">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-10 space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our website.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may collect personal information such as your name, email address,
            and payment details when you register, place an order, or interact
            with our services.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
            <li>To process your orders and payments</li>
            <li>To improve our website and services</li>
            <li>To communicate with you about updates and offers</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. Data Protection
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We use industry-standard security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            4. Third-Party Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may use trusted third-party services (such as payment gateways)
            that collect, use, and process your data according to their privacy
            policies.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            5. Cookies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We use cookies to enhance your browsing experience and analyze site
            traffic. You can disable cookies through your browser settings.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            6. Your Rights
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You have the right to access, update, or delete your personal
            information at any time by contacting us.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2 text-indigo-600 font-medium">
            support@yourbrand.com
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;