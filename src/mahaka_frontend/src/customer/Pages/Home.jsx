import React, { useEffect } from "react";
import HeroSider from "../Components/LandingPageComponents/HeroSider";
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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VenueCard = ({ venue, layout }) => (
  <Link
    to={`/single-event/${venue.id}`}
    className={`rounded-lg overflow-hidden flex text-white ${layout.flexDirection} ${layout.bgColor}`}
  >
    <div className={`pt-6 pb-6 pl-6 ${layout.textArea}`}>
      <h3 className="text-3xl font-black mb-[6px]">{venue.Title}</h3>
      <p className="mb-[6px] text-[14px] font-normal">{venue.Description}</p>
      <p className="text-2xl font-black">Rp {venue.price}/-</p>
      <div className="mt-4">
        <GoArrowUpRight className="bg-white w-8 h-8 text-[#E2AF4E] rounded-full p-2" />
      </div>
    </div>
    <div className={layout.imageArea}>
      <img
        src={Frame10}
        alt={venue.Title}
        className="object-cover object-center w-full h-full"
      />
    </div>
  </Link>
);

export default function Home() {
  const { venues } = useSelector((state) => state.venues);

  const layoutConfigs = [
    { flexDirection: "flex-row", bgColor: "bg-[#E2AF4E]", textArea: "w-1/3", imageArea: "w-2/3", height: "545px", },
    { flexDirection: "flex-row", bgColor: "bg-[#41B2A7]", textArea: "w-2/5", imageArea: "w-3/5", height: "100%" },
    { flexDirection: "flex-col", bgColor: "bg-[#41B2A7]", textArea: "w-full", imageArea: "w-full", height: "calc(100% - 545px)", },
    { flexDirection: "flex-col-reverse", bgColor: "bg-[#16B5E3]", textArea: "w-full", imageArea: "w-full", height: "100%", },
    { flexDirection: "flex-col", bgColor: "bg-[#E2AF4E]", textArea: "w-full", imageArea: "w-full", height: "100%", },
    { flexDirection: "flex-row", bgColor: "bg-[#E2AF4E]", textArea: "w-full", imageArea: "w-full", height: "100%", },
    { flexDirection: "flex-row", bgColor: "bg-[#16B5E3]", textArea: "w-full", imageArea: "w-full", height: "100%", },
  ];

  return (
    <>
      <HeroSider />
      <section className="py-12">
        {/* -------------------------------------venues section start------------------------------ */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-8">Our Venues</h2>

{/* if length equals 2 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {venues.length === 2 && (
              <>
                {/* first row- 1st venue */}
                <div className="md:col-span-3 flex l shadow-lg rounded-2x" style={{ height: layoutConfigs[0].height }}>
                  <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                </div>

                {/* first row- 2nd venue */}
                <div className="md:col-span-2 flex l shadow-lg rounded-2x" style={{ height: layoutConfigs[0].height }}>
                  <VenueCard venue={venues[1]} layout={layoutConfigs[2]} />
                </div>
              </>
            )}
          </div>

{/* if length equals 3 */}
          {venues.length === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[33px] mb-8">
              {venues.map((venue, index) => (
                <div className="col-span-1 shadow-lg rounded-2xl" style={{ height: layoutConfigs[4].height }} key={venue.id}>
                  <VenueCard venue={venue} layout={layoutConfigs[index + 2]} />
                </div>
              ))}
            </div>
          )}

{/* if length equals 4 */}
          {venues.length === 4 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venues.slice(0, 2).map((venue, index) => (
                  <div className="col-span-1 shadow-lg rounded-2xl" key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index +3]} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venues.slice(2, 4).map((venue, index) => (
                  <div className="col-span-1 shadow-lg rounded-2xl" key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index + 5]} />
                  </div>
                ))}
              </div>
            </>
          )}

{/* if length equals 6 */}
          {venues.length === 6 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venues.slice(0, 2).map((venue, index) => (
                  <div className="col-span-1 shadow-lg rounded-2xl" key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index+5]} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venues.slice(2, 4).map((venue, index) => (
                  <div className="col-span-1 shadow-lg rounded-2xl" key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index + 2]} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venues.slice(4, 6).map((venue, index) => (
                  <div className="col-span-1 shadow-lg rounded-2xl" key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index + 5]} />
                  </div>
                ))}
              </div>
            </>
          )}

{/* if length equals 5 or more than equal to 7 */}
          {/* First Row */}
          {(venues.length === 5 || venues.length >= 7) && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

                {/* first row- 1st venue */}
                <div className="md:col-span-3 flex l shadow-lg rounded-2x" style={{ height: layoutConfigs[0].height }}>
                  <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                </div>
                {/* first row- 2nd venue */}
                <div className="md:col-span-2 flex l shadow-lg rounded-2x" style={{ height: layoutConfigs[0].height }}>
                  <VenueCard venue={venues[1]} layout={layoutConfigs[2]} />
                </div>

              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[33px] mb-8">
                {venues.slice(2, 5).map((venue, index) => (
                  <div className="col-span-1 l shadow-lg rounded-2x" style={{ height: layoutConfigs[4].height }} key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index + 2]} />
                  </div>
                ))}
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {venues.slice(5, 7).map((venue, index) => (
                  <div className="col-span-1 l shadow-lg rounded-2x" style={{ height: layoutConfigs[4].height }} key={venue.id}>
                    <VenueCard venue={venue} layout={layoutConfigs[index + 5]} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* --------------------------------venues section end-------------------------------- */}

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
        <OngoingSlider />
        {/* OnGoing Event slider end  */}
        {/* Events and ctivity Section Start  */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
          <section className="flex flex-col justify-center items-center">
            <div className="max-w-4xl text-center">
              <h1 className="text-[48px] font-black">
                What's On: Events and Activities
              </h1>
              <p className="text-lg font-normal">
                Explore our lush habitats, meet exotic creatures, and create
                unforgettable memories. Whether you're planning a family
                adventure, a school trip, or a solo exploration, we have
                everything you need to make your visit special.
              </p>
            </div>
          </section>
          {/* cards box start  */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2   gap-[33px] mt-12">
            {/* first Card  start*/}
            <div className="overflow-hidden">
              <div className="rounded-2xl w-full h-full">
                <img src={Frame7} alt="" className="object-cover " />
                <div className=" pt-7">
                  <h1 className="text-3xl font-black">Jungle Safari</h1>
                  <p className="text-base font-normal">
                    Explore our lush habitats, meet exotic creatures, and create
                    unforgettable memories. Whether you're planning a family
                    adventure, a school trip, or a solo
                  </p>
                </div>
              </div>
            </div>
            {/* Second card  start*/}
            <div className="overflow-hidden">
              <div className="rounded-2xl w-full h-full">
                <img src={Frame8} alt="" className="object-cover " />
                <div className="pt-7">
                  <h1 className="text-3xl font-black">Jungle Safari</h1>
                  <p className="text-base font-normal">
                    Explore our lush habitats, meet exotic creatures, and create
                    unforgettable memories. Whether you're planning a family
                    adventure, a school trip, or a solo
                  </p>
                </div>
              </div>
            </div>
            {/* 3rd Card start  */}
            <div className="overflow-hidden">
              <div className="rounded-2xl w-full h-full">
                <img src={Frame9} alt="" className="object-cover " />
                <div className="pt-7">
                  <h1 className="text-3xl font-black">Jungle Safari</h1>
                  <p className="text-base font-normal">
                    Explore our lush habitats, meet exotic creatures, and create
                    unforgettable memories. Whether you're planning a family
                    adventure, a school trip, or a solo
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* cards box end  */}
          <section className="flex flex-col justify-center items-center pt-10">
            <button className="px-14 py-3 bg-[#F08E1E] text-white rounded-[10px] font-normal text-base">
              Explore
            </button>
          </section>
        </div>
        {/* Events and ctivity Section end  */}
        {/* Testimonial start  */}
        <div className="mt-15">
          {" "}
          <TestimonialCarousel />
        </div>
        {/* Testimonial End  */}
      </section >
    </>
  );
}
