import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  HiArrowRightCircle,
  HiCheckBadge,
  HiChevronDown,
  HiChevronRight,
  HiChevronUp,
  // HiClock,
  HiMiniMapPin,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
// import img1 from "../../assets/images/frame3.png";
// import img2 from "../../assets/images/fram6.png";
import { AnimatePresence, motion } from "framer-motion";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import CreateEventForm from "../components/CreateEventForm";
import {
  deleteEvent,
  getAllEventsByVenue,
  getAllEventsPaginated,
  searchEvents,
} from "../../redux/reducers/apiReducers/eventApiReducer";
import {
  createStaggerContainer,
  createStaggerVariant,
} from "../../common/animationVariants";
import { IoTrashBinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Pagination from "../../common/components/Pagination";

// Timstamp convert
export function formatDateAndTime(timestamp) {
  let adjustedTimestamp = timestamp;

  // Determine timestamp precision and adjust to milliseconds
  if (String(timestamp).length === 13) {
    // Milliseconds
    adjustedTimestamp = timestamp;
  } else if (String(timestamp).length === 10) {
    // Seconds
    adjustedTimestamp = timestamp * 1000;
  } else if (String(timestamp).length === 19) {
    // Nanoseconds
    adjustedTimestamp = Math.floor(timestamp / 1_000_000);
  }

  const dateObject = new Date(adjustedTimestamp);

  // Format the date and time
  const date = dateObject.toDateString();
  const time = dateObject.toLocaleTimeString("en-GB", { hour12: false });

  return {
    date: date,
    time: time,
  };
}

// Main component
const EventManager = () => {
  const { venues } = useSelector((state) => state.venues);
  const {
    events,
    eventByVenue,
    eventsLoading,
    singleEventLoading,
    searchedEvents,
    searchEventLoading,
    currentPage,
    totalPages,
  } = useSelector((state) => state.events);
  const { backend } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState({
    option: "All",
    id: "",
  });
  const { eventlistPageNum } = useSelector((state) => state.pagination);
  const toggleOptionMenu = () => setIsOptionMenuOpen((pv) => !pv);
  const handleSelectOption = (option, id) => {
    setSelectedVenue((pv) => ({ ...pv, option: option, id: id }));
    setIsOptionMenuOpen(false);
  };
  const isVenMounted = useRef(false);

  // Filtered : memoized
  const filteredEvents = useMemo(() => {
    if (searchText && searchPerformed) return searchedEvents;
    if (selectedVenue.option === "All") {
      return events;
    } else {
      return eventByVenue;
    }
  }, [
    selectedVenue,
    events,
    eventByVenue,
    searchText,
    searchedEvents,
    searchPerformed,
  ]);

  const memoizedPagination = useMemo(() => {
    if (searchText.length === 0) {
      return { currentPage: currentPage, totalPages: totalPages };
    }
  }, [searchText]);

  useEffect(() => {
    setSearchPerformed(false);
  }, [searchText]);

  useEffect(() => {
    if (isVenMounted.current) {
      if (selectedVenue.option !== "All") {
        dispatch(
          getAllEventsByVenue({
            backend,
            chunkSize: 6,
            pageNo: eventlistPageNum - 1,
            venueId: selectedVenue.id,
          })
        );
      } else {
        dispatch(
          getAllEventsPaginated({
            backend: backend,
            pageLimit: 6,
            currPage: eventlistPageNum - 1,
          })
        );
      }
    } else {
      isVenMounted.current = true;
    }
  }, [selectedVenue, eventlistPageNum]);

  // console.log("filtered", filteredEvents);
  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchPerformed(true);
      dispatch(
        searchEvents({
          backend,
          searchText,
          chunkSize: 10,
          pageNo: 0,
        })
      );
    }
  };

  const containerVariants = createStaggerContainer(0.4);
  const cardVariants = createStaggerVariant(0.3);

  return (
    <div className="flex flex-auto flex-col relative min-h-screen">
      <div className="flex min-w-0 flex-col">
        <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
          <svg
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 pointer-events-none"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
              className="text-gray-700 opacity-25"
            >
              <circle r="234" cx="196" cy="23"></circle>
              <circle r="234" cx="790" cy="491"></circle>
            </g>
          </svg>
          <div className="relative z-10 flex flex-col items-center text-text">
            <div className="text-xl font-semibold">MAHAKA'S</div>
            <div className="mt-1 text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              EXCLUSIVE EVENTS
            </div>
          </div>
        </div>
        <div className="flex flex-auto p-6 sm:p-10">
          <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
            <div className="flex w-full max-w-xs flex-col sm:items-center sm:max-w-none sm:flex-row">
              <div className="sm:w-36 bg-card rounded-xl p-4 relative cursor-pointer">
                <div className="flex flex-auto">
                  <div className="flex flex-col absolute top-0 inset-x-0 rounded-xl bg-card z-20">
                    <div className="flex justify-between">
                      <div className="w-full">
                        <div
                          className="p-4 truncate"
                          onClick={toggleOptionMenu}
                        >
                          {selectedVenue.option}
                        </div>
                        {isOptionMenuOpen && (
                          <>
                            {["All", ...venues.map(({ Title }) => Title)].map(
                              (option) => {
                                if (option === selectedVenue.option) {
                                  return null;
                                }

                                return (
                                  <div
                                    key={option}
                                    className="py-4 hover:bg-hover last:rounded-b-xl"
                                    onClick={() => {
                                      if (option === "All") {
                                        handleSelectOption(option, "");
                                      } else {
                                        const venue = venues.find(
                                          ({ Title }) => Title === option
                                        );
                                        handleSelectOption(option, venue.id);
                                      }
                                    }}
                                  >
                                    <div className="px-4">{option}</div>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center">#</div>
                </div>
              </div>
              <div className="mt-4 w-full sm:ml-4 sm:mt-0 sm:w-72 bg-card p-4 rounded-xl">
                <div className="relative flex items-center flex-auto">
                  <div>
                    <HiOutlineMagnifyingGlass size={24} />
                  </div>
                  <div className="w-full mx-1">
                    <input
                      type="text"
                      placeholder="Search for events..."
                      className="outline-none bg-transparent w-full"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                  <div className="ml-auto">
                    <HiArrowRightCircle
                      size={24}
                      className="cursor-pointer"
                      onClick={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto mt-4 sm:mt-0 flex items-center justify-center w-full sm:w-fit h-full">
                <div
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer w-full text-white p-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add a new event
                </div>
              </div>
            </div>
            {eventsLoading || singleEventLoading || searchEventLoading ? (
              <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            ) : filteredEvents && filteredEvents.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div key={index} variants={cardVariants}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              totalPages === 0 && (
                <div className="text-center text-gray-500 md:text-5xl text-3xl font-bold mt-10">
                  No Events Found
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {!eventsLoading && !singleEventLoading && !searchEventLoading && (
        <div className="mt-auto">
          <Pagination
            base="eventlistPageNum"
            currentPage={currentPage}
            totalPage={totalPages}
          />
        </div>
      )}

      {/* Create event modal */}
      {isModalOpen && (
        <ModalOverlay
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Create Event"
        >
          <CreateEventForm setIsModalOpen={setIsModalOpen} />
        </ModalOverlay>
      )}
    </div>
  );
};

// event cards
const EventCard = ({ event }) => {
  const statusLogo = Object.keys(event.status);
  //console.log("Keys in status:", statusLogo);

  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const startInterVal = formatDateAndTime(parseInt(event.details.StartDate));
  // const endInterVal = formatDateAndTime(parseInt(event.details.EndDate));
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteEvent = () => {
    dispatch(
      deleteEvent({
        backend: backend,
        venueId: event.venueId,
        eventId: event.id,
        setIsDelete: setIsDelete,
      })
    );
  };

  // console.log("start", startInterVal);
  // console.log("end", endInterVal);

  return (
    <>
      {isDelete && (
        <DeleteEventModal
          closeModal={() => setIsDelete(false)}
          onEventDelete={handleDeleteEvent}
        />
      )}

      <div className="bg-card flex min-h-96 max-h-fit flex-col rounded-2xl">
        <div className="relative">
          <div className="absolute -right-2 -top-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-error flex items-center justify-center"
              onClick={() => setIsDelete(true)}
            >
              <IoTrashBinSharp size={16} className="text-white" />
            </motion.button>
          </div>
          <div className="absolute top-4 left-4 rounded-full p-1 border border-indigo-200 h-12 w-12 overflow-hidden">
            <img
              src={event.logo.data}
              alt="logo_img"
              className="object-cover h-full w-full rounded-full"
            />
          </div>
          <div className="h-60 w-full border border-white rounded-t-2xl overflow-hidden">
            <img
              src={event.banner.data}
              alt="banner_img"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50 truncate">
              {event.venueId.split("#")[0]}
            </div>
            <div className="flex items-center">
              <div
                className={`${
                  statusLogo[0] === "Ongoing"
                    ? "text-green-800 bg-green-100 rounded-full px-2 py-0.5 text-sm font-semibold"
                    : statusLogo[0] === "AboutToStart"
                    ? "text-yellow-800  bg-yellow-100 rounded-full px-2 py-0.5 text-sm font-semibold"
                    : "text-red-800  bg-red-100 rounded-full px-2 py-0.5 text-sm font-bold"
                }`}
              >
                {statusLogo}
              </div>
            </div>
          </div>
          <div className="mt-4 text-lg font-medium capitalize">
            {event.title}
          </div>
          <div className="flex items-center text-md leading-5 mt-2 font-medium">
            <div>Creator</div>
            <div className="ml-1.5 truncate">{event.creator.toText()}</div>
          </div>
          {/* <div className="text-secondary mt-0.5 line-clamp-2">
            {event.description}
          </div> */}
          <div className="flex items-center text-md leading-5 mt-2 uppercase font-medium">
            <HiMiniMapPin size={14} />
            <div className="ml-1.5">{event.details.Location}</div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col font-medium">
              <div>Start Date</div>
              <div>{startInterVal.date}</div>
              <div>{startInterVal.time}</div>
            </div>
            <Link
              to={`/admin/events/event/${encodeURIComponent(
                event.venueId
              )}/${encodeURIComponent(event.id)}`}
              className="h-8 w-8 rounded-full hover:bg-hover flex items-center justify-center"
            >
              {/* {isExpanded ? <HiChevronUp /> : <HiChevronDown />} */}
              <HiChevronRight />
            </Link>
          </div>
        </div>
        {/* <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <div className="border-t border-border p-4">
                <div className="flex justify-between">
                  <div className="flex flex-col font-medium w-1/2">
                    <div>End Date</div>
                    <div>{endInterVal.date}</div>
                    <div>{endInterVal.time}</div>
                  </div>
                  <div className="flex flex-col font-medium w-1/2">
                    <div>Event ID</div>
                    <div className="text-xs">{event.id}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="font-medium">Ticket Limits</div>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    <div className="p-2 flex flex-col rounded-md font-medium bg-gray-300 text-slate-900">
                      <div className="flex items-center justify-center">
                        GENERAL
                      </div>
                      <div className="flex items-center justify-center">
                        {parseInt(event.gTicket_limit)}
                      </div>
                    </div>
                    <div className="p-2 flex flex-col rounded-md font-medium bg-gray-300 text-slate-900">
                      <div className="flex items-center justify-center">
                        STUDENT
                      </div>
                      <div className="flex items-center justify-center">
                        {parseInt(event.sTicket_limit)}
                      </div>
                    </div>
                    <div className="p-2 flex flex-col rounded-md font-medium bg-gray-300 text-slate-900">
                      <div className="flex items-center justify-center">
                        VIP
                      </div>
                      <div className="flex items-center justify-center">
                        {parseInt(event.vTicket_limit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </>
  );
};

// Loader
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col p-4 bg-gray-400 rounded-xl shadow-md min-h-96">
      {/* title and delete btn */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-600 w-11 h-11 rounded-full"></div>
      </div>

      {/* Bottom section*/}
      <div className="space-y-2 mt-auto">
        <div className="flex">
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-600 rounded w-10 ml-auto"></div>
        </div>
        <div className="h-2 bg-gray-600 rounded w-1/2 my-5"></div>
        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-10 "></div>
        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

// Delete modal
export const DeleteEventModal = ({ closeModal, onEventDelete }) => {
  const { deleteEventLoader } = useSelector((state) => state.events);
  return (
    <div className="fixed inset-0 z-999 flex items-center rounded justify-center bg-black bg-opacity-50">
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl mb-4">
          Are you sure you want to delete this event?
        </h2>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-xl mr-4"
            disabled={deleteEventLoader}
            onClick={onEventDelete}
          >
            {deleteEventLoader ? "Deleting..." : "Delete"}
          </button>
          <button className="px-4 py-2" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventManager;

// const EventManager = () => {
//   const dispatch = useDispatch();
//   const { backend } = useSelector((state) => state.authentication);
//   const { events, eventsLoading, totalPages, currentPage } = useSelector(
//     (state) => state.events
//   );
//   console.log("logging the loadign for events are", events);
//   const { venues } = useSelector((state) => state.venues);
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   console.log("selected venue is ", selectedVenue);
//   const [searchInput, setSearchInput] = useState("");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (searchInput) {
//       dispatch(
//         searchEvents({
//           backend,
//           searchText: searchInput,
//           chunkSize: 1,
//           pageNo: page - 1,
//         })
//       );
//     } else {
//       dispatch(getAllEvents({ backend, chunkSize: 1, pageNo: page - 1 }));
//     }
//   }, [searchInput, dispatch, page]);

//   useEffect(() => {
//     if (selectedVenue) {
//       setPage(1);
//     }
//   }, [selectedVenue]);

//   useEffect(() => {
//     dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
//   }, [dispatch, backend]);

//   useEffect(() => {
//     if (selectedVenue) {
//       // setSpinner(true)
//       fetchEvents(selectedVenue);
//     } else {
//       dispatch(getAllEvents({ backend, chunkSize: 1, pageNo: page - 1 }));
//       console.log("logging the loading for events are", events);
//     }
//   }, [selectedVenue, page]);

//   const fetchEvents = (venueId) => {
//     dispatch(
//       getAllEventsByVenue({
//         backend,
//         chunkSize: 1,
//         pageNo: page - 1,
//         venueId: venueId,
//       })
//     );
//   };

//   // handle page
//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   return (
//     <div className="relative h-full">
//       <div className="absolute inset-0 flex min-w-0 flex-col overflow-y-auto">
//         <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
//           <svg
//             viewBox="0 0 960 540"
//             width="100%"
//             height="100%"
//             preserveAspectRatio="xMidYMax slice"
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute inset-0 pointer-events-none"
//           >
//             <g
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="100"
//               className="text-gray-700 opacity-25"
//             >
//               <circle r="234" cx="196" cy="23"></circle>
//               <circle r="234" cx="790" cy="491"></circle>
//             </g>
//           </svg>
//           <div className="relative z-10 flex flex-col items-center text-text">
//             <div className="text-xl font-semibold">MAHAKA'S</div>
//             <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
//               Event
//             </div>
//           </div>
//         </div>

//         <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row mt-5">
//           <select
//             value={selectedVenue || ""}
//             onChange={(e) => setSelectedVenue(e.target.value)}
//             className="bg-card text-icon px-4 min-h-12 rounded-full border border-border sm:w-36"
//           >
//             <option value="" className="min-h-12">
//               All Events
//             </option>
//             {venues?.map((venues) => (
//               <option key={venues.id} value={venues.id} className="min-h-12">
//                 {venues.Title}
//               </option>
//             ))}
//           </select>
//           <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[68%] md:min-w-[55%] rounded-full border border-border flex items-center bg-card text-icon">
//             <HiMagnifyingGlass size={20} />
//             <input
//               type="text"
//               placeholder="Search Events"
//               className=" bg-transparent outline-none ml-4 lg:w-1000px"
//               search={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* displaying the events  */}
//         {eventsLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <SkeletonLoader />
//             <SkeletonLoader />
//             <SkeletonLoader />
//           </div>
//         ) : events && events.length === 0 ? (
//           <div className="text-center text-gray-500 md:text-5xl text-3xl font-bold mt-10">
//             No events found!
//           </div>
//         ) : (
//           <div className="mt-8 grid grid-cols-1 mx-5 my-5 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
//             {events?.map((event) => (
//               <EventCard
//                 key={event.id}
//                 event={{
//                   ...event,
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* pagination */}
//         <div className="flex justify-end m-6 items-center space-x-2">
//           {/* Prev button */}
//           <button
//             className={`px-3 py-1 rounded ${
//               page === 1
//                 ? "bg-card text-gray-500 cursor-not-allowed"
//                 : "bg-gray-200"
//             }`}
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page === 1}
//           >
//             Prev
//           </button>

//           {/* Page number buttons */}
//           {Array.from({ length: Number(totalPages) }, (_, i) => i + 1).map(
//             (pageNum) => (
//               <button
//                 key={pageNum}
//                 className={`mx-1 px-3 py-1 rounded ${
//                   page === pageNum ? "bg-[#564BF1] text-white" : "bg-gray-200"
//                 }`}
//                 onClick={() => handlePageChange(pageNum)}
//               >
//                 {pageNum}
//               </button>
//             )
//           )}

//           {/* Next button */}
//           <button
//             className={`px-3 py-1 rounded bg-card`}
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === Number(totalPages)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// //   Event card
// const EventCard = ({ event }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   return (
//     <div className=" rounded-lg shadow-md overflow-hidden border border-gray-300">
//       <div className="relative h-48 w-full">
//         <img
//           src={event.banner.data}
//           alt={`${event.title} banner`}
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute top-4 left-4">
//           <div className="h-12 w-12 rounded-full  p-1">
//             <img
//               src={event.logo.data}
//               alt={`${event.title} logo`}
//               className="h-full w-full rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-lg font-semibold ">{event.title}</h3>
//             <p className="text-sm ">{event.details.Location}</p>
//           </div>
//           <span
//             className={`px-2 py-1 text-sm rounded-full ${
//               event.active
//                 ? "bg-green-100 text-green-800"
//                 : "bg-gray-100 text-green-800"
//             }`}
//           >
//             {event.active ? "Active" : "Active"}
//           </span>
//         </div>

//         <p className="text-sm  line-clamp-2 mb-4">{event.description}</p>

//         <div className="flex justify-between items-center mb-2">
//           <div>
//             <p className="text-sm font-medium ">Start Date</p>
//             <p className="text-sm ">{formatDate(event.details.StartDate)}</p>
//           </div>
//           <button
//             className="p-2 hover:bg-gray-700 rounded-full transition-colors"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             <svg
//               className={`w-5 h-5 transform transition-transform ${
//                 isExpanded ? "rotate-180" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </button>
//         </div>

//         {isExpanded && (
//           <div className="space-y-4 pt-4 border-t border-gray-200 ">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-medium ">End Date</p>
//                 <p className="text-sm ">{formatDate(event.details.EndDate)}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium ">Event ID</p>
//                 <p className="text-sm ">{event.id}</p>
//               </div>
//             </div>

//             <div>
//               <p className="text-sm font-medium mb-2">Ticket Limits</p>
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">General</p>
//                   <p className="text-sm">{parseInt(event.gTicket_limit)}</p>
//                 </div>
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">Student</p>
//                   <p className="text-sm">{parseInt(event.sTicket_limit)}</p>
//                 </div>
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">VIP</p>
//                   <p className="text-sm">{parseInt(event.vTicket_limit)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// skeleton loader
// const SkeletonLoader = () => {
//   return (
//     <div className="animate-pulse flex flex-col p-4 bg-gray-300 rounded-lg shadow-md min-w-65 min-h-80 mt-8 mx-5 my-5">
//       {/* title and delete btn */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="bg-gray-400 w-11 h-11 rounded-full"></div>
//       </div>

//       {/* Bottom section*/}
//       <div className="space-y-2 mt-auto">
//         <div className="flex">
//           <div className="h-4 bg-gray-400 rounded w-1/2"></div>
//           <div className="h-4 bg-gray-400 rounded w-10 ml-auto"></div>
//         </div>
//         <div className="h-2 bg-gray-400 rounded w-1/2 my-5"></div>
//         <div className="h-2 bg-gray-400 rounded w-1/2"></div>
//         <div className="h-4 bg-gray-400 rounded w-10 "></div>
//         <div className="h-2 bg-gray-400 rounded w-1/2"></div>
//       </div>
//     </div>
//   );
// };

// export default EventManager;
