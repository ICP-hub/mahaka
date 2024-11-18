import React, { useState, useEffect } from "react";
import payimg from "../../assets/images/payment.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { idlFactory } from "../../redux/reducers/auth/token-icp-ledger";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { Actor } from "@dfinity/agent";
import { useAuth } from "../../redux/reducers/auth/authReducer";
import { Principal } from "@dfinity/principal";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const coffeeAmount = 0.0001;
  const [ticketType, setTicketType] = useState("SinglePass");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("Pay Now");
  const [loading, setLoading] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const authenticatedAgent = useAgent();
  const { balance, wallet, backend } = useAuth();
  const [actor, setActor] = useState(null);
  console.log("agent", authenticatedAgent);
  // Initialize the actor when the component mounts
  useEffect(() => {
    if (balance < coffeeAmount / 100000000) {
      setInsufficientFunds(true);
    }

    if (authenticatedAgent) {
      const newActor = Actor.createActor(idlFactory, {
        agent: authenticatedAgent,
        canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
      });
      setActor(newActor);
    }
  }, [balance, authenticatedAgent]);

  const handlePayment = async (e) => {
    console.log("Actor:", actor);
    console.log("Agent:", authenticatedAgent);

    if (processing || !actor) return;
    setLoading(true);
    setProcessing(true);

    const transferArgs = {
      from_subaccount: [],
      spender: {
        owner: Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai"),
        subaccount: [],
      },
      amount: BigInt(coffeeAmount * 10 ** 8 + 10000),
      fee: [],
      memo: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: [],
    };
    console.log("Transfer Args:", transferArgs);

    try {
      const response = await actor.icrc2_approve(transferArgs);
      console.log("Response from icrc2_approve:", response);

      if (response && response.Ok) {
        setMessage(`Transferred ${coffeeAmount} ICP`);
        setPaymentStatus("Payment successful");
        await buyEventTicketHandler();
      } else {
        console.error("Unexpected response format or error:", response);
        throw new Error(response?.Err || "Payment failed");
      }
    } catch (error) {
      setMessage("Payment failed");
      setPaymentStatus("Payment failed");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
      setProcessing(false);
      setTimeout(() => setMessage("Make Payment"), 5000);
    }
  };

  const buyEventTicketHandler = async () => {
    try {
      const ticketTypeVariant = { [ticketType]: null };
      const record = [
        {
          data: new Uint8Array([1, 2, 3]),
          description: "Ticket metadata",
          key_val_data: [
            { key: "eventName", val: { TextContent: "Amazing Concert" } },
            { key: "date", val: { TextContent: "2024-12-31" } },
          ],
          purpose: { Rendered: null },
        },
      ];

      const response = await backend.buyVenueTicket(
        "current venue#br5f7-7uaaa-aaaaa-qaaca-cai",
        { ticket_type: ticketTypeVariant, price: 1 },
        record,
        [
          Principal.fromText(
            "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe"
          ),
        ],
        { ICP: null },
        1
      );

      console.log("Event ticket purchased successfully:", response);
      navigate("/ticket");
    } catch (err) {
      console.error("Error in buying event tickets:", err);
    }
  };
  return (
    <div className="w-full max-h-screen bg-white m-auto">
      <div className="max-w-7xl w-full  mx-auto   rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <div className="order-2 md:order-1 bg-white p-16 ">
          <h2 className="text-3xl font-black ">Payment</h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="py-4">
            <label className="block text-2xl font-black text-[#0A0D13]">
              Pay With:
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="card"
                name="payment"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="card" className="mr-4 text-lg font-black ">
                Card
              </label>
              <input type="radio" id="icp" name="payment" className="mr-2" />
              <label htmlFor="icp" className="text-lg font-normal">
                ICP Wallet
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-black text-[#0A0D13]">
              Card Number
            </label>
            <input
              type="text"
              className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC] rounded-md"
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-black text-[#0A0D13]">
                Expiration Date
              </label>
              <input
                type="text"
                className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-lg font-black text-[#0A0D13]">
                CVV
              </label>
              <input
                type="text"
                className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
                placeholder="***"
              />
            </div>
          </div>
          <div className="mb-5">
            <input type="checkbox" id="saveCard" className="mr-2 " />
            <label htmlFor="saveCard">Save card details</label>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-2 rounded-md"
            type="submit"
            disabled={processing}
            onClick={handlePayment}
          >
            {" "}
            {processing ? "Processing.." : "Process Payment"}
          </button>

          <p className="text-[#ACACAC] text-base font-normal mt-5">
            Lorem ipsum dolor sit amet consectetur. Malesuada sed senectus id
            tincidunt amet scelerisque diamam velit blandit. Bibendum fusce sed
            enim cursus sed in in. Quis malesuada mattis.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-[#F9FAFA] p-16">
          <h2 className="text-3xl font-black ">Order Summary</h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="flex items-center mb-8 mt-8 w-full ">
            <img
              src={payimg}
              alt="Ticket"
              className="w-12 h-12 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-2xl font-black">Ticket Name</h3>
              <p className="text-base font-normal text-[#ACACAC]">Premium</p>
            </div>
            <div className="ml-auto">
              <p className="text-2xl font-black">Rp. 49.80</p>
              <p className="text-base font-normal text-[#ACACAC]">Qty: 2</p>
            </div>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between ">
            <span className="text-lg font-normal text-[#0A0D13]">Subtotal</span>
            <span className="text-lg font-black text-[#0A0D13]">Rp. 49.80</span>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between font-bold text-xl">
            <span className="text-lg font-normal text-[#0A0D13]">Total</span>
            <span className="text-3xl font-black text-[#0A0D13]">
              Rp. 49.80
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
