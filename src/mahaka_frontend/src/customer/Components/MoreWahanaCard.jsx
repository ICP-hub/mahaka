import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function MoreWahanaCard({ image, event, index }) {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  // Define an array of colors
  const colors = ["#E2AF4E", "#FF5733", "#28A745", "#3498DB", "#9B59B6"];
  // console.log(event, "event details");

  // Replace # with _ in venueId and eventId
  const venueId = decodeURIComponent(event.venueId).replace(/#/g, "_");
  const wahanaId = decodeURIComponent(event.id).replace(/#/g, "_");
  // console.log(venueId, wahanaId);

  // Choose color based on index (cycles through colors if there are more events than colors)
  const color = colors[index % colors.length];

  return (
    <div className="rounded-2xl h-80 mb-18 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 overflow-hidden text-white shadow-lg">
      <div className="sm:order-last">
        <img src={image} alt="event" className="object-cover h-full w-full" />
      </div>
      <Link
        to={`/${venueId}/wahanas/${wahanaId}`}
        className="flex flex-col flex-auto p-6"
        style={{ backgroundColor: color }}
      >
        <div className="text-3xl font-black capitalize">{event.ride_title}</div>
        <div className="line-clamp-2 sm:line-clamp-10">{event.description}</div>
        <div className="mt-auto">
          <div className="flex items-center">
            <motion.button
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="rounded-full z-20"
              onMouseEnter={() => setIsLabelVisible(true)}
              onMouseLeave={() => setIsLabelVisible(false)}
            >
              <BsFillArrowUpRightCircleFill size={32} />
            </motion.button>
            {isLabelVisible && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-semibold ml-1.5"
              >
                View details
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </div>
    // <Link to={`/${venueId}/wahanas/${wahanaId}`} className="my-18">
    //   <div className="shadow-lg h-64 rounded-2xl overflow-hidden flex my-18">
    //     <div
    //       className="pr-6 w-1/2 text-white"
    //       style={{ backgroundColor: color }}
    //     >
    //       <div className="pt-10 pl-7">
    //         <h3 className="text-3xl font-black mb-2">{event.ride_title}</h3>
    //         <p className="mb-4 text-[14px] font-normal  line-clamp-3">
    //           {event.description}
    //         </p>
    //         <div className="py-12">
    //           <GoArrowUpRight
    //             className="bg-white w-[30px] h-[30px] rounded-full"
    //             style={{ color: color }}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="h-full w-1/2">
    //       <img
    //         src={image}
    //         alt="event"
    //         className="object-cover object-center h-[100%]"
    //       />
    //     </div>
    //   </div>
    // </Link>
  );
}
