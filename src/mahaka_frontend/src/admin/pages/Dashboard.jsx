import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Required for chart.js

import { SiBitcoincash,SiPopos } from "react-icons/si";
import { PiCellSignalFullBold } from "react-icons/pi";
import { FcRating } from "react-icons/fc";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaMusic, FaFootballBall, FaFilm, FaTheaterMasks } from 'react-icons/fa';
import { TbBrandBooking } from "react-icons/tb";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaWallet, FaCommentDollar,FaMobileAlt, FaUniversity, FaCcMastercard ,FaDollarSign,FaSyncAlt,FaChartLine, FaUsersCog, FaCalendarAlt, FaChartPie,FaUsers} from 'react-icons/fa'; 


const DashboardAnalytics = () => {
  const RevenueReport = () => {
    // Sample data for graph earnings vs expense
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Earnings',
          data: [1200, 1500, 2000, 1800, 2200, 2500],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',  // Changed to orange
          borderColor: 'rgba(255, 159, 64, 1)',  // Orange border
          borderWidth: 2,
          borderRadius: 10,
          barPercentage: 0.5,
        },
        {
          label: 'Expenses',
          data: [800, 700, 1200, 900, 1100, 1300],
          backgroundColor: 'rgba(54, 162, 235, 1)',  // Cool blue
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          borderRadius: 10,
          barPercentage: 0.5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 20,
            padding: 15,
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        title: {
          display: true,
          text: 'Revenue Report',
          font: {
            size: 24,
            weight: 'bold',
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(200, 200, 200, 0.3)', // Light grid lines
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
    };

    return (
      <div className="max-w-full mx-3 p-6 bg-white rounded-lg shadow-md mb-6">
        {/* <h2 className="text-xl font-bold text-center mb-4">Revenue Report3</h2> */}
        <div className="h-64 md:h-96">
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

// Highest Earning Card component

const HighestEarningsCard = () => {
  return (
    <div className="relative p-4 bg-gradient-to-br from-orange-200 to- bg-orange-500 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      
      <div className="flex justify-between items-center">
       
        <div className="space-y-4">
          {/* Battery Icon and Title */}
          <div className="flex items-center space-x-4">
            <GrDocumentPerformance className="text-slate-800 text-6xl" />
            <h2 className="text-3xl font-extrabold text-slate-800">Earnings</h2>
          </div>

          
          <div className="text-5xl font-bold text-slate-800 flex items-center">
            <FaDollarSign className="mr-2" />
            3500
          </div>

        
          <div className="text-slate-800 font-bold text-3xl">
            70.8 % more earnings than last month
          </div>

          <div className="text-slate-600 font-semibold text-xl">
          The earnings for this month have shown a significant increase, reaching a total of $3500
          </div>
        </div>

        {/* Right Side: Large Circular Percentage */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
            <span className="text-5xl font-bold text-slate-800 m-3 px-3 py-3">95%</span>
          </div>
          <svg className="absolute top-0 left-0 w-28 h-28">
            <circle
              className="text-slate-800 p-3"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="56"
              cy="56"
            />
            <circle
              className="text-slate-400 "
              strokeWidth="6"
              strokeDasharray="250"
              strokeDashoffset="30"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="56"
              cy="56"
              
            />
          </svg>
        </div>
      </div>

      {/* Decorative Corner Icon */}
      <div className="absolute top-0 right-0 p-2 text-white bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2">
        {/* <FaBatteryFull /> */}
        <PiCellSignalFullBold />
      </div>
    </div>
  );
};





// Dash board cards component like profit bookings popular events

const DashboardCards = () => {
  return (
    
    
    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 md:h-30">
    
     
      {/* Bookings Card */}
      <div className="bg-blue-200 text-blue-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out">
        <div className="text-3xl mb-4">
          <TbBrandBooking />
        </div>
        <h3 className="text-2xl font-bold">Bookings</h3>
        <p className="text-lg mt-2 font-bold">3,500</p>
      </div>


      {/* Popular Events Card */}
      <div className="bg-yellow-200 text-yellow-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out">
        <div className="text-6xl mb-4">
          <SiPopos />
        </div>
        <h3 className="text-2xl font-bold">Popular Events</h3>
        <p className="text-lg mt-2 font-bold">25 Events</p>
      </div>

      {/* Profits Card */}
      <div className="bg-green-200 text-green-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out  ">
        <div className="text-6xl mb-4">
          <SiBitcoincash />
        </div>
        <h3 className="text-2xl font-bold">Profits</h3>
        <p className="text-lg mt-2 font-bold">$50,000</p>
      </div>

      {/* Visitors Card */}
      <div className="bg-red-200 text-red-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out  ">
        <div className="text-6xl mb-4">
          <FaUsers />
        </div>
        <h3 className="text-2xl font-bold">Visitors</h3>
        <p className="text-lg mt-2 font-bold">8,000</p>
      </div>
      {/* testing card 1
      <div className="bg-slate-200 text-blue-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out  ">
        <div className="text-3xl mb-4">
          <TbBrandBooking />
          <FcRating className="text-red-600 text-5xl" />
        </div>
        <h3 className="text-2xl font-bold">Ratings</h3>
        <p className="text-lg mt-2 font-bold">4.5k</p>
      </div> */}

      {/* testing card 2
      <div className="bg-pink-200 text-blue-900 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out  ">
        <div className="text-3xl mb-4">
          <TbBrandBooking className="text-5xl"/>
        </div>
        <h3 className="text-xl font-bold">New Events</h3>
        <p className="text-lg mt-2 font-bold">5</p>
      </div> */}
    </div>
  );
};


// transactions component
const TransactionCard = () => {
  const transactionData = [
    { id: 1, method: 'Wallet', icon: <FaWallet />, amount: '$200', date: 'Oct 1, 2024' },
    { id: 2, method: 'PhonePay', icon: <FaMobileAlt />, amount: '$150', date: 'Sep 28, 2024' },
    { id: 3, method: 'Bank Transfer', icon: <FaUniversity />, amount: '$1,000', date: 'Sep 26, 2024' },
    { id: 4, method: 'MasterCard', icon: <FaCcMastercard />, amount: '$500', date: 'Sep 24, 2024' },
  ];

  return (
    <div className="rounded-lg p-3 md:h-auto">
      <h2 className="text-3xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-1 bg-orange-200 p-2 ">
        
        {transactionData.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center bg-gray-50 shadow-md rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300"
          >
            <div className="text-blue-600 text-4xl mr-4">
              {transaction.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{transaction.method}</h3>
              <p className="text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// top events card component
const TopEventsCard = () => {
  const events = [
    { name: "Music Concert", icon: <FaMusic />, percentage: "75%" },
    { name: "Football Match", icon: <FaFootballBall />, percentage: "60%" },
    { name: "Movie Premiere", icon: <FaFilm />, percentage: "85%" },
    { name: "Theater Play", icon: <FaTheaterMasks />, percentage: "50%" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-96 h-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Top Events</h3>
      <ul>
        {events.map((event, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <div className="flex items-center">
              <span className="text-2xl text-gray-700 mr-4">{event.icon}</span>
              <span className="text-lg text-gray-800">{event.name}</span>
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {event.percentage}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
 

  return (
    <div className="container mx-auto p-6">
    
    <h1 className="text-3xl font-bold text-left mb-8 text-gray-800">Statistics</h1>
    <div className="grid grid-cols-1 p-3 md:grid-cols-3 shadow-sm gap-4">
    
      {/* Total Soles */}
      <div className="relative p-6 bg-slate-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <FaMoneyBillTrendUp className="text-blue-400 text-7xl" />
          <h2 className="text-xl font-bold ml-2 text-gray-800">Sales</h2>
        </div>
        <p className="text-5xl font-bold text-gray-900">97%</p>
        <div className="absolute top-0 right-0 p-2 text-white bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2">
          <FaChartLine />
        </div>
      </div>
  
      {/* Total Events */}
      {/* <div className="relative p-6 bg-slate-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-yellow-400 text-7xl" />
          <h2 className="text-xl font-bold ml-2 text-gray-800">Events</h2>
        </div>
        <p className="text-5xl font-bold text-gray-900">35</p>
        <div className="absolute top-0 right-0 p-2 text-white bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2">
          <FaChartPie />
        </div>
      </div> */}
  
      {/* Total Customers */}
      <div className="relative p-6 bg-slate-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <FaUsers className="text-green-400 text-7xl" />
          <h2 className="text-xl font-bold ml-2 text-gray-800">Customers</h2>
        </div>
        <p className="text-5xl font-bold text-gray-900">1.25k</p>
        <div className="absolute top-0 right-0 p-2 text-white bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2">
          <FaUsersCog />
        </div>
      </div>
  
      {/* Total Revenue */}
      <div className="relative p-6 bg-slate-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          {/* <FaMoneyBillAlt className="text-purple-600 text-7xl animate-bounce" /> */}
          <FaCommentDollar className="text-purple-400 text-7xl"/>
          <h2 className="text-xl font-bold ml-2 text-gray-800">Revenue</h2>
        </div>
        <p className="text-5xl font-bold text-gray-900">$250</p>
        <div className="absolute top-0 right-0 p-2 text-white bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2">
          <FaDollarSign />
        </div>
      </div>
  
      {/* Rating */}
      {/* <div className="relative p-6 bg-gradient-to-r from-red-400 to-red-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center mb-4">
          <FcRating className="text-red-600 text-7xl animate-bounce" />
          <h2 className="text-xl font-bold ml-2 text-gray-800">Ratings</h2>
        </div>
        <p className="text-5xl font-bold text-gray-900">*****</p>
        <div className="absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2">
          <FaSyncAlt />
        </div>
      </div> */}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mx-3">
     <RevenueReport/> 
     <HighestEarningsCard/>
     <DashboardCards/>
    
     <TransactionCard/>
     
     </div>
    
    
    
  </div>
 
  
  );
};

export default DashboardAnalytics;
