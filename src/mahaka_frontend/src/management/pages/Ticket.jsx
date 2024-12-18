import React, { useState, useEffect } from "react";
import Ticket from "../components/Ticket";
import { createActor } from "../../../../declarations/mahaka_backend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllWahanasbyVenue } from "../../redux/reducers/apiReducers/wahanaApiReducer";

import { useIdentityKit } from "@nfid/identitykit/react";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { fetchTicketDetails } from "../../redux/reducers/apiReducers/ticketApiReducer";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import EventTickets from "../components/EventTickets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import WahanaTicket from "../components/WahanaTicket";
import { Null } from "@dfinity/candid/lib/cjs/idl";

const MgtTicket = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWahana, setSelectedWahana] = useState(null);
  const { currentVenue, loading: venuesLoading } = useSelector(
    (state) => state.venues
  );

  const { currentUserByCaller } = useSelector((state) => state.users);

  const { eventByVenue, singleEventLoading } = useSelector(
    (state) => state.events
  );
  const { wahanasByVenue, singleWahanaLoading } = useSelector(
    (state) => state.wahana
  );
  const { backend } = useSelector((state) => state.authentication);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { identity } = useIdentityKit();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getVenue({ backend, venueId: currentUserByCaller?.assignedVenue?.id })
    );

    // Automatically select the first venue and fetch its ticket details
  }, [backend]);
  useEffect(() => {
    dispatch(
      getAllEventsByVenue({
        backend,
        chunkSize: 100,
        pageNo: 0,
        venueId: currentUserByCaller?.assignedVenue?.id,
      })
    );

    dispatch(
      getAllWahanasbyVenue({
        backend,
        chunkSize: 100,
        pageNo: 0,
        venueId: currentUserByCaller?.assignedVenue?.id,
      })
    );

    // Automatically select the first venue and fetch its ticket details
    if (!venuesLoading && currentVenue) {
      const defaultVenue = currentVenue;
      console.log(currentVenue);

      fetchTicketDetails(defaultVenue);
    }
  }, [backend, currentVenue]);

  useEffect(() => {
    // Automatically select the first venue and fetch its ticket details
    if (!singleEventLoading && eventByVenue?.length > 0) {
      const defaultVenue = eventByVenue[0];

      setSelectedEvent(defaultVenue);

      const eventData = async () => {
        try {
          console.log(defaultVenue?.event_collectionid);
          const details = await backend.getDIPdetails(
            defaultVenue?.event_collectionid
          );

          setEventDetails(details);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      eventData();
    }
  }, [singleEventLoading, eventByVenue]);
  useEffect(() => {
    // Automatically select the first venue and fetch its ticket details
    if (!singleWahanaLoading && wahanasByVenue.length > 0) {
      const defaultVenue = wahanasByVenue[0];

      setSelectedWahana(defaultVenue);
    }
  }, [singleWahanaLoading, wahanasByVenue]);

  const fetchTicketDetails = async (venue) => {
    console.log("hello");
    if (!venue?.Collection_id) {
      console.error("Venue does not have a collection_id:", venue);
      return;
    }

    setLoadingDetails(true);
    try {
      // Fetch ticket details from the actor
      console.log("hello after  eventByVenue");
      const details = await backend.getDIPdetails(venue?.Collection_id);
      console.log(details);
      setTicketDetails(details);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      setTicketDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  console.log(ticketDetails);

  const handleEventChange = async (event) => {
    setLoading(true);
    const selectedEventId = event.target.value;

    console.log(selectedEventId);
    const selectedEvent = eventByVenue.find((v) => v.id === selectedEventId);

    if (selectedEvent) {
      setSelectedEvent(selectedEvent); // Update selected event immediately
      setEventDetails(null); // Clear previous details while loading

      try {
        const details = await backend.getDIPdetails(
          selectedEvent?.event_collectionid
        );

        setEventDetails(details);
        setLoading(false); // Update state with new event details
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEventDetails(null); // Handle errors gracefully
      }
    }
  };
  const handleWahanaChange = async (event) => {
    const selectedWahanaId = event.target.value; // Get the selected Wahana ID
    const selectedWahana = wahanasByVenue.find(
      (wahana) => wahana.id === selectedWahanaId
    ); // Find the Wahana in the array

    if (selectedWahana) {
      setSelectedWahana(selectedWahana); // Update the state with the selected Wahana
    }
  };

  console.log(selectedWahana);

  const ticketData = [
    {
      type: "PREMIUM",
      gradientClass: "bg-gradient-to-r from-orange-200 to-orange-300",
      name: "Ticket Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
      price: "Rp. 1,500",
      availability: "AVAILABLE",
      highlightClass: "bg-orange-500",
    },
    {
      type: "VVIP",
      gradientClass: "bg-gradient-to-r from-cyan-200 to-cyan-300",
      name: "Ticket Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
      price: "Rp. 1,500",
      availability: "SOLD OUT",
      highlightClass: "bg-cyan-500",
    },
    {
      type: "GROUP",
      gradientClass: "bg-gradient-to-r from-blue-200 to-blue-300",
      name: "Ticket Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Bibendum est vitae urna pharetra",
      price: "Rp. 1,500",
      availability: "3 TICKETS LEFT",
      highlightClass: "bg-blue-500",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Tickets</h1>

      {/* Venue Selection */}

      <p className="text-2xl">{currentUserByCaller?.assignedVenue?.title}</p>

      {/* Show Loader or Ticket Details */}
      {loadingDetails ? (
        <div className="animate-pulse  grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
          <div className="bg-gray-300 h-50 rounded-2xl "></div>
          <div className="bg-gray-300 h-50 rounded-2xl "></div>
          <div className="bg-gray-300 h-50 rounded-2xl  "></div>
        </div>
      ) : ticketDetails ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Ticket
              type={"GROUP"}
              gradientClass={ticketData[0].gradientClass}
              name={"Group Tickets"}
              description={ticketDetails?.description || "description"}
              price={parseInt(ticketDetails?.gTicket_price) || 1}
              availability={parseInt(ticketDetails?.gTicket_limit) || 4}
              highlightClass={ticketData[0].highlightClass}
              selectedVenue={currentVenue?.id}
              ticketType={"GroupPass"}
            />

            <Ticket
              type={"SINGLE"}
              gradientClass={ticketData[1].gradientClass}
              name={"Single Tickets"}
              description={ticketDetails?.description || "description"}
              price={parseInt(ticketDetails?.sTicket_price) || 1}
              availability={parseInt(ticketDetails?.sTicket_limit) || 4}
              highlightClass={ticketData[1].highlightClass}
              selectedVenue={currentVenue?.id}
              ticketType={"SinglePass"}
            />
            <Ticket
              type={" VIP"}
              gradientClass={ticketData[2].gradientClass}
              name={"VIP Tickets"}
              description={ticketDetails?.description || "description"}
              price={parseInt(ticketDetails?.vTicket_price) || 1}
              availability={parseInt(ticketDetails?.vTicket_limit) || 4}
              highlightClass={ticketData[2].highlightClass}
              selectedVenue={currentVenue?.id}
              ticketType={"VipPass"}
            />
          </div>
        </div>
      ) : (
        <p>No ticket details available for the selected venue.</p>
      )}

      {eventByVenue?.length > 0 && (
        <>
          <label className="block mb-2 text-lg font-medium">Select Event</label>
          <select
            id="event"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
            value={selectedEvent?.id || ""}
            onChange={handleEventChange}
          >
            <option value="" disabled>
              Choose a event
            </option>
            {eventByVenue?.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.title}
              </option>
            ))}
          </select>
          {loading ? (
            <div className="animate-pulse  grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
              <div className="bg-gray-300 h-50 rounded-2xl  "></div>
              <div className="bg-gray-300 h-50 rounded-2xl  "></div>
              <div className="bg-gray-300 h-50 rounded-2xl  "></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <EventTickets
                type={"GROUP"}
                name={"Group Tickets"}
                gradientClass={ticketData[0].gradientClass}
                tickets={eventDetails}
                selectedVenue={selectedEvent}
                id={currentVenue?.id}
                price={parseInt(eventDetails?.gTicket_price) || 1}
                availability={parseInt(eventDetails?.gTicket_limit) || 4}
                highlightClass={ticketData[0].highlightClass}
                ticketType={"GroupPass"}
              />
              <EventTickets
                type={"SINGLE"}
                name={"Single Tickets"}
                gradientClass={ticketData[1].gradientClass}
                tickets={eventDetails}
                selectedVenue={selectedEvent}
                id={currentVenue?.id}
                price={parseInt(eventDetails?.sTicket_price) || 1}
                availability={parseInt(eventDetails?.sTicket_limit) || 4}
                highlightClass={ticketData[1].highlightClass}
                ticketType={"SinglePass"}
              />
              <EventTickets
                type={"VIP"}
                name={"VIP Tickets"}
                gradientClass={ticketData[2].gradientClass}
                tickets={eventDetails}
                selectedVenue={selectedEvent}
                id={currentVenue?.id}
                price={parseInt(eventDetails?.vTicket_price) || 1}
                availability={parseInt(eventDetails?.vTicket_limit) || 4}
                highlightClass={ticketData[2].highlightClass}
                ticketType={"VipPass"}
              />
            </div>
          )}
        </>
      )}

      {wahanasByVenue.length > 0 && (
        <>
          <label className="block mb-2 text-lg font-medium">
            Select Wahana
          </label>
          <select
            id="wahana"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
            value={selectedWahana?.id || ""}
            onChange={handleWahanaChange}
          >
            <option value="" disabled>
              Choose a Wahana
            </option>
            {wahanasByVenue?.map((wahana) => (
              <option key={wahana.id} value={wahana.id}>
                {wahana.ride_title}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <WahanaTicket
              type={"SINGLE"}
              gradientClass={ticketData[1].gradientClass}
              name={"Single Tickets"}
              description={selectedWahana?.description || "description"}
              price={parseInt(selectedWahana?.price) || 1}
              availability={4}
              highlightClass={ticketData[1].highlightClass}
              selectedVenue={currentVenue?.id}
              id={selectedWahana?.id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MgtTicket;
