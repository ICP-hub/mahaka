import React, { useEffect, useState } from "react";
import { useIdentityKit } from "@nfid/identitykit/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createActor } from "../../../../declarations/Fiatpayment/index";

const PaymentStatusUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { identity } = useIdentityKit();

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const canisterIDFiat = process.env.CANISTER_ID_FIATPAYMENT;

  const fullPath = location.pathname + location.hash;
  const match = fullPath.match(/\/([^/]+)\/([^/]+)\/([^/]+)/);

  console.log("ds", `"${match[1]}"`);
  console.log(match[2]);
  console.log("idm", match[3]);

  console.log("path", fullPath);
  const mockData = {
    paymentMethod: "stripe",
    invoiceNo: Number(match[3]),
    isSuccess: match[2] === "success" ? true : false,
  };
  const backendActor = createActor(canisterIDFiat, {
    agentOptions: { identity, verifyQuerySignatures: false },
  });
  console.log("daa", mockData);
  useEffect(() => {
    const updateInvoiceStatus = async () => {
      try {
        setLoading(true);

        const response = await backendActor.change_invoice_status({
          paymentMethod: mockData.paymentMethod,
          invoiceNo: mockData.invoiceNo,
          isSuccess: mockData.isSuccess,
        });

        if (response.status && response.body.success) {
          setPaymentStatus("success");
          setResponseMessage(
            `Transaction Successful! Invoice: ${response.body.success.invoiceNo}, Method: ${response.body.success.paymentMethod}`
          );
        } else {
          setPaymentStatus("failure");
          setResponseMessage(response.message || "Failed to update invoice.");
        }
      } catch (error) {
        console.error("Error updating invoice:", error);
        setPaymentStatus("failure");
        setResponseMessage("An error occurred while processing the payment.");
      } finally {
        setLoading(false);
      }
    };

    updateInvoiceStatus();
  }, []);

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
      {loading ? (
        <div className="text-lg font-semibold text-gray-700">
          Processing Payment...
        </div>
      ) : paymentStatus === "success" ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg">{responseMessage}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleNavigateHome}
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
          <p className="mt-4 text-lg">{responseMessage}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleNavigateHome}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusUpdate;
