import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { searchEvents, getAllEvents, getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import { formatDate } from "../../common/utils/dateFormater";

const EventManager = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { events, eventsLoading, totalPages, currentPage } = useSelector((state) => state.events);
  console.log("logging the loadign for events are", events)
  const { venues } = useSelector((state) => state.venues);
  const [selectedVenue, setSelectedVenue] = useState(null);
  console.log("selected venue is ", selectedVenue)
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchInput) {
      dispatch(searchEvents({ backend, searchText: searchInput, chunkSize: 1, pageNo: page - 1 }))
    } else {
      dispatch(getAllEvents({ backend, chunkSize: 1, pageNo: page - 1 }))

    }
  }, [searchInput, dispatch, page])

  useEffect(() => {
    if (selectedVenue) {
      setPage(1)
    }
  }, [selectedVenue])

  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
  }, [dispatch, backend]);

  useEffect(() => {
    if (selectedVenue) {
      // setSpinner(true)
      fetchEvents(selectedVenue);
    } else {

      dispatch(getAllEvents({ backend, chunkSize: 1, pageNo: page - 1 }))
      console.log("logging the loading for events are", events)
    }

  }, [selectedVenue, page]);

  const fetchEvents = (venueId) => {
    dispatch(
      getAllEventsByVenue({
        backend,
        chunkSize: 1,
        pageNo: page - 1,
        venueId: venueId,
      })
    );

  };

  //   Event card
  const EventCard = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className=" rounded-lg shadow-md overflow-hidden border border-gray-300">
        <div className="relative h-48 w-full">
          <img
            src={event.banner.data}
            alt={`${event.title} banner`}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <div className="h-12 w-12 rounded-full  p-1">
              <img
                src={event.logo.data}
                alt={`${event.title} logo`}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold ">{event.title}</h3>
              <p className="text-sm ">{event.details.Location}</p>
            </div>
            <span className={`px-2 py-1 text-sm rounded-full ${event.active
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-green-800'
              }`}>
              {event.active ? "Active" : "Active"}
            </span>
          </div>

          <p className="text-sm  line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium ">Start Date</p>
              <p className="text-sm ">{formatDate(event.details.StartDate)}</p>
            </div>
            <button
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${isExpanded ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-gray-200 ">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium ">End Date</p>
                  <p className="text-sm ">
                    {formatDate(event.details.EndDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium ">Event ID</p>
                  <p className="text-sm ">{event.id}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Ticket Limits</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-card rounded">
                    <p className="text-sm font-medium">General</p>
                    <p className="text-sm">{parseInt(event.gTicket_limit)}</p>
                  </div>
                  <div className="p-2 bg-card rounded">
                    <p className="text-sm font-medium">Student</p>
                    <p className="text-sm">{parseInt(event.sTicket_limit)}</p>
                  </div>
                  <div className="p-2 bg-card rounded">
                    <p className="text-sm font-medium">VIP</p>
                    <p className="text-sm">{parseInt(event.vTicket_limit)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };


  // skeleton loader 
  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col p-4 bg-gray-300 rounded-lg shadow-md min-w-65 min-h-80 mt-8 mx-5 my-5">
        {/* title and delete btn */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-400 w-11 h-11 rounded-full"></div>
        </div>

        {/* Bottom section*/}
        <div className="space-y-2 mt-auto">
          <div className="flex">
            <div className="h-4 bg-gray-400 rounded w-1/2"></div>
            <div className="h-4 bg-gray-400 rounded w-10 ml-auto"></div>
          </div>
          <div className="h-2 bg-gray-400 rounded w-1/2 my-5"></div>
          <div className="h-2 bg-gray-400 rounded w-1/2"></div>
          <div className="h-4 bg-gray-400 rounded w-10 "></div>
          <div className="h-2 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  // handle page
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex min-w-0 flex-col overflow-y-auto">
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
            <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Event
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row mt-5">
          <select
            value={selectedVenue || ""}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="bg-card text-icon px-4 min-h-12 rounded-full border border-border sm:w-36"
          >
            <option value="" className="min-h-12">
              All Events
            </option>
            {venues?.map((venues) => (
              <option key={venues.id} value={venues.id} className="min-h-12">
                {venues.Title}
              </option>
            ))}
          </select>
          <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[68%] md:min-w-[55%] rounded-full border border-border flex items-center bg-card text-icon">
            <HiMagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search Events"
              className=" bg-transparent outline-none ml-4 lg:w-1000px"
              search={searchInput}

              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* displaying the events  */}
        {eventsLoading ?
          (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) :

          events && events.length === 0 ?
            <div className="text-center text-gray-500 md:text-5xl text-3xl font-bold mt-10">
              No events found!
            </div> :
            <div className="mt-8 grid grid-cols-1 mx-5 my-5 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {events?.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    ...event
                  }}

                />
              ))}
            </div>
        }

        {/* pagination */}
        <div className="flex justify-end m-6 items-center space-x-2">
          {/* Prev button */}
          <button
            className={`px-3 py-1 rounded ${page === 1
              ? "bg-card text-gray-500 cursor-not-allowed"
              : "bg-gray-200"
              }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          {/* Page number buttons */}
          {Array.from({ length: Number(totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`mx-1 px-3 py-1 rounded ${page === pageNum ? "bg-[#564BF1] text-white" : "bg-gray-200"
                }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          {/* Next button */}
          <button
            className={`px-3 py-1 rounded bg-card`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Number(totalPages)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
};
export default EventManager;
