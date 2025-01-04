import React, { useEffect, useState } from "react";
import { MdSportsCricket } from "react-icons/md";
// import { FaFootballBall } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { LuSignalHigh } from "react-icons/lu";
import { BsFileBarGraph } from "react-icons/bs";
import { FaTicket } from "react-icons/fa6";
import { TfiPulse } from "react-icons/tfi";
import {
  FaMusic,
  FaFootballBall,
  FaFilm,
  FaTheaterMasks,
} from "react-icons/fa";
import {
  FaWallet,
  FaCommentDollar,
  FaMobileAlt,
  FaUniversity,
  FaCcMastercard,
  FaDollarSign,
  FaSyncAlt,
  FaChartLine,
  FaUsersCog,
  FaCalendarAlt,
  FaChartPie,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useAuth } from "../../connect/useClient";

const DashboardAnalytics = () => {
  const { backend, principal } = useAuth();
  const { user } = useSelector((state) => state.users);
  console.log("user", user);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const data = await backend.dashboardStats();
        setDashboardData(data);
        console.log("dashboard", data);
      } catch (error) {
        console.log("error while fetching data dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [backend]);

  // GoalCard component
  const GoalCard = () => {
    return (
      <div className="bg-card shadow-lg rounded-lg p-4 max-w-sm my-3 mx-2">
        <h2 className=" text-xl font-medium">Goal Overview</h2>
        <div className="relative flex items-center justify-center my-4">
          {/* <!-- Circular Progress Bar using SVG --> */}
          <svg className="w-32 h-32">
            <circle
              className="text-gray-300"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="48"
              cx="64"
              cy="64"
            />
            <circle
              className="text-green-400"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="48"
              cx="64"
              cy="64"
              strokeDasharray="301.44"
              strokeDashoffset="50.74"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-3xl font-semibold fill-gray-500"
            >
              83%
            </text>
          </svg>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center mt-10 mx-3">
            <hr className="border-gray-300 my-4" />
            <h3 className=" text-md font-semibold">Completed</h3>
            <p className="text-xl font-bold ">786,617</p>
          </div>
          <div className="text-center mt-10 mx-3">
            <hr className="border-gray-300 my-4" />
            <h3 className=" text-md font-semibold">In Progress</h3>
            <p className="text-xl font-bold ">13,561</p>
          </div>
        </div>
      </div>
    );
  };

  // transactions component
  const TransactionCard = () => {
    const transactionData = [
      {
        id: 1,
        method: "Wallet",
        icon: <FaWallet />,
        amount: "$200",
        date: "Oct 1, 2024",
      },
      {
        id: 2,
        method: "PhonePay",
        icon: <FaMobileAlt />,
        amount: "$150",
        date: "Sep 28, 2024",
      },
      {
        id: 3,
        method: "Bank Transfer",
        icon: <FaUniversity />,
        amount: "$1,000",
        date: "Sep 26, 2024",
      },
      {
        id: 4,
        method: "MasterCard",
        icon: <FaCcMastercard />,
        amount: "$500",
        date: "Sep 24, 2024",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:gid-cols-2">
        <div className="bg-card mx-3 my-2 p-3 shadow-lg rounded-lg">
          <h2 className="text-2xl mt-4 font-bold  mb-6 border-b pb-4">
            Transactions Overview
          </h2>

          <div className="space-y-2">
            {dashboardData?.latestTxs != 0 ? (
              dashboardData?.latestTxs?.map((transaction) => (
                <div
                  key={transaction?.transactionId}
                  className="flex   flex-col md:flex-row items-start md:items-center justify-between  bg-card transition rounded-lg p-2 shadow"
                >
                  <div className="flex  items-center space-x-4 mb-4 md:mb-0">
                    <div
                      className={`rounded-full p-2 flex items-center ${
                        transaction?.status === "Completed"
                          ? "bg-green-200 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {transaction.status === "Completed" ? "✔️" : "❌"}
                    </div>
                    <div>
                      <p className="text-lg font-semibold ">
                        {transaction?.status}
                      </p>
                      {/* <p className="text-sm text-gray-500 line-clamp-1">
                      Transaction ID: {transaction.transactionId}
                    </p> */}
                    </div>
                  </div>

                  <div className="flex-1 md:ml-6 ">
                    <p className="text-sm ">
                      Payment Method:{" "}
                      <span className="font-medium ">
                        {transaction?.paymentMethod}
                      </span>
                    </p>
                    <p className="text-sm ">
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(
                          Number(transaction?.createdAt / 1_000_000n)
                        ).toLocaleString()}
                      </span>
                    </p>
                    {/* <a
                      href={transaction?.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      View Payment Details
                    </a> */}
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: transaction?.currency,
                      }).format(transaction?.amount)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:gid-cols-2">
                <div className="bg-card mx-3 my-2 p-2 shadow-lg rounded-lg">
                  <h1 className="text-lg  text-left mb-3 mx-3 font-semibold">
                    No data available{" "}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  //cards
  const Cards = () => {
    return (
      <>
        {/*      <div className="grid grid-cols-1 md:grid-cols-2">
        
          <div className="bg-card mx-3 my-2 p-2 shadow-lg rounded-lg grid grid-cols-1">
            <div className="flex flex-col items-center">
              <p className="text-lg ">Bookings</p>
              <h4 className="text-4xl font-semibold">6,30k</h4>

              <div>
                <LuSignalHigh className="text-5xl text-orange-400 w-30 h-20" />
              </div>
            </div>
          </div>
          <div className="bg-card mx-3 my-2 p-2 shadow-lg rounded-lg grid grid-cols-1">
            <div className="flex flex-col items-center">
              <p className="text-lg ">Profits</p>
              <h4 className="text-4xl font-semibold">2,30k</h4>

              <div>
                <TfiPulse className="text-5xl text-yellow-500 w-30 h-20" />
              </div>
            </div>
          </div>
        </div> */}
        <TransactionCard />
        {/* special card earnings on top events card */}
        <div className="grid grid-cols-1 md:gid-cols-2">
          <div className="bg-card mx-3 my-2 p-2 shadow-lg rounded-lg">
            <h2 className="text-2xl mt-4 font-bold   mb-6 border-b pb-4">
              Earnings On Top Events
            </h2>
            {dashboardData?.top3Events != 0 ? (
              dashboardData?.top3Events?.map((data, index) => (
                <>
                  <div key={index} className="mx-2 my-4 mt-2">
                    <div className="  bg-card border border-green-300 px-2 py-2 rounded-lg">
                      <p className="text-xl font-semibold line-clamp-1">
                        ID : - {data[0]?.eventId}
                      </p>
                      <p className="text-green-500 font-semibold">
                        Revenue : - IDR {data[0]?.totalRevenue}
                      </p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <>
                <div className="grid grid-cols-1 md:gid-cols-2">
                  <div className="bg-card mx-3 my-2 p-2 shadow-lg rounded-lg">
                    <h1 className="text-lg  text-left mb-3 mx-3 font-semibold">
                      No data available{" "}
                    </h1>
                  </div>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-6 md:p-8 container mx-auto">
      {/* <!-- Card container --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <!-- Congratulations Card --> */}
        <div className="bg-card rounded-lg shadow-lg p-3 mx-2 my-2">
          <div className="flex items-center justify-between mb-4">
            <Greeting user={user ? user : principal?.toText()} />
            {/* <!-- Medal emogi --> */}
            <div>
              <span className="text-7xl">🏅</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            {loading ? (
              <span className="w-10 h-10 bg-gray-600 rounded-lg animate-pulse"></span>
            ) : (
              <h2 className="text-4xl font-bold ">
                IDR {dashboardData?.totalRevenue}
              </h2>
            )}
          </div>
          {/* <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
            View Sales
          </button> */}
        </div>

        {/* <!-- Statistics Card --> */}
        <div className="bg-card rounded-lg shadow-lg p-4 mx-2 my-2">
          <div className="flex justify-between items-center p-3">
            <h3 className="text-lg font-semibold ">Statistics</h3>
            {/* <p className="text-sm ">Updated 1 month ago</p> */}
          </div>
          <div className="flex justify-around">
            {/* <!-- Sales --> */}
            {/* <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-2 rounded-full mb-2">
                <BsFileBarGraph className="text-3xl text-purple-500" /> 
              </div>
              <h4 className="text-lg font-semibold">230k</h4>
              <p className="text-lg ">Sales</p>
            </div> */}
            {/* <!-- Customers --> */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <FaUsersCog className="text-3xl text-blue-500" />
              </div>
              {loading ? (
                <span className="w-6 h-6 bg-gray-600 rounded-lg animate-pulse"></span>
              ) : (
                <h4 className="text-lg font-semibold">
                  {Number(dashboardData?.totalUsers)}
                </h4>
              )}
              <p className="text-lg ">Customers</p>
            </div>
            {/* <!-- Products --> */}
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-2 rounded-full mb-2">
                <FaTicket className="text-3xl text-red-500" />
              </div>
              {loading ? (
                <span className="w-6 h-6 bg-gray-600 rounded-lg animate-pulse"></span>
              ) : (
                <h4 className="text-lg font-semibold">
                  {" "}
                  {Number(dashboardData?.totalTickets)}
                </h4>
              )}
              <p className="text-lg ">Tickets</p>
            </div>
            {/* <!-- Revenue --> */}
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-2 rounded-full mb-2">
                <FaDollarSign className="text-3xl text-green-500" />
              </div>
              {loading ? (
                <span className="w-6 h-6 bg-gray-600 rounded-lg animate-pulse"></span>
              ) : (
                <h4 className="text-lg font-semibold">
                  {" "}
                  IDR {dashboardData?.totalRevenue}
                </h4>
              )}

              <p className="text-lg ">Revenue</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Cards />
      </div>

      {/* support tracker card */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 max-width-auto mx-auto">
        <GoalCard />
        <div className="bg-card shadow-lg rounded-lg p-4 mx-2 text-center my-3">
          <h3 className=" text-2xl font-semibold mb-2 text-left">
            Support Tracker
          </h3>

          <div className="relative inline-block">
            <svg className="w-50 h-50">
              <circle
                cx="50%"
                cy="50%"
                r="65"
                fill="none"
                strokeWidth="12"
                strokeDasharray="7 7"
                stroke="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#F87171" />
                </linearGradient>
              </defs>
            </svg>
            {/*     
            <div className="absolute inset-1 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold ">83%</span>
              <p className=" text-sm">Completed Tickets</p>
            </div>
          </div>

          <div className="flex gap-4 px-2">
            <div>
              <p className=" text-sm">New Tickets</p>
              <h4 className="text-xl font-bold ">29</h4>
            </div>

            <div>
              <p className=" text-sm">Open Tickets</p>
              <h4 className="text-xl font-bold ">63</h4>
            </div>

            <div>
              <p className=" text-sm">Response Time</p>
              <h4 className="text-xl font-bold ">1d</h4>
            </div>
          </div>
        </div>
        <TransactionCard />
      </div> */}
    </div>
  );
};

const Greeting = ({ user }) => {
  const currentHour = new Date().getHours();

  const greetingMessage =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div>
      <h3 className="text-lg font-semibold line-clamp-1">Hii ! {user}</h3>
      <p className="text-md">{greetingMessage}</p>
    </div>
  );
};

export default DashboardAnalytics;
