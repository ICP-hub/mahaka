import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
    
      <div className="bg-card text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-700">Terms and Conditions</h1>
        </div>
      </div>

     
      <div className="container mx-auto px-10 py-8">
        
        <div className="mb-15">
          <h2 className="text-3xl font-semibold text-secondary mb-3">
            Welcome to Our Service
          </h2>
          <p className="text-gray-700 text-lg font-semibold">
            By accessing or using our platform, you agree to be bound by these
            terms and conditions. Please read them carefully before using our
            services.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-secondary mb-2">
            1. Use of the Platform
          </h3>
          <p className="text-gray-700 text-lg">
            You agree to use the platform for lawful purposes only and not to
            engage in any activity that may disrupt or harm the platform or
            other users.
          </p>
        </div>

      
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-secondary mb-2">
            2. Privacy Policy
          </h3>
          <p className="text-gray-700 text-lg">
            We value your privacy and handle your personal information
            responsibly. Please review our Privacy Policy for more details.
          </p>
        </div>

      
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-secondary mb-2">
            3. User Obligations
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>Provide accurate and up-to-date information.</li>
            <li>
              Refrain from uploading harmful or unauthorized content to the
              platform.
            </li>
            <li>Adhere to all applicable laws and regulations.</li>
          </ul>
        </div>

       
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-secondary mb-2">
            4. Changes to Terms
          </h3>
          <p className="text-gray-700 text-lg">
            We may update these terms from time to time. It is your
            responsibility to review this page periodically for any changes.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
