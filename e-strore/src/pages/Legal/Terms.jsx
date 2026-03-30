import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-10 lg:px-20 py-10">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-10 space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Intro */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          By accessing and using our website, you agree to comply with and be
          bound by the following terms and conditions. Please read them
          carefully before using our services.
        </p>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            1. Use of Our Website
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You agree to use our website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use
            of the platform.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            2. Account Responsibility
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You are responsible for maintaining the confidentiality of your
            account and password. Any activity under your account is your
            responsibility.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. Orders & Payments
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            All orders are subject to availability and confirmation. We reserve
            the right to refuse or cancel any order at any time. Payments must
            be completed through our secure payment system.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            4. Pricing & Product Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We strive to ensure that all product descriptions and prices are
            accurate. However, errors may occur, and we reserve the right to
            correct them without prior notice.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            5. Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Using the website for illegal purposes</li>
            <li>Attempting to hack or disrupt the system</li>
            <li>Providing false or misleading information</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We are not liable for any indirect, incidental, or consequential
            damages arising from the use of our website or services.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            7. Changes to Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may update these Terms & Conditions at any time. Continued use of
            the website after changes means you accept the updated terms.
          </p>
        </div>

        {/* Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            8. Termination
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We reserve the right to suspend or terminate your access to our
            services at any time if you violate these terms.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            If you have any questions about these Terms & Conditions, please
            contact us:
          </p>
          <p className="mt-2 text-indigo-600 font-medium">
            support@yourbrand.com
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;