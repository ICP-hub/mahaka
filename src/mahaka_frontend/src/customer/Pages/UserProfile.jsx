import { useState } from "react";
import Tabs from "../Components/Tabs";
import { CiEdit } from "react-icons/ci";
import UserProfileData from "../Components/UserProfileComponents/UserProfileData";
import UserBookingData from "../Components/UserProfileComponents/UserBookingData";
import ModalOverlay from "../Components/Modal-overlay";
import EditProfileForm from "../Components/UserProfileComponents/EditProfileForm";

const UserProfile = () => {
  const profileTabs = ["User Profile", "Bookings"];
  const [selected, setSelected] = useState(profileTabs[0]);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <Tabs
            tabs={profileTabs}
            selected={selected}
            setSelected={setSelected}
          />
          {selected === profileTabs[0] && (
            <button
              className="px-6 py-2.5 rounded-lg bg-secondary font-medium flex gap-2 text-white items-center hover:bg-orange-600"
              onClick={() => setEditModalOpen(true)}
            >
              <CiEdit size={24} />
              EDIT PROFILE
            </button>
          )}
        </div>
        {selected === profileTabs[0] && <UserProfileData />}
        {selected === profileTabs[1] && <UserBookingData />}
      </div>
      {editModalOpen && (
        <ModalOverlay
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          title="Edit Profile"
        >
          <EditProfileForm />
        </ModalOverlay>
      )}
    </>
  );
};

export default UserProfile;
