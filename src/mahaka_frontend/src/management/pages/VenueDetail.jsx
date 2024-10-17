import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { formatDate } from "../../common/utils/dateFormater";
import VenueDemoImg from "@/assets/images/Frame10.png";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import UpdateVenueForm from "../components/UpdateVenueForm";
import CreateEventForm from "../components/CreateEventForm";
import { HiArrowLongLeft } from "react-icons/hi2";

const FormatTime = (timeString) => {
  const time = parseInt(timeString, 10);
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const MgtVenueDetailPage = () => {
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
          <Link
            to="/management/venues"
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          >
            <HiArrowLongLeft size={20} />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-6 ">
          <div className="w-full md:w-1/2 h-64 bg-gray-200 mb-4 md:mb-0 rounded-lg shadow-lg">
            <img
              src={VenueDemoImg}
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
                {FormatTime(venue.Details.StartTime)} -{" "}
                {FormatTime(venue.Details.EndTime)}
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

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          {events.length > 0 ? (
            <div>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-300 p-4 mb-4 rounded"
                >
                  <h3 className="text-lg font-semibold">{event.Title}</h3>
                  <p>
                    <strong>📅</strong> {formatDate(event.Details.StartDate)} -{" "}
                    {formatDate(event.Details.EndDate)}
                  </p>
                  <p>
                    <strong>🕒</strong> {FormatTime(event.Details.StartTime)} -{" "}
                    {FormatTime(event.Details.EndTime)}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.Details.Location}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.Description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No events available for this venue.</p>
            </div>
          )}

          {/* <button
            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
            onClick={() => setIsEventModalOpen(true)}
          >
            Create Event
          </button> */}
        </div>
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

export default MgtVenueDetailPage;
