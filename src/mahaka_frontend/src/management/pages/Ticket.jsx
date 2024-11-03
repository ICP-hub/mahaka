import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineStarRate } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaAnglesRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";




const MgtTicket  = ()=>{

    const [filterEvents,setFilterEvents] = useState("allevents")
    console.log("filtering",filterEvents)
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [rightNav, setRightNav] = useState(false)
    const [sidebarItems, setSidebarItems] = useState([]);

    console.log("side bar items",sidebarItems)
    const [totalAmount, setTotalAmount] = useState(0);
  
    const toggleSidebar = () => {
       

        setRightNav(!rightNav);
      };

   

    const addItemToSidebar = (event) => {
        console.log("event side bar",event.name)
        setRightNav(true)
         const isAlreadyAdded = sidebarItems.some((item) => item.id === event.id);
    
         if (!isAlreadyAdded) {
          setSidebarItems([...sidebarItems, event]);
          setTotalAmount(totalAmount + event.amount);
         }
       
      };

      const removeItemFromSidebar = (event) => {
        setSidebarItems(sidebarItems.filter((item) => item.id !== event.id));
        setTotalAmount(totalAmount - event.amount);
      };



    const eventsList =[
        {id:"1",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:400,icon:<MdOutlineStarRate />,discount:"50%"},
        {id:"2",name:"DJ Nights",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",amount:666,icon:<MdOutlineStarRate />,discount:"10%"},
        {id:"3",name:"Music Festivals",image:"https://5.imimg.com/data5/DB/WJ/MY-605509/music-concert.jpg",amount:999,icon:<MdOutlineStarRate />,discount:"70%"},
        {id:"4",name:"Live Concerts",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",amount:770,icon:<IoCalendarNumberOutline />,discount:"60%"},
        {id:"5",name:"Magic Shows",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",amount:550,icon:<MdOutlineStarRate />,discount:"50%"},
        {id:"6",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:700,icon:<IoCalendarNumberOutline />,discount:"50%"},
        {id:"7",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:800,icon:<MdOutlineStarRate />,discount:"50%"},
        {id:"8",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:800,icon:<IoCalendarNumberOutline />,discount:"50%"}
    ]

    const specialEvents =[
        {id:"9",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:20,icon:<MdOutlineStarRate />,discount:"50%"},
        {id:"10",name:"DJ Nights",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",amount:700,icon:<MdOutlineStarRate />,discount:"10%"},
        {id:"11",name:"Music Festivals",image:"https://5.imimg.com/data5/DB/WJ/MY-605509/music-concert.jpg",amount:400,icon:<MdOutlineStarRate />,discount:"70%"},
    ]

    const regularEvents =[
        {id:"12",name:"Live Concerts",image:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",amount:600,icon:<IoCalendarNumberOutline />,discount:"50%"},
        {id:"13",name:"DJ Nights",image:"https://cdn.create.vista.com/api/media/small/121050536/stock-photo-crowd-at-concert",amount:750,icon:<IoCalendarNumberOutline/>,discount:"10%"},
        {id:"14",name:"Music Festivals",image:"https://5.imimg.com/data5/DB/WJ/MY-605509/music-concert.jpg",amount:700,icon:<IoCalendarNumberOutline />,discount:"70%"},
    ]



    // special events section
    const SpecialEvents = ()=>{
    
        return(
            <>
         
             <div className = "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3">
           { specialEvents.map((event)=>(
           <div className = "flex">
              <div className = "bg-white p-3 rounded-lg shadow-lg mx-2 my-2" key ={event.id} onClick = {()=>addItemToSidebar(event)}>
                <div   className = "text-center">
                <img src={event.image}
                alt = "event img"
                className = "h-25 rounded-lg md:h-35 opacity-90"
                />
                </div>

                
             <div className = "flex">
                <div>
             <h1 className = "text-slate-700 my-2 text-lg font-bold">{event.name}</h1>
             <p className = "text-xl text-amber-950 flex font-bold"><FaRupeeSign className = "mt-0 " size={25}/> {event.amount}</p>
            </div>

         <div className = "flex flex-col text-green-800 ml-auto mt-2"> 
            <div className = "text-3xl ml-auto flex">
            {event.icon}
          
            </div>

            <div className="flex mt-1">  
                <MdOutlineDiscount className="text-xl text-gray-400 mt-1 mx-1"/>
                <p className="text-xl text-gray-400 mx-1">{event.discount}</p>
                </div>
            </div>
           </div>        
           </div>
           </div>
           ))}
        </div>   
            </>
        )
    }


    // regular events section
    const RegularEvents = ()=>{
    
        return(
            <>
             <div className = "grid grid-cols-1 md:grid-cols-3  md:gap-3">
           { regularEvents.map((event)=>(
           <div className ="flex">
              <div className = "bg-white p-3 rounded-lg shadow-lg mx-2 my-2" onClick = {()=>addItemToSidebar(event)}>
                <div   className = "text-center">
                <img src={event.image}
                alt = "event img"
                className = "h-25 rounded-lg md:h-35 opacity-90"
                />
                </div>    
             <div className = "flex">
                <div>
             <h1 className = "text-slate-700 my-2 text-lg font-bold">{event.name}</h1>
             <p className = "text-xl text-amber-950 flex font-bold"><FaRupeeSign className = "mt-0 " size={25}/> {event.amount}</p>
            </div>

         <div className = "flex flex-col text-green-800 ml-auto mt-2"> 
            <div className = "text-3xl ml-auto flex">
            {event.icon}
          
            </div>

            <div className="flex mt-1">  
                <MdOutlineDiscount className="text-xl text-gray-400 mt-1 mx-1"/>
                <p className="text-xl text-gray-400 mx-1">{event.discount}</p>
                </div>
            </div>     
           </div>       
           
           </div>
           </div>
           ))}
        </div>
            
            
            </>
        )
    }



    return (
        <>
         <div className={`${rightNav&&"w-full md:w-2/3 lg:w-3/5 lg:p-2"}`}>
        <div className ="relative overflow-y-auto overflow-x-hidden flex-auto custom-scroll">
       <div className = "max-h-fit relative p-4">
        {/* select the event types */}
        <div className ="rounded-lg mx-2 my-2 flex-1">
        <div className ="grid grid-cols-1 md:grid-cols-3 md:gap-2 ">
       
            <div className = {`border hover:bg-slate-300 p-2 rounded-xl flex  my-2 ${filterEvents==="allevents"?"bg-slate-300":"bg-transparent"}`} onClick ={()=>setFilterEvents("allevents")}>
            <FaRegCalendarAlt  className ="text-3xl mx-3 bg-gray-400 rounded-full p-0.5" size={25}/>
                <h1 className ="font-bold text-slate-800">All Events</h1>
                <FaAnglesRight className ="font-bold text-slate-800 ml-auto mt-1"/>
            </div>

            <div className = {`border hover:bg-slate-300 p-2 rounded-xl flex  my-2 ${filterEvents==="special"?"bg-slate-300":"bg-transparent"}`} onClick ={()=>setFilterEvents("special")}>  
                <MdOutlineStarRate className ="text-3xl mx-3 bg-gray-400 rounded-full p-0.5" />
                <h1 className ="font-bold text-slate-800">Special Events</h1>
                <FaAnglesRight className ="font-bold text-slate-800 ml-auto mt-1"/>
            </div>

            <div className = {`border p-2 rounded-xl flex hover:bg-slate-300  my-2 ${filterEvents==="regular"?"bg-slate-300":"bg-transparent"}`} onClick ={()=>setFilterEvents("regular")}>
            <IoCalendarNumberOutline className ="text-3xl mx-3 bg-gray-400 rounded-full p-0.5" size={25}/>
                <h1 className ="font-bold text-slate-800">Regular Events</h1>
                <FaAnglesRight className ="font-bold text-slate-800 ml-auto mt-1"/>
            </div>
          
        </div>
        </div>

        <div className="px-4 w-1/2 mx-2 my-2 min-h-12 rounded-md border border-border flex items-center bg-card">
              <FaSearch  size={20} />
              <input
                type="text"
                placeholder="Search for Events"
                className="w-full bg-transparent outline-none ml-4"
              
              />
              
            </div>

        <AnimatePresence>
        <motion.div
          key={filterEvents} // Key to trigger the re-render and animation when array changes
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
        >

        {filterEvents==="allevents"&&

        <div className = "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3">
           {eventsList.map((event)=>(
           <div className ="flex">
              <div className = "bg-white p-3 rounded-lg shadow-lg my-2 md:mx-2" onClick = {()=>addItemToSidebar(event)}>
                <div   className = "text-center">
                <img src={event.image}
                alt = "event img"
                className = "h-25 rounded-lg md:h-35 opacity-90"
                />
                </div>

                
             <div className = "flex">
                <div>
             <h1 className = "text-slate-700 my-2 text-lg font-bold">{event.name}</h1>
             <p className = "text-xl text-amber-950 flex font-bold"><FaRupeeSign className = "mt-0 " size={25}/> {event.amount}</p>
            </div>

         <div className = "flex flex-col text-green-800 ml-auto mt-2"> 
            <div className = "text-3xl ml-auto flex">
            {event.icon}
          
            </div>

            <div className="flex mt-1">  
                <MdOutlineDiscount className="text-xl text-gray-400 mt-1 mx-1"/>
                <p className="text-xl text-gray-400 mx-1">{event.discount}</p>
                </div>
            </div>  
           </div>
           </div>
           </div>

           ))}
        </div>
       }



{filterEvents==="special"&&<SpecialEvents/>}
{filterEvents==="regular"&&<RegularEvents/>}

</motion.div>
</AnimatePresence>

{/* side bar */}
<AnimatePresence>
        {rightNav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed right-0 top-0 md:top-0 h-full lg:h-130 w-full md:w-[25%] lg:w-1/3 bg-white rounded-lg shadow-lg p-4 z-50  overflow-y-auto"
          >
             <div className ="">
            <button
              onClick={toggleSidebar}
             
            >
              <RiCloseLargeFill  className="text-2xl font-bold mb-4"/>
            </button>

            <div className ="flex flex-col">
                {sidebarItems.map((item)=>(
                    <div className = "bg-gray-300 p-2 rounded-lg shadow-lg my-2 text-center"> 
                    <div className ="flex">
                        <img src={item.image} className ="h-10 w-10 rounded-full"/>
                        <h1 className ="text-md text-gray-600 font-bold mt-2 mx-2">{item.name}</h1>
                        <p className = "text-xl text-amber-950 flex font-bold ml-auto mt-1"><FaRupeeSign className = "mt-1" size={20}/> {item.amount}</p>
                        <button onClick={() => removeItemFromSidebar(item)}>
                        <AiOutlineCloseCircle className="text-gray-800 mx-2 text-3xl"/>
                  </button>
                        </div>

                    </div>

                ))}
            </div>

           <div className = "text-xl text-gray-800 flex font-bold rounded-lg p-2 bg-gray-300">
            <span>Subtotal :</span>
            <p className = "text-xl text-gray-800 ml-auto flex"><FaRupeeSign className = "mt-1" size={20}/> {totalAmount}</p>
            </div>
                <h1 className ="font-bold text-slate-500 text-xl  bg-gray-300 rounded-lg p-2 my-2">Memberhip Discount</h1>
           
           <button className ="bg-blue-400 p-2 text-white rounded-lg flex justify-end hover:bg-blue-500">Book Now</button>
           </div>
            
          </motion.div>
        )}
      </AnimatePresence>
       </div>

       </div>
       </div>
        </>

        
    )
}

export default MgtTicket ;