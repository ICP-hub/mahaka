import React, { useEffect, useState } from 'react';

import { IoIosArrowDroprightCircle } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaSmileBeam } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

import { SiYamahamotorcorporation } from "react-icons/si";

const Ticket = () => {
  const [selectedView, setSelectedView] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("selected event is",selectedEvent)
  const [rightNav,setRightNav]= useState(false)
  // console.log("view logg",selectedView)

 


  const eventDetails = (event)=>{
    setSelectedEvent(event)
    setRightNav(true)
    
  }

  const closeSidebar = () => {
    setRightNav(false);
  };


   // Home cards section
  const HomeCards = ()=>{

    return(
      <>
      <div className = "bg-gray-200 min-h-screen p-3 dark:bg-slate-700">
      <div className = "grid grid-cols-1 md:grid-cols-3">
        {/* card1 */}
        <div className = "bg-white p-3 mx-2 my-2 shadow-lg rounded-lg text-center hover:scale-105 transition-transform animate dark:bg-slate-600">
          <h1 className = "text-xl text-gray-600 my-2 font-bold text-left">Regular Events</h1>
          <p className = "text-8xl text-green-400 font-bold">10</p>
          <button className = "bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500">
            <div className = "flex">
            Explore <FaArrowRight size = {15} className = "ml-2 mt-1"/>
            </div>
            </button>
            <div className = "flex">
            <MdDateRange className = "mt-2 mx-2 opacity-90" size={25}/>
          <p className = "mt-3 text-md  text-gray-600 font-semibold dark:text-white">Ends on 13 days</p>
          </div>
        </div>
        {/* card2 */}
        <div className = "bg-white p-3 mx-2 my-2 shadow-lg rounded-lg text-center  hover:scale-105 transition-transform animate dark:bg-slate-600">
          <h1 className = "text-xl text-gray-600 my-2 font-bold text-left">Special Events</h1>
          <p className = "text-8xl text-pink-400 font-bold">5</p>
          <button className = "bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500">
            <div className = "flex">
            Explore <FaArrowRight size = {15} className = "ml-2 mt-1"/>
            </div>
            </button>
            <div className = "flex">
            <MdDateRange className = "mt-2 mx-2 opacity-90" size={25}/>
          <p className = "mt-3 text-md  text-gray-600 font-semibold dark:text-white">Ends on 13 days</p>
          </div>
        </div>
        <div className = "bg-white p-3 mx-2 my-2 shadow-lg rounded-lg text-center  hover:scale-105 transition-transform animate dark:bg-slate-600">
        <h1 className = "text-xl text-gray-600 my-2 font-bold text-left">Discount</h1>
          <p className = "text-8xl text-red-400 font-bold animate-bounce">30%</p>
          <button className = "bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500">
            <div className = "flex">
            Explore <FaArrowRight size = {15} className = "ml-2 mt-1"/>
            </div>
            </button>
            <div className = "flex">
            <MdDateRange className = "mt-2 mx-2 opacity-90" size={25}/>
          <p className = "mt-3 text-md  text-gray-600 font-semibold dark:text-white">Ends on 13 days</p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-500 mx-2 my-2 dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="bg-white p-4 rounded-lg shadow-lg dark:bg-slate-600">
            <p className="text-gray-600 italic dark:text-white">
              "Amazing platform! I always find the best events here."
            </p>
            <footer className="text-right mt-4">- John Doe</footer>
          </blockquote>
          <blockquote className="bg-white p-4 rounded-lg shadow-lg dark:bg-slate-600">
            <p className="text-gray-600 italic dark:text-white">
              "The booking process is super smooth. Highly recommend!"
            </p>
            <footer className="text-right mt-4">- Jane Smith</footer>
          </blockquote>
        </div>
      </section>
      </div>
      </>
    )
  }



  // List of all events section
  const [searchEvent, setSearchEvent] = useState("")
  console.log("search event is ",searchEvent)
  const [filteredEvents,setFilteredEvents] = useState(null)

const Events = ()=>{
  const EventsList = [
    {id:"1",date:"25-Aug-2024",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",heading:"Holi Night 2024",para:"Hamer Hall, Melbourne",address:"Hyderabad,New Soutyh Wala, 2234, INDIA"},
    {id:"2",date:"5-Oct-2024",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAAlYONt3V38XnbwNfwi5Ju08Xlm411N5argrsG6RzbbFET3B0cVnz-NHjbreE0BJr2TY&usqp=CAU",heading:"New Year Gala Night 2026",para:"Hamer Hall, Melbourne",address:"Hyderabad,New Soutyh Wala, 2234, INDIA"},
    {id:"3",date:"09-Nov-2024",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",heading:"College Gala Night 2024",para:"Hamer Hall, Melbourne",address:"Hyderabad,New Soutyh Wala, 2234, INDIA"},
    {id:"4",date:"2-Dec-2024",image:"https://5.imimg.com/data5/DB/WJ/MY-605509/music-concert.jpg",heading:"Diwali Special Event 2024",para:"Hamer Hall, Melbourne",address:"Hyderabad,New Soutyh Wala, 2234, INDIA"},
  ]

  
  return(
    <>
    <div className = "grid grid-cols-1">
      
       <div className="px-4 w-1/2 mx-2 my-2 min-h-12 rounded-md border border-border flex items-center bg-card">
              <FaSearch  size={20} />
              <input
                type="text"
                placeholder="Search for Events"
                className="w-full bg-transparent outline-none ml-4"
              
              />
              
            </div>
      
      {
        EventsList.map((event)=>(
          <div className = "bg-white p-2 shadow-lg mx-3 my-2 rounded-lg hover:bg-gray-100 dark:bg-slate-600"
          onClick =  {()=>{eventDetails(event)}} 
          >
            <div className="flex">
             
            <img src = {event.image}
            alt = "event img"
            className = "w-30 h-25 object-cover mx-2 my-2 rounded-lg hover:scale-105"
            />
           
            <div className="mx-2 my-2">
            <h1 className = "text-lg text-slate-600 font-bold">{event.heading}</h1>
            <p className = "text-orange-400 text-md">{event.para}</p>
            <p className = "text-slate-500 text-md dark:text-white">{event.address}</p>
            <p className = "text-slate-500 text-md font-bold dark:text-white">{event.date}</p>
            </div>

            <div className = "ml-auto my-2 p-3">
            <IoIosArrowDroprightCircle className = "text-3xl"/>
           
            </div>
            </div>

            </div>

        ))
      }
    </div>

    </>
  )
}


const [ticketType, setTicketType] = useState('');
console.log("ticket type is",ticketType)
const [ticketQuantity, setTicketQuantity] = useState(1);
console.log("ticket quatity is",ticketQuantity)
const [totalAmount,setTotalAmount] = useState(0)

useEffect(()=>{
  
  console.log("use effect logging")
  if(ticketType === "vip"){
    console.log("Total amount",500*ticketQuantity)
    setTotalAmount(500*ticketQuantity)
  }else if(ticketType === "general"){
    setTotalAmount(100*ticketQuantity)
    console.log("Total amount",100*ticketQuantity)

  }else{
    setTotalAmount(300*ticketQuantity)
    console.log("Total amount",200*ticketQuantity)
  }
})


  return (
    <div className = "bg-gray-200 overflow-hidden overflow-y-auto h-screen dark:bg-slate-700">

      {/* Top heading */}
      <div className = "bg-white p-4 flex justify-around dark:bg-slate-700">
      <div>
        <h1 className = "font-bold text-left text-2xl text-slate-700 mx-2 md:text-5xl dark:text-white">Mahaka Bookings</h1>
        <div className = "flex">
        <FaSmileBeam className = "my-2 size-5 opacity-90"/>
        <p className = "text-md text-slate-500 my-2 text-left mx-2 dark:text-white"> Platform for booking tickets to exciting events!</p>
        </div>
        </div>
        <div className = "text-purple-400 text-8xl ml-auto p-2 my-2"> 
        <SiYamahamotorcorporation/>
        </div>
      </div>

      {/* bar section */}
    <div className="flex flex-col relative p-4">
      <div className="flex space-x-8 justify-around">
        <button
          className={`relative text-lg font-semibold transition-colors dark:text-white duration-200 ${
            selectedView === 'home' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-600'
          }`}
          onClick={() => setSelectedView('home')}
        >
          Home
        </button>
        <button
          className={`relative text-lg font-semibold transition-colors dark:text-white duration-200 ${
            selectedView === 'total' ? 'text-blue-500' : 'text-gray-700 hover:text-blue-600'
          }`}
          onClick={() => setSelectedView('total')}
        >
          Total Events
        </button>
      </div>
      {/* Underline covering  */}
      <span
        className={`absolute bottom-0 h-1 bg-blue-400 transition-all duration-200 ${
          selectedView === 'home' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
        }`}
      ></span>
    </div>
    {selectedView === "home"?
    <HomeCards/>
    :
    <Events />
}

{/* side bar */}
<AnimatePresence>
       {rightNav && (
         <>
           <motion.div
              className="fixed top-2 md:top-4 right-1 w-full p-3 md:w-100 bg-gray-100 md:h-full shadow-lg z-20 md:z-20 mt-10 md:rounded-lg"
              initial={{ marginRight: -640 }}
               animate={{ marginRight: 0 }}
              exit={{ marginRight: -640 }}
              transition={{ duration: 0.3 }}
           >
             <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeSidebar}>
             <IoCloseCircle size = {40}/>
             </button>
             {selectedEvent && (
               <div className="p-3 rounded-md">
                {/* <h1  className="text-3xl font-bold text-gray-700 mx-2 my-2 text-center">Book Now</h1> */}
                 <h3 className="text-lg text-slate-600 font-bold my-2 mx-2">{selectedEvent.heading}</h3>
                 <p className="text-orange-400 mx-2 my-2">{selectedEvent.address}</p>
               {/* information   */}

               <div>
          {/* Name field */}
          <input
            type="text"
            id="name"
            placeholder='Full Name'
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg my-2"
            required
          />

          {/* Email field */}
          <input
            type="text"
            id="email"
             placeholder='Email'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg my-2"
            required
          />

          {/* Address field */}
          <textarea
            type="text"
            id="phone"
              placeholder='Address'
            // value={phone}
            // onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
                  
               
                 {/* choose the ticket */}
                 <div>
          <label className="block text-md font-semibold text-slate-600 mb-2 mt-2 ml-2" htmlFor="ticketType">Choose Ticket Type</label>
          <select id="ticketType" className="w-full p-3 border border-gray-300 rounded-lg dark:text-gray-500" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
     
            <option value="general">General </option>
            <option value="vip">VIP</option>
            <option value="group">Group</option>
          </select>
        </div>

        {/* quantity */}
        <div>
          <label className="block text-md font-semibold text-slate-600 mb-2 mt-2 ml-2 dark:text-gray-600" htmlFor="ticketQuantity">Ticket Quantity</label>
          <input
            type="number"
            id="ticketQuantity"
            min="1"
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg dark:text-gray-500"
          />
        </div>

        {/* total */}
        <div className = "flex">
        <h1  className="text-2xl text-gray-600 mx-2 my-2">Total :  <span className = "font-bold text-slate-600">$ {totalAmount}</span></h1>
        <button className = "bg-blue-400 p-2 ml-auto text-white my-2 rounded-lg px-2 flex text-lg hover:bg-blue-600">Book <GiConfirmed className = "mx-2 mt-1 text-lg"/></button>
        </div>
                
                
               
               </div>
             )}
           </motion.div>

           <motion.div
            className="fixed inset-0 bg-black opacity-50"
            //  onClick={closeSidebar}
             initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
           />
         </>
       )}
     </AnimatePresence>
    </div>




  );
};

export default Ticket;

















// import React, { useState } from "react";
// import profile from "../../assets/images/profile.png";
// import Avvvatars from "avvvatars-react";
// import { useSelector } from "react-redux";

// const TicketPurchase = () => {
//   const [visitorCounts, setVisitorCounts] = useState({
//     vip: 0,
//     group: 0,
//     student: 0,
//   });
//   const [selectedDate, setSelectedDate] = useState("");
//   const { principal } = useSelector((state) => state.authentication);

//   const handleIncrement = (ticketType) => {
//     setVisitorCounts((prevCounts) => ({
//       ...prevCounts,
//       [ticketType]: prevCounts[ticketType] + 1,
//     }));
//   };

//   const handleDecrement = (ticketType) => {
//     setVisitorCounts((prevCounts) => ({
//       ...prevCounts,
//       [ticketType]: prevCounts[ticketType] > 0 ? prevCounts[ticketType] - 1 : 0,
//     }));
//   };

//   const totalPrice =
//     visitorCounts.vip * 150 +
//     visitorCounts.group * 100 +
//     visitorCounts.student * 50;

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center ">
//       <div className="flex items-center space-x-4 mb-8 self-start mx-4">
//         {/* <img
//           src={profile}
//           alt=""
//           className="w-12 h-12 rounded-full"
//         /> */}
//         <Avvvatars value={principal} size={48} shadow={true} />
//         <div>
//           <h1 className="text-3xl font-semibold ">Welcome Back, Admin</h1>
//           <div className="flex items-center  mt-1">
//             <span>Book tickets here!</span>
//           </div>
//         </div>
//       </div>

//       <div className="bg-card p-6 rounded-lg shadow-md w-4/5 mx-auto">
//         <div className="flex justify-center mb-6">
//           <div className="h-1 w-16 bg-orange-400 rounded-full"></div>
//         </div>
//         <h2 className="text-2xl font-semibold  text-center mb-8">
//           MAIN GATE TICKET
//         </h2>

//         {/* Date Picker */}
//         <div className="mb-8">
//           <label htmlFor="datePicker" className="block  font-semibold mb-2">
//             Select a date
//           </label>
//           <input
//             id="datePicker"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             min={today}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-card focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
//           />
//         </div>

//         {/* Ticket Counters */}
//         {[
//           { label: "VIP Tickets", type: "vip", price: 150 },
//           { label: "Group Tickets", type: "group", price: 100 },
//           { label: "Student Tickets", type: "student", price: 50 },
//         ].map((ticket) => (
//           <div
//             key={ticket.type}
//             className="flex items-center justify-between mb-6"
//           >
//             <span className=" font-semibold">{ticket.label}</span>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handleDecrement(ticket.type)}
//                 className="px-4 py-1 border border-orange-400 text-orange-400 font-semibold rounded focus:outline-none hover:bg-orange-100"
//               >
//                 -
//               </button>
//               <span className=" font-semibold w-8 text-center">
//                 {visitorCounts[ticket.type]}
//               </span>
//               <button
//                 onClick={() => handleIncrement(ticket.type)}
//                 className="px-4 py-1 border border-orange-400 text-orange-400 font-semibold rounded focus:outline-none hover:bg-orange-100"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Tickets and Price Display Side by Side */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="text-lg font-bold">
//             Total Tickets: <span className="text-orange-500">{totalTickets} </span>
//           </div>
//           <div className="text-lg font-bold">
//             Total Price: Rs. <span className="text-orange-500">{totalPrice.toLocaleString()}</span>
//           </div>
//         </div>

//         <button className="w-full bg-orange-400 text-white py-3 mx-2 rounded-lg font-semibold hover:bg-orange-500 transition duration-300">
//           Proceed to checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TicketPurchase;
