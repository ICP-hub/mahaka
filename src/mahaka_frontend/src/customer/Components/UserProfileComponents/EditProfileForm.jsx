import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/reducers/apiReducers/userApiReducer";

function EditProfileForm({ setIsModalOpen }) {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { currentUserByCaller, userLoading } = useSelector(
    (state) => state.users
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (currentUserByCaller) {
      setFirstName(currentUserByCaller.firstName || "");
      setLastName(currentUserByCaller.lastName || "");
      setEmail(currentUserByCaller.email || "");
    }
  }, [currentUserByCaller]);

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      email,
      firstName,
      lastName,
    };
    dispatch(
      updateUser({
        backend: backend,
        user: updatedData,
        setIsModalOpen: setIsModalOpen,
      })
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={userLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              userLoading ? "bg-gray-400" : "bg-secondary hover:bg-orange-600"
            }`}
          >
            {userLoading ? "Updating user..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
