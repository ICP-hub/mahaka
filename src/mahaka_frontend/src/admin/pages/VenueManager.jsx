import { HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";
import CreateVenueForm from "../components/CreateVenueForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";

const VenueManger = () => {
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);

  const animVar = {
    initial: { rotate: 0 },
    hover: { rotate: 90, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="px-4 md:px-6 py-4">
        <div className="flex w-full">
          <motion.button
            initial="initial"
            whileHover="hover"
            className="flex gap-1 items-center justify-center bg-secondary p-2.5 text-white font-medium rounded-lg hover:bg-orange-600"
            onClick={() => setIsVenueModalOpen(true)}
          >
            <motion.div variants={animVar}>
              <HiOutlinePlus color="white" strokeWidth={3} size={12} />
            </motion.div>
            <span>New Venue</span>
          </motion.button>
        </div>
      </div>
      {isVenueModalOpen && (
        <ModalOverlay
          isOpen={isVenueModalOpen}
          setIsOpen={setIsVenueModalOpen}
          title="Create a new venue"
        >
          <CreateVenueForm setIsModalOpen={setIsVenueModalOpen} />
        </ModalOverlay>
      )}
    </>
  );
};

export default VenueManger;
