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
} from "../../redux/reducers/apiReducers/venueApiReducer"; // Import the searchVenues action

const VenueManager = () => {
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const { backend } = useSelector((state) => state.authentication);
  const { venues, loading } = useSelector((state) => state.venues);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Trigger the search whenever the user types in the search input
    if (searchInput) {
      dispatch(
        searchVenues({
          backend,
          searchText: searchInput,
          pageLimit: 10,
          currPage: 0,
        })
      );
    } else {
      dispatch(getAllVenues({ backend, pageLimit: 10, currPage: 0 }));
    }
  }, [searchInput, dispatch]);

  return (
    <div className="flex flex-col sm:overflow-hidden">
      <PageIntro
        title="Venue"
        count={(venues && venues.length) || 0}
        actionOnButton={() => setIsVenueModalOpen(true)}
        isLoading={loading}
        searchInput={searchInput}
        setSearchInput={setSearchInput} // Handle search input
      />
      <VenueTableFormat filteredVenues={venues} />{" "}
      {/* Use venues from Redux directly */}
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
