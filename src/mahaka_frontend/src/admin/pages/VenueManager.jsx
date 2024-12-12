import {
  HiArrowRightCircle,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateVenueForm from "../components/CreateVenueForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import PageIntro from "../components/PageIntro";
import VenueTableFormat from "../components/VenueTableFormat";
import {
  searchVenues,
  getAllVenues,
} from "../../redux/reducers/apiReducers/venueApiReducer";

const VenueManager = () => {
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const { venues, loading, totalPages, currentPage, searchedVenues } = useSelector(
    (state) => state.venues
  );
  const { backend } = useSelector((state) => state.authentication);
  const [searchInput, setSearchInput] = useState("");
  const [displayVenues, setDisplayVenues] = useState([]);
  const dispatch = useDispatch();

  
  // const [page, setPage] = useState(1);

  // // Function to fetch venues based on search input or all venues
  // const fetchVenues = () => {
  //   if (searchInput) {
  //     dispatch(
  //       searchVenues({
  //         backend,
  //         searchText: searchInput,
  //         pageLimit: 10,
  //         currPage: page - 1,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       getAllVenues({
  //         backend,
  //         pageLimit: 10,
  //         currPage: page - 1,
  //       })
  //     );
  //   }
  // };

  // // Trigger fetch on component mount and when search input or page changes
  // useEffect(() => {
  //   fetchVenues();
  // }, [searchInput, page]);

  // // Handle page change
  // const handlePageChange = (pageNumber) => {
  //   if (pageNumber >= 1 && pageNumber <= totalPages) {
  //     setPage(pageNumber);
  //   }
  // };

  const fetchVenues = () => {
    if (searchInput.trim()) {
      dispatch(
        searchVenues({
          backend,
          searchText: searchInput.trim(),
          pageLimit: 10,
          currPage: 0,
        })
      );
    } else {
      dispatch(
        getAllVenues({
          backend,
          pageLimit: 10,
          currPage: 0,
        })
      );
    }
  };

  const handleSearch = () => {
    fetchVenues();
  };

  useEffect(() => {
    if (searchInput.trim()) {
      setDisplayVenues(searchedVenues || []);
    } else {
      setDisplayVenues(venues);
    }
  }, [searchInput, venues, searchedVenues]);

  return (
    <div className="flex flex-col sm:overflow-hidden">
      <div className="relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 md:px-8">
        <div className="relative flex flex-col text-[#E2E8F0]">
          <div className="text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            Venues
          </div>
          <div className="mt-1 ml-3 text-xl font-semibold">
            {loading ? (
              <div className="bg-gray-500 animate-pulse h-6 w-24 rounded-md"></div>
            ) : (
              <div>
                {displayVenues?.length || 0} {displayVenues?.length > 1 ? "Venues" : "Venue"}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col sm:items-center sm:max-w-none sm:flex-row mt-4">
          <div className="w-full sm:w-72 md:w-128 bg-card p-4 rounded-xl border border-border">
            <div className="relative flex items-center flex-auto">
              <div>
                <HiOutlineMagnifyingGlass size={24} />
              </div>
              <div className="w-full mx-1">
                <input
                  type="text"
                  placeholder="Search venues..."
                  className="outline-none bg-transparent w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="ml-auto">
                <HiArrowRightCircle 
                  size={24} 
                  className="cursor-pointer" 
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="sm:ml-auto mt-4 sm:mt-0 flex items-center justify-center w-full sm:w-fit h-full">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer w-full text-white p-4"
              onClick={() => setIsVenueModalOpen(true)}
            >
              Add a new venue
            </button>
          </div>
        </div>
      </div>
       {/* <PageIntro
        title="Venue"
        count={(venues && venues.length) || 0}
        actionOnButton={() => setIsVenueModalOpen(true)}
        isLoading={loading}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      /> */}
      <VenueTableFormat filteredVenues={displayVenues} />
      {/* Modal for creating a new venue */}
      {isVenueModalOpen && (
        <ModalOverlay
          isOpen={isVenueModalOpen}
          setIsOpen={setIsVenueModalOpen}
          title="Create a new venue"
        >
          <CreateVenueForm setIsModalOpen={setIsVenueModalOpen} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default VenueManager;