import React from 'react'
import HeroSider from '../Components/LandingPageComponents/HeroSider'
import venueImage from "../../assets/images/venue2.png";
import venueImage1 from "../../assets/images/venue1.png";
import fram1 from "../../assets/images/fram1.png";
import fram2 from "../../assets/images/fram2.png";
import maskgroup from "../../assets/images/MaskGroup.png";
import fram4 from "../../assets/images/fram4.png";
import fram6 from "../../assets/images/fram6.png";
import SocialMedia from "../../assets/images/SocialMedia.png";
import SocialMedia2 from "../../assets/images/SocialMedia2.png";
import Group16 from "../../assets/images/Group16.png";
import Frame7 from "../../assets/images/Frame7.png";
import Frame8 from "../../assets/images/Frame8.png";
import Frame9 from "../../assets/images/Frame9.png";
import Frame10 from "../../assets/images/Frame10.png";
import Frame11 from "../../assets/images/Frame11.png";
import Frame12 from "../../assets/images/Frame12.png";
import { GoArrowUpRight } from "react-icons/go";
import OngoingSlider from "../../customer/Components/LandingPageComponents/OngoingSlider";
import TestimonialCarousel from "../../customer/Components/LandingPageComponents/Testimonial";
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
    {/* Hero section slider start  */}
    <HeroSider/>
     {/* Hero section slider start  */}
    <section className="py-12">
      {/* our venues section  start*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-7xl font-black text-center mb-8">Our Venues</h2>
        <div className="flex flex-col lg:flex-row   gap-4">
          {/* left card  start*/}
          <Link to='/single-event'>
          <div className="lg:max-w-[756px] lg:max-h-[545px] w-full shadow-lg rounded-2xl overflow-hidden  flex">
            <div className="pr-6  bg-[#E2AF4E] text-white">
              <div className="lg:h-[205.65px] lg:w-[250.78px] w-full pt-10 pl-7">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="pt-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="lg:w-[422px] lg:h-[545px] w-full h-full">
              <img
                src={venueImage}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
          {/* right card start  */}
          <Link to='/single-event'>
          <div className="lg:max-w-[492px] lg:max-h-[544px] w-full shadow-lg rounded-2xl overflow-hidden  flex flex-col">
            <div className="  bg-[#41B2A7] text-white">
              <div className=" lg:w-[250.78px] w-full pt-10 pl-6">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <img
                src={venueImage1}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
        </div>
      </div>
 {/* our venues section  end*/}
      {/* 3 cards section start */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8  mx-auto mt-12">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[33px] justify-center items-center">
          {/* card 1 */}
          <Link to='/single-event'>
          <div className=" shadow-lg rounded-2xl overflow-hidden  flex flex-col">
            <div className="  bg-[#41B2A7] text-white">
              <div className=" pt-10 pl-6">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <img
                src={Frame10}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
          {/* card 2 */}
          <Link to='/single-event'>
          <div className="shadow-lg rounded-2xl overflow-hidden  flex flex-col">
            <div className="w-full h-full ">
              <img
                src={Frame11}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
            <div className="  bg-[#16B5E3] text-white">
              <div className="  pt-6 pb-6 pl-6">
                <h3 className="text-3xl font-black  mb-[6px]">
                  Zoo Theme Venue
                </h3>
                <p className="mb-[6px] text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div className="py-6">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
          </div>
          </Link>
          {/* card 3 */}
          <Link to='/single-event'>
          <div className=" shadow-lg rounded-2xl overflow-hidden  flex flex-col">
            <div className="  bg-[#E2AF4E] text-white">
              <div className=" pt-10 pl-6">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <img
                src={Frame12}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
        </div>
      </div>
 {/* 3 cards section start */}
      {/*2 cards section  start*/}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* card 1 */}
          <Link to='/single-event'>
          <div className="shadow-lg  rounded-2xl overflow-hidden  flex ">
            <div className="pr-6 w-1/2  bg-[#E2AF4E] text-white">
              <div className=" pt-10 pl-7">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className=" w-1/2 h-full">
              <img
                src={fram2}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
          {/* card 1 */}
          <Link to='/single-event'>
          <div className="shadow-lg rounded-2xl overflow-hidden  flex">
            <div className="pr-6 w-1/2 bg-[#E2AF4E] text-white">
              <div className=" pt-10 pl-7">
                <h3 className="text-3xl font-black  mb-2">Zoo Theme Venue</h3>
                <p className="mb-4 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Tridunt sit molestie
                  ac faucibus quis sed nullam vel.
                </p>
                <p className="text-2xl  font-black">Rp 4,999/-</p>
                <div href="#" className="py-6 ">
                  <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full" />
                </div>
              </div>
            </div>
            <div className=" w-1/2 h-full">
              <img
                src={fram1}
                alt="image"
                className="object-cover object-center h-[100%]"
              />
            </div>
          </div>
          </Link>
        </div>
      </div>
 {/*2 cards section  end*/}
      {/* third party BANNER section start*/}
      <div className="my-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="h-[259px] bg-gradient-to-r from-blue-900 to-gray-900 rounded-2xl shadow-md py-8  overflow-hidden flex flex-col justify-center items-center">
            <h2 className="relative top-32 text-[76.77px] font-extrabold gradienttext">
              THIRD PARTY BANNER
            </h2>

            <div className="w-[305.37px] h-[330.38px] relative -top-[2.75rem]">
              <img
                src={maskgroup}
                alt="Profile"
                className="w-full h-full object-contain object-center "
              />
            </div>
          </div>
        </div>
      </div>
       {/* third party BANNER section end*/}
      {/* 3 Grid card  start*/}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-[33px]">
          {/* card 1 */}
          <div className="w-full  h-[204px]  shadow-lg rounded-2xl overflow-hidden">
            <img
              src={SocialMedia}
              alt="image"
              className="w-full  h-[204px] object-cover object-center"
            />
          </div>
{/* card 2 */}
          <div className="w-full  h-[204px] shadow-lg rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 to-gray-900 ">
            <img
              src={fram6}
              alt="image"
              className="object-contain object-center h-[100%]"
            />
          </div>
{/* card 3 */}
          <div className="w-full  h-[204px]  shadow-lg rounded-2xl overflow-hidden  bg-gray-950">
            <img
              src={Group16}
              alt="image"
              className="object-contain object-center h-[100%] w-full"
            />
          </div>
        </div>
      </div>
       {/* 3 Grid card  end*/}
      {/* 2 Grid card  start*/}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2   gap-[33px]">
          {/* card 1 */}
          <div className="w-full max-h-[175px]  shadow-lg rounded-2xl overflow-hidden  ">
            <img
              src={SocialMedia2}
              alt="image"
              className="object-cover object-center h-[100%]"
            />
          </div>
          {/* card 2 */}
          <div className="w-full max-h-[175px]  shadow-lg rounded-2xl overflow-hidden  bg-gradient-to-r from-blue-900 to-gray-900">
            <img
              src={fram4}
              alt="image"
              className="object-cover object-center h-[100%]"
            />
          </div>
        </div>
      </div>
 {/* 2 Grid card  end*/}
      {/* OnGoing Event slider Start  */}
     <OngoingSlider/>
  {/* OnGoing Event slider end  */}
     {/* Events and ctivity Section Start  */}
     <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-4xl text-center">
        <h1 className="text-[48px] font-black">What's On: Events and Activities</h1>
        <p className="text-lg font-normal">Explore our lush habitats, meet exotic creatures, and create unforgettable memories. Whether you're planning a family adventure, a school trip, or a solo exploration, we have everything you need to make your visit special.</p>
        </div>
      </section>
      {/* cards box start  */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2   gap-[33px] mt-12">
          {/* first Card  start*/}
          <div className="overflow-hidden">
            <div className="rounded-2xl w-full h-full">
              <img src={Frame7} alt="" className='object-cover '/>
            </div>
            <div className=" pt-7">
              <h1 className="text-3xl font-black">Jungle Safari</h1>
              <p className="text-base font-normal">Explore our lush habitats, meet exotic creatures, and create unforgettable memories. Whether you're planning a family adventure, a school trip, or a solo</p>
            </div>
          </div>
          {/* Second card  start*/}
          <div className="overflow-hidden">
            <div className="rounded-2xl w-full h-full">
              <img src={Frame8} alt="" className='object-cover '/>
            </div>
            <div className="pt-7">
              <h1 className="text-3xl font-black">Jungle Safari</h1>
              <p className="text-base font-normal">Explore our lush habitats, meet exotic creatures, and create unforgettable memories. Whether you're planning a family adventure, a school trip, or a solo</p>
            </div>
          </div>
          {/* 3rd Card start  */}
          <div className="overflow-hidden">
            <div className="rounded-2xl w-full h-full">
              <img src={Frame9} alt="" className='object-cover '/>
            </div>
            <div className="pt-7">
              <h1 className="text-3xl font-black">Jungle Safari</h1>
              <p className="text-base font-normal">Explore our lush habitats, meet exotic creatures, and create unforgettable memories. Whether you're planning a family adventure, a school trip, or a solo</p>
            </div>
          </div>
        </div>
         {/* cards box end  */}
        <section className="flex flex-col justify-center items-center pt-10">
          <button className="px-14 py-3 bg-[#F08E1E] text-white rounded-[10px] font-normal text-base">Explore</button>
        </section>
        </div>
{/* Events and ctivity Section end  */}
{/* Testimonial start  */}
<div className="mt-15"> <TestimonialCarousel /></div>
       {/* Testimonial End  */}
    </section>
    </>
  )
}
