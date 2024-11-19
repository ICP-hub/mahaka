import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { getAllVenues, getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllEventsByVenue, getAllEvents } from "../../redux/reducers/apiReducers/eventApiReducer";
import CreateEventForm from "../components/CreateEventForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import PageIntro from "../components/PageIntro";

const EventManager = () => {
  const dispatch = useDispatch();
  const [localError, setLocalError] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const { venues, loading: venuesLoading } = useSelector((state) => state.venues);
  const { events, loading: eventsLoading } = useSelector((state) => state.events);
  const { backend } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 10, currPage: 0 }));
  }, [dispatch, backend]);

  useEffect(() => {
    if (!backend) {
      setLocalError("Backend is not initialized");
      return;
    }

    if (selectedVenue === "") {
    console.log("hello");
    dispatch(getAllEvents({ backend, chunkSize: 100, pageNo: 0 }))

      .unwrap()
      .catch((err) => {
        setLocalError(err.message || "Failed to fetch all events");
      });
    } else {
    dispatch(getAllEventsByVenue({ backend, chunkSize: 100, pageNo: 0, venueId: selectedVenue }))
      .unwrap()
      .then((events) => {
        if (events.length === 0) {
          console.log("No events found for the selected venue.");
        }
      })
      .catch((err) => {
        if (err.message === "No event found in the venue") {
          console.log("No events found for this venue.");
        } else {
          setLocalError(err.message || "Failed to fetch events for the venue");
        }
      });
    }
  }, [dispatch, selectedVenue, backend]);
  console.log(selectedVenue);
  console.log(events);


  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row ">
        <select
          id="venue-select"
          className="mt-2 p-2 border rounded bg-card"
          value={selectedVenue}
          onChange={handleVenueChange}
        >
          <option value="">All Events</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.Title}
            </option>
          ))}
        </select>
      </div>
      {/* PageIntro */}
      <PageIntro
        title="Event"
        count={events.length}
        actionOnButton={() => setIsEventModalOpen(true)}
        isLoading={venuesLoading || eventsLoading}
      />

      {/* Modal for Creating Event */}
      {isEventModalOpen && (
        <ModalOverlay
          isOpen={isEventModalOpen}
          setIsOpen={setIsEventModalOpen}
          title="Create a new Event"
        >
          <CreateEventForm setIsModalOpen={setIsEventModalOpen} />
        </ModalOverlay>
      )}

      {/* Show Events List */}
      <div className="mt-4">
        {eventsLoading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="p-2 border-b">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventManager;
