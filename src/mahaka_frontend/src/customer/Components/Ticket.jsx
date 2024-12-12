import React from "react";

export default function Ticket({
  type,
  gradientClass,
  name,
  description,
  price,
  availability,
  highlightClass,
}) {
  return (
    <div className="flex justify-center py-5">
      <div
        className={`relative ${gradientClass} rounded-xl w-full md:h-[196px] h-[140px] overflow-hidden`}
      >
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full z-20"></div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-16 w-16 bg-background rounded-full"></div>
        <div className="flex relative z-10">
          <div
            className={`md:h-[196px] h-[140px] w-[103px] ${highlightClass} flex items-center justify-center`}
          >
            <span className="transform -rotate-90 whitespace-nowrap  text-sm md:text-[26px] font-black pt-15 tracking-widest text-white">
              {type}
            </span>
          </div>
          <div className="w-3/4 p-4">
            <h3 className="md:text-2xl  text-sm font-black">{name}</h3>

            <div className="flex justify-between mt-[5rem]">
              <span className="md:text-lg  text-sm font-black">Rp.{price}</span>
              <span className="md:text-lg  text-sm font-normal">
                {availability} TICKETS LEFT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
