import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllBanners } from "../../../redux/reducers/apiReducers/bannerApiReducer";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper/modules";
import Hero from "../HeroCard";

export default function BannerCarousel() {
  const { attractionbanners } = useSelector((state) => state.banner);
  const { backend } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBanners = async (category) => {
      try {
        await dispatch(getAllBanners({ backend, category }));
      } catch (e) {
        console.log("Error in fetching banners:", e);
      }
    };

    fetchBanners({ Attraction: null });
  }, [backend, dispatch]);

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
            <Hero bannerData={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
