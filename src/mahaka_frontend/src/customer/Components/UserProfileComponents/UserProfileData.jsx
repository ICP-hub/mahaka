import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import ModalOverlay from "../../Components/Modal-overlay";
import EditProfileForm from "../../Components/UserProfileComponents/EditProfileForm";
import Avvvatars from "avvvatars-react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";

const UserProfileData = () => {
  const { currentUser, userLoading } = useSelector((state) => state.users);
  const { principal } = useSelector((state) => state.authentication);
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (userLoading) return <ProfileDataLoader />;

  return (
    <>
      {editModalOpen && (
        <ModalOverlay
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          title="Edit Profile"
        >
          <EditProfileForm setIsModalOpen={setEditModalOpen} />
        </ModalOverlay>
      )}
      <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-md relative">
        <motion.button
          whileHover={{ paddingLeft: "32px", paddingRight: "32px" }}
          className={`absolute right-0 flex items-center min-h-8 text-white px-4 rounded-l-full space-x-2 font-semibold ${
            userLoading ? "bg-gray-400" : "bg-secondary hover:bg-orange-600"
          }`}
          onClick={() => (userLoading ? null : setEditModalOpen(true))}
        >
          <CiEdit size={20} />
          <div>Edit</div>
        </motion.button>
        <div className="flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-md">
          <Avvvatars value={principal} size={240} shadow={true} />
          <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
            <h1 className="text-base font-bold flex gap-1">
              <span className="text-gray-600">
                {currentUser && currentUser.firstName}
              </span>
              <span className="text-gray-600">
                {currentUser && currentUser.lastName}
              </span>
            </h1>
            <button className="text-blue-900 font-semibold text-sm flex gap-2 hover:underline">
              Disconnect
              <MdLogout size={18} />
            </button>
          </div>
        </div>
        <div className="md:p-12 divide-y divide-gray-400 w-full">
          <div className="flex items-center p-4">
            <label className="block text-gray-700 font-semibold w-32">
              First Name
            </label>
            <p className="font-semibold">
              {currentUser && currentUser.firstName}
            </p>
          </div>
          <div className="flex items-center p-4">
            <label className="block text-gray-700 font-semibold w-32">
              Last Name
            </label>
            <p className="font-semibold">
              {currentUser && currentUser.lastName}
            </p>
          </div>
          <div className="flex items-center p-4">
            <label className="block text-gray-700 font-semibold w-32">
              Email
            </label>
            <p className="font-semibold">{currentUser && currentUser.email}</p>
          </div>
          <div className="flex items-center p-4">
            <label className="block text-gray-700 font-semibold w-32">
              Principal ID
            </label>
            <p className="font-semibold break-all">{principal}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileDataLoader = () => {
  const firstName = "usernameusername";
  const lastName = "usernameusername";
  const email = "username@gmail.com";
  const principalId = "7yywl-leric6-n33rr-vskrc6-yb4nd";

  return (
    <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-md">
      <div className="flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-md">
        <span className="min-h-60 min-w-60 max-h-min max-w-min rounded-full bg-gray-600 animate-pulse"></span>
        <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
          <h1 className="text-base font-bold flex gap-1">
            <span className="text-gray-600 bg-gray-600 animate-pulse rounded-md">
              {firstName}
            </span>
            <span className="text-gray-600 bg-gray-600 animate-pulse rounded-md">
              {lastName}
            </span>
          </h1>
          <button
            href="#"
            className="text-blue-900 font-semibold text-sm flex gap-2 hover:underline"
          >
            Disconnect
            <MdLogout size={18} />
          </button>
        </div>
      </div>
      <div className="md:p-12 divide-y divide-gray-400 w-full">
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            First Name
          </label>
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-md">
            {firstName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Last Name
          </label>
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-md">
            {lastName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Email
          </label>
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-md">
            {email}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Principal ID
          </label>
          <p className="font-semibold break-all text-gray-600 bg-gray-600 animate-pulse rounded-md">
            {principalId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileData;
