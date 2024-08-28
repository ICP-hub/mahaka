import { MdLogout } from "react-icons/md";
import ProfileDemoImg from "../../../assets/images/profile-demo.png";
import { AnimatePresence } from "framer-motion";

const UserProfileData = () => {
  const profileImage = ProfileDemoImg;
  const username = "Username";
  const firstName = "Raman";
  const lastName = "Raghav";
  const email = "raman@gmail.com";
  const principalId =
    "7yywl-leric6-n33rr-vskrc6-yb4nd-dvj6j-xg2bg-reiw6-dllj7-slclz-2aw";

  return (
    <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-lg">
      <div className="bg-gray-100 flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-lg">
        <img
          src={profileImage}
          alt="Profile"
          className="min-h-60 min-w-60 max-h-min max-w-min rounded-full"
        />
        <div className="mt-2 space-y-2">
          <h1 className="text-base font-bold">{username}</h1>
          <button
            href="#"
            className="text-blue-900 font-semibold text-sm flex gap-2 hover:underline"
          >
            Disconnect
            <MdLogout size={18} />
          </button>
        </div>
      </div>
      <div className="md:p-12 divide-y divide-gray-400">
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            First Name
          </label>
          <p className="text-gray-900 font-semibold">{firstName}</p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Last Name
          </label>
          <p className="text-gray-900 font-semibold">{lastName}</p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Email
          </label>
          <p className="text-gray-900 font-semibold">{email}</p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Principal ID
          </label>
          <p className="text-gray-900 font-semibold break-all">{principalId}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileData;
