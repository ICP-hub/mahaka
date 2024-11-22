import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import HeroCard from "../HeroCard";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllBanners } from "../../../redux/reducers/apiReducers/bannerApiReducer";


export default function HeroSide() {
  const { backend } = useSelector((state) => state.authentication);
  const {banners} = useSelector((state) => state.banner);
  const {  attractionBanners } = useSelector((state) => state.banner);
  console.log("banners in herosider is", banners)
  console.log("only attraction  banners in hero sider",  attractionBanners);
  const dispatch = useDispatch();

 

  
 

  return (
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
      {/* Dynamically generate slides */}
      {attractionBanners?.map((banner, index) => (
        <SwiperSlide key={index}>
          <HeroCard
            title={banner.title}
           
            description={banner.description}
          
            backgroundImage={banner.image} // Pass image URL
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
