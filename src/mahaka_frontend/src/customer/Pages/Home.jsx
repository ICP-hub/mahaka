import React, { useEffect, useState, useCallback } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllBanners } from "../../redux/reducers/apiReducers/bannerApiReducer";
import { getAllWahanas } from "../../redux/reducers/apiReducers/wahanaApiReducer";

const VenueCard = ({ venue, layout }) => (
  <Link
    to={`/venues/${venue.id}`}
    className={`shadow-lg rounded-2xl overflow-hidden flex ${layout.flexDirection} ${layout.height}`}
  >
    <div className={`${layout.bgColor} text-white ${layout.textArea}`}>
      <div className={`${layout.padding} h-full flex flex-col justify-between`}>
        <div>
          <h3 className="text-3xl font-black mb-2">{venue.Title}</h3>
          <p className="mb-4 text-[14px] font-normal">{venue.Description}</p>
        </div>
        <div className={`${layout.iconPadding}`}>
          <GoArrowUpRight className="bg-white w-[30px] h-[30px] text-[#E2AF4E] rounded-full p-1" />
        </div>
      </div>
    </div>
    {layout.imageArea && (
      <div className={layout.imageArea}>
        <img
          src={venue.banner.data}
          alt={venue.Title}
          className="object-cover object-center h-full w-full"
        />
      </div>
    )}
  </Link>
);

export default function Home() {
  const { venues, loading } = useSelector((state) => state.venues);
  const { wahanas } = useSelector((state) => state.wahana);
  // console.log("venues in home", venues);
  const { backend } = useSelector((state) => state.authentication);
  const { attractionbanners, banners, bannerLoading } = useSelector(
    (state) => state.banner
  );
  const { testimonials, testimonialLoading } = useSelector(
    (state) => state.testimonial
  );
  const { ongoingEventsLoading, ongoingEvents } = useSelector(
    (state) => state.ongoingevents
  );
  const dispatch = useDispatch();
  //  const { banners } = useSelector((state) => state.banner);
  // console.log("testimonials in home", testimonials);

  // console.log("Attraction Banners home:", attractionbanners);
  // console.log("Third Party Banners home:", banners);

  // console.log(wahanas, "wahanas");

  // const SkeletonLoader = ()=>{

  //   return (
  //     <>
  //     <div className = "p-3">
  //       <div className = "bg-gray-500 h-30 min-w-full">

  //       </div>
  //     </div>

  //     </>
  //   )
  // }

  const chunkArray = (arr, sizes) => {
    let result = [];
    let currentIndex = 0;

    sizes.forEach((size) => {
      result.push(arr.slice(currentIndex, currentIndex + size));
      currentIndex += size;
    });

    return result;
  };

  const layoutConfigs = [
    {
      flexDirection: "flex-row",
      bgColor: "bg-[#E2AF4E]",
      textArea: "w-1/3",
      imageArea: "w-2/3",
      height: "h-[545px]",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-col",
      bgColor: "bg-[#41B2A7]",
      textArea: "h-1/2",
      imageArea: "h-1/2",
      height: "h-[545px]",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-col",
      bgColor: "bg-[#41B2A7]",
      textArea: "h-1/2",
      imageArea: "h-1/2",
      height: "h-full",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-col-reverse",
      bgColor: "bg-[#16B5E3]",
      textArea: "h-2/5",
      imageArea: "h-3/5",
      height: "h-full",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-col",
      bgColor: "bg-[#E2AF4E]",
      textArea: "h-1/2",
      imageArea: "h-1/2",
      height: "h-full",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-row",
      bgColor: "bg-[#E2AF4E]",
      textArea: "w-1/2",
      imageArea: "w-1/2",
      height: "h-[300px]",
      padding: "p-6",
      iconPadding: "mt-4",
    },
    {
      flexDirection: "flex-row",
      bgColor: "bg-[#16B5E3]",
      textArea: "w-1/2",
      imageArea: "w-1/2",
      height: "h-[300px]",
      padding: "p-6",
      iconPadding: "mt-4",
    },
  ];

  const SkeletonLoaderAttraction = () => {
    return (
      <>
        <div className="mx-10 mt-15">
          <div className="bg-gray-400 h-40 md:h-80 rounded-lg min-w-full animate-pulse p-4">
            <div className="flex flex-col md:mt-10 mx-3 ">
              <div className="bg-gray-300 h-4 md:h-5 w-[25%] my-2 rounded-lg"></div>
              <div className="bg-gray-300 h-3 md:h-6 w-[20%]   my-2 rounded-lg"></div>
              <div className="bg-gray-300 h-3 md:h-4 w-[25%] my-2 rounded-lg"></div>
              <div className="bg-gray-300 h-5 md:h-10 w-[14%]  my-2 rounded-lg"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SkeletonLoaderTestimonial = () => {
    return (
      <>
        <div>
          <div className="bg-gray-400 h-50 w-auto rounded-lg animate-pulse shadow-lg"></div>
        </div>
      </>
    );
  };

  const SkeletonLoaderEvents = () => {
    return (
      <>
        <div className="mx-10 mt-15">
          <div className="bg-gray-400 h-40 md:h-80 rounded-lg min-w-full animate-pulse p-4">
            <div className="flex flex-col items-center justify-center md:mt-40 mt-13">
              <div className="bg-gray-300 h-4 md:h-5 w-[25%] my-2 rounded-md"></div>
              <div className="bg-gray-300 h-3 md:h-6 w-[70%]   my-2 rounded-md"></div>
              <div className="bg-gray-300 h-4 md:h-7 w-[10%] my-2 rounded-md"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {attractionbanners && attractionbanners.length === 0 ? (
        <div className="bg-card rounded-lg p-5 text-center mx-10 shadow-lg mt-10 h-100">
          <h1 className="text-3xl md:text-7xl text-gray-800 font-bold md:mt-30">
            No banners Found.
          </h1>
        </div>
      ) : bannerLoading ? (
        <SkeletonLoaderAttraction />
      ) : (
        <HeroSider />
      )}
      <section className="py-12">
        {/* -------------------------------------venues section start------------------------------ */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-8">Our Venues</h2>
          {loading ? (
            <div className="rounded-lg m-2 md:flex   text-center">
              <div className="w-full lg:w-1/2 h-120 m-2 bg-gray-400 animate-pulse rounded-lg"></div>
              <div className="w-full lg:w-1/2 h-120 m-2 bg-gray-400 animate-pulse rounded-lg"></div>

              <div className="w-full lg:w-1/2 h-120 m-2 bg-gray-400 animate-pulse rounded-lg"></div>
            </div>
          ) : venues && venues.length === 0 ? (
            <div className="bg-card rounded-lg p-5 text-center shadow-lg">
              <h1 className="text-4xl text-gray-800 font-bold">
                No venues Found.
              </h1>
            </div>
          ) : (
            <div>
              {/* if length equals 1 */}
              {venues?.length === 1 && (
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl shadow-lg rounded-2xl flex flex-col overflow-hidden">
                    <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                  </div>
                </div>
              )}

              {/* if length equals 2 */}
              {venues?.length === 2 && (
                <>
                  <div className="flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="lg:w-[60%]">
                      <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                    </div>
                    <div className="lg:w-[40%]">
                      <VenueCard venue={venues[1]} layout={layoutConfigs[1]} />
                    </div>
                  </div>
                </>
              )}
              {/* </div> */}

              {/* if length equals 3 */}
              {venues?.length === 3 && (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[33px] mb-12">
                  {venues.map((venue, index) => (
                    <div
                      className="col-span-1 shadow-lg rounded-2xl"
                      style={{ height: layoutConfigs[4].height }}
                      key={venue.id}
                    >
                      <VenueCard
                        venue={venue}
                        layout={layoutConfigs[index + 2]}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* if length equals 4 */}
              {venues?.length === 4 && (
                <>
                  <div className="flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="lg:w-[60%]">
                      <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                    </div>
                    <div className="lg:w-[40%]">
                      <VenueCard venue={venues[1]} layout={layoutConfigs[1]} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[2]} layout={layoutConfigs[6]} />
                    </div>
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[3]} layout={layoutConfigs[5]} />
                    </div>
                  </div>
                </>
              )}

              {/* if length equals 6 */}
              {venues?.length === 6 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[2]} layout={layoutConfigs[6]} />
                    </div>
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[3]} layout={layoutConfigs[5]} />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="lg:w-[60%]">
                      <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                    </div>
                    <div className="lg:w-[40%]">
                      <VenueCard venue={venues[1]} layout={layoutConfigs[1]} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[2]} layout={layoutConfigs[6]} />
                    </div>
                    <div className="col-span-1 shadow-lg rounded-2xl">
                      <VenueCard venue={venues[3]} layout={layoutConfigs[5]} />
                    </div>
                  </div>
                </>
              )}

              {/* if length equals 5 or more than equal to 7 */}
              {/* First Row */}
              {(venues?.length === 5 || venues?.length === 7) && (
                <>
                  {/* First Row */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="lg:w-[60%]">
                      <VenueCard venue={venues[0]} layout={layoutConfigs[0]} />
                    </div>
                    <div className="lg:w-[40%]">
                      <VenueCard venue={venues[1]} layout={layoutConfigs[1]} />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[33px] mb-8">
                    {venues.slice(2, 5).map((venue, index) => (
                      <div
                        className="col-span-1 shadow-lg rounded-2xl"
                        style={{ height: layoutConfigs[4].height }}
                        key={venue.id}
                      >
                        <VenueCard
                          venue={venue}
                          layout={layoutConfigs[index + 2]}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Third Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {venues.slice(5, 7).map((venue, index) => (
                      <div
                        className="col-span-1 shadow-lg rounded-2xl"
                        style={{ height: layoutConfigs[4].height }}
                        key={venue.id}
                      >
                        <VenueCard
                          venue={venue}
                          layout={layoutConfigs[index + 5]}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Additional Rows for Remaining Venues */}
                  {venues?.length > 7 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[33px]">
                      {venues.slice(7).map((venue, index) => (
                        <div
                          className="col-span-1 shadow-lg rounded-2xl mb-8"
                          style={{ height: layoutConfigs[4].height }}
                          key={venue.id}
                        >
                          <VenueCard
                            venue={venue}
                            layout={layoutConfigs[(index % 6) + 1]}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* --------------------------------venues section end-------------------------------- */}

        {/* third party BANNER section start*/}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {bannerLoading ? (
            <div className="my-10 mx-10">
              <div className="bg-gray-400 h-50 w-full px-4 rounded-lg animate-pulse shadow-lg"></div>
            </div>
          ) : banners && banners.length === 0 ? (
            <div className=" bg-card rounded-lg p-5 text-center mt-10 shadow-lg md:h-50">
              <h1 className="text-4xl text-gray-800 font-bold  md:mt-15">
                No Banners Found.
              </h1>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto py-8">
              <h2 className="text-5xl font-bold text-center mb-8">
                Advertisement
              </h2>
              {/* Group banners into chunks of 1, 2, 3 (or more if needed) */}
              {chunkArray(banners, [1, 2, 3]).map((group, index) => (
                <div
                  key={index}
                  className={`grid ${
                    index === 0
                      ? "lg:grid-cols-1 md:grid-cols-1"
                      : index === 1
                      ? "lg:grid-cols-2 md:grid-cols-2"
                      : "lg:grid-cols-3 md:grid-cols-3"
                  } gap-[33px] my-5`}
                >
                  {group.map((banner, bannerIndex) => (
                    <div
                      key={bannerIndex}
                      className="w-full h-[204px] shadow-lg rounded-2xl overflow-hidden"
                    >
                      <a
                        href={
                          banner?.redirectUrl?.startsWith("http")
                            ? banner.redirectUrl
                            : `https://${banner?.redirectUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={banner?.image}
                          alt="banner"
                          className="w-full h-[100%] object-cover object-center"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2 Grid card  end*/}
        {/* OnGoing Event slider Start  */}
        {/* { ongoingEventsLoading?
        <SkeletonLoaderEvents/>
        : ongoingEvents && ongoingEvents.length ===0? "LOading":

        <OngoingSlider />
} */}

        {ongoingEvents && ongoingEvents.length === 0 ? (
          <div className=" bg-card rounded-lg p-5 text-center mt-10 mx-10 shadow-lg">
            <h1 className="text-4xl text-gray-800 font-bold">
              No Ongoing Events Found.
            </h1>
          </div>
        ) : ongoingEventsLoading ? (
          <SkeletonLoaderEvents />
        ) : (
          <>
            <h2 className="text-5xl font-bold text-center mb-8">
              Ongoing events
            </h2>
            <OngoingSlider />
          </>
        )}

        {/* OnGoing Event slider end  */}
        {/* Events and ctivity Section Start  */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
          <section className="flex flex-col justify-center items-center">
            <div className="max-w-4xl text-center">
              <h1 className="text-[48px] font-black">
                What's On: Wahana and Activities
              </h1>
            </div>
          </section>
          {/* cards box start  */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2   gap-[33px] mt-12">
            {/* first Card  start*/}
            {wahanas
              ?.filter((wahana) => wahana.featured)
              ?.map((wahana) => (
                <div className="overflow-hidden" key={wahana.id}>
                  <div className="rounded-2xl w-full h-full shadow-md">
                    <img
                      src={wahana.banner.data}
                      alt={wahana.title}
                      className="object-cover w-full h-120 rounded-2xl"
                    />
                    <div className="p-4">
                      <h1 className="text-3xl font-black">
                        {wahana.ride_title}
                      </h1>
                      <p className="text-base font-normal mt-2">
                        {wahana.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* cards box end  */}
          {/* <section className="flex flex-col justify-center items-center pt-10">
            <button className="px-14 py-3 bg-[#F08E1E] text-white rounded-[10px] font-normal text-base">
              Explore
            </button>
          </section> */}
        </div>
        {/* Events and ctivity Section end  */}
        {/* Testimonial start  */}

        <div className="mt-15">
          {testimonialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5 mx-10">
              <SkeletonLoaderTestimonial />
              <SkeletonLoaderTestimonial />
              <SkeletonLoaderTestimonial />
            </div>
          ) : testimonials && testimonials.length === 0 ? (
            <div className="flex flex-row justify-center">
              <div className="bg-card rounded-lg p-5 text-center mx-10 shadow-lg md:h-50 md:w-[35%]">
                <h1 className="text-3xl text-gray-800 font-bold md:mt-13">
                  No Testimonials Found.
                </h1>
              </div>
            </div>
          ) : (
            <TestimonialCarousel />
          )}
        </div>

        {/* Testimonial End  */}
      </section>
    </>
  );
}
