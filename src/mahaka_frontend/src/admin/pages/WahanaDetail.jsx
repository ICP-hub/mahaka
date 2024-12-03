import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiArrowLeftCircle,
  HiCheckBadge,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { LoadingScreen } from "./VenueDetail";
import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";

const WahanaDetailPage = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentWahana, loading } = useSelector((state) => state.wahana);
  const { venueId, id } = useParams();

  useEffect(() => {
    dispatch(
      getWahana({ backend, selectedWahana: id, selectedVenue: venueId })
    );
  }, []);

  if (loading || !currentWahana) return <LoadingScreen />;

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-40 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-48 sm:px-12">
        <img
          src={currentWahana.banner.data}
          alt="framer_3"
          className="absolute inset-0 h-full w-full object-cover"
        ></img>
        <Link
          to="/admin/wahana"
          className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6 z-20 relative"
        >
          <HiArrowLeftCircle size={48} />
        </Link>
      </div>
      <div className="relative flex flex-auto flex-col items-center p-6 pt-0 sm:p-12 sm:pt-0">
        <div className="w-full max-w-3xl">
          <div className="mt-3 text-4xl font-bold">
            {currentWahana.ride_title}
            {currentWahana.featured && (
              <HiCheckBadge size={24} className="text-green-500" />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-icon px-3 py-1 leading-normal text-white dark:bg-gray-700 dark:text-gray-300">
              <span className="whitespace-nowrap text-sm font-medium max-w-[280px] md:max-w-full flex items-center">
                Creator :{" "}
                <p className="ml-1.5 truncate">
                  {currentWahana.creator.toText()}
                </p>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-8 border-t pt-6">
            <div className="flex sm:items-center">
              <HiOutlineMapPin size={24} />
              <div className="ml-6 leading-6 font-medium text-lg capitalize">
                {currentWahana.details.Location}
              </div>
            </div>
            <div className="flex sm:items-center font-medium">
              <p className="text-lg">Wahana id</p>
              <div className="ml-6 leading-6">{currentWahana.id}</div>
            </div>

            <div className="flex sm:items-center font-medium">
              <p className="text-lg">Ticket Price</p>
              <div className="ml-6 leading-6 text-xl font-semibold">
                Rp.{currentWahana.price}/person
              </div>
            </div>

            <div className="flex">
              <p className="font-medium text-lg">Wahana Description</p>
              <div className="prose prose-sm ml-6 max-w-none">
                {currentWahana.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WahanaDetailPage;
