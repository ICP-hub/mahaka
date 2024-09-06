import VenueDemoImg from "@/assets/images/venue2.png";
import { useSelector } from "react-redux";
import { formatDate } from "../../common/utils/dateFormater";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const VenueTableFormat = () => {
  const { venues, loading } = useSelector((state) => state.venues);
  const [expandedVenue, setExpandedVenue] = useState(null);

  // Accordion : venue detail
  const handleToggleDetail = (venueId) => {
    setExpandedVenue(expandedVenue === venueId ? null : venueId);
  };

  return (
    <div className="flex flex-auto overflow-hidden font-medium flex-col">
      <div className="flex flex-auto flex-col overflow-hidden">
        <div className="grid">
          <div className="custom-grid text-secondary sticky top-0 z-10 gap-4 bg-gray-50 px-6 py-4 text-md font-semibold shadow dark:bg-gray-900 md:px-8">
            <div></div>
            <div>Venue name</div>
            <div className="hidden sm:block">Description</div>
            <div className="hidden sm:block">Start On</div>
            <div className="hidden lg:block">End On</div>
            <div className="hidden lg:block">Time</div>
            <div>Location</div>
            <div className="flex w-full items-center justify-center">
              Details
            </div>
          </div>
          {loading ? (
            <VenueTableLoader />
          ) : !loading && venues.length > 0 ? (
            venues.map((venue, index) => (
              <VenueTableData
                key={index}
                venue={venue}
                isExpanded={expandedVenue === index}
                onToggleDetail={() => handleToggleDetail(index)}
              />
            ))
          ) : (
            <div className="bg-card h-60 flex items-center justify-center text-text text-7xl font-black">
              No Venue found!
            </div>
          )}
        </div>
      </div>
      {/* <Paginator /> */}
    </div>
  );
};

const VenueTableData = ({ venue, isExpanded, onToggleDetail }) => {
  console.log(venue);
  return (
    <>
      <div className="custom-grid items-center gap-4 border-b px-6 py-3 md:px-8 text-text bg-card border-border">
        <div className="flex items-center">
          <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-border">
            <img src={VenueDemoImg} alt="Venue_img" className="w-8" />
          </div>
        </div>
        <div>{venue.Title}</div>
        <div className="hidden sm:block truncate">{venue.Description}</div>
        <div className="hidden sm:block">
          {formatDate(venue.Details.StartDate)}
        </div>
        <div className="hidden lg:block">
          {formatDate(venue.Details.EndDate)}
        </div>
        <div className="hidden lg:block">Time</div>
        <div className="truncate">{venue.Details.Location}</div>
        <div
          className="cursor-pointer flex w-full items-center justify-center"
          onClick={onToggleDetail}
        >
          <MdExpandMore
            size={24}
            className={`${isExpanded ? "text-secondary" : "text-icon"}`}
          />
        </div>
      </div>
      {isExpanded && <DetailCard />}
    </>
  );
};

const DetailCard = () => {
  return <motion.div className="text-text h-80">DetailCard</motion.div>;
};

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
        Start On
      </div>
      <div className="hidden lg:block text-gray-400 bg-gray-400 animate-pulse rounded">
        End On
      </div>
      <div className="hidden lg:block text-gray-400 bg-gray-400 animate-pulse rounded">
        Time
      </div>
      <div className="text-gray-400 bg-gray-400 animate-pulse rounded">
        Location
      </div>
      <div className="text-gray-400 bg-gray-400 animate-pulse rounded">
        Details
      </div>
    </div>
  );
};

const Paginator = () => {
  return <div className="text-text">paginator</div>;
};

export default VenueTableFormat;
