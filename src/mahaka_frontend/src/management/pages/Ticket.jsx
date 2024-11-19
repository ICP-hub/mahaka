import React, { useState, useEffect } from "react";
import Ticket from "../components/Ticket";
import { createActor } from "../../../../declarations/mahaka_backend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";

import { useIdentityKit } from "@nfid/identitykit/react";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import EventTickets from "../components/EventTickets";

const MgtTicket = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { venues, loading: venuesLoading } = useSelector(
    (state) => state.venues
  );

  const { events, eventLoading } = useSelector((state) => state.events);
  const { backend } = useSelector((state) => state.authentication);
  const [eventDetails, setEventDetails] = useState(null);
  const { identity } = useIdentityKit();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch venues when the component mounts
    dispatch(getAllVenues({ backend, chunkSize: 100, pageNo: 0 }));
  }, [dispatch, backend]);

  useEffect(() => {
    // Automatically select the first venue and fetch its ticket details
    if (!venuesLoading && venues.length > 0) {
      const defaultVenue = venues[0];
      setSelectedVenue(defaultVenue);
      fetchTicketDetails(defaultVenue);
    }
  }, [venuesLoading, venues]);

  useEffect(() => {
    // Automatically select the first venue and fetch its ticket details
    if (!eventLoading && events.length > 0) {
      const defaultVenue = events[0];
      console.log(events[0]);
      setSelectedEvent(defaultVenue);

      const eventData = async () => {
        try {
          console.log(defaultVenue?.event_collectionid);
          const details = await backend.getDIPdetails(
            defaultVenue?.event_collectionid
          );
          console.log(details);
          setEventDetails(details);
        } catch (error) {
          console.log(error);
        }
      };

      eventData();
    }
  }, [eventLoading, events]);

  const fetchTicketDetails = async (venue) => {
    if (!venue?.Collection_id) {
      console.error("Venue does not have a collection_id:", venue);
      return;
    }

    setLoadingDetails(true);
    try {
      dispatch(
        getAllEventsByVenue({
          backend,
          chunkSize: 100,
          pageNo: 0,
          venueId: venue.id,
        })
      );

      console.log(backend);
      // Fetch ticket details from the actor
      const details = await backend.getDIPdetails(venue?.Collection_id);
      setTicketDetails(details);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      setTicketDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleVenueChange = (event) => {
    const venue = venues.find((v) => v.id === event.target.value);
    if (venue) {
      setSelectedVenue(venue);
      fetchTicketDetails(venue);
    }
  };
  const handleEventChange = async (event) => {
    const venue = events.find((v) => v.id === event.target.value);

    console.log(venue, "events");
    if (venue) {
      setSelectedEvent(venue);

      const details = await backend.getDIPdetails(venue?.Collection_id);
      setEventDetails(details);
    }
  };

  const ticketData = {
    type: "VIP", // Example ticket type
    gradientClass: "bg-gradient-to-r from-cyan-200 to-cyan-300",
    name: "Concert Ticket",
    description: "Access to the exclusive concert event",
    price: "$120",
    availability: "20 tickets left",
    highlightClass: "bg-cyan-500",
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tickets</h1>

      {/* Venue Selection */}
      <label className="block mb-2 text-lg font-medium" htmlFor="venue">
        Select Venue:
      </label>
      <select
        id="venue"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
        value={selectedVenue?.id || ""}
        onChange={handleVenueChange}
      >
        <option value="" disabled>
          Choose a venue
        </option>
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.Title}
          </option>
        ))}
      </select>

      {/* Show Loader or Ticket Details */}
      {loadingDetails ? (
        <p>Loading ticket details...</p>
      ) : ticketDetails ? (
        <div>
          <Ticket
            {...ticketData}
            tickets={ticketDetails}
            selectedVenue={selectedVenue}
          />
        </div>
      ) : (
        <p>No ticket details available for the selected venue.</p>
      )}

      <label className="block mb-2 text-lg font-medium">Select event</label>
      <select
        id="event"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
        value={selectedEvent?.id || ""}
        onChange={handleEventChange}
      >
        <option value="" disabled>
          Choose a event
        </option>
        {events.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.title}
          </option>
        ))}
      </select>
      {eventLoading ? (
        <p>Loading ticket details...</p>
      ) : eventDetails ? (
        <div>
          <EventTickets
            {...ticketData}
            tickets={eventDetails}
            selectedVenue={selectedEvent}
          />
        </div>
      ) : (
        <p>No ticket details available for the selected venue.</p>
      )}
    </div>
  );
};

export default MgtTicket;
