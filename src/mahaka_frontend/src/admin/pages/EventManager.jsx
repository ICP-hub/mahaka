import { HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";
import CreateEventForm from "../components/CreateEventForm";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import PageIntro from "../components/PageIntro";
import { useSelector } from "react-redux";
// import EventTableFormat from "../components/EventTableFormat";

const EventManger = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const { events, loading } = useSelector((state) => state.events);

  return (
    <div className="flex flex-col">
      <PageIntro
        title="Event"
        count={events.length}
        actionOnButton={() => setIsEventModalOpen(true)}
        isLoading={loading}
      />
      {/* <EventTableFormat /> */}
      {isEventModalOpen && (
        <ModalOverlay
          isOpen={isEventModalOpen}
          setIsOpen={setIsEventModalOpen}
          title="Create a new Event"
        >
          <CreateEventForm setIsModalOpen={setIsEventModalOpen} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default EventManger;
