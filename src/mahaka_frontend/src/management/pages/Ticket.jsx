import React, { useState, useEffect } from "react";
import Ticket from "../components/Ticket";
import { createActor } from "../../../../declarations/mahaka_backend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";

import { useIdentityKit } from "@nfid/identitykit/react";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { fetchTicketDetails } from "../../redux/reducers/apiReducers/ticketApiReducer";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import EventTickets from "../components/EventTickets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const MgtTicket = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { currentVenue, loading: venuesLoading } = useSelector(
    (state) => state.venues
  );

  const { currentUserByCaller } = useSelector((state) => state.users);

  const { events, eventLoading } = useSelector((state) => state.events);
  const { backend } = useSelector((state) => state.authentication);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { identity } = useIdentityKit();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getVenue({ backend, venueId: currentUserByCaller?.assignedVenue })
    );

    // Automatically select the first venue and fetch its ticket details
  }, [backend]);
  useEffect(() => {
    dispatch(
      getAllEventsByVenue({
        backend,
        chunkSize: 100,
        pageNo: 0,
        venueId: currentVenue[1]?.id,
      })
    );
    // Automatically select the first venue and fetch its ticket details
    if (!venuesLoading && currentVenue) {
      const defaultVenue = currentVenue[1];
      console.log(currentVenue);

      fetchTicketDetails(defaultVenue);
    }
  }, [backend, currentVenue]);

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

          setEventDetails(details);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      eventData();
    }
  }, [eventLoading, events]);

  const fetchTicketDetails = async (venue) => {
    console.log("hello");
    if (!venue?.Collection_id) {
      console.error("Venue does not have a collection_id:", venue);
      return;
    }

    setLoadingDetails(true);
    try {
      // Fetch ticket details from the actor
      console.log("hello after events");
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
    const selectedEvent = events.find((v) => v.id === selectedEventId);

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

      {loading ? <div>loading...</div> : <p>{currentVenue[1]?.Title}</p>}

      {/* Show Loader or Ticket Details */}
      {loadingDetails ? (
        <p>Loading ticket details...</p>
      ) : ticketDetails ? (
        <div>
          <div>
            <Swiper
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper px-4 sm:px-6 lg:px-8 mx-auto"
            >
              <SwiperSlide>
                <Ticket
                  type={"GROUP"}
                  gradientClass={ticketData[0].gradientClass}
                  name={"Group Tickets"}
                  description={ticketDetails?.description || "description"}
                  price={parseInt(ticketDetails?.gTicket_price) || 1}
                  availability={parseInt(ticketDetails?.gTicket_limit) || 4}
                  highlightClass={ticketData[0].highlightClass}
                  selectedVenue={currentVenue[1]?.id}
                />
              </SwiperSlide>

              <SwiperSlide>
                <Ticket
                  type={"SINGLE"}
                  gradientClass={ticketData[1].gradientClass}
                  name={"Single Tickets"}
                  description={ticketDetails?.description || "description"}
                  price={parseInt(ticketDetails?.sTicket_price) || 1}
                  availability={parseInt(ticketDetails?.sTicket_limit) || 4}
                  highlightClass={ticketData[1].highlightClass}
                  selectedVenue={currentVenue[1]?.id}
                />
              </SwiperSlide>

              <SwiperSlide>
                <Ticket
                  type={"VIP"}
                  gradientClass={ticketData[2].gradientClass}
                  name={"VIP Tickets"}
                  description={ticketDetails?.description || "description"}
                  price={parseInt(ticketDetails?.vTicket_price) || 1}
                  availability={parseInt(ticketDetails?.vTicket_limit) || 4}
                  highlightClass={ticketData[2].highlightClass}
                  selectedVenue={currentVenue[1]?.id}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      ) : (
        <p>No ticket details available for the selected venue.</p>
      )}

      {events.length > 0 && (
        <>
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
          {loadingDetails ? (
            <p>Loading ticket details...</p>
          ) : eventDetails ? (
            <div>
              <Swiper
                spaceBetween={40}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper px-4 sm:px-6 lg:px-8 mx-auto"
              >
                <SwiperSlide>
                  <EventTickets
                    type={"SINGLE"}
                    gradientClass={ticketData[1].gradientClass}
                    tickets={eventDetails}
                    selectedVenue={selectedEvent}
                    id={selectedVenue?.id}
                    availability={parseInt(ticketDetails?.sTicket_limit) || 4}
                    highlightClass={ticketData[1].highlightClass}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          ) : (
            <p>No ticket details available for the selected venue.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MgtTicket;
