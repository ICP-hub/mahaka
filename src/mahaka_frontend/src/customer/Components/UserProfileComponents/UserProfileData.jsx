import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avvvatars from "avvvatars-react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import {
  createUser,
  updateUserUserDetails,
} from "../../../redux/reducers/apiReducers/userApiReducer";
import { Principal } from "@dfinity/principal";

const UserProfileData = () => {
  const { currentUserByCaller, userLoading } = useSelector(
    (state) => state.users
  );
  const { principal } = useSelector((state) => state.authentication);
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (userLoading) return <ProfileDataLoader />;

  const toggleEditModal = () => setEditModalOpen((pv) => !pv);

  return (
    <>
      {/* {editModalOpen && (
        <ModalOverlay
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          title="Edit Profile"
        >
          <EditProfileForm setIsModalOpen={setEditModalOpen} />
        </ModalOverlay>
      )} */}
      <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-md relative overflow-hidden">
        <motion.button
          whileHover={{ paddingLeft: "32px", paddingRight: "32px" }}
          className={`absolute right-0 flex items-center min-h-8 text-white px-4 rounded-l-full space-x-2 font-semibold ${
            userLoading ? "bg-gray-400" : "bg-secondary hover:bg-orange-600"
          }`}
          onClick={toggleEditModal}
        >
          {editModalOpen ? (
            <div>Close</div>
          ) : (
            <>
              <CiEdit size={20} />
              <div>Edit</div>
            </>
          )}
        </motion.button>
        <div className="flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-md">
          <Avvvatars value={principal} size={240} shadow={true} />
          <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
            <h1 className="text-base font-bold flex gap-1">
              <span className="text-gray-600">
                {currentUserByCaller && currentUserByCaller.firstName}
              </span>
              <span className="text-gray-600">
                {currentUserByCaller && currentUserByCaller.lastName}
              </span>
            </h1>
            <button className="text-blue-900 font-semibold text-sm flex gap-2 hover:underline">
              Disconnect
              <MdLogout size={18} />
            </button>
          </div>
        </div>
        <ProfileDetailsComponent
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
        />
      </div>
    </>
  );
};

const ProfileDetailsComponent = ({ editModalOpen, setEditModalOpen }) => {
  const { currentUserByCaller, newLoading } = useSelector(
    (state) => state.users
  );
  const { principal, backend } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (currentUserByCaller) {
      setFormValues({
        firstname: currentUserByCaller.firstName || "",
        lastname: currentUserByCaller.lastName || "",
        email: currentUserByCaller.email || "",
      });
    }
  }, [currentUserByCaller]);

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // console.log(currentUserByCaller);
  // console.log(formValues);

  const handleFormSubmit = () => {
    // console.log(formValues);
    if (currentUserByCaller) {
      dispatch(
        updateUserUserDetails({
          backend: backend,
          user: formValues,
          onToggle: setEditModalOpen,
        })
      );
    } else {
      dispatch(
        createUser({
          backend: backend,
          principal: principal,
          user: formValues,
          onToggle: setEditModalOpen,
        })
      );
    }
  };

  if (editModalOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:p-12 w-full"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Principal Id
          </label>
          <div className="flex items-center border border-indigo-600 rounded-md">
            <div className="flex items-center justify-center w-10 cursor-pointer text-gray-500 h-10 border-r border-border">
              <HiClipboardDocumentCheck size={28} />
            </div>
            <div className="ml-1 p-3 truncate">{principal}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={formValues.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <button
            className="bg-indigo-600 text-white p-3 rounded-md"
            disabled={newLoading}
            onClick={handleFormSubmit}
          >
            {newLoading ? "Updating..." : "Update profile"}
          </button>
        </div>
      </motion.div>
    );
  } else {
    return (
      <div className="md:p-12 divide-y divide-gray-400 w-full">
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            First Name
          </label>
          <p className="font-semibold">
            {currentUserByCaller && currentUserByCaller.firstName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Last Name
          </label>
          <p className="font-semibold">
            {currentUserByCaller && currentUserByCaller.lastName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Email
          </label>
          <p className="font-semibold">
            {currentUserByCaller && currentUserByCaller.email}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Principal ID
          </label>
          <p className="font-semibold break-all">{principal}</p>
        </div>
      </div>
    );
  }
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
