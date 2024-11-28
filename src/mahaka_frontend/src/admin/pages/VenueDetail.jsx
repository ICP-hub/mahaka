import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";

import { HiArrowLeftCircle, HiOutlineMapPin } from "react-icons/hi2";
// import { formatDateAndTime } from "./EventManager";

const VenueDetailPage = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentVenue, loading } = useSelector((state) => state.venues);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVenue({ backend, venueId: id }));
  }, []);

  if (loading || !currentVenue) return <LoadingScreen />;

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <img
          src={currentVenue.banner.data}
          alt="framer_3"
          className="absolute inset-0 h-full w-full object-cover"
        ></img>
        <Link
          to="/admin/venues"
          className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6 z-20 relative"
        >
          <HiArrowLeftCircle size={48} />
        </Link>
      </div>
      <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="-mt-16 flex flex-auto items-end">
            <div className="ring-bg-card flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
              <img
                src={currentVenue.logo.data}
                alt="frame_4"
                className="h-full w-full object-cover"
              ></img>
            </div>
            {/* <div className="mb-1 ml-auto flex items-center">
              <button className="bg-indigo-600 flex items-center justify-center min-h-10 px-4 rounded-full text-white">
                Edit Venue
              </button>
            </div> */}
          </div>
          <div className="mt-3 truncate text-4xl font-bold">
            {currentVenue.Title}
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-icon px-3 py-1 leading-normal text-white dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium">
                Creator : {currentVenue.creator.toText()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <HiOutlineMapPin size={24} />
              <div className="ml-6 leading-6">
                {currentVenue.Details.Location}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p>Maximum Capacity</p>
              <div className="ml-6 leading-6 font-medium">
                {parseInt(currentVenue.capacity)}
              </div>
            </div>
            {/* <div className="flex sm:items-center">
              <p>Start Date</p>
              <div className="ml-6 leading-6">Nov 25, 2024</div>
            </div>
            <div className="flex sm:items-center">
              <p>End Date</p>
              <div className="ml-6 leading-6">Nov 28, 2024</div>
            </div> */}
            <div className="flex sm:items-center">
              <p>Venue id</p>
              <div className="ml-6 leading-6">{currentVenue.id}</div>
            </div>
            {/* <div className="flex sm:items-center">
              <p>Total events</p>
              <div className="ml-6 leading-6 font-medium">
                {currentVenue.Events[0].length}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p>Total wahanas</p>
              <div className="ml-6 leading-6 font-medium">
                {currentVenue.Wahanas[0].length}
              </div>
            </div> */}
            <div className="flex">
              <p>Venue Description</p>
              <div className="prose prose-sm ml-6 max-w-none">
                <p>{currentVenue.Description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <div className="h-full w-full bg-gray-300 animate-pulse"></div>
        <div className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6">
          <div className="h-8 w-8 rounded-full animate-pulse bg-gray-300"></div>
        </div>
      </div>
      <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="-mt-16 flex flex-auto items-end">
            <div className="ring-gray-500 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
              <div className="h-full w-full bg-gray-300"></div>
            </div>
            <div className="mb-1 ml-auto flex items-center">
              <button className="bg-gray-300 animate-pulse text-gray-300 flex items-center justify-center min-h-10 px-4 rounded-full">
                Edit Venue
              </button>
            </div>
          </div>
          <div className="mt-3 truncate text-4xl font-bold">
            <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
              Venue one
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="prose prose-sm ml-6 max-w-none">
                <p className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  In amet voluptate ad eiusmod cupidatat nulla sunt eu amet
                  occaecat qui cillum occaecat tempor minim nostrud ullamco amet
                  elit aliquip est nisi officia lorem occaecat ea lorem officia
                  veniam.
                </p>
                {/* <p className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Nulla tempor id excepteur irure do do veniam eiusmod esse
                  ipsum sint dolore commodo enim officia nulla nulla proident in
                  dolor et aliquip sit nulla sit proident duis aute deserunt.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage;
// const FormatTime = (nanoseconds) => {
//   // Input validation
//   if (!nanoseconds && nanoseconds !== 0) {
//     return "Invalid input";
//   }
//   try {
//     const totalMinutes = Math.floor(Number(nanoseconds) / (60 * 1000000000));
//     // Validate range (24 hours in minutes = 1440)
//     if (totalMinutes < 0 || totalMinutes >= 1440) {
//       return "Time out of range";
//     }
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;
//     const period = hours >= 12 ? "PM" : "AM";
//     let formattedHours = hours % 12;
//     formattedHours = formattedHours === 0 ? 12 : formattedHours;
//     const displayHours = formattedHours.toString().padStart(2, "0");
//     const displayMinutes = minutes.toString().padStart(2, "0");
//     return `${displayHours}:${displayMinutes} ${period}`;
//   } catch (error) {
//     return "Invalid time format";
//   }
// };

// const VenueDetailPage = () => {
//   const { title, id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentVenue, loading, createVenueLoader, error } = useSelector(
//     (state) => state.venues
//   );
//   const { events } = useSelector((state) => state.events);
//   const { backend } = useSelector((state) => state.authentication);
//   const [localError, setLocalError] = useState(null);

//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [isEventModalOpen, setIsEventModalOpen] = useState(false); // New state for event modal
//   console.log(events);
//   useEffect(() => {
//     if (!id) {
//       setLocalError("Venue ID is missing from the URL");
//       return;
//     }

//     if (!backend) {
//       setLocalError("Backend is not initialized");
//       return;
//     }

//     dispatch(getVenue({ backend, venueId: id }))
//       .unwrap()
//       .catch((err) => {
//         setLocalError(err.message || "Failed to fetch venue details");
//       });

//     dispatch(
//       getAllEventsByVenue({ backend, chunkSize: 100, pageNo: 0, venueId: id })
//     )
//       .unwrap()
//       .then((events) => {
//         if (events.length === 0) {
//           console.log("No events found for the venue.");
//         }
//       })
//       .catch((err) => {
//         if (err.message === "No event found in the venue") {
//           console.log("No events found for this venue.");
//         } else {
//           setLocalError(err.message || "Failed to fetch events for the venue");
//         }
//       });
//   }, [dispatch, id, backend]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // if (error || localError) {
//   //   return (
//   //     <div className="p-6">
//   //       <h1 className="text-2xl font-bold mb-4">Error</h1>
//   //       <p>{error || localError}</p>
//   //       <button
//   //         className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//   //         onClick={() => navigate('/admin/venues')}
//   //       >
//   //         Back to Venues List
//   //       </button>
//   //     </div>
//   //   );
//   // }

//   const venue =
//     currentVenue && Array.isArray(currentVenue) ? currentVenue : null;

//   if (!venue) {
//     return <div className="p-6">No venue data available.</div>;
//   }

//   return (
//     <>
//       <div className="p-5 tracking-wide">
//         <div className="flex justify-left mb-2">
//           <button
//             className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
//             onClick={() => navigate("/admin/venues")}
//           >
//             <HiArrowLongLeft size={20} />
//           </button>
//         </div>
//         <div className="flex flex-col md:flex-row items-start md:items-center mb-6 ">
//           <div className="w-full md:w-1/2 h-64 bg-gray-200 mb-4 md:mb-0 rounded-lg shadow-lg">
//             <img
//               src={venue.banner.data ? venue.banner.data : VenueDemoImg}
//               alt="Venue Banner"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//           <div className="w-full md:w-1/2 md:pl-8">
//             <h1 className="text-5xl font-bold mb-4">{venue.Title}</h1>
//             <div className="mb-2 leading-relaxed">
//               <p className="text-lg">
//                 <strong>📅 </strong>
//                 {formatDate(venue.Details.StartDate)} -{" "}
//                 {formatDate(venue.Details.EndDate)}
//               </p>
//             </div>
//             <div className="mb-2 leading-relaxed">
//               <p className="text-lg">
//                 <strong>🕒 </strong>
//                 {FormatTime(venue.Details.StartTime)} -{" "}
//                 {FormatTime(venue.Details.EndTime)}
//               </p>
//             </div>
//             <div className="mb-2 leading-relaxed">
//               <p className="text-lg">
//                 <strong>Location:</strong> {venue.Details.Location}
//               </p>
//             </div>
//             {/* <button
//               className="px-4 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
//               onClick={() => setIsUpdateModalOpen(true)}
//             >
//               Update Venue
//             </button> */}
//           </div>
//         </div>
//         <hr className="border-gray-300 my-6" />

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Description</h2>
//           <p>{venue.Description}</p>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Capacity</h2>
//           <p>
//             {venue.capacity
//               ? venue.capacity.toString()
//               : "Capacity information not available."}
//           </p>
//         </div>
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Venue ID</h2>
//           <p>{venue.id}</p>
//         </div>
//         {/* <button
//           className="px-4 py-2 mb-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
//           onClick={() => setIsEventModalOpen(true)}
//         >
//           Create Event
//         </button> */}
//         {/* <EventCardGrid eventArr={events} /> */}
//         {/* <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Events</h2>
//           {events.length > 0 ? (
//             <div>
//               {events.map((event) => (
//                 <div
//                   key={event.id}
//                   className="border border-gray-300 p-4 mb-4 rounded flex items-start"
//                 >
//                   <img
//                     src={event.banner.data}
//                     alt={`${event.title} banner`}
//                     className="w-32 h-32 rounded mb-4 mr-4"
//                   />
//                   <div>
//                   <h3 className="text-lg font-semibold">{event.title}</h3>
//                   <p>
//                     <strong>📅</strong> {formatDate(event.details.StartDate)} -{" "}
//                     {formatDate(event.details.EndDate)}
//                   </p>
//                   <p>
//                     <strong>🕒</strong> {FormatTime(event.details.StartTime)} -{" "}
//                     {FormatTime(event.details.EndTime)}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {event.details.Location}
//                   </p>
//                   <p>
//                     <strong>Description:</strong> {event.description}
//                   </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>
//               <p>No events available for this venue.</p>
//             </div>
//           )}

//           <button
//             className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
//             onClick={() => setIsEventModalOpen(true)}
//           >
//             Create Event
//           </button>
//         </div>*/}
//       </div>

//       {/* Modal for updating the venue */}
//       {isUpdateModalOpen && (
//         <ModalOverlay
//           isOpen={isUpdateModalOpen}
//           setIsOpen={setIsUpdateModalOpen}
//           title="Update Venue"
//         >
//           <UpdateVenueForm
//             venue={venue}
//             setIsModalOpen={setIsUpdateModalOpen}
//           />
//         </ModalOverlay>
//       )}

//       {/* Modal for creating an event */}

//       {/* {isEventModalOpen && (
//         <ModalOverlay
//           isOpen={isEventModalOpen}
//           setIsOpen={setIsEventModalOpen}
//           title="Create Event"
//         >
//           <CreateEventForm
//             setIsModalOpen={setIsEventModalOpen}
//             venueId={id}
//             venueTitle={venue.Title} // Pass venue title for use in event creation
//             venueStartDate={venue.Details.StartDate}
//             venueEndDate={venue.Details.EndDate}
//           />
//         </ModalOverlay>
//       )} */}
//     </>
//   );
// };
// const EventCardGrid = ({ eventArr }) => {
//   if (!eventArr?.length) {
//     return (
//       <div className="p-6">
//         <div className="text-center p-8 bg-card rounded-lg border border-gray-200">
//           <p className="text-lg ">No events available for this venue.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {eventArr.map((event, index) => (
//           <EventCard key={index} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

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
//           <div className="space-y-4 pt-4 border-t border-gray-200">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm font-medium ">End Date</p>
//                 <p className="text-sm ">{formatDate(event.details.EndDate)}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-medium ">Start Time</p>
//                 <p className="text-sm ">
//                   {FormatTime(event.details.StartTime)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium ">End Time</p>
//                 <p className="text-sm ">{FormatTime(event.details.EndTime)}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium ">Event ID</p>
//                 <p className="text-sm ">{event.id}</p>
//               </div>
//             </div>

//             {/* <div>
//               <p className="text-sm font-medium mb-2">General Ticket</p>
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">Limit</p>
//                   <p className="text-sm">{parseInt(event.gTicket_limit)}</p>
//                 </div>
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">Price</p>
//                   <p className="text-sm">{parseInt(event.gTicket_price)}</p>
//                 </div>
//                 <div className="p-2 bg-card rounded">
//                   <p className="text-sm font-medium">VIP</p>
//                   <p className="text-sm">{parseInt(event.vTicket_limit)}</p>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VenueDetailPage;
