import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { formatDate } from "../../common/utils/dateFormater";
import VenueDemoImg from "@/assets/images/Frame10.png";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import UpdateVenueForm from "../components/UpdateVenueForm";
import CreateEventForm from "../components/CreateEventForm";
import { HiArrowLongLeft, HiChevronDown } from "react-icons/hi2";

const FormatTime = (timeString) => {
  const time = parseInt(timeString, 10);
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const VenueDetailPage = () => {
  const { title, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentVenue, loading, createVenueLoader, error } = useSelector(
    (state) => state.venues
  );
  const { events } = useSelector((state) => state.events);
  const { backend } = useSelector((state) => state.authentication);
  const [localError, setLocalError] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false); // New state for event modal
  console.log(events);
  useEffect(() => {
    if (!id) {
      setLocalError("Venue ID is missing from the URL");
      return;
    }

    if (!backend) {
      setLocalError("Backend is not initialized");
      return;
    }

    dispatch(getVenue({ backend, venueId: id }))
      .unwrap()
      .catch((err) => {
        setLocalError(err.message || "Failed to fetch venue details");
      });

    dispatch(
      getAllEventsByVenue({ backend, chunkSize: 100, pageNo: 0, venueId: id })
    )
      .unwrap()
      .then((events) => {
        if (events.length === 0) {
          console.log("No events found for the venue.");
        }
      })
      .catch((err) => {
        if (err.message === "No event found in the venue") {
          console.log("No events found for this venue.");
        } else {
          setLocalError(err.message || "Failed to fetch events for the venue");
        }
      });
  }, [dispatch, id, backend]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (error || localError) {
  //   return (
  //     <div className="p-6">
  //       <h1 className="text-2xl font-bold mb-4">Error</h1>
  //       <p>{error || localError}</p>
  //       <button
  //         className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
  //         onClick={() => navigate('/admin/venues')}
  //       >
  //         Back to Venues List
  //       </button>
  //     </div>
  //   );
  // }

  const venue =
    currentVenue && Array.isArray(currentVenue) ? currentVenue[1] : null;

  if (!venue) {
    return <div className="p-6">No venue data available.</div>;
  }

  return (
    <>
      <div className="p-5 tracking-wide">
        <div className="flex justify-left mb-2">
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
            onClick={() => navigate("/admin/venues")}
          >
            <HiArrowLongLeft size={20} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-6 ">
          <div className="w-full md:w-1/2 h-64 bg-gray-200 mb-4 md:mb-0 rounded-lg shadow-lg">
            <img
              src={venue.banner.data ? venue.banner.data : VenueDemoImg}
              alt="Venue Banner"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-5xl font-bold mb-4">{venue.Title}</h1>
            <div className="mb-2 leading-relaxed">
              <p className="text-lg">
                <strong>📅 </strong>
                {formatDate(venue.Details.StartDate)} -{" "}
                {formatDate(venue.Details.EndDate)}
              </p>
            </div>
            <div className="mb-2 leading-relaxed">
              <p className="text-lg">
                <strong>🕒 </strong>
                {venue.Details.StartTime} - {venue.Details.EndTime}
              </p>
            </div>
            <div className="mb-2 leading-relaxed">
              <p className="text-lg">
                <strong>Location:</strong> {venue.Details.Location}
              </p>
            </div>
            {/* <button
              className="px-4 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              Update Venue
            </button> */}
          </div>
        </div>
        <hr className="border-gray-300 my-6" />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{venue.Description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Capacity</h2>
          <p>
            {venue.capacity
              ? venue.capacity.toString()
              : "Capacity information not available."}
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Venue ID</h2>
          <p>{venue.id}</p>
        </div>
        <button
          className="px-4 py-2 mb-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={() => setIsEventModalOpen(true)}
        >
          Create Event
        </button>
        <EventTable eventArr={events} />
        {/* <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          {events.length > 0 ? (
            <div>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-300 p-4 mb-4 rounded flex items-start"
                >
                  <img
                    src={event.banner.data}
                    alt={`${event.title} banner`}
                    className="w-32 h-32 rounded mb-4 mr-4"
                  />
                  <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p>
                    <strong>📅</strong> {formatDate(event.details.StartDate)} -{" "}
                    {formatDate(event.details.EndDate)}
                  </p>
                  <p>
                    <strong>🕒</strong> {FormatTime(event.details.StartTime)} -{" "}
                    {FormatTime(event.details.EndTime)}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.details.Location}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No events available for this venue.</p>
            </div>
          )}

          <button
            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
            onClick={() => setIsEventModalOpen(true)}
          >
            Create Event
          </button>
        </div>*/}
      </div>

      {/* Modal for updating the venue */}
      {isUpdateModalOpen && (
        <ModalOverlay
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
          title="Update Venue"
        >
          <UpdateVenueForm
            venue={venue}
            setIsModalOpen={setIsUpdateModalOpen}
          />
        </ModalOverlay>
      )}

      {/* Modal for creating an event */}

      {isEventModalOpen && (
        <ModalOverlay
          isOpen={isEventModalOpen}
          setIsOpen={setIsEventModalOpen}
          title="Create Event"
        >
          <CreateEventForm
            setIsModalOpen={setIsEventModalOpen}
            venueId={id}
            venueTitle={venue.Title} // Pass venue title for use in event creation
          />
        </ModalOverlay>
      )}
    </>
  );
};
const EventTable = ({ eventArr }) => {
  console.log("event is ", eventArr);
  const [isOpen, setIsOpen] = useState(false);

  const toggleView = () => {
    setIsOpen((pv) => !pv);
  };

  return (
    <div className="flex flex-auto overflow-hidden min-h-96">
      <div className="flex flex-auto flex-col overflow-hidden sm:mb-18">
        <div className="grid">
          <div className="inventory-grid text-secondary top-0 z-10 grid gap-4 bg-gray-50 px-6 py-4 text-md font-semibold shadow dark:bg-black dark:bg-opacity-5 md:px-8">
            <div></div>
            <div className="hidden md:block">Name</div>
            <div>Description</div>
            <div className="hidden sm:block">Location</div>
            <div className="hidden lg:block">Start Date</div>
            <div className="hidden lg:block">Active</div>
            <div className="hidden sm:block">Details</div>
          </div>
          {eventArr?.length > 0 &&
            eventArr.map((event, index) => (
              <>
                <div className="inventory-grid grid items-center gap-4 border-b px-6 py-3 md:px-8 border-b-border">
                  <div className="flex items-center">
                    <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-border">
                      <img src={event.logo.data} alt="Event_img" />
                    </div>
                  </div>
                  <div className="hidden truncate md:block">{event.title}</div>
                  <div className="truncate">{event.description}</div>
                  <div className="hidden truncate sm:block">
                    {event.details.Location}
                  </div>
                  <div className="hidden lg:flex">
                    {formatDate(event.details.StartDate)}
                  </div>
                  <div className="hidden lg:block">eventactive</div>
                  <button
                    className="hidden sm:block ml-2 cursor-pointer"
                    onClick={toggleView}
                  >
                    <HiChevronDown size={20} />
                  </button>
                </div>

                {isOpen && (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row p-6">
                      <div className="mb-8 flex flex-col items-center sm:mb-0 sm:items-start">
                        <div className="w-32 border h-44 rounded-md border-border">
                          <img
                            src={event.banner.data}
                            alt="event_img"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-auto flex-wrap">
                        <div className="flex w-full flex-col sm:pl-8 lg:w-2/4">
                          <EventViewBlock
                            label="Event Name"
                            value={event.title}
                          />
                          <div className="flex">
                            <div className="w-2/4 pr-2">
                              <EventViewBlock
                                label="Start From"
                                value={formatDate(event.details.StartDate)}
                              />
                            </div>
                            <div className="w-2/4 pl-2">
                              <EventViewBlock
                                label="Ends On"
                                value={formatDate(event.details.EndDate)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col sm:pl-8 lg:w-2/4">
                          <EventViewBlock label="Id" value={event.id} />
                          <EventViewBlock
                            label="Location"
                            value={event.details.Location}
                          />
                        </div>
                        <div className="flex w-full sm:pl-8 flex-col md:flex-row">
                          <div className="md:w-1/3 md:pr-2">
                            <EventViewBlock
                              label="General Ticket Limit"
                              value={parseInt(event.gTicket_limit)}
                            />
                          </div>
                          <div className="md:w-1/3 md:pl-2">
                            <EventViewBlock
                              label="Student Ticket Limit"
                              value={parseInt(event.sTicket_limit)}
                            />
                          </div>
                          <div className="md:w-1/3 md:pl-2">
                            <EventViewBlock
                              label="Vip Ticket Limit"
                              value={parseInt(event.vTicket_limit)}
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col sm:pl-8">
                          <EventViewBlock
                            label="Description"
                            value={event.description}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

const EventViewBlock = ({ label, value }) => {
  return (
    <div className="inline-flex flex-col min-w-0 text-left w-full relative">
      <div className="mt-6 border rounded-md border-border min-h-12 items-center flex">
        <div className="px-4 box-border">{value}</div>
      </div>
      <div className="absolute font-medium capitalize">{label}</div>
      <div className="hint-box"></div>
    </div>
  );
};

export default VenueDetailPage;
