import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowLeftCircle, HiOutlineMapPin } from "react-icons/hi2";
import { LoadingScreen } from "../../admin/pages/VenueDetail";

const MgtVenueManger = () => {
  const { currentVenue, loading } = useSelector((state) => state.venues);

  if (loading || !currentVenue) return <LoadingScreen />;

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <img
          src={currentVenue.banner.data}
          alt="framer_3"
          className="absolute inset-0 h-full w-full object-cover"
        ></img>
      </div>
      <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="-mt-16 flex flex-auto items-end">
            <div className="ring-bg-card flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
              <img
                src={currentVenue.logo.data}
                alt="frame_4"
                className="h-full w-full object-cover"
              ></img>
            </div>
          </div>
          <div className="mt-3 truncate text-4xl font-bold">
            {currentVenue.Title}
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-icon px-3 py-1 leading-normal text-white dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium">
                Creator : {currentVenue.creator.toText()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <HiOutlineMapPin size={24} />
              <div className="ml-6 leading-6">
                {currentVenue.Details.Location}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p>Maximum Capacity</p>
              <div className="ml-6 leading-6 font-medium">
                {parseInt(currentVenue.capacity)}
              </div>
            </div>

            <div className="flex sm:items-center">
              <p>Venue id</p>
              <div className="ml-6 leading-6">{currentVenue.id}</div>
            </div>
            {/* <div className="flex sm:items-center">
              <p>Total events</p>
              <div className="ml-6 leading-6 font-medium">
                {currentVenue.Events[0].length}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p>Total wahanas</p>
              <div className="ml-6 leading-6 font-medium">
                {currentVenue.Wahanas[0].length}
              </div>
            </div> */}
            <div className="flex">
              <p>Venue Description</p>
              <div className="prose prose-sm ml-6 max-w-none">
                <p>{currentVenue.Description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MgtVenueManger;
