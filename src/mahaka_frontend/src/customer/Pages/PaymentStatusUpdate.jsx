import React, { useEffect, useState } from "react";
import { useIdentityKit } from "@nfid/identitykit/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createActor } from "../../../../declarations/Fiatpayment/index";
import { useAuth } from "../../connect/useClient";

const PaymentStatusUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { identity } = useIdentityKit();

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState(null);

  const canisterIDFiat = process.env.CANISTER_ID_FIATPAYMENT;
  const { backend } = useAuth();
  const fullPath = location.pathname + location.hash;
  const match = fullPath.match(/\/([^/]+)\/([^/]+)\/([^/]+)/);

  const mockData = {
    paymentMethod: "stripe",
    invoiceNo: Number(match[3]),
    isSuccess: match[2] === "success",
  };

  useEffect(() => {
    const backendActor = createActor(canisterIDFiat, {
      agentOptions: { identity, verifyQuerySignatures: true },
    });

    const handlePaymentStatusUpdate = async () => {
      try {
        setLoading(true);

        const updateResponse = await backendActor.change_invoice_status({
          paymentMethod: mockData.paymentMethod,
          invoiceNo: mockData.invoiceNo,
          isSuccess: mockData.isSuccess,
        });

        if (!updateResponse.status || "err" in updateResponse.body) {
          setPaymentStatus("failure");
          setResponseMessage("Failed to update invoice status.");
          return;
        }

        const invoiceResponse = await backendActor.get_invoice(
          mockData.invoiceNo
        );

        if (!invoiceResponse.status || "err" in invoiceResponse.body) {
          setPaymentStatus("failure");
          setResponseMessage("Invoice not found or invalid.");
          return;
        }

        const invoice = invoiceResponse.body.success;
        setInvoiceDetail(invoice);
        console.log("invoice", invoiceResponse);
        const ticketMapping = {
          "Event Ticket": { Event: null },
          "Wahhana Ticket": { Wahana: null },
          "Venue Ticket": { Venue: null },
        };

        const matchedItem = invoice.items.find((item) =>
          Object.keys(ticketMapping).includes(item.name)
        );

        if (matchedItem) {
          const processResponse = await backend.processPendingPayment(
            mockData.invoiceNo,
            ticketMapping[matchedItem.name]
          );

          if ("ok" in processResponse) {
            setPaymentStatus("success");
            setResponseMessage(`${matchedItem.name} processed successfully.`);
          } else {
            setPaymentStatus("failure");
            setResponseMessage(
              processResponse.err || `Failed to process ${matchedItem.name}.`
            );
          }
        } else {
          setPaymentStatus("failure");
          setResponseMessage("Unsupported item in the invoice.");
        }
      } catch (error) {
        console.error("Error during payment update:", error);
        setPaymentStatus("failure");
        setResponseMessage("An error occurred while processing the payment.");
      } finally {
        setLoading(false);
      }
    };

    handlePaymentStatusUpdate();
  }, [canisterIDFiat, identity, mockData]);

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
