import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowLeftCircle, HiOutlineMapPin } from "react-icons/hi2";
import { getEvent } from "../../redux/reducers/apiReducers/eventApiReducer";
import { getDIPdetails } from "../../redux/reducers/apiReducers/dipapireducer";
import { formatDateAndTime } from "../../admin/pages/EventManager";
import { LoadingScreen, TicketInfo } from "../../admin/pages/VenueDetail";

const MgtEventDetail = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentEvent, singleEventLoading } = useSelector(
    (state) => state.events
  );
  const { venueId, id } = useParams();

  useEffect(() => {
    dispatch(getEvent({ backend, eventIds: id, venueId: venueId }));
  }, []);

  useEffect(() => {
    if (currentEvent) {
      dispatch(
        getDIPdetails({
          backend: backend,
          principal: currentEvent.event_collectionid,
        })
      );
    }
  }, [currentEvent]);

  if (singleEventLoading || !currentEvent) return <LoadingScreen />;

  const startInterVal = formatDateAndTime(
    parseInt(currentEvent.details.StartDate)
  );
  const endInterVal = formatDateAndTime(parseInt(currentEvent.details.EndDate));

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <img
          src={currentEvent.banner.data}
          alt="framer_3"
          className="absolute inset-0 h-full w-full object-cover"
        ></img>
        <Link
          to="/management/events"
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
                src={currentEvent.logo.data}
                alt="frame_4"
                className="h-full w-full object-cover"
              ></img>
            </div>
          </div>
          <div className="mt-3 text-4xl font-bold">{currentEvent.title}</div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-icon px-3 py-1 leading-normal text-white dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium max-w-[280px] md:max-w-full flex items-center">
                Creator :{" "}
                <p className="ml-1.5 truncate">
                  {currentEvent.creator.toText()}
                </p>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <HiOutlineMapPin size={24} />
              <div className="ml-6 leading-6 font-medium text-lg capitalize">
                {currentEvent.details.Location}
              </div>
            </div>
            <div className="flex sm:items-center font-medium">
              <p className="text-lg">Event id</p>
              <div className="ml-6 leading-6">{currentEvent.id}</div>
            </div>
            <div className="flex sm:items-center">
              <p className="font-medium text-lg">Starts On</p>
              <div className="ml-6 leading-6 font-bold text-xl">
                {startInterVal.date}, {startInterVal.time}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p className="font-medium text-lg">Ends On</p>
              <div className="ml-6 leading-6 font-bold text-xl">
                {endInterVal.date}, {endInterVal.time}
              </div>
            </div>
            <TicketInfo label="Single ticket" />
            <TicketInfo label="Group ticket" />
            <TicketInfo label="Vip ticket" />
            <div className="flex">
              <p className="font-medium text-lg">Event Description</p>
              <div className="prose prose-sm ml-6 max-w-none">
                {currentEvent.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MgtEventDetail;
