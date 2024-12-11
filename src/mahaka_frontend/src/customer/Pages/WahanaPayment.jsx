import React, { useState, useEffect } from "react";
import payimg from "../../assets/images/payment.png";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { idlFactory } from "../../connect/token-cicp-ladger";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { Actor } from "@dfinity/agent";
// import { useAuth } from "../../redux/reducers/auth/authReducer";
import { Principal } from "@dfinity/principal";
import DatePicker from "../../common/DatePicker";
import VisitorPicker from "../Components/single-event/VisitorPicker";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../connect/useClient";
import { HttpAgent } from "@dfinity/agent";
import notificationManager from "../../common/utils/notificationManager";

const WahanaPayment = () => {
  const authenticatedAgent = useAgent();
  const { user, icpBalance } = useIdentityKit();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [wahanadetail, setwahanadetail] = useState(null);
  const location = useLocation();
  const { ids, eventId } = useParams();
  const vanueid = `${decodeURIComponent(ids).replace(/_/g, "#")}${
    window.location.hash
  }`;
  const wahanaid = `${decodeURIComponent(eventId).replace(/_/g, "#")}${
    window.location.hash
  }`;
  const ticketType = "SINGLE";
  const [timestemp, setTimeStemp] = useState(0);

  const [numberOFVisitor, setNumberOFVisitor] = useState(1);
  const [paymenttype, setPaymentType] = useState("Card");
  const [loading, setLoading] = useState(false);
  const [loadingdata, setLoadingData] = useState(false);
  const navigate = useNavigate();

  const { backend, principal } = useAuth();
  // const { backend } = useSelector((state) => state.authentication);
  const { identity } = useIdentityKit();
  const ICP_API_HOST = "https://icp-api.io/";
  const [unauthenticatedAgent, setUnauthenticatedAgent] = useState(null);
  const [ticketprice, setTicketPrice] = useState(0);
  const [ticketSold, setTicketSold] = useState(0);

  useEffect(() => {
    (async () => {
      const agent = new HttpAgent({ host: ICP_API_HOST });
      setUnauthenticatedAgent(agent);
    })();
  }, []);

  useEffect(() => {
    const fetchVenue = async () => {
      setLoadingData(true);
      try {
        const data1 = await backend.getWahana(wahanaid, vanueid);
        const ticketResponse = await backend.getTicketsCountByType(
          { Wahana: null },
          wahanaid,
          { SinglePass: null }
        );
        if (ticketResponse.ok) {
          setTicketSold(ticketResponse?.ok);
        } else {
          console.error("Error fetching tickets:", ticketResponse);
        }
        setwahanadetail(data1);
        if (paymenttype == "Card") {
          setTicketPrice(data1?.ok?.price);
        }
        console.log("wahana", data1);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchVenue();
  }, [backend, ticketType]);

  const handlePayment = async (e) => {
    if (principal == undefined) {
      notificationManager.error("Please connect your wallet");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const coffeeAmount = 0.0001;

    if (!unauthenticatedAgent) {
      console.error("Agent not initialized");
      return;
    }

    const actor = Actor.createActor(idlFactory, {
      agent: unauthenticatedAgent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    });

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

    try {
      console.log("transferArgs:", transferArgs);
      const response = await actor.icrc2_approve(transferArgs);
      console.log("res of icp payment", response);

      if (response.Ok) {
        console.log("Payment successful:", response.Ok);
      } else {
        throw new Error(response.Err || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
      e.target.disabled = false;
    }
  };
  const handlePayment2 = async (e) => {
    if (!principal) {
      notificationManager.error("Please connect your wallet");
      return;
    }
    if (!timestemp) {
      notificationManager.error("Please fill all details");
      return;
    }

    setLoading(true);
    setIsPaymentProcessing(true);

    const _venueId = vanueid;
    const receiver = principal;
    const numOfVisitors = BigInt(numberOFVisitor);
    const paymentType = { Card: null };
    const timestamp = BigInt(timestemp);

    console.log("Backend service instance:", backend);

    try {
      const response = await backend.buyWahanaToken(
        _venueId,
        wahanaid,
        receiver,
        timestamp,
        numOfVisitors,
        paymentType
      );

      console.log("Response from backend:", response);

      if ("ok" in response) {
        const { status, body } = response.ok;
        if (status && "success" in body) {
          console.log("Purchase successful:", body.success);
          navigate(`/payment/checkout`);
        } else if ("err" in body) {
          throw new Error("Purchase failed: " + body.err.message);
        }
      } else {
        throw new Error(
          response.err || "Unknown error occurred during purchase"
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      notificationManager.error(
        error.message || "An error occurred while processing the payment."
      );
    } finally {
      setLoading(false);
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="w-full bg-white m-auto">
      <div className="max-w-7xl w-full  mx-auto   rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <div className="order-1 md:order-1 bg-white p-16 ">
          <h2 className="text-3xl font-black ">Ticket Details </h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="mb-5">
            {loadingdata ? (
              <p className="text-xl font-semibold">
                wahana id:-{" "}
                <span className="px-20 rounded-lg py-[2px] animate-spin bg-gray-200"></span>
              </p>
            ) : (
              <p className="text-xl font-semibold">wahana id:-{wahanaid}</p>
            )}
            {loadingdata ? (
              <p className="text-xl text-green-400 font-semibold mt-2">
                Number of Tickets Left: :{" "}
                <span className="px-6 rounded-lg  py-[2px] animate-spin bg-gray-200"></span>
              </p>
            ) : (
              <p className="text-xl text-green-400 font-semibold">
                Number of Tickets Left:{" "}
                {Number(wahanadetail?.ok?.totalTickets) - Number(ticketSold)}
              </p>
            )}
          </div>
          <div className="py-4 space-y-12 ">
            <DatePicker timestemp={timestemp} setTimeStemp={setTimeStemp} />
            <VisitorPicker
              max={Number(wahanadetail?.ok?.totalTickets) - Number(ticketSold)}
              numberOFVisitor={numberOFVisitor}
              setNumberOFVisitor={setNumberOFVisitor}
            />
          </div>
          {/* <div className="mb-5">
            <input type="checkbox" id="saveCard" className="mr-2 " />
            <label htmlFor="saveCard">Save card details</label>
          </div>

          <p className="text-[#ACACAC] text-base font-normal mt-5">
            Lorem ipsum dolor sit amet consectetur. Malesuada sed senectus id
            tincidunt amet scelerisque diamam velit blandit. Bibendum fusce sed
            enim cursus sed in in. Quis malesuada mattis.
          </p> */}
        </div>
        <div className="order-2 md:order-2 bg-[#F9FAFA] p-16">
          <h2 className="text-3xl font-black ">Order Summary</h2>
          <hr className="my-3 text-[#ACACAC]" />
          <div className="flex items-center mb-8 mt-8 w-full ">
            <img
              src={loadingdata ? payimg : wahanadetail?.ok?.banner?.data}
              alt="Ticket"
              className="w-12 h-12 object-cover rounded-md mr-4"
            />
            <div>
              {loadingdata ? (
                <span className="px-4 rounded-lg  py-[2px] animate-spin bg-gray-200"></span>
              ) : (
                <h3 className="text-2xl font-black">
                  {wahanadetail?.ok.ride_title}
                </h3>
              )}

              <p className="text-base font-normal text-[#ACACAC]">
                {ticketType}
              </p>
            </div>
            <div className="ml-auto">
              <p className="text-2xl font-black">
                Rp.{" "}
                {loadingdata ? (
                  <span className="px-4 rounded-lg  py-[2px] animate-spin bg-gray-200"></span>
                ) : (
                  Number(ticketprice)
                )}
              </p>
              <p className="text-base font-normal text-[#ACACAC]">
                Qty: {numberOFVisitor}
              </p>
            </div>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between ">
            <span className="text-lg font-normal text-[#0A0D13]">Subtotal</span>
            <span className="text-lg font-black text-[#0A0D13]">
              Rp.{" "}
              {loadingdata ? (
                <span className="px-4 rounded-lg  py-[2px] animate-spin bg-gray-200"></span>
              ) : (
                Number(ticketprice) * numberOFVisitor
              )}
            </span>
          </div>
          <hr className="my-4 text-[#ACACAC]" />
          <div className="flex justify-between font-bold text-xl">
            <span className="text-lg font-normal text-[#0A0D13]">Total</span>
            <span className="text-3xl font-black text-[#0A0D13]">
              Rp.{" "}
              {loadingdata ? (
                <span className="px-4 rounded-lg  py-[2px] animate-spin bg-gray-200"></span>
              ) : (
                Number(ticketprice) * numberOFVisitor
              )}
            </span>
          </div>
          <div className="py-4">
            <label className="block text-2xl font-black text-[#0A0D13] mb-2">
              Pay With:
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="card"
                className="flex items-center text-lg font-black cursor-pointer"
              >
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  className="mr-2"
                  value="Card"
                  checked={paymenttype === "Card"}
                  onChange={() => setPaymentType("Card")}
                />
                Card
              </label>
            </div>
          </div>

          <button
            className={`w-full py-2 rounded-md text-white ${
              isPaymentProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            type="submit"
            disabled={
              isPaymentProcessing ||
              Number(wahanadetail?.ok?.totalTickets) - Number(ticketSold) == 0
            }
            onClick={paymenttype === "Card" ? handlePayment2 : handlePayment}
          >
            {isPaymentProcessing
              ? "Processing..."
              : `Process Payment with ${paymenttype}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WahanaPayment;
// import React from 'react';
// import payimg from  '../../assets/images/payment.png'
// import{useSelector} from "react-redux"
// import {useState} from "react"
// import { useNavigate } from 'react-router-dom';

// const WahanaPayment = () => {
//   const navigate = useNavigate();
//   const { backend } = useSelector((state) => state.authentication);
//   // console.log("backend events are",events)
//   const [ticketType, setTicketType] = useState("SinglePass");
//   const [price, setPrice] = useState(100);
//   const [processing, setProcessing] = useState(false)

//   const buyEventTicketHandler = async () => {
//     if(processing){
//       return
//     }
//     setProcessing(true)

//     try {
//       const venueId = "dasara#br5f7-7uaaa-aaaaa-qaaca-cai";
//       const eventId = "dasara event#b77ix-eeaaa-aaaaa-qaada-cai";
//       const ticketTypeVariant = { [ticketType]: null };
//       const record = [
//         {
//           data: new Uint8Array([1, 2, 3]),
//           description: "Ticket metadata",
//           key_val_data: [
//             {
//               key: "eventName",
//               val: { TextContent: "Amazing Concert" }
//             },
//             {
//               key: "date",
//               val: { TextContent: "2024-12-31" }
//             }
//           ],
//           purpose: { Rendered: null }
//         }
//       ];

//       const response = await backend.buyEventTicket(
//         venueId,
//         eventId,
//         { ticket_type: ticketTypeVariant, price: price },
//         record
//       );

//       console.log("Event ticket purchased successfully:", response);
//           } catch (err) {
//             console.error("Error in buying event tickets:", err);
//           }finally {
//             setProcessing(false);  // Allow new event creation after process is done
//           }
//           navigate("/ticket")
//         };
//   return (
//     <div className="w-full max-h-screen bg-white m-auto">
//       <div className="max-w-7xl w-full  mx-auto   rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 md:gap-6">
//         <div className="order-2 md:order-1 bg-white p-16 ">
//           <h2 className="text-3xl font-black ">Payment</h2>
//           <hr className="my-3 text-[#ACACAC]" />
//           <div className="py-4">
//             <label className="block text-2xl font-black text-[#0A0D13]">Pay With:</label>
//             <div className="flex items-center mt-2">
//               <input type="radio" id="card" name="payment" className="mr-2" defaultChecked />
//               <label htmlFor="card" className="mr-4 text-lg font-black ">Card</label>
//               <input type="radio" id="icp" name="payment" className="mr-2" />
//               <label htmlFor="icp" className='text-lg font-normal'>ICP Wallet</label>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-lg font-black text-[#0A0D13]">Card Number</label>
//             <input
//               type="text"
//               className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC] rounded-md"
//               placeholder="1234 5678 9101 1121"
//             />
//           </div>
//           <div className="mb-4 grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-lg font-black text-[#0A0D13]">Expiration Date</label>
//               <input
//                 type="text"
//                 className="mt-2 w-full p-2 border-[1.5px] border-[#ACACAC]  rounded-md"
//                 placeholder="MM/YY"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-black text-[#0A0D13]">CVV</label>
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

//           <button className="w-full bg-orange-500 text-white py-2 rounded-md" type = "submit" disabled={processing} onClick={buyEventTicketHandler}> {processing?"Processing..":"Process Payment"}</button>

//           <p className="text-[#ACACAC] text-base font-normal mt-5">
//             Lorem ipsum dolor sit amet consectetur. Malesuada sed senectus id tincidunt amet scelerisque
//             diamam velit blandit. Bibendum fusce sed enim cursus sed in in. Quis malesuada mattis.
//           </p>
//         </div>
//         <div className="order-1 md:order-2 bg-[#F9FAFA] p-16">
//           <h2 className="text-3xl font-black ">Order Summary</h2>
//           <hr className="my-3 text-[#ACACAC]" />
//           <div className="flex items-center mb-8 mt-8 w-full ">
//             <img src={payimg} alt="Ticket" className="w-12 h-12 object-cover rounded-md mr-4" />
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
//             <span className='text-lg font-normal text-[#0A0D13]'>Total</span>
//             <span className='text-3xl font-black text-[#0A0D13]'>Rp. 49.80</span>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default WahanaPayment;
