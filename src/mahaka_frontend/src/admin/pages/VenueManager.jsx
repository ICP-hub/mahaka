import { HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";
import CreateVenueForm from "../components/CreateVenueForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import PageIntro from "../components/PageIntro";
import { useSelector } from "react-redux";
import VenueTableFormat from "../components/VenueTableFormat";

const VenueManger = () => {
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const { venues, loading } = useSelector((state) => state.venues);

  return (
    <div className="flex flex-col sm:overflow-hidden">
      <PageIntro
        title="Venue"
        count={venues.length}
        actionOnButton={() => setIsVenueModalOpen(true)}
        isLoading={loading}
      />
      <VenueTableFormat />
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
