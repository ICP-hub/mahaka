import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import OngoingCard from '../OngoingCard';
export default function () {
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
        <SwiperSlide><OngoingCard/></SwiperSlide>
        <SwiperSlide><OngoingCard/></SwiperSlide>
        <SwiperSlide><OngoingCard/></SwiperSlide>
        <SwiperSlide><OngoingCard/></SwiperSlide>
        <SwiperSlide><OngoingCard/></SwiperSlide>
        <SwiperSlide><OngoingCard/></SwiperSlide>
      </Swiper>
    </>
  )
}
