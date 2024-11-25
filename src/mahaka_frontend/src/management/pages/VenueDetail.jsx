import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { formatDate } from "../../common/utils/dateFormater";

import { HiArrowLeftCircle, HiOutlineMapPin } from "react-icons/hi2";
//import { formatDateAndTime } from "./admin/EventManager";


// const FormatTime = (timeString) => {
//   const time = parseInt(timeString, 10);
//   const hours = Math.floor(time / 100);
//   const minutes = time % 100;
//   const period = hours >= 12 ? "PM" : "AM";
//   const formattedHours = hours % 12 || 12;
//   return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
// };

const MgtVenueDetailPage = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentVenue, loading } = useSelector((state) => state.venues);
  const { id } = useParams();


   function formatDateAndTime(timestamp) {
    const dateObject = new Date(timestamp * 1000);
    const date = dateObject.toDateString();
    const time = dateObject.toLocaleTimeString("en-GB", { hour12: false });
    return {
      date: date,
      time: time,
    };
  }

  useEffect(() => {
    dispatch(getVenue({ backend, venueId: id }));
  }, []);
  
  

  if (loading || !currentVenue) return <LoadingScreen />;

  const startInterVal = formatDateAndTime(
    parseInt(currentVenue[1].Details.StartDate)
  );
  const endInterVal = formatDateAndTime(
    parseInt(currentVenue[1].Details.EndDate)
  );

  console.log(startInterVal);
 



  return (
    <div className="flex w-full flex-col">
    <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
      <img
        src={currentVenue[1].banner.data}
        alt="framer_3"
        className="absolute inset-0 h-full w-full object-cover"
      ></img>
      <Link
        to="/admin/venues"
        className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6 z-20 relative"
      >
        <HiArrowLeftCircle size={48} />
      </Link>
    </div>
    <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
      <div className="w-full max-w-3xl">
        <div className="-mt-16 flex flex-auto items-end">
          <div className="ring-bg-card flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
            <img
              src={currentVenue[1].logo.data}
              alt="frame_4"
              className="h-full w-full object-cover"
            ></img>
          </div>
          {/* <div className="mb-1 ml-auto flex items-center">
            <button className="bg-indigo-600 flex items-center justify-center min-h-10 px-4 rounded-full text-white">
              Edit Venue
            </button>
          </div> */}
        </div>
        <div className="mt-3 truncate text-4xl font-bold">
          {currentVenue[1].Title}
        </div>
        <div className="mt-2 flex flex-wrap items-center">
          <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            <span className="whitespace-nowrap text-sm font-medium">
              Creator : {currentVenue[1].creator.toText()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
          <div className="flex sm:items-center">
            <HiOutlineMapPin size={24} />
            <div className="ml-6 leading-6">
              {currentVenue[1].Details.Location}
            </div>
          </div>
          <div className="flex sm:items-center">
            <p>Maximum Capacity</p>
            <div className="ml-6 leading-6">
              {parseInt(currentVenue[1].capacity)}
            </div>
          </div>
          <div className="flex sm:items-center">
            <p>Start Date</p>
            <div className="ml-6 leading-6">Nov 25, 2024</div>
          </div>
          <div className="flex sm:items-center">
            <p>End Date</p>
            <div className="ml-6 leading-6">Nov 28, 2024</div>
          </div>
          <div className="flex sm:items-center">
            <p>Venue id</p>
            <div className="ml-6 leading-6">{currentVenue[1].id}</div>
          </div>
          <div className="flex">
            <p>Venue Description</p>
            <div className="prose prose-sm ml-6 max-w-none">
              <p>{currentVenue[1].Description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      
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
          {eventArr.length > 0 &&
            eventArr.map((event, index) => (
              <>
                <div className="inventory-grid grid items-center gap-4 border-b px-6 py-3 md:px-8 border-b-border">
                  <div className="flex items-center">
                    <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-border">
                      <img  src={event.logo.data} alt="Event_img" />
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

const LoadingScreen = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <div className="h-full w-full bg-gray-300 animate-pulse"></div>
        <div className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6">
          <div className="h-8 w-8 rounded-full animate-pulse bg-gray-300"></div>
        </div>
      </div>
      <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="-mt-16 flex flex-auto items-end">
            <div className="ring-gray-500 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
              <div className="h-full w-full bg-gray-300"></div>
            </div>
            <div className="mb-1 ml-auto flex items-center">
              <button className="bg-gray-300 animate-pulse text-gray-300 flex items-center justify-center min-h-10 px-4 rounded-full">
                Edit Venue
              </button>
            </div>
          </div>
          <div className="mt-3 truncate text-4xl font-bold">
            <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
              Venue one
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum
                </span>
              </div>
            </div>
            <div className="flex sm:items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="ml-6 leading-6">
                <span className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Lorem ipsum dolor sit amet
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="h-8 w-8 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="prose prose-sm ml-6 max-w-none">
                <p className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  In amet voluptate ad eiusmod cupidatat nulla sunt eu amet
                  occaecat qui cillum occaecat tempor minim nostrud ullamco amet
                  elit aliquip est nisi officia lorem occaecat ea lorem officia
                  veniam.
                </p>
                <p className="bg-gray-400 animate-pulse text-gray-400 rounded-md">
                  Nulla tempor id excepteur irure do do veniam eiusmod esse
                  ipsum sint dolore commodo enim officia nulla nulla proident in
                  dolor et aliquip sit nulla sit proident duis aute deserunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MgtVenueDetailPage;

/** <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div className="flex flex-col p-8 sm:flex-row" key={index}>
                <div className="mb-8 flex flex-col items-center sm:mb-0 sm:items-start">
                  <div className="w-32 border h-44 rounded-md border-border">
                    <img
                      src={EventDummyImg}
                      alt="event_img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-auto flex-wrap">
                  <div className="flex w-full flex-col sm:pl-8 lg:w-2/4">
                    <EventViewBlock label="Event Name" value={event.name} />
                    <div className="flex">
                      <div className="w-1/3 pr-2">
                        <EventViewBlock label="Event Date" value={event.date} />
                      </div>
                      <div className="w-2/3 pl-2">
                        <EventViewBlock label="Event Time" value={event.time} />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col sm:pl-8 lg:w-2/4">
                    <EventViewBlock label="Location" value={event.location} />
                    <EventViewBlock
                      label="Description"
                      value={event.description}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // <div>
            //   {events.map((event) => (
            //     <div
            //       key={event.id}
            //       className="border border-gray-300 p-4 mb-4 rounded"
            //     >
            //       <h3 className="text-lg font-semibold">{event.title}</h3>
            //       <p>
            //         <strong>📅</strong> {formatDate(event.details.StartDate)} -{" "}
            //         {formatDate(event.details.EndDate)}
            //       </p>
            //       <p>
            //         <strong>🕒</strong> {FormatTime(event.details.StartTime)} -{" "}
            //         {FormatTime(event.details.EndTime)}
            //       </p>
            //       <p>
            //         <strong>Location:</strong> {event.details.Location}
            //       </p>
            //       <p>
            //         <strong>Description:</strong> {event.description}
            //       </p>
            //     </div>
            //   ))}
            // </div>
            <div>
              <p>No events available for this venue.</p>
            </div>
          )}

          {/* <button
            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
            onClick={() => setIsEventModalOpen(true)}
          >
            Create Event
          </button> 
          </div> 
           */
