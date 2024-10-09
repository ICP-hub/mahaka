import {useSelector} from "react-redux"
import { useEffect,useState } from "react";


const Ticket = () => {
    const { backend } = useSelector((state) => state.authentication);
    const [eventData,setEventData]=useState('')
    console.log("state response is",eventData)


    useEffect(()=>{
      const fetchEvent = async()=>{
        try{
          const response = await backend.getallEventsbyVenue(100,0,
            "dasara#br5f7-7uaaa-aaaaa-qaaca-cai"
          )
          setEventData(response.data[0])
          console.log("event response",response)
        }catch(e){
          console.log("Error in fetching the event details",e)
        }
      }
      fetchEvent();
    },[])

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mx-2">
  <style jsx>{`
    @keyframes flowingGradient {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    .bg-gradient-animate {
      background: linear-gradient(270deg, #7f00ff, #e100ff, #ff0080, #ff0000);
      background-size: 400% 400%;
      animation: flowingGradient 10s ease infinite;
    }

    .hover-animate:hover {
      animation: flowingGradient 10s ease infinite;
    }
  `}</style>

  <div className="relative perspective-1000 transition-transform duration-300 transform hover:scale-110">
    {/* Flipping Ticket Container */}
    <div className="ticket-container w-full md:max-w-3xl">
      {/* Ticket Front */}
      <div className="ticket-inner">
        <div className="ticket-front rounded-lg shadow-lg overflow-hidden hover-animate bg-gradient-animate">
          {/* Ticket Background Patterns */}
          <div className="absolute inset-0">
            {/* Diagonal Stripes Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/diagmonds.png')] opacity-20"></div>
            {/* Radial Gradient for Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent opacity-70 animate-pulse"></div>
          </div>

          {/* Ticket Content */}
          <div className="relative p-6 md:p-8 text-white z-10">
            {/* Event Name */}
            <h1 className="text-4xl font-extrabold mb-2 text-yellow-300 drop-shadow-lg">
              Mahaka Events Booking 2024
            </h1>

            {/* Event Date and Time */}
            <p className="text-purple-200 drop-shadow-md text-2xl">
              Title: <span className="text-black">{eventData.Title}</span>
            </p>
            <p className="text-2xl text-purple-200 drop-shadow-md">Time: 7:00 PM</p>

            {/* Location */}
            <p className="mt-4 text-lg">
              <strong>Location :</strong> <span className="text-black">Hyderabad</span>
            </p>

            {/* Divider Line */}
            <div className="border-t border-white mt-4 mb-4"></div>

            {/* Ticket Details */}
            <div className="flex justify-between items-center">
              <p>
                <strong>Ticket Type:</strong>{" "}
                <span className="text-green-300 text-lg font-bold">V I P</span>
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span className="text-green-300">$1000</span>
              </p>
            </div>
          </div>

          {/* Ticket Cutout Effect */}
          {/* <div className="absolute top-0 left-0 w-12 h-12 bg-pink-500 rounded-full shadow -translate-y-6 -translate-x-6"></div> */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-500 rounded-full shadow translate-y-6 translate-x-6"></div>
        </div>

        {/* Ticket Back */}
        <div className="ticket-back bg-green-500 rounded-lg shadow-lg overflow-hidden">
          <div className="relative p-6 md:p-8 text-white z-10 flex items-center justify-center h-full">
            <h2 className="text-2xl">Thank You!</h2>
            <p>Your ticket has been successfully booked.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



    
      );
   
  };
  
export default Ticket;
