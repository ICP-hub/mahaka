import React, { useState } from 'react'
import fram1 from "../../assets/images/fram1.png";
import fram2 from "../../assets/images/fram2.png";
import { GoArrowUpRight } from 'react-icons/go';
export default function MoreEventCard({ color = "#E2AF4E", image }) {

  return (
   <>
    <div className="my-18">
          <div className="shadow-lg  rounded-2xl overflow-hidden  flex " > 
            <div className="pr-6 w-1/2   text-white" style={{ backgroundColor: color}}>
              <div className=" pt-10 pl-7">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div  className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px]  rounded-full" style={{ color: color}}/>
                </div>
              </div>
            </div>
            <div className="h-full w-1/2">
              <img
                src={image}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
            </div>
   </>
  )
}
