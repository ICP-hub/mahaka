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
                src={currentVenue.logo.data}
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
            {currentVenue.Title}
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-icon px-3 py-1 leading-normal text-white dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium max-w-xs md:max-w-full flex items-center">
                Creator :{" "}
                <p className="ml-1.5 truncate">
                  {currentVenue.creator.toText()}
                </p>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <HiOutlineMapPin size={24} />
              <div className="ml-6 leading-6 font-medium text-lg capitalize">
                {currentVenue.Details.Location}
              </div>
            </div>
            <div className="flex sm:items-center">
              <p className="font-medium text-lg">Maximum Capacity</p>
              <div className="ml-6 leading-6 font-medium">
                {parseInt(currentVenue.capacity)}
              </div>
            </div>
            {/* <div className="flex sm:items-center">
              <p>Start Date</p>
              <div className="ml-6 leading-6">Nov 25, 2024</div>
            </div>
            <div className="flex sm:items-center">
              <p>End Date</p>
              <div className="ml-6 leading-6">Nov 28, 2024</div>
            </div> */}
            <div className="flex sm:items-center">
              <p className="font-medium text-lg">Venue id</p>
              <div className="ml-6 leading-6">{currentVenue.id}</div>
            </div>
            <div className="flex">
              <div className="font-medium text-lg">Events</div>
              <div className="ml-6 min-w-0 space-y-1">
                {currentVenue.Events.length > 0 ? (
                  currentVenue.Events.map((item, index) => (
                    <div className="flex leading-6" key={index}>
                      <div className="sm:ml-3 capitalize">
                        {item.split("#")[0].trim()}
                      </div>
                      <div className="text-secondary truncate text-md">
                        <span className="mx-2">•</span>
                        <span className="font-medium">{item}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-secondary">
                    No Events available in this venue
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="font-medium text-lg">Wahanas</div>
              <div className="ml-6 min-w-0 space-y-1">
                {currentVenue.Wahanas.length > 0 ? (
                  currentVenue.Wahanas.map((item, index) => (
                    <div className="flex leading-6" key={index}>
                      <div className="sm:ml-3 capitalize">
                        {item.split("#")[0].trim()}
                      </div>
                      <div className="text-secondary truncate text-md">
                        <span className="mx-2">•</span>
                        <span className="font-medium">{item}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-secondary">
                    No Wahanas available in this venue
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <p className="font-medium text-lg">Venue Description</p>
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
