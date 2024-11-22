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
  console.log("banners in herosider is", banners)
  const dispatch = useDispatch();




  useEffect(() => {

    const fetchBanners = async (category)=>{
      try{
        await dispatch(getAllBanners({backend, category}))
      }catch(e){
        console.log("error in fetching banners",e)
      }
  
    }
      console.log("logging in hEROSIDER")
     // dispatch(getAllBanners ({backend, category}))
     fetchBanners({ Attraction: null }) 
    
  }, [backend, dispatch]);

  console.log("logging in hEROSIDER BANNERS",banners)



  // Fetch banners from Redux store
 

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
      {banners?.map((banner, index) => (
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
