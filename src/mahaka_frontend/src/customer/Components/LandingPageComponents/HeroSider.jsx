import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllBanners } from "../../../redux/reducers/apiReducers/bannerApiReducer";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper/modules";
import Hero from "../HeroCard";

export default function BannerCarousel() {
  const { attractionbanners ,  bannerLoading} = useSelector((state) => state.banner);
  const { backend } = useSelector((state) => state.authentication);

  
 

  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {attractionbanners?.map((banner, index) => (
          <SwiperSlide key={index}>
            <Hero bannerData={banner}
            bannerLoading ={ bannerLoading}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
