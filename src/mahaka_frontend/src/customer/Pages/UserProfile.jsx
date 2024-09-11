import { useState } from "react";
import Tabs from "../Components/Tabs";
import { CiEdit } from "react-icons/ci";
import UserProfileData from "../Components/UserProfileComponents/UserProfileData";
import UserBookingData from "../Components/UserProfileComponents/UserBookingData";
import ModalOverlay from "../Components/Modal-overlay";
import EditProfileForm from "../Components/UserProfileComponents/EditProfileForm";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const profileTabs = ["User Profile", "Bookings"];
  const [selected, setSelected] = useState(profileTabs[0]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { userLoading } = useSelector((state) => state.users);

  return (
    <>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="flex justify-between mb-8 items-center relative">
          <Tabs
            tabs={profileTabs}
            selected={selected}
            setSelected={setSelected}
          />
          {selected === profileTabs[0] && (
            <>
              <button
                className={`hidden px-6 py-2 rounded-lg font-medium md:flex gap-2 text-white items-center ${
                  userLoading
                    ? "bg-gray-400"
                    : "bg-secondary hover:bg-orange-600"
                }`}
                onClick={() => (userLoading ? null : setEditModalOpen(true))}
              >
                <CiEdit size={24} />
                EDIT PROFILE
              </button>
              <button
                className={`md:hidden p-2 absolute -bottom-12 -right-3 rounded-full font-medium flex gap-2 text-white items-center ${
                  userLoading
                    ? "bg-gray-400"
                    : "bg-secondary hover:bg-orange-600"
                }`}
                onClick={() => (userLoading ? null : setEditModalOpen(true))}
              >
                <CiEdit size={24} />
              </button>
            </>
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
          <EditProfileForm setIsModalOpen={setEditModalOpen} />
        </ModalOverlay>
      )}
    </>
  );
};

export default UserProfile;
