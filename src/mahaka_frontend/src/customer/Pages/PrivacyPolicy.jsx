import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-w-0 flex-auto flex-col">
      {/* Header Section */}
      <div className="">
        <div className="container mx-auto flex flex-0 flex-col p-6 dark:bg-transparent sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-8 font-medium">
          {/* Title and Subtitle */}
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-semibold text-secondary text-gray-800 dark:text-gray-200">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how we collect, use, and safeguard your information.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="container mx-auto p-6 dark:bg-transparent sm:p-10      dark:bg-gray-900  ">
        <p className="text-gray-700 dark:text-gray-300 mb-6 ">
          <strong className="text-secondary">Effective Date:</strong> [Insert
          Date]
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Welcome to [Your Website/Organization Name] ("we," "our," or "us"). We
          are committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, and safeguard your personal information when you
          interact with us, including on our website, mobile applications, and
          other services.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-secondary text-gray-800 dark:text-gray-200">
          1. Information We Collect
        </h2>
        <p className="text-gray-700  dark:text-gray-300 mb-4">
          We may collect and process the following types of information:
        </p>

        <h3 className="text-xl font-medium mb-2 text-secondary text-gray-800 dark:text-gray-200">
          a. Personal Information
        </h3>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and shipping address</li>
          <li>Payment information</li>
        </ul>

        <h3 className="text-xl font-medium mb-2 text-secondary text-gray-800 dark:text-gray-200">
          b. Non-Personal Information
        </h3>
        <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Device information</li>
          <li>Browsing behavior (via cookies and similar technologies)</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-secondary text-gray-800 dark:text-gray-200">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Your information may be used for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li>To provide and manage our services</li>
          <li>To process payments and deliver products or services</li>
          <li>To improve and personalize your experience</li>
          <li>
            To communicate updates, offers, or promotional material (with your
            consent)
          </li>
          <li>To comply with legal obligations</li>
        </ul>

        {/* Continue the privacy policy as needed */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
