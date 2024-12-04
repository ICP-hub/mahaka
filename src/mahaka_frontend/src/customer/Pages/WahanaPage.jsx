import Frame13 from "../../assets/images/Frame13.png";
import Ticket from "../../customer/Components/Ticket";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { formatDateAndTime } from "../../admin/pages/EventManager";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModalPopup from "../../common/ModalPopup";
import DatePicker from "../../common/DatePicker";
import VisitorPicker from "../Components/single-event/VisitorPicker";
const ticketData = [
  {
    type: "SINGLE",
    gradientClass: "bg-gradient-to-r from-orange-200 to-orange-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: "Rp. 1,500",
    availability: " ",
    highlightClass: "bg-orange-500",
  },
];
const calculateDuration = (StartDate, EndDate) => {
  const start = new Date(StartDate);
  const end = new Date(EndDate);
  const durationMs = end - start;
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  if (days === 0) return "1 day";
  if (days === 1) return "2 days";
  return `${days + 1} days`;
};

const WahanaPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ModalOne } = ModalPopup();

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const { ids, eventId } = useParams();
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentWahana, loading } = useSelector((state) => state.wahana);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    console.log("Fetched Wahana Data:", currentWahana);
  }, [currentWahana]);

  const eventIds = `${decodeURIComponent(eventId).replace(/_/g, "#")}${
    window.location.hash
  }`;
  const venueId = `${decodeURIComponent(ids).replace(/_/g, "#")}${
    window.location.hash
  }`;

  const navigate = useNavigate();
  const nextpage = (ticket) => {
    const updatedIds = ids.replace(/#/g, "_");
    navigate(`/${ids}/wahanas/${eventId}/payment`);
  };
  console.log("Decoded Venue ID:", venueId);
  console.log("Decoded Wahana ID:", eventIds);

  useEffect(() => {
    if (!venueId || !eventIds) {
      setLocalError("Venue ID or Wahana ID is missing from the URL");
      return;
    }
    if (!backend) {
      setLocalError("Backend is not initialized");
      return;
    }

    dispatch(
      getWahana({ backend, selectedWahana: eventIds, selectedVenue: venueId })
    )
      .unwrap()
      .catch((err) => {
        setLocalError(err.message || "Failed to fetch wahana details");
      });
  }, [backend]);

  // const duration = currentWahana?.details?.StartDate && currentWahana?.details?.EndDate
  // ? calculateDuration(currentWahana.details.StartDate, currentWahana.details.EndDate)
  // : "1 Day";

  const startInterVal = currentWahana?.details?.StartDate
    ? formatDateAndTime(parseInt(currentWahana.details.StartDate))
    : { date: "", time: "" };

  const endInterVal = currentWahana?.details?.EndDate
    ? formatDateAndTime(parseInt(currentWahana.details.EndDate))
    : { date: "", time: "" };

  return (
    <>
      <div className="z-999">
        <ModalOne open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="w-full flex flex-col h-full">
            <h1 className="text-2xl font-medium flex w-full items-center justify-center uppercase py-4">
              Main Gate Pass
            </h1>
            <div className="flex w-full bg-white rounded-b-3xl">
              <div className="py-4 space-y-12 w-full h-full lg:mx-80">
                <DatePicker />
                <VisitorPicker />
              </div>
            </div>
            <Link
              to="/wahana-payment"
              className="flex w-full items-center justify-center mt-auto mb-12"
            >
              <span className="font-medium px-12 py-2 rounded-md bg-secondary text-white text-lg">
                Proceed to checkout
              </span>
            </Link>
          </div>
        </ModalOne>
      </div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <h1 className=" animate-pulse bg-gray-300 rounded-2xl w-32 h-12 font-black mb-10"></h1>
          ) : (
            <h1 className="text-4xl font-black pb-10">
              {currentWahana?.ride_title}
            </h1>
          )}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* left side section  */}
            <div className="lg:w-2/3 ">
              <div className="w-full rounded-2xl relative">
                {loading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="animate-pulse bg-gray-300 rounded-2xl h-90 w-full"></div>
                  </div>
                ) : (
                  <img
                    src={currentWahana?.banner?.data || Frame13}
                    alt={currentWahana?.title || "Event"}
                    className={`h-90 w-full rounded-2xl ${
                      loading ? "hidden" : "block"
                    }`}
                    onLoad={() => setIsLoading(false)}
                  />
                )}
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
                      {loading ? (
                        <>
                          <div className="animate-pulse space-y-4">
                            <div className="bg-gray-300 h-50 rounded-2xl w-full"></div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              nextpage("SINGLE");
                            }}
                          >
                            <Ticket
                              type={ticketData[0].type}
                              gradientClass={ticketData[0].gradientClass}
                              name={ticketData[0].name}
                              description={ticketData[0].description}
                              price={parseInt(currentWahana?.price)}
                              availability={ticketData[0].availability}
                              highlightClass={ticketData[0].highlightClass}
                            />
                          </div>
                        </div>
                      )}
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
                        <div className="space-y-4">
                          <div>{currentWahana.description || " "}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            </div>
            {/* right side section  */}
            {loading ? (
              <div className="lg:w-1/3 h-[340px] w-full shadow-lg rounded-lg sticky top-0">
                <div className="p-8 animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>{" "}
                  {/* Title skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>{" "}
                  {/* Date skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>{" "}
                  {/* Time skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>{" "}
                  {/* Location skeleton */}
                </div>
                <div className="pl-8">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>{" "}
                  {/* Event end date skeleton */}
                </div>
              </div>
            ) : (
              <div className="lg:w-1/3 h-[340px] w-full shadow-lg rounded-lg sticky top-0">
                <div className="p-8">
                  <h1 className="text-2xl font-black">Wahana Details</h1>

                  <h3 className="text-lg font-normal">
                    {" "}
                    IDR {parseInt(currentWahana?.price)}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* bottom crousel section  */}
      </section>
    </>
  );
};

export default WahanaPage;
