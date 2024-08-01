import Frame13 from "../../assets/images/Frame13.png";
import Frame15 from "../../assets/images/Frame15.png";
import fram2 from "../../assets/images/fram2.png";
import Ticket from "../../customer/Components/Ticket";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import MoreEventCard from "../Components/MoreEventCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ticketData = [
  {
    type: "PREMIUM",
    gradientClass: "bg-gradient-to-r from-orange-200 to-orange-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: "Rp. 1,500",
    availability: "AVAILABLE",
    highlightClass: "bg-orange-500",
  },
  {
    type: "VVIP",
    gradientClass: "bg-gradient-to-r from-cyan-200 to-cyan-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: "Rp. 1,500",
    availability: "SOLD OUT",
    highlightClass: "bg-cyan-500",
  },
  {
    type: "GROUP",
    gradientClass: "bg-gradient-to-r from-blue-200 to-blue-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: "Rp. 1,500",
    availability: "3 TICKETS LEFT",
    highlightClass: "bg-blue-500",
  },
  {
    type: "REGULAR",
    gradientClass: "bg-gradient-to-r from-gray-200 to-gray-300",
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: "Rp. 1,500",
    availability: "AVAILABLE",
    highlightClass: "bg-gray-500",
  },
];
export default function SingleEvent() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black pb-10">Event Name</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* left side section  */}
            <div className="lg:w-2/3 ">
              <div className="w-full  rounded-2xl">
                <img
                  src={Frame13}
                  alt="Event"
                  className="object-cover h-full"
                />
              </div>
              <>
                {/* tabs navlink */}
                <div className="mb-4 mt-8">
                  <ul
                    className="flex   justify-around items-center flex-wrap -mb-px text-sm font-medium text-center"
                    role="tablist"
                  >
                    <li className="me-2" role="presentation">
                      <button
                        className={`inline-block text-2xl font-black p-4 border-b-2 rounded-t-lg ${
                          activeTab === "profile"
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => handleTabClick("profile")}
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected={activeTab === "profile"}
                      >
                        Tickets
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className={`inline-block text-2xl font-normal p-4 border-b-2 rounded-t-lg ${
                          activeTab === "dashboard"
                            ? "border-blue-500"
                            : "border-transparent"
                        } `}
                        onClick={() => handleTabClick("dashboard")}
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected={activeTab === "dashboard"}
                      >
                        Description
                      </button>
                    </li>
                  </ul>
                </div>

                {/* tabs  */}
                <div id="default-tab-content">
                  {activeTab === "profile" && (
                    <motion.div
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      transition={{ stiffness: 300 }}
                      className="p-4 "
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <p className="text-lg font-normal">
                        Lorem ipsum dolor sit amet consectetur. Nisl sapien id
                        erat senectus ornare egestas diam vitae tincidunt.
                        Curabitur commodo purus sed accumsan tristique velit
                        volutpat amet.
                      </p>
                      <div>
                        {ticketData.map((ticket, index) => (
                          <Link to="/payment">
                            <Ticket
                              key={index}
                              type={ticket.type}
                              gradientClass={ticket.gradientClass}
                              name={ticket.name}
                              description={ticket.description}
                              price={ticket.price}
                              availability={ticket.availability}
                              highlightClass={ticket.highlightClass}
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "dashboard" && (
                    <motion.div
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      transition={{ stiffness: 300 }}
                      className="p-4 "
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      <div className="p-6 font-sans">
                        <ul className="list-disc list-inside mb-4">
                          <li>
                            <strong>Duration:</strong> 1 Day (approx.)
                          </li>
                          <li>
                            <strong>Location:</strong> Indonesia
                          </li>
                          <li>
                            <strong>Last Entry:</strong> 4:00 PM
                          </li>
                        </ul>
                        <p className="mb-4">
                          This data is taken from the existing zoo website.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <p>
                              Come and visit New Zealand's first zoo to get up
                              close and personal to native treasures and
                              endangered animals from around the world.
                            </p>
                            <p>
                              Child entry applies for 3-14 year olds, and under
                              3s are free. All children under the age of 14 must
                              be accompanied by an adult when visiting the Zoo.
                            </p>
                            <p>
                              Zoo Entry Tickets purchased online are valid for
                              12 months from purchase date. Tickets can also be
                              bought in person at our front entrance.
                            </p>
                            <p>
                              If you are looking for tickets to a special event
                              or current discounted offer, these cannot be
                              booked here. Please visit the relevant event or
                              offer webpage for more information.
                            </p>
                          </div>
                          <div>
                            <p>
                              Come and visit New Zealand's first zoo to get up
                              close and personal to native treasures and
                              endangered animals from around the world.
                            </p>
                            <p>
                              Child entry applies for 3-14 year olds, and under
                              3s are free. All children under the age of 14 must
                              be accompanied by an adult when visiting the Zoo.
                            </p>
                            <p>
                              Zoo Entry Tickets purchased online are valid for
                              12 months from purchase date. Tickets can also be
                              bought in person at our front entrance.
                            </p>
                            <p>
                              If you are looking for tickets to a special event
                              or current discounted offer, these cannot be
                              booked here. Please visit the relevant event or
                              offer webpage for more information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            </div>
            {/* right side section  */}
            <div className="lg:w-1/3 h-[340px] w-full shadow-lg rounded-lg sticky top-0">
              <div className="p-8">
                <h1 className="text-2xl font-black">Event Details</h1>
                <h3 className="text-lg font-normal">13 Jul- 17 Jul 2024</h3>
                <h3 className="text-lg font-normal">12:00AM - 3:00PM</h3>
                <h3 className="text-lg font-normal">Location of the Event</h3>
              </div>
              <h2 className="text-2xl font-normal pl-8">
                Event ends on :{" "}
                <span className="text-red-600">17 July, 2024</span>
              </h2>
            </div>
          </div>
        </div>

        {/* bottom crousel section  */}
        <div className="py-12 mx-auto px-4 sm:px-6 lg:px-8">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-4xl font-black">Check other events</h1>
          </section>

          <div className="max-w-7xl mx-auto ">
            <Swiper
              spaceBetween={40}
              slidesPerView={1}
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
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper px-4 sm:px-6 lg:px-8 mx-auto"
            >
              <SwiperSlide>
                <MoreEventCard color="#E2AF4E" image={Frame15} />
              </SwiperSlide>
              <SwiperSlide>
                <MoreEventCard color="#FF5733" image={Frame15} />
              </SwiperSlide>
              <SwiperSlide>
                <MoreEventCard color="#E2AF4E" image={Frame15} />
              </SwiperSlide>
              <SwiperSlide>
                <MoreEventCard color="#FF5733" image={Frame15} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
