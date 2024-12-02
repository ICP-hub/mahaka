import React from 'react'
import bgocen2 from "../../assets/images/bgocen2.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function OngoingCard({ongoingEventData,ongoingEventsLoading}) {
  // const { events, eventByVenue, eventsLoading, singleEventLoading } =
  // useSelector((state) => state.events);

 // console.log("events data in ongoing card",eventData)
 const venueId = decodeURIComponent(ongoingEventData.venueId).replace(/#/g, "_");
 const eventId = decodeURIComponent(ongoingEventData.id).replace(/#/g, "_");
  return (
    <>
     {/* on going event section  */}
     <Link to={`/${venueId}/events/${eventId}`} className="my-18">
     <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       
        <div className="relative w-full h-full ">
          <img
            src={ongoingEventData?.banner.data}
            alt="Mahaka Attraction Special"
            className="w-full h-[582px] object-cover rounded-[20px] shadow-md"
          />
          <div className="absolute inset-0 overlay-gradient rounded-lg flex flex-col justify-center items-center text-center p-4">
            <div className="max-w-[715px] relative lg:top-44">
              <h3 className="text-4xl font-black text-white mb-4">
              {ongoingEventData?.title}
              </h3>
              <p className="text-lg font-normal text-white mb-6">
               {ongoingEventData?.description}
              </p>
              <button className="bg-[#F08E1E] text-white px-6 py-2 rounded-lg text-lg font-normal">
              <Link to={`/${venueId}/events/${eventId}`} className="my-18">
                Explore
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </>
  )
}
