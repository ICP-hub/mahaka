import { HiOutlinePlus } from "react-icons/hi2";
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
  const { backend } = useSelector((state) => state.authentication);
  const { venues, loading, totalPages, currentPage } = useSelector(
    (state) => state.venues
  );
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  // Function to fetch venues based on search input or all venues
  const fetchVenues = () => {
    if (searchInput) {
      dispatch(
        searchVenues({
          backend,
          searchText: searchInput,
          pageLimit: 10,
          currPage: page - 1,
        })
      );
    } else {
      dispatch(
        getAllVenues({
          backend,
          pageLimit: 1,
          currPage: page - 1,
        })
      );
    }
  };

  // Trigger fetch on component mount and when search input or page changes
  useEffect(() => {
    fetchVenues();
  }, [searchInput, page]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col sm:overflow-hidden">
      <PageIntro
        title="Venue"
        count={(venues && venues.length) || 0}
        actionOnButton={() => setIsVenueModalOpen(true)}
        isLoading={loading}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <VenueTableFormat filteredVenues={venues} />

      {/* Pagination Controls */}
      <div className="flex justify-end m-6 items-center space-x-2">
        {/* Prev button */}
        <button
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-card text-gray-500 cursor-not-allowed"
              : "bg-card"
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`mx-1 px-3 py-1 rounded ${
              page === pageNum ? "bg-secondary text-white" : "bg-card"
            }`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {/* Next button */}
        <button
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-card text-gray-500 cursor-not-allowed"
              : "bg-card"
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

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
