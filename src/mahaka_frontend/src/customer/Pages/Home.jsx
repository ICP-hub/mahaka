import React, { useEffect, useState, useCallback  } from "react";
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
import { useSelector,useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllBanners } from "../../redux/reducers/apiReducers/bannerApiReducer";


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
  console.log("venues in home",venues)
  const { backend } = useSelector((state) => state.authentication);
   const {banners} = useSelector((state)=>state.banner)
   console.log("banners in home", banners?.title)
  const dispatch = useDispatch();

 //console.log("banners is home", banners)



//  third party banners
  useEffect(() => {

    const fetchBanners = async (category)=>{
      try{
        await dispatch(getAllBanners({backend, category}))
      }catch(e){
        console.log("error in fetching banners",e)
      }
  
    }
      console.log("logging in home")
     // dispatch(getAllBanners ({backend, category}))
     fetchBanners({ ThirdParty: null }) 
    
  }, [backend, dispatch]);




  console.log("Venues in Home:", venues);
  console.log("Banners in Home:", banners);


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

  return (
    <>
      <HeroSider />
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

            {banners.map((banner)=>(
               <div className="w-full  h-[204px]  shadow-lg rounded-2xl overflow-hidden">
                <h1 className = "text-gray-600 mx-2 my-2 text-xl font-bold">{banner.title}</h1>
                {/* <p className ="text-slate-700 mx-2 my-2">{banner?.description}</p> */}
               <img
                 src={banner?.image}
                 alt="image"
                 className="w-full  h-[100%] object-cover object-center"
               />
             </div>

            ))}

              </div>
            {/* card 1 */}
            {/* <div className="w-full  h-[204px]  shadow-lg rounded-2xl overflow-hidden"> */}
              {/* <img
                src={SocialMedia}
                alt="image"
                className="w-full  h-[204px] object-cover object-center"
              /> */}
            {/* </div> */}
            {/* card 2 */}
            {/* <div className="w-full  h-[204px] shadow-lg rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 to-gray-900 ">
              <img
                src={fram6}
                alt="image"
                className="object-contain object-center h-[100%]"
              />
            </div> */}
            {/* card 3 */}
            {/* <div className="w-full  h-[204px]  shadow-lg rounded-2xl overflow-hidden  bg-gray-950">
              <img
                src={Group16}
                alt="image"
                className="object-contain object-center h-[100%] w-full"
              />
            </div> */}
         
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
      </section>
    </>
  );
}
