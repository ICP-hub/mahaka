import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../../connect/useClient";
import { idlFactory } from "../../connect/token-cicp-ladger";
import { useDispatch, useSelector } from "react-redux";
import { HttpAgent, Actor } from "@dfinity/agent";
import { useLocation, useNavigate } from "react-router-dom";

import { createActor } from "../../../../declarations/Fiatpayment/index";
import { useParams } from "react-router-dom";
import ModalOverlay from "../Components/Modal-overlay";
import { IoChevronBackCircleOutline, IoEyeOutline } from "react-icons/io5";
const coffeeAmount = 0.0001;
const CardCheckout = ({}) => {
  const [message, setMessage] = useState("Pay Now");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const fullPath = location.pathname + location.hash;
  const match = fullPath.match(/venues\/(.+?)\/primium\/payment2/);
  const eventId = match ? match[1] : null;
  console.log("hfgg", eventId);
  const [loading, setLoading] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const authenticatedAgent = useAgent();
  const { balance, wallet } = useAuth();
  // const { backend } = useSelector((state) => state.authentication);
  const [invoice, setInvoice] = useState(null);
  const { backend } = useAuth();
  const { id } = useParams();
  const canisterIDFiat = process.env.CANISTER_ID_FIATPAYMENT;
  const navigate = useNavigate();
  const eventIds = `${decodeURIComponent(eventId).replace(/_/g, "#")}${
    window.location.hash
  }`;
  console.log("id", eventIds);
  const { identity } = useIdentityKit();
  useEffect(() => {
    const backendActor1 = createActor(canisterIDFiat, {
      agentOptions: { identity, verifyQuerySignatures: false },
    });
    console.log("bb", backendActor1);
    const fetchInvoices = async () => {
      try {
        const data = await backendActor1.get_my_invoices();
        setInvoice(data);
        console.log("user ticket is ", data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, [balance, coffeeAmount, authenticatedAgent]);

  return (
    <>
      <div className="my-6 flex items-center gap-4 px-4 sm:px-8">
        <button
          className="px-2 py-1 bg-amber-500 rounded text-sm sm:text-lg text-white flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackCircleOutline className="w-5 h-5 sm:w-6 sm:h-6" />
          Back
        </button>
        <h1 className="text-lg sm:text-xl font-semibold">Invoices</h1>
      </div>
      <div className="my-10 px-4 sm:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 bg-[#1241767f] font-semibold px-2 py-3 text-sm sm:text-base border text-white border-[#124076] rounded-t">
          <div className="text-center">Invoice No</div>
          <div className="hidden sm:block text-center">Amount</div>
          <div className="hidden sm:block text-center">Currency</div>
          <div className="hidden sm:block text-center">Payment Method</div>
          <div className="text-center">Status</div>
          <div className="hidden sm:block text-center">Created At</div>
          <div className="text-center">Action</div>
        </div>
        {invoice?.map((data, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 sm:grid-cols-7 gap-2 items-center px-2 py-2 text-sm sm:text-base border ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div className="text-center">{Number(data?.id)}</div>
            <div className="hidden sm:block text-center">{data?.amount}</div>
            <div className="hidden sm:block text-center">{data?.currency}</div>
            <div className="hidden sm:block text-center">
              {data?.paymentMethod}
            </div>
            <div className="text-center">
              <span
                className={`py-1 px-2 rounded ${
                  data?.status === "Pending"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {data?.status}
              </span>
            </div>
            <div className="hidden sm:block text-center">
              {new Date(Number(data?.createdAt) / 1_000_000).toLocaleString()}
            </div>
            <div className="text-center flex justify-center gap-2">
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded"
                onClick={() => setIsModalOpen(index)}
              >
                <IoEyeOutline />
              </button>
              {isModalOpen === index && (
                <ModalOverlay
                  isOpen={true}
                  setIsOpen={() => setIsModalOpen(null)}
                  title="Invoice Detail"
                >
                  <Detail
                    onClose={() => setIsModalOpen(null)}
                    status={data?.status}
                    paymentMethod={data?.paymentMethod}
                    amount={data?.amount}
                    item={data?.items}
                    currency={data?.currency}
                  />
                </ModalOverlay>
              )}
              <a
                className="bg-orange-500 hover:bg-orange-700 text-white p-2 rounded"
                href={data?.paymentLink}
              >
                Pay Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardCheckout;

const Detail = ({ item, status, paymentMethod, amount, onClose, currency }) => {
  return (
    <div className="bg-transparent px-1 py-1">
      <div className="flex justify-between">
        <div className="px-2 py-2 bg-gray-100 rounded">
          Total Amount:{" "}
          <span className="text-emerald-500">
            {amount} {currency}
          </span>
        </div>
        <div className="px-2 py-2 bg-gray-100 rounded">
          Payment Method:{" "}
          <span className="text-green-400">{paymentMethod}</span>
        </div>
        <div className="px-2 py-2 bg-gray-100 rounded">
          Status:{" "}
          <span
            className={`${
              status === "Pending" ? "text-red-400" : "text-green-400"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <h1 className="text-xl font-semibold py-4">Items/ Number of visitors </h1>
      <div className="flex justify-between border font-semibold text-lg border-gray-200">
        <div className="px-2 py-2 rounded">Ticket Type</div>
        <div className="px-2 py-2 rounded">Price</div>
        <div className="px-2 py-2 rounded">Total</div>
      </div>

      {item?.map((data, index) => (
        <div
          key={index}
          className="flex justify-between border text-lg border-gray-200"
        >
          <div className="px-2 py-2 rounded">{data?.name}</div>
          <div className="px-2 py-2 rounded">{data?.price}</div>
          <div className="px-2 py-2 rounded">{data?.price}.00</div>
        </div>
      ))}
    </div>
  );
};
