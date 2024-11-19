// import React, { useState, useEffect } from "react";
// import payimg from "../../assets/images/payment.png";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { idlFactory } from "../../redux/reducers/auth/token-icp-ledger";
// import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
// import { Actor } from "@dfinity/agent";
// // import { useAuth } from "../../redux/reducers/auth/authReducer";
// import { Principal } from "@dfinity/principal";

// const PaymentComponent = () => {
//   const authenticatedAgent = useAgent();
//   const { user, icpBalance } = useIdentityKit();
//   const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

//   const handlePayment = async () => {
//     if (!user) {
//       alert("Please login first");
//     }

//     // Create Actor for payment
//     const actor = Actor.createActor(idlFactory, {
//       agent: authenticatedAgent,
//       canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
//     });
//     console.log("object", actor, authenticatedAgent);
//     const acc = {
//       owner: Principal.fromText(process.env.CANISTER_ID_MAHAKA_BACKEND),
//       subaccount: [],
//     };

//     const icrc2_approve_args = {
//       from_subaccount: [],
//       spender: acc,
//       fee: [],
//       memo: [],
//       amount: BigInt(10000),
//       created_at_time: [],
//       expected_allowance: [],
//       expires_at: [],
//     };

//     try {
//       setIsPaymentProcessing(true);
//       const response = await actor.icrc2_approve(icrc2_approve_args);
//       console.log("Response from payment approve", response);

//       if (response.Ok) {
//         console.log("Payment approved! run further steps");
//       } else {
//         console.error("Payment failed");
//       }
//     } catch (err) {
//       console.error("Error in payment approve", err);
//     } finally {
//       setIsPaymentProcessing(false);
//     }

//     // const transferArgs = {
//     //   from_subaccount: [],
//     //   spender: {
//     //     owner: Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai"),
//     //     subaccount: [],
//     //   },
//     //   amount: BigInt(coffeeAmount * 10 ** 8 + 10000),
//     //   fee: [],
//     //   memo: [],
//     //   created_at_time: [],
//     //   expected_allowance: [],
//     //   expires_at: [],
//     // };
//     // console.log("Transfer Args:", transferArgs);
//     // try {
//     //   const response = await actor.icrc2_approve(transferArgs);
//     //   console.log("Response from icrc2_approve:", response);
//     //   if (response && response.Ok) {
//     //     setMessage(`Transferred ${coffeeAmount} ICP`);
//     //     setPaymentStatus("Payment successful");
//     //     await buyEventTicketHandler();
//     //   } else {
//     //     console.error("Unexpected response format or error:", response);
//     //     throw new Error(response?.Err || "Payment failed");
//     //   }
//     // } catch (error) {
//     //   setMessage("Payment failed");
//     //   setPaymentStatus("Payment failed");
//     //   console.error("Payment error:", error);
//     // } finally {
//     //   setLoading(false);
//     //   setProcessing(false);
//     //   setTimeout(() => setMessage("Make Payment"), 5000);
//     // }
//   };

//   // const buyEventTicketHandler = async () => {
//   //   try {
//   //     const ticketTypeVariant = { [ticketType]: null };
//   //     const record = [
//   //       {
//   //         data: new Uint8Array([1, 2, 3]),
//   //         description: "Ticket metadata",
//   //         key_val_data: [
//   //           { key: "eventName", val: { TextContent: "Amazing Concert" } },
//   //           { key: "date", val: { TextContent: "2024-12-31" } },
//   //         ],
//   //         purpose: { Rendered: null },
//   //       },
//   //     ];

//   //     const response = await backend.buyVenueTicket(
//   //       "current venue#br5f7-7uaaa-aaaaa-qaaca-cai",
//   //       { ticket_type: ticketTypeVariant, price: 1 },
//   //       record,
//   //       [
//   //         Principal.fromText(
//   //           "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe"
//   //         ),
//   //       ],
//   //       { ICP: null },
//   //       1
//   //     );

//   //     console.log("Event ticket purchased successfully:", response);
//   //     navigate("/ticket");
//   //   } catch (err) {
//   //     console.error("Error in buying event tickets:", err);
//   //   }
//   // };
//   return (
//     <div className="w-full bg-white m-auto">
//       <div className="max-w-7xl w-full  mx-auto   rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 md:gap-6">
//         <div className="order-2 md:order-1 bg-white p-16 ">
//           <h2 className="text-3xl font-black ">Payment</h2>
//           <hr className="my-3 text-[#ACACAC]" />
//           <div className="py-4">
//             <label className="block text-2xl font-black text-[#0A0D13]">
//               Pay With:
//             </label>
//             <div className="flex items-center mt-2">
//               <input
//                 type="radio"
//                 id="card"
//                 name="payment"
//                 className="mr-2"
//                 defaultChecked
//               />
//               <label htmlFor="card" className="mr-4 text-lg font-black ">
//                 Card
//               </label>
//               <input type="radio" id="icp" name="payment" className="mr-2" />
//               <label htmlFor="icp" className="text-lg font-normal">
//                 ICP Wallet
//               </label>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-black text-[#0A0D13]">
//               Card Number
//             </label>
//             <input
//               type="text"
//               className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC] rounded-md"
//               placeholder="1234 5678 9101 1121"
//             />
//           </div>
//           <div className="mb-4 grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-lg font-black text-[#0A0D13]">
//                 Expiration Date
//               </label>
//               <input
//                 type="text"
//                 className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
//                 placeholder="MM/YY"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-black text-[#0A0D13]">
//                 CVV
//               </label>
//               <input
//                 type="text"
//                 className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
//                 placeholder="***"
//               />
//             </div>
//           </div>
//           <div className="mb-5">
//             <input type="checkbox" id="saveCard" className="mr-2 " />
//             <label htmlFor="saveCard">Save card details</label>
//           </div>

//           <button
//             className="w-full bg-orange-500 text-white py-2 rounded-md"
//             type="submit"
//             disabled={isPaymentProcessing}
//             onClick={handlePayment}
//           >
//             {isPaymentProcessing ? "Processing.." : "Process Payment"}
//           </button>

//           <p className="text-[#ACACAC] text-base font-normal mt-5">
//             Lorem ipsum dolor sit amet consectetur. Malesuada sed senectus id
//             tincidunt amet scelerisque diamam velit blandit. Bibendum fusce sed
//             enim cursus sed in in. Quis malesuada mattis.
//           </p>
//         </div>
//         <div className="order-1 md:order-2 bg-[#F9FAFA] p-16">
//           <h2 className="text-3xl font-black ">Order Summary</h2>
//           <hr className="my-3 text-[#ACACAC]" />
//           <div className="flex items-center mb-8 mt-8 w-full ">
//             <img
//               src={payimg}
//               alt="Ticket"
//               className="w-12 h-12 object-cover rounded-md mr-4"
//             />
//             <div>
//               <h3 className="text-2xl font-black">Ticket Name</h3>
//               <p className="text-base font-normal text-[#ACACAC]">Premium</p>
//             </div>
//             <div className="ml-auto">
//               <p className="text-2xl font-black">Rp. 49.80</p>
//               <p className="text-base font-normal text-[#ACACAC]">Qty: 2</p>
//             </div>
//           </div>
//           <hr className="my-4 text-[#ACACAC]" />
//           <div className="flex justify-between ">
//             <span className="text-lg font-normal text-[#0A0D13]">Subtotal</span>
//             <span className="text-lg font-black text-[#0A0D13]">Rp. 49.80</span>
//           </div>
//           <hr className="my-4 text-[#ACACAC]" />
//           <div className="flex justify-between font-bold text-xl">
//             <span className="text-lg font-normal text-[#0A0D13]">Total</span>
//             <span className="text-3xl font-black text-[#0A0D13]">
//               Rp. 49.80
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentComponent;
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAgent } from "@nfid/identitykit/react";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../../connect/useClient";
import { Actor } from "@dfinity/agent";
import { idlFactory } from "../../connect/token-cicp-ladger";

const coffeeAmount = 0.0001;
const PaymentComponent = ({}) => {
  const [message, setMessage] = useState("Pay Now");
  const [loading, setLoading] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const authenticatedAgent = useAgent();
  const { balance, wallet, backend } = useAuth();

  useEffect(() => {
    if (balance < coffeeAmount / 100000000) {
      setInsufficientFunds(true);
    }
  }, [balance]);

  const handlePayment = async (e) => {
    setLoading(true);

    const actor = Actor.createActor(idlFactory, {
      agent: authenticatedAgent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    });

    const callerPrincipal = await authenticatedAgent.getPrincipal();
    const transferArgs = {
      from_subaccount: [],
      spender: {
        owner: Principal.fromText(process.env.CANISTER_ID_MAHAKA_BACKEND),
        subaccount: [],
      },
      amount: BigInt(coffeeAmount * 10 ** 8 + 10000),
      fee: [],
      memo: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: [],
    };

    // Check for self-approval
    if (callerPrincipal.toText() === transferArgs.spender.owner.toText()) {
      console.error("Self-approval is not allowed.");
      setPaymentStatus("Self-approval is not permitted.");
      setLoading(false);
      return;
    }

    try {
      const response = await actor.icrc2_approve(transferArgs);
      if (response.Ok) {
        setMessage(`Transferred ${coffeeAmount} ICP`);
        setPaymentStatus("Payment successful");
        handlecreate();
        toggleModal();
      } else {
        throw new Error(response.Err || "Payment failed");
      }
    } catch (error) {
      setMessage("Payment failed");
      setPaymentStatus(error.message || "Payment failed");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        e.target.disabled = false;
        setMessage("Make Payment");
      }, 5000);
    }
  };
  const handlePayment2 = async (e) => {
    setLoading(true);

    const _venueId = "test#b77ix-eeaaa-aaaaa-qaada-cai"; // Replace with actual venue ID
    const _eventId = "bcvbv#by6od-j4aaa-aaaaa-qaadq-cai"; // Replace with actual event ID
    const _ticket_type = { GroupPass: null }; // Replace with the selected ticket type
    const _metadata = [
      {
        data: new Uint8Array([0x12, 0x34]), // Replace with actual binary data
        description: "Sample ticket image",
        key_val_data: [
          { key: "exampleKey", val: { TextContent: "exampleValue" } }, // Replace with actual key-value data
        ],
        purpose: { Rendered: null },
      },
    ];
    const receiver = Principal.fromText(
      "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
    ); // Replace with actual receiver
    const numOfVisitors = BigInt(2); // Number of tickets to purchase
    const paymentType = { Card: null }; // Replace with the selected payment type

    try {
      const response = await backend.buyEventTicket(
        _venueId,
        _eventId,
        { ticket_type: _ticket_type, priceFiat: 0.0, price: BigInt(100_000) },
        _metadata,
        receiver,
        numOfVisitors,
        paymentType
      );

      if ("ok" in response) {
        setMessage("Ticket purchased successfully");
        setPaymentStatus("Purchase successful");
        console.log("Purchase response:", response.ok);
      } else {
        throw new Error(response.err || "Purchase failed");
      }
    } catch (error) {
      setMessage("Purchase failed");
      setPaymentStatus(error.message || "Purchase failed");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        e.target.disabled = false;
        setMessage("Buy Ticket");
      }, 5000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-96 mx-4 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment Details</h2>
        </div>
        <div className="mb-6 flex flex-col justify-center items-center"></div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Price: {coffeeAmount} ICP</p>
          <button
            className="border border-[#5442f6e7] text-black items-center flex font-semibold gap-1 px-2 py-2 rounded-md mt-4"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : message}
          </button>
          <button
            className="border border-[#5442f6e7] text-black items-center flex font-semibold gap-1 px-2 py-2 rounded-md mt-4"
            onClick={handlePayment2}
            disabled={loading}
          >
            card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
