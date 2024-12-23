import React, { useMemo, useState } from "react";
import fake_img from "../../../assets/images/Frame13.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const VenueSection = () => {
  const { venues } = useSelector((state) => state.venues);
  const gridSpans = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-6",
    "md:col-span-6",
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      {venues.slice(0, 7).map((venue, index) => (
        <div
          key={index}
          className={`col-span-12 ${gridSpans[index]} rounded-xl overflow-hidden`}
        >
          <VenueCard textPos={index + 1} venue={venue} />
        </div>
      ))}
    </div>
  );
};

const VenueCard = ({ textPos, venue }) => {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  console.log(venue);
  const gridStyle = useMemo(() => {
    // Adjust styles based on textPos
    switch (textPos) {
      case 1:
        return {
          parent: "grid grid-rows-12 sm:grid-cols-12 bg-[#E1AF4F] text-white",
          c_first:
            "col-span-12 sm:col-span-7 row-span-7 sm:order-last sm:row-span-12",
          c_second: "col-span-12 sm:col-span-5 row-span-5 sm:row-span-12",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10",
        };
      case 2:
        return {
          parent:
            "grid grid-rows-12 sm:grid-cols-12 md:grid-cols-none bg-[#40B2A7] text-white",
          c_first:
            "row-span-7 sm:order-first md:order-last sm:row-span-12 sm:col-span-7 md:col-span-none",
          c_second:
            "row-span-5 sm:row-span-12 md:row-span-5 sm:col-span-5 md:col-span-none",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10 md:line-clamp-2",
        };
      case 3:
        return {
          parent:
            "grid grid-rows-12 sm:grid-cols-12 md:grid-cols-none bg-[#40B2A7] text-white",
          c_first:
            "row-span-7 sm:order-last sm:col-span-7 sm:row-span-12 md:col-span-none",
          c_second:
            "row-span-5 sm:row-span-12 md:row-span-5 sm:col-span-5 md:col-span-none",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10 md:line-clamp-2",
        };
      case 4:
        return {
          parent:
            "grid grid-rows-12 sm:grid-cols-12 md:grid-cols-none bg-[#17B5E4] text-white",
          c_first:
            "row-span-7 sm:col-span-7 md:col-span-none sm:row-span-12 md:row-span-7",
          c_second:
            "row-span-5 sm:col-span-5 md:col-span-none sm:row-span-12 md:row-span-5",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10 md:line-clamp-2",
        };
      case 5:
        return {
          parent:
            "grid grid-rows-12 sm:grid-cols-12 md:grid-cols-none bg-[#E1AF4F] text-white",
          c_first:
            "row-span-7 sm:order-last sm:col-span-7 sm:row-span-12 md:col-span-none",
          c_second:
            "row-span-5 sm:row-span-12 md:row-span-5 sm:col-span-5 md:col-span-none",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10 md:line-clamp-2",
        };
      case 6:
        return {
          parent: "grid grid-rows-12 sm:grid-cols-12 bg-[#E1AF4F] text-white",
          c_first:
            "col-span-12 sm:col-span-7 md:col-span-6 row-span-7 sm:row-span-12 sm:order-first md:order-last",
          c_second:
            "col-span-12 sm:col-span-5 md:col-span-6 row-span-5 sm:row-span-12",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10",
        };
      case 7:
        return {
          parent: "grid grid-rows-12 sm:grid-cols-12 bg-[#17B5E4] text-white",
          c_first:
            "col-span-12 sm:col-span-7 md:col-span-6 row-span-7 sm:row-span-12 sm:order-last",
          c_second:
            "col-span-12 sm:col-span-5 md:col-span-6 row-span-5 sm:row-span-12",
          c_second_paragraph: "line-clamp-2 sm:line-clamp-10",
        };
      default:
        return {
          parent: "grid grid-rows-12 sm:grid-cols-12",
          c_first:
            "col-span-12 sm:col-span-7 md:col-span-6 row-span-7 sm:row-span-12 sm:order-last",
          c_second:
            "col-span-12 sm:col-span-5 md:col-span-6 row-span-5 sm:row-span-12 bg-[#17B5E4] text-white",
          c_second_paragraph: "",
        };
    }
  }, [textPos]);

  return (
    <div className={`h-96 w-full ${gridStyle.parent}`}>
      <div className={`${gridStyle.c_first}`}>
        <img src={venue.banner.data} className="h-full w-full object-cover" />
      </div>
      <Link
        to={`/venues/${venue.id}`}
        className={`${gridStyle.c_second} p-4 h-full w-full`}
      >
        <div className="overflow-hidden w-full flex flex-col h-full">
          <div className="text-xl sm:text-3xl font-bold capitalize">
            {venue.Title}
          </div>
          <div className={`${gridStyle.c_second_paragraph} max-h-fit`}>
            {venue.Description}
          </div>
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
        </div>
      </Link>
    </div>
  );
};

export default VenueSection;
