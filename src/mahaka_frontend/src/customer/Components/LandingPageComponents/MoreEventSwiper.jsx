import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import fram1 from "../../../assets/images/fram1.png";
import fram2 from "../../../assets/images/fram2.png";
import { GoArrowUpRight } from "react-icons/go";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
const VenueSlider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
      >
        <SwiperSlide>
          <div className="shadow-lg rounded-2xl overflow-hidden flex">
            <div className="pr-6 w-1/2 bg-[#E2AF4E] text-white">
              <div className="pt-10 pl-7">
                <h3 className="text-3xl font-black mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl font-black">Rp 4,999/-</p>
                <div className="py-6">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <img
                src={fram2}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-lg rounded-2xl overflow-hidden flex">
            <div className="pr-6 w-1/2 bg-[#E2AF4E] text-white">
              <div className="pt-10 pl-7">
                <h3 className="text-3xl font-black mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl font-black">Rp 4,999/-</p>
                <div className="py-6">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <img
                src={fram1}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-lg rounded-2xl overflow-hidden flex">
            <div className="pr-6 w-1/2 bg-[#E2AF4E] text-white">
              <div className="pt-10 pl-7">
                <h3 className="text-3xl font-black mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl font-black">Rp 4,999/-</p>
                <div className="py-6">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <img
                src={fram1}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-lg rounded-2xl overflow-hidden flex">
            <div className="pr-6 w-1/2 bg-[#E2AF4E] text-white">
              <div className="pt-10 pl-7">
                <h3 className="text-3xl font-black mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl font-black">Rp 4,999/-</p>
                <div className="py-6">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <img
                src={fram1}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default VenueSlider;
