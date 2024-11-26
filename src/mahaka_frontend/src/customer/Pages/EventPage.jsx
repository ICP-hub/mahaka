import Frame13 from "../../assets/images/Frame13.png";
import Frame15 from "../../assets/images/Frame15.png";
import fram2 from "../../assets/images/fram2.png";
import Ticket from "../../customer/Components/Ticket";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDIPdetails } from "../../redux/reducers/apiReducers/dipapireducer";
import { Swiper, SwiperSlide } from "swiper/react";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getEvent } from "../../redux/reducers/apiReducers/eventApiReducer";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import MoreEventCard from "../Components/MoreEventCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModalPopup from "../../common/ModalPopup";
import DatePicker from "../../common/DatePicker";
import VisitorPicker from "../Components/single-event/VisitorPicker";
const ticketData = [
  {
    type: "PREMIUM",
    gradientClass: "bg-gradient-to-r from-orange-200 to-orange-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: " 1,500",
    availability: " 5",
    highlightClass: "bg-orange-500",
  },
  {
    type: "VVIP",
    gradientClass: "bg-gradient-to-r from-cyan-200 to-cyan-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: " 1,500",
    availability: " 4",
    highlightClass: "bg-cyan-500",
  },
  {
    type: "GROUP",
    gradientClass: "bg-gradient-to-r from-blue-200 to-blue-300",
    name: "Ticket Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
    price: " 1,500",
    availability: "3  ",
    highlightClass: "bg-blue-500",
  },
];
const calculateDuration = (StartDate, EndDate) => {
  const start = new Date(
    typeof StartDate === "bigint" ? Number(StartDate) : StartDate
  );
  const end = new Date(typeof EndDate === "bigint" ? Number(EndDate) : EndDate);
  const durationMs = end - start;
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  if (days === 0) return "1 day";
  if (days === 1) return "2 days";
  return `${days + 1} days`;
};

const EventPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ModalOne } = ModalPopup();
  const [ticketDetails, setTicketDetails] = useState(null);
  const { backend } = useSelector((state) => state.authentication);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const { ids, eventId } = useParams();

  // Replace _ with # and append the hash from window.location.hash
  const eventIds = `${decodeURIComponent(eventId).replace(/_/g, "#")}${
    window.location.hash
  }`;
  const venueId = `${decodeURIComponent(ids).replace(/_/g, "#")}${
    window.location.hash
  }`;

  console.log(venueId, eventIds);

  const dispatch = useDispatch();
  const {
    currentVenue,

    error,
  } = useSelector((state) => state.venues);

  const {
    currentEvent,

    eventsLoading: venueLoading,
    error: eventError,
  } = useSelector((state) => state.events);

  const [localError, setLocalError] = useState(null);
  const venue = currentEvent ? currentEvent : null;

  useEffect(() => {
    const fetchTicketDetails = async (venue) => {
      console.log(venue, "venue");
      if (!venue?.event_collectionid) {
        console.error("Venue does not have a collection_id:", venue);
        return;
      }

      try {
        // Fetch ticket details from the actor
        const details = await backend.getDIPdetails(venue?.event_collectionid);
        console.log(details, "ticketDetails");
        setTicketDetails(details);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setTicketDetails(null);
      } finally {
      }
    };
    fetchTicketDetails(currentEvent);
  }, [currentEvent]);

  useEffect(() => {
    if (!venueId) {
      setLocalError("Venue ID is missing from the URL");
      return;
    }

    if (!backend) {
      setLocalError("Backend is not initialized");
      return;
    }

    dispatch(getEvent({ backend, eventIds, venueId }))
      .unwrap()
      .catch((err) => {
        setLocalError(err.message || "Failed to fetch events for the venue");
      });

    try {
      const venuePrincipal = currentEvent.event_collectionid;
      dispatch(getDIPdetails({ backend, principal: venuePrincipal }))
        .unwrap()
        .catch((err) => {
          console.error("Failed to fetch DIP details:", err);
        });
    } catch (error) {
      console.error("Invalid venue Principal:", error);
    }
  }, [dispatch, venueId, backend]);

  // Assuming the first event is the main event for this venue

  const duration =
    venue?.details.StartDate && venue?.details.EndDate
      ? calculateDuration(venue.details.StartDate, venue.details.EndDate)
      : "";

  function formatDate(timestamp) {
    if (typeof timestamp === "bigint") {
      timestamp = Number(timestamp) * 1000; // Convert BigInt to milliseconds
    } else if (typeof timestamp === "number") {
      timestamp = timestamp * 1000; // Convert seconds to milliseconds
    }

    if (!timestamp || isNaN(timestamp)) {
      return "Invalid timestamp";
    }

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function FormatTime(timestamp) {
    if (typeof timestamp === "bigint") {
      timestamp = Number(timestamp) * 1000; // Convert BigInt to milliseconds
    } else if (typeof timestamp === "number") {
      timestamp = timestamp * 1000; // Convert seconds to milliseconds
    }

    if (!timestamp || isNaN(timestamp)) {
      return "Invalid timestamp";
    }

    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

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
              to="/payment"
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
          {venueLoading ? (
            <h1 className=" animate-pulse bg-gray-300 rounded-2xl w-32 h-12 font-black mb-10"></h1>
          ) : (
            <h1 className="text-4xl font-black pb-10">{venue?.title || ""}</h1>
          )}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* left side section  */}
            <div className="lg:w-2/3 ">
              <div className="w-full rounded-2xl relative">
                {venueLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <div className="animate-pulse bg-gray-300 rounded-2xl h-90 w-full"></div>
                  </div>
                ) : (
                  <img
                    src={venue?.banner?.data || Frame13}
                    alt={venue?.title || "Event"}
                    className={`h-90 w-full rounded-2xl ${
                      venueLoading ? "hidden" : "block"
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
                      <div>
                        <div
                          className="cursor-pointer"
                          onClick={handleModalOpen}
                        >
                          <Ticket
                            type={"SINGLE"}
                            gradientClass={ticketData[1].gradientClass}
                            name={"Single Tickets"}
                            description={ticketDetails?.description}
                            price={parseInt(ticketDetails?.sTicket_price) || 1}
                            availability={
                              parseInt(ticketDetails?.sTicket_limit) || 4
                            }
                            highlightClass={ticketData[1].highlightClass}
                          />
                        </div>
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
                            <strong>Duration:</strong>
                            {duration || "1 Day"} (approx.)
                          </li>
                          <li>
                            <strong>Location:</strong>{" "}
                            {venue?.details.Location || "Indonesia"}
                          </li>
                          <li>
                            <strong>Last Entry:</strong>{" "}
                            {(venue?.details.EndTime &&
                              FormatTime(venue.details.EndTime)) ||
                              "4:00 PM"}
                          </li>
                        </ul>

                        <div className="space-y-4">{venue.description}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            </div>
            {/* right side section  */}
            {venueLoading ? (
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
                  <h1 className="text-2xl font-black">Event Details</h1>
                  <h3 className="text-lg font-normal">
                    {" "}
                    {venue?.details.StartDate &&
                      formatDate(venue.details.StartDate)}{" "}
                    -
                    {(venue?.details.EndDate &&
                      formatDate(venue.details.EndDate)) ||
                      "13 Jul- 17 Jul 2024"}
                  </h3>
                  <h3 className="text-lg font-normal">
                    {venue?.details.StartTime &&
                      FormatTime(venue.details.StartTime)}{" "}
                    -
                    {(venue?.details.EndTime &&
                      FormatTime(venue.details.EndTime)) ||
                      "12:00AM - 3:00PM"}
                  </h3>
                  <h3 className="text-lg font-normal">
                    Location of the Venue - {venue?.details.Location}
                  </h3>
                </div>
                <h2 className="text-2xl font-normal pl-8">
                  Venue ends on :{" "}
                  <span className="text-red-600">
                    {(venue?.details.EndDate &&
                      formatDate(venue.details.EndDate)) ||
                      "17 July, 2024"}
                  </span>
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* bottom crousel section  */}
      </section>
    </>
  );
};

export default EventPage;
