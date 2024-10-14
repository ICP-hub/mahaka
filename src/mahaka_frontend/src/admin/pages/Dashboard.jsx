import React from 'react';

import { MdSportsCricket } from "react-icons/md";
// import { FaFootballBall } from "react-icons/fa";
import { GiMusicalScore } from "react-icons/gi";
import { LuSignalHigh } from "react-icons/lu";

import { BsFileBarGraph } from "react-icons/bs";
import { FaTicket } from "react-icons/fa6";

import { TfiPulse } from "react-icons/tfi";
import { FaMusic, FaFootballBall, FaFilm, FaTheaterMasks } from 'react-icons/fa';



import { FaWallet, FaCommentDollar,FaMobileAlt, FaUniversity, FaCcMastercard ,FaDollarSign,FaSyncAlt,FaChartLine, FaUsersCog, FaCalendarAlt, FaChartPie,FaUsers} from 'react-icons/fa'; 


const DashboardAnalytics = () => {
  

    

// GoalCard component

const GoalCard = () => {
  return (
    <div class="bg-white shadow-lg rounded-lg p-4 max-w-sm my-3 mx-2">
    <h2 class="text-gray-500 text-xl font-medium">Goal Overview</h2>
    <div class="relative flex items-center justify-center my-4">
      {/* <!-- Circular Progress Bar using SVG --> */}
      <svg class="w-32 h-32">
        <circle class="text-gray-300" stroke-width="8" stroke="currentColor" fill="transparent" r="48" cx="64" cy="64"/>
        <circle class="text-green-400" stroke-width="8" stroke-linecap="round" stroke="currentColor" fill="transparent" r="48" cx="64" cy="64"
          stroke-dasharray="301.44" stroke-dashoffset="50.74" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text-3xl font-semibold fill-gray-800">83%</text>
      </svg>
    </div>
   
    <div class="flex justify-between items-center">
   
      <div class="text-center mt-10 mx-3">
      <hr class="border-gray-300 my-4" />
        <h3 class="text-gray-400 text-md font-semibold">Completed</h3>
        <p class="text-xl font-bold text-gray-700">786,617</p>
      </div>
      <div class="text-center mt-10 mx-3">
      <hr class="border-gray-300 my-4" />
        <h3 class="text-gray-400 text-md font-semibold">In Progress</h3>
        <p class="text-xl font-bold text-gray-700">13,561</p>
      </div>
    </div>
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
    <div className="rounded-lg p-3">
     
      <div className="space-y-1 bg-white p-3 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-500 mb-4">Transactions</h2>
        
        {transactionData.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center rounded-lg p-3"
          >
            <div className="text-blue-500 text-2xl mr-4">
              {transaction.icon}
            </div>
            <div className="flex-1 mr-3">
              <h3 className="text-md font-semibold">{transaction.method}</h3>
              <p className="text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-xl font-semibold text-green-400">
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


   


//cards 
const Cards = ()=>{
  return (
    <>
    <div className = "grid grid-cols-1 md:grid-cols-2">
      {/* booking card */}
      <div className = "bg-white mx-3 my-2 p-2 shadow-lg rounded-lg grid grid-cols-1">
      <div class="flex flex-col items-center">
      <p class="text-lg text-gray-500">Bookings</p>
          <h4 class="text-4xl font-semibold">6,30k</h4>
         
          {/* <span className ="text-5xl"> </span> */}
          <div>
          <LuSignalHigh className = "text-5xl text-orange-400 w-30 h-20"/>
          </div>
        </div>
        </div>
      {/* profit card */}
      <div className = "bg-white mx-3 my-2 p-2 shadow-lg rounded-lg grid grid-cols-1">
      <div class="flex flex-col items-center">
      <p class="text-lg text-gray-500">Profits</p>
          <h4 class="text-4xl font-semibold">2,30k</h4>
         
          {/* <span className ="text-5xl"> </span> */}
          <div>
          <TfiPulse className = "text-5xl text-yellow-500 w-30 h-20"/>
          </div>
        </div>
        </div>
        </div>


        {/* special card earnings on top events card */}

        <div className = "grid grid-cols-1 md:gid-cols-2">
     <div className = "bg-white mx-3 my-2 p-2 shadow-lg rounded-lg">
     <h1 class="text-lg text-gray-700 text-left mb-3 mx-3 font-semibold">Earnings On Top Events</h1>
     <div className = "flex justify-around">
      {/* top event 1 */}
      <div class="flex flex-col items-center">
          {/*  */}
          <h4 class="text-2xl font-semibold">230$</h4>
          <p class="text-lg text-gray-500">Music</p>
          <div class="bg-pink-100 p-2 my-2">
           
           <GiMusicalScore className = "text-3xl text-pink-400" />
           
          </div>
        </div>

        {/* top event 2 */}
        <div class="flex flex-col items-center">
        
          <h4 class="text-2xl font-semibold">75$</h4>
          <p class="text-lg text-gray-500">Foot Ball</p>
          <div class="bg-emerald-100 p-2 my-2">
           
            <FaFootballBall className = "text-3xl text-emerald-400" />
          </div>
        </div>
        {/* top event3 */}
        <div class="flex flex-col items-center">
          {/*  */}
          <h4 class="text-2xl font-semibold">890$</h4>
          <p class="text-lg text-gray-500">Cricket</p>
          <div class="bg-orange-100 p-2 my-2"> 
           
           
             <MdSportsCricket className = "text-3xl text-orange-400" /> 
         </div> 
        </div>


        
        </div>
        </div>
        </div> 
    </>
  )
}




 

  return (
<div class="p-3 bg-gray-200">
  {/* <!-- Card container --> */}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* <!-- Congratulations Card --> */}
    <div class="bg-white rounded-lg shadow-lg p-3 mx-2 my-2">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Congratulations 🎉 Ankur!</h3>
          <p class="text-md text-gray-500">You have won a gold medal </p>
        </div>
        {/* <!-- Medal emogi --> */}
        <div>
         
          <span className = "text-7xl">🏅</span>
        </div>
      </div>
      <div class="flex items-center mb-4">
        <h2 class="text-4xl font-bold text-gray-700">$48.9k</h2>
      </div>
      <button class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">View Sales</button>
    </div>

    {/* <!-- Statistics Card --> */}
    <div class="bg-white rounded-lg shadow-lg p-4 mx-2 my-2">
      <div class="flex justify-between items-center p-3">
        <h3 class="text-lg font-semibold text-gray-700">Statistics</h3>
        <p class="text-sm text-gray-500">Updated 1 month ago</p>
      </div>
      <div class="flex justify-around">
        {/* <!-- Sales --> */}
        <div class="flex flex-col items-center">
          <div class="bg-purple-100 p-2 rounded-full mb-2">
           
            <BsFileBarGraph className = "text-3xl text-purple-500" />
          </div>
          <h4 class="text-lg font-semibold">230k</h4>
          <p class="text-lg text-gray-500">Sales</p>
        </div>
        {/* <!-- Customers --> */}
        <div class="flex flex-col items-center">
          <div class="bg-blue-100 p-2 rounded-full mb-2">
           
            <FaUsersCog className = "text-3xl text-blue-500"/>
          </div>
          <h4 class="text-lg font-semibold">8.549k</h4>
          <p class="text-lg text-gray-500">Customers</p>
        </div>
        {/* <!-- Products --> */}
        <div class="flex flex-col items-center">
          <div class="bg-red-100 p-2 rounded-full mb-2">
            
            <FaTicket className = "text-3xl text-red-500"/>
          </div>
          <h4 class="text-lg font-semibold">1.423k</h4>
          <p class="text-lg text-gray-500">Tickets</p>
        </div>
        {/* <!-- Revenue --> */}
        <div class="flex flex-col items-center">
          <div class="bg-green-100 p-2 rounded-full mb-2">
            
            <FaDollarSign className = "text-3xl text-green-500" />
          </div>
          <h4 class="text-lg font-semibold">$9745</h4>
          <p class="text-lg text-gray-500">Revenue</p>
        </div>
      </div>
    </div>
  </div>
  <div className = "grid grid-cols-1 md:grid-cols-2">
  <Cards/>
  
  </div>
  
  {/* support tracker card */}
 
  <div className = "grid grid-cols-1 md:grid-cols-3 max-width-auto mx-auto">
  <GoalCard />
  <div class="bg-white shadow-lg rounded-lg p-4 mx-2 text-center my-3">
  <h3 class="text-gray-500 text-2xl font-semibold mb-2 text-left">Support Tracker</h3>
  
  <div class="relative inline-block">
    {/* <!-- SVG Circle for Dotted Progress with Increased Size --> */}
    <svg class="w-50 h-50">
       {/* <!-- Increase the size of the SVG --> */}
      <circle cx="50%" cy="50%" r="65" fill="none" stroke-width="12" stroke-dasharray="7 7" stroke="url(#gradient)" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7C3AED" />
          <stop offset="50%" stop-color="#9333EA" />
          <stop offset="100%" stop-color="#F87171" />
        </linearGradient>
      </defs>
    </svg>
{/*     
    <!-- Center Percentage Text --> */}
    <div class="absolute inset-1 flex flex-col items-center justify-center">
      <span class="text-2xl font-semibold text-gray-700">83%</span>
       {/* <!-- Adjusted font size --> */}
      <p class="text-gray-400 text-sm">Completed Tickets</p>
    </div>
  </div>
  
  <div className ="flex gap-4 px-2">
    {/* <!-- New Tickets --> */}
    <div>
      <p class="text-gray-400 text-sm">New Tickets</p>
      <h4 class="text-xl font-bold text-gray-700">29</h4>
    </div>
    
    {/* <!-- Open Tickets --> */}
    <div>
      <p class="text-gray-400 text-sm">Open Tickets</p>
      <h4 class="text-xl font-bold text-gray-700">63</h4>
    </div>
    
    {/* <!-- Response Time --> */}
    <div>
      <p class="text-gray-400 text-sm">Response Time</p>
      <h4 class="text-xl font-bold text-gray-700">1d</h4>
    </div>
  </div>
</div>

<TransactionCard />

  </div>

</div>

  );
};

export default DashboardAnalytics;




