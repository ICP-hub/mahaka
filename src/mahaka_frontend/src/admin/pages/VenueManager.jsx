import { HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CreateVenueForm from "../components/CreateVenueForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import PageIntro from "../components/PageIntro";
import { useSelector } from "react-redux";
import VenueTableFormat from "../components/VenueTableFormat";

const VenueManger = () => {
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const { venues, loading } = useSelector((state) => state.venues);
  const [searchInput, setSearchInput] = useState('')
  const [filteredVenues, setFilteredVenues] = useState(venues);

  
 
  useEffect(()=>{
    const filtered = venues.filter((venue)=>
      venue.Title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredVenues(filtered)
  },[searchInput, venues])


  return (
    <div className="flex flex-col sm:overflow-hidden">
      <PageIntro
        title="Venue"
        count={venues.length}
        actionOnButton={() => setIsVenueModalOpen(true)}
        isLoading={loading}
        searchInput = {searchInput}
        setSearchInput = {setSearchInput}
        


      />
      <VenueTableFormat filteredVenues = {filteredVenues} />
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

export default VenueManger;
