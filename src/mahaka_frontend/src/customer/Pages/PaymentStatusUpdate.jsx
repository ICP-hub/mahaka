import React, { useEffect, useState, useMemo } from "react";
import { useIdentityKit } from "@nfid/identitykit/react";
import { useLocation, useNavigate } from "react-router-dom";
import { createActor } from "../../../../declarations/Fiatpayment/index";
import { useAuth } from "../../connect/useClient";

const PaymentStatusUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { identity } = useIdentityKit();
  const [ticketType, setTicketType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const canisterIDFiat = process.env.CANISTER_ID_FIATPAYMENT;
  const { backend } = useAuth();
  const fullPath = location.pathname + location.hash;
  const match = fullPath.match(/\/([^/]+)\/([^/]+)\/([^/]+)/) || [];

  const mockData = useMemo(
    () => ({
      paymentMethod: "stripe",
      invoiceNo: Number(match[3]),
      isSuccess: match[2] === "success",
    }),
    [match]
  );

  const backendActor = useMemo(() => {
    if (!identity) return null;
    return createActor(canisterIDFiat, {
      agentOptions: { identity, verifyQuerySignatures: true },
    });
  }, [canisterIDFiat, identity]);

  useEffect(() => {
    if (!identity || !backendActor) return;

    const handlePaymentStatusUpdate = async () => {
      try {
        setLoading(true);

        const updateResponse = await backendActor.change_invoice_status({
          paymentMethod: mockData.paymentMethod,
          invoiceNo: mockData.invoiceNo,
          isSuccess: mockData.isSuccess,
        });
        setPaymentStatus("ok" in updateResponse ? "success" : "failure");
        setResponseMessage(
          "ok" in updateResponse
            ? "Payment processed successfully."
            : updateResponse?.message || "Unknown error."
        );

        // Fetch invoice details
        const invoiceResponse = await backendActor.get_invoice(
          mockData.invoiceNo
        );

        const itemName = invoiceResponse?.body?.success?.items[0]?.name;

        // Determine ticket type based on item name
        const type = itemName?.includes("Venue")
          ? "Venue"
          : itemName?.includes("Event")
          ? "Event"
          : itemName?.includes("Wahana")
          ? "Wahana"
          : null;

        setTicketType(type);

        if (type) {
          const ticketPayload = { [type]: null };

          // Process payment based on ticket type
          const processResponse = await backend.processPendingPayment(
            mockData.invoiceNo,
            ticketPayload
          );

          if (!("ok" in processResponse)) {
            setPaymentStatus("failure");
            setResponseMessage(processResponse?.err || "Processing failed.");
          }
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
  }, [identity, backendActor, mockData, backend]);

  const handleNavigateHome = () => navigate("/");

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
