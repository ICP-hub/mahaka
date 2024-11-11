import React from "react";
import fram1 from "../../assets/images/fram1.png";
import fram2 from "../../assets/images/fram2.png";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function MoreEventCard({ image, event, index }) {
  // Define an array of colors
  const colors = ["#E2AF4E", "#FF5733", "#28A745", "#3498DB", "#9B59B6"];
  console.log(event, "event details");

  // Choose color based on index (cycles through colors if there are more events than colors)
  const color = colors[index % colors.length];

  return (
    <Link to={`/events/${event.id}`} className="my-18">
      <div className="shadow-lg h-64 rounded-2xl overflow-hidden flex">
        <div
          className="pr-6 w-1/2 text-white"
          style={{ backgroundColor: color }}
        >
          <div className="pt-10 pl-7">
            <h3 className="text-3xl font-black mb-2">{event.title}</h3>
            <p className="mb-4 text-[14px] font-normal">{event.description}</p>
            <div className="py-12 ">
              <GoArrowUpRight
                className="bg-white w-[30px] h-[30px] rounded-full"
                style={{ color: color }}
              />
            </div>
          </div>
        </div>
        <div className="h-full w-1/2">
          <img
            src={image}
            alt="event"
            className="object-cover object-center h-[100%]"
          />
        </div>
      </div>
    </Link>
  );
}
