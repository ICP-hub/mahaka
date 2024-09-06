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
    <div className="flex flex-auto overflow-hidden font-medium">
      <div className="flex flex-auto flex-col overflow-hidden sm:overflow-y-scroll custom-scroll">
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
            <>
              <VenueTableLoader />
              <VenueTableLoader />
              <VenueTableLoader />
              <VenueTableLoader />
            </>
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
    </div>
  );
};

const VenueTableData = ({ venue, isExpanded, onToggleDetail }) => {
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
      <AnimatePresence>
        {isExpanded && <DetailCard venue={venue} />}
      </AnimatePresence>
    </>
  );
};

const DetailCard = ({ venue }) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-text flex flex-col p-8 sm:flex-row">
        <div className="mb-8 flex flex-col items-center sm:mb-0 sm:items-start">
          <div className="h-44 w-32 overflow-hidden rounded border border-border">
            <img
              src={VenueDemoImg}
              alt="venue_img_detail"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-auto flex-wrap font-medium">
          <div className="flex w-full flex-col sm:pl-8 space-y-4">
            <div className="flex flex-col">
              <div className="text-xl text-secondary">Venue name</div>
              <div className="">{venue.Title}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl text-secondary">Venue Description</div>
              <div className="">{venue.Description}</div>
            </div>
            <div className="flex w-full flex-col lg:flex-row">
              <div className="flex flex-col">
                <div className="text-xl text-secondary">Starting Date</div>
                <div className="">{venue.Details.StartDate}</div>
              </div>
              <div className="flex flex-col lg:ml-auto">
                <div className="text-xl text-secondary">Ending Date</div>
                <div className="">{venue.Details.EndDate}</div>
              </div>
            </div>
            <div className="flex w-full flex-col lg:flex-row">
              <div className="flex flex-col">
                <div className="text-xl text-secondary">Starting Time</div>
                <div className="">{venue.Details.StartTime}</div>
              </div>
              <div className="flex flex-col lg:ml-auto">
                <div className="text-xl text-secondary">Ending Time</div>
                <div className="">{venue.Details.EndTime}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl text-secondary">Venue Id</div>
              <div className="">{venue.id}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl text-secondary">
                Max. number of people allowed
              </div>
              <div className="">{venue.capacity}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl text-secondary">Venue Events</div>
              <div className="">
                {venue.Events.length > 0 ? (
                  <div>events map</div>
                ) : (
                  <div>No Events available for this venue!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
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

export default VenueTableFormat;
