import VenueDemoImg from "@/assets/images/venue2.png";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../common/utils/dateFormater";
import { useState } from "react";
import { MdExpandMore, MdDelete } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import {
  createStaggerContainer,
  createStaggerVariant,
} from "../../common/animationVariants";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { deleteVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import notificationManager from "../../common/utils/notificationManager";
const FormatTime = (nanoseconds) => {
  // Input validation
  if (!nanoseconds && nanoseconds !== 0) {
    return "Invalid input";
  }
  try {
    const totalMinutes = Math.floor(Number(nanoseconds) / (60 * 1000000000));
    // Validate range (24 hours in minutes = 1440)
    if (totalMinutes < 0 || totalMinutes >= 1440) {
      return "Time out of range";
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
    const displayHours = formattedHours.toString().padStart(2, "0");
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${period}`;
  } catch (error) {
    return "Invalid time format";
  }
};
const VenueTableFormat = ({ filteredVenues }) => {
  // console.log(filteredVenues);
  const { venues, loading, deleteLoading, searchVenueLoading } = useSelector(
    (state) => state.venues
  );
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);

  // Show the modal for delete confirmation
  const handleDeleteClick = (venueId) => {
    setSelectedVenueId(venueId);
    setDeleteModalVisible(true);
  };
  console.log(deleteLoading);

  // Confirm deletion and dispatch deleteVenue action
  const confirmDeleteVenue = () => {
    dispatch(deleteVenue({ backend: backend, venueId: selectedVenueId })).then(
      () => {
        notificationManager.error("Venue deleted successfully");
        setDeleteModalVisible(false);
      }
    );
  };
  
  // const [expandedVenue, setExpandedVenue] = useState(null);

  // Accordion : venue detail
  // const handleToggleDetail = (venueId) => {
  //   setExpandedVenue(expandedVenue === venueId ? null : venueId);
  // };

  const staggerContainer = createStaggerContainer(0.4);
  const staggerItem = createStaggerVariant(0.4);

  return (
    <>
      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center rounded justify-center bg-black bg-opacity-50">
          <div className="bg-card p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this venue?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-4"
                disabled={deleteLoading}
                onClick={confirmDeleteVenue}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                className="px-4 py-2 rounded"
                onClick={() => setDeleteModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-auto overflow-hidden font-medium">
        <div className="flex flex-auto flex-col overflow-hidden">
          <div className="grid">
            <div className="custom-grid text-secondary sticky top-0 z-10 gap-4 bg-gray-50 px-6 py-4 text-md font-semibold shadow dark:bg-gray-900 md:px-8">
              <div></div>
              <div>Venue name</div>
              <div className="hidden sm:block">Description</div>
              <div className="hidden sm:block">Max Capacity</div>
              {/* <div className="hidden sm:block">Start On</div>
              <div className="hidden lg:block">End On</div>
              <div className="hidden lg:block">Time</div> */}
              <div>Location</div>
              <div className="flex w-full items-center justify-center">
                Details
              </div>
            </div>
            {(loading || searchVenueLoading) ? (
              <>
                <VenueTableLoader />
                <VenueTableLoader />
                <VenueTableLoader />
                <VenueTableLoader />
              </>
            ) : filteredVenues && filteredVenues.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredVenues.map((venue, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <VenueTableData
                      key={index}
                      venue={venue}
                      onDelete={() => handleDeleteClick(venue.id)}
                      // isExpanded={expandedVenue === index}
                      // onToggleDetail={() => handleToggleDetail(index)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={staggerItem}
                  className="bg-card h-60 flex items-center justify-center text-text text-7xl font-black"
                >
                  No Venue Found!
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const VenueTableData = ({ venue, onDelete }) => {
  function convertTimestampToDate(timestamp) {
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

  function convertTimestampToTime(timestamp) {
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
      <div className="custom-grid items-center gap-4 border-b px-6 py-3 md:px-8 text-text bg-card border-border">
        <div className="flex items-center">
          <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-border">
            <img
              src={venue?.logo?.data ? venue?.logo?.data : VenueDemoImg}
              alt="Venue_img"
            />
          </div>
        </div>
        <div>{venue?.Title}</div>
        <div className="hidden sm:block truncate">{venue?.Description}</div>
        <div className="hidden sm:block">
          {parseInt(venue?.capacity)}
        </div>

        {/* <div className="hidden sm:block">
          {convertTimestampToDate(venue?.Details?.StartDate)}
        </div>
        <div className="hidden lg:block">
          {convertTimestampToDate(venue?.Details?.EndDate)}
        </div>
        <div className="hidden lg:block">
          {convertTimestampToTime(venue?.Details?.StartTime)}-
          {convertTimestampToTime(venue?.Details?.EndTime)}
        </div> */}
        <div className="truncate">{venue?.Details?.Location}</div>

        {/* Wrap both icons inside a flex container */}
        <div className="flex items-center justify-center space-x-2">
          <Link
            to={`/admin/venues/venue/${encodeURIComponent(
              venue?.Title
            )}/${encodeURIComponent(venue?.id)}`}
            className="flex items-center"
          >
            <HiOutlineDotsHorizontal
              size={24}
              // className={`${isExpanded ? "text-secondary" : "text-icon"}`}
            />
          </Link>

          {/* Delete Icon */}
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onDelete}
          >
            <MdDelete size={24} />
          </button>
        </div>
      </div>
      {/* <AnimatePresence>
        {isExpanded && <DetailCard venue={venue} />}
      </AnimatePresence> */}
    </>
  );
};
// const DetailCard = ({ venue }) => {
//   return (
//     <motion.div
//       initial={{ height: 0 }}
//       animate={{ height: "auto" }}
//       exit={{ height: 0, opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="border-b border-border"
//     >
//       <div className="text-text flex flex-col p-8 sm:flex-row">
//         <div className="mb-8 flex flex-col items-center sm:mb-0 sm:items-start">
//           <div className="h-44 w-32 overflow-hidden rounded border border-border">
//             <img
//               src={VenueDemoImg}
//               alt="venue_img_detail"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//         <div className="flex flex-auto flex-wrap font-medium">
//           <div className="flex w-full flex-col sm:pl-8 space-y-4">
//             <div className="flex flex-col">
//               <div className="text-xl text-secondary">Venue name</div>
//               <div className="">{venue.Title}</div>
//             </div>
//             <div className="flex flex-col">
//               <div className="text-xl text-secondary">Venue Description</div>
//               <div className="">{venue.Description}</div>
//             </div>
//             <div className="flex w-full flex-col lg:flex-row">
//               <div className="flex flex-col">
//                 <div className="text-xl text-secondary">Starting Date</div>
//                 <div className="">{venue.Details.StartDate}</div>
//               </div>
//               <div className="flex flex-col lg:ml-auto">
//                 <div className="text-xl text-secondary">Ending Date</div>
//                 <div className="">{venue.Details.EndDate}</div>
//               </div>
//             </div>
//             <div className="flex w-full flex-col lg:flex-row">
//               <div className="flex flex-col">
//                 <div className="text-xl text-secondary">Starting Time</div>
//                 <div className="">{venue.Details.StartTime}</div>
//               </div>
//               <div className="flex flex-col lg:ml-auto">
//                 <div className="text-xl text-secondary">Ending Time</div>
//                 <div className="">{venue.Details.EndTime}</div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <div className="text-xl text-secondary">Venue Id</div>
//               <div className="">{venue.id}</div>
//             </div>
//             <div className="flex flex-col">
//               <div className="text-xl text-secondary">
//                 Max. number of people allowed
//               </div>
//               <div className="">{parseInt(venue.capacity)}</div>
//             </div>
//             <div className="flex flex-col">
//               <div className="text-xl text-secondary">Venue Events</div>
//               <div className="">
//                 {venue.Events.length > 0 ? (
//                   <div>events map</div>
//                 ) : (
//                   <div>No Events available for this venue!</div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <button className="px-4 py-2 rounded-full bg-secondary font-medium hover:bg-orange-600 text-white">
//                 Update Venue
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// Loader
const VenueTableLoader = () => {
  return (
    <div className="custom-grid items-center gap-4 border-b px-6 py-3 md:px-8 text-text bg-card border-border">
      <div className="flex items-center">
        <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-border">
          <span className="w-8 text-gray-400 bg-gray-400 animate-pulse rounded h-full" />
        </div>
      </div>
      <div className="text-gray-400 bg-gray-400 animate-pulse rounded">
        Venue name
      </div>
      <div className="hidden sm:block text-gray-400 bg-gray-400 animate-pulse rounded">
        Description
      </div>
      <div className="hidden sm:block text-gray-400 bg-gray-400 animate-pulse rounded">
        Maximum Capacity
      </div>
      {/* <div className="hidden sm:block text-gray-400 bg-gray-400 animate-pulse rounded">
        Start On
      </div>
      <div className="hidden lg:block text-gray-400 bg-gray-400 animate-pulse rounded">
        End On
      </div>
      <div className="hidden lg:block text-gray-400 bg-gray-400 animate-pulse rounded">
        Time
      </div> */}
      <div className="text-gray-400 bg-gray-400 animate-pulse rounded">
        Location
      </div>
      <div className="text-gray-400 bg-gray-400 animate-pulse rounded">
        Details
      </div>
    </div>
  );
};

export default VenueTableFormat;
