import React, { useState, useEffect, useMemo } from "react";
import {
  HiArrowRightCircle,
  HiCheckBadge,
  HiChevronDown,
  HiChevronUp,
  // HiClock,
  HiMiniMapPin,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
// import img1 from "../../assets/images/frame3.png";
// import img2 from "../../assets/images/fram6.png";
import { AnimatePresence, motion } from "framer-motion";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import {
  deleteWahana,
  getAllWahanasbyVenue,
} from "../../redux/reducers/apiReducers/wahanaApiReducer";
import {
  createStaggerContainer,
  createStaggerVariant,
} from "../../common/animationVariants";
import CreateWahanaForm from "../components/CreateWahanaForm";
import { formatDateAndTime } from "./EventManager";
import { IoTrashBinSharp } from "react-icons/io5";

// Main component
const WahanaManager = () => {
  const { venues } = useSelector((state) => state.venues);
  const { backend } = useSelector((state) => state.authentication);
  const { wahanas, wahanasByVenue, singleWahanaLoading, loading } = useSelector(
    (state) => state.wahana
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState({
    option: "All",
    id: "",
  });

  const toggleOptionMenu = () => setIsOptionMenuOpen((pv) => !pv);

  const handleSelectOption = (option, id) => {
    setSelectedVenue((pv) => ({ ...pv, option: option, id: id }));
    setIsOptionMenuOpen(false);
  };

  // Filtered : memoized
  const filteredWahanas = useMemo(() => {
    if (selectedVenue.option === "All") {
      return wahanas;
    } else {
      return wahanasByVenue;
    }
  }, [selectedVenue, wahanas, wahanasByVenue]);

  useEffect(() => {
    if (selectedVenue.option !== "All") {
      dispatch(
        getAllWahanasbyVenue({
          backend,
          chunkSize: 10,
          pageNo: 0,
          venueId: selectedVenue.id,
        })
      );
    }
  }, [selectedVenue]);

  // console.log("filtered", filteredWahanas);

  // const containerVariants = createStaggerContainer(0.4);
  // const cardVariants = createStaggerVariant(0.3);

  // const containerVariants = createStaggerContainer(0.4);
  // const cardVariants = createStaggerVariant(0.3);
  return (
    <div className="flex flex-auto flex-col relative min-h-screen">
      <div className="flex min-w-0 flex-col">
        <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
          <svg
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 pointer-events-none"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
              className="text-gray-700 opacity-25"
            >
              <circle r="234" cx="196" cy="23"></circle>
              <circle r="234" cx="790" cy="491"></circle>
            </g>
          </svg>
          <div className="relative z-10 flex flex-col items-center text-text">
            <div className="text-xl font-semibold">MAHAKA'S</div>
            <div className="mt-1 text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Wahanas
            </div>
          </div>
        </div>
        <div className="flex flex-auto p-6 sm:p-10">
          <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
            <div className="flex w-full max-w-xs flex-col sm:items-center sm:max-w-none sm:flex-row">
              <div className="sm:w-36 bg-card rounded-xl p-4 relative cursor-pointer">
                <div className="flex flex-auto">
                  <div className="flex flex-col absolute top-0 inset-x-0 rounded-xl bg-card z-20">
                    <div className="flex justify-between">
                      <div className="w-full">
                        <div
                          className="p-4 truncate"
                          onClick={toggleOptionMenu}
                        >
                          {selectedVenue.option}
                        </div>
                        {isOptionMenuOpen && (
                          <>
                            {["All", ...venues.map(({ Title }) => Title)].map(
                              (option) => {
                                if (option === selectedVenue.option) {
                                  return null;
                                }

                                return (
                                  <div
                                    key={option}
                                    className="py-4 hover:bg-hover last:rounded-b-xl"
                                    onClick={() => {
                                      if (option === "All") {
                                        handleSelectOption(option, "");
                                      } else {
                                        const venue = venues.find(
                                          ({ Title }) => Title === option
                                        );
                                        handleSelectOption(option, venue.id);
                                      }
                                    }}
                                  >
                                    <div className="px-4">{option}</div>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center">#</div>
                </div>
              </div>
              <div className="mt-4 w-full sm:ml-4 sm:mt-0 sm:w-72 bg-card p-4 rounded-xl">
                <div className="relative flex items-center flex-auto">
                  <div>
                    <HiOutlineMagnifyingGlass size={24} />
                  </div>
                  <div className="w-full mx-1">
                    <input
                      type="text"
                      placeholder="Search wahanas..."
                      className="outline-none bg-transparent w-full"
                    />
                  </div>
                  <div className="ml-auto">
                    <HiArrowRightCircle size={24} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto mt-4 sm:mt-0 flex items-center justify-center w-full sm:w-fit h-full">
                <div
                  className="bg-indigo-600 rounded-xl cursor-pointer w-full text-white p-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add a new wahana
                </div>
              </div>
            </div>
            {loading || singleWahanaLoading ? (
              <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            ) : filteredWahanas && filteredWahanas.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredWahanas.map((wahana, index) => (
                  <motion.div key={index} variants={cardVariants}>
                    <WahanaCard wahana={wahana} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="mt-8">No Wahana Found</div>
            )}
          </div>
        </div>
      </div>
      {/* Create event modal */}
      {isModalOpen && (
        <ModalOverlay
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Create Wahana"
        >
          <CreateWahanaForm setIsModalOpen={setIsModalOpen} />
        </ModalOverlay>
      )}
    </div>
  );
};

// event cards
const WahanaCard = ({ wahana }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const { backend } = useSelector((state) => state.authentication);
  const toggleExpand = () => setIsExpanded((pv) => !pv);
  const startInterVal = formatDateAndTime(parseInt(wahana.details.StartDate));
  const endInterVal = formatDateAndTime(parseInt(wahana.details.EndDate));
  const [isDelete, setIsDelete] = useState(false);

  const handleWahanaDelete = () => {
    dispatch(
      deleteWahana({
        backend: backend,
        venueId: wahana.venueId,
        wahanaId: wahana.id,
        setIsDelete: setIsDelete,
      })
    );
  };

  return (
    <>
      {isDelete && (
        <DeleteModal
          closeModal={() => setIsDelete(false)}
          onWahanaDelete={handleWahanaDelete}
        />
      )}
      <div className="bg-card flex min-h-96 max-h-fit flex-col rounded-2xl">
        <div className="relative">
          <div className="absolute -right-2 -top-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-error flex items-center justify-center"
              onClick={() => setIsDelete(true)}
            >
              <IoTrashBinSharp size={16} className="text-white" />
            </motion.button>
          </div>
          <div className="h-60 w-full border border-white rounded-t-2xl overflow-hidden">
            <img
              src={wahana.banner.data}
              alt="banner_img"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50 truncate">
              {wahana.venueId.split("#")[0]}
            </div>
            <div className="flex items-center">
              {wahana.featured && (
                <HiCheckBadge size={24} className="text-green-500" />
              )}
            </div>
          </div>
          <div className="mt-4 text-lg font-medium">{wahana.ride_title}</div>
          <div className="text-secondary mt-0.5 line-clamp-2">
            {wahana.description}
          </div>
          <div className="flex items-center text-md leading-5 mt-2 uppercase font-medium">
            <HiMiniMapPin size={14} />
            <div className="ml-1.5">{wahana.details.Location}</div>
          </div>
          <div className="flex items-center text-md leading-5 mt-2 font-medium">
            <div>Creator</div>
            <div className="ml-1.5 truncate">{wahana.creator.toText()}</div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col font-medium">
              <div>Start Date</div>
              <div>{startInterVal.date}</div>
              <div>{startInterVal.time}</div>
            </div>
            <button
              onClick={toggleExpand}
              className="h-8 w-8 rounded-full hover:bg-hover flex items-center justify-center"
            >
              {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <div className="border-t border-border p-4">
                <div className="flex justify-between">
                  <div className="flex flex-col font-medium w-1/2">
                    <div>End Date</div>
                    <div>{endInterVal.date}</div>
                    <div>{endInterVal.time}</div>
                  </div>
                  <div className="flex flex-col font-medium w-1/2">
                    <div>Wahana ID</div>
                    <div className="text-xs">{wahana.id}</div>
                  </div>
                </div>
                {/* <div className="flex items-center flex-auto mt-4">
                  <div className="font-mono text-xl">ICP</div>
                  <div className="ml-auto flex items-baseline">
                    <div className="font-bold text-4xl">
                      {parseInt(wahana.priceICP)}
                    </div>
                    <div className="text-secondary font-semibold text-lg">
                      /Person
                    </div>
                  </div>
                </div> */}
                <div className="flex items-center flex-auto mt-4">
                  <div className="font-mono text-xl">IDR</div>
                  <div className="ml-auto flex items-baseline">
                    <div className="font-bold text-4xl">{wahana.price}</div>
                    <div className="text-secondary font-semibold text-lg">
                      /Person
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Loader
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col p-4 bg-gray-400 rounded-xl shadow-md min-h-96">
      {/* Bottom section*/}
      <div className="space-y-2 mt-auto">
        <div className="flex">
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-600 rounded w-10 ml-auto"></div>
        </div>
        <div className="h-2 bg-gray-600 rounded w-1/2 my-5"></div>
        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-600 rounded w-10 "></div>
        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

const DeleteModal = ({ closeModal, onWahanaDelete }) => {
  const { deleteWahanaLoading } = useSelector((state) => state.wahana);
  return (
    <div className="fixed inset-0 z-999 flex items-center rounded justify-center bg-black bg-opacity-50">
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl mb-4">
          Are you sure you want to delete this wahana?
        </h2>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-xl mr-4"
            disabled={deleteWahanaLoading}
            onClick={onWahanaDelete}
          >
            {deleteWahanaLoading ? "Deleting..." : "Delete"}
          </button>
          <button className="px-4 py-2" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WahanaManager;