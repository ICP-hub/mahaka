import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from "react-redux";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import OngoingCard from '../OngoingCard';
export default function () {
  // const { events, eventByVenue, eventsLoading, singleEventLoading } =
  // useSelector((state) => state.events);

  const {ongoingEvents} = useSelector((state)=> state.ongoingevents)
 // console.log("ongoing events in slider",ongoingEvents)
  return (
    <>
     <Swiper
        spaceBetween={30}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
      >
        {ongoingEvents?.map((ongoingEvent, index) => (
          <SwiperSlide key={index}>
            <OngoingCard ongoingEventData={ongoingEvent}
          
            />
          </SwiperSlide>
        ))}
       
      </Swiper>
    </>
  )
}
