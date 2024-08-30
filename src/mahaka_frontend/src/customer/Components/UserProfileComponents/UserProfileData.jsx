import { MdLogout } from "react-icons/md";
import ProfileDemoImg from "../../../assets/images/profile-demo.png";
import { useLogout } from "../../../common/hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsByCaller } from "../../../redux/reducers/apiReducers/userApiReducer";
import { useEffect } from "react";

const UserProfileData = () => {
  const dispatch = useDispatch();
  const logoutAndRedirect = useLogout();
  const { currentUser, userLoading } = useSelector((state) => state.users);
  const { backend } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetailsByCaller({ backend: backend }));
  }, []);

  if (userLoading) return <ProfileDataLoader />;
  return (
    <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-lg">
      <div className="bg-gray-100 flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-lg">
        <img
          src={ProfileDemoImg}
          alt="profile-pic"
          className="min-h-60 min-w-60 max-h-min max-w-min rounded-full"
        />
        <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
          <h1 className="text-base font-bold flex gap-1">
            <span className="text-gray-600">
              {currentUser && currentUser.firstName}
            </span>
            <span className="text-gray-600">
              {currentUser && currentUser.lastName}
            </span>
          </h1>
          <button
            className="text-blue-900 font-semibold text-sm flex gap-2 hover:underline"
            onClick={logoutAndRedirect}
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
          <p className="font-semibold">
            {currentUser && currentUser.firstName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Last Name
          </label>
          <p className="font-semibold">{currentUser && currentUser.lastName}</p>
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
          <p className="font-semibold break-all">
            {currentUser && currentUser.id.toText()}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProfileDataLoader = () => {
  const firstName = "usernameusername";
  const lastName = "usernameusername";
  const email = "username@gmail.com";
  const principalId = "7yywl-leric6-n33rr-vskrc6-yb4nd";

  return (
    <div className="bg-white p-8 flex max-md:items-center flex-col md:flex-row gap-4 max-md:justify-center rounded-lg">
      <div className="bg-gray-100 flex items-center flex-col p-6 h-96 gap-8 max-md:justify-center rounded-lg">
        <span className="min-h-60 min-w-60 max-h-min max-w-min rounded-full bg-gray-600 animate-pulse"></span>
        <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
          <h1 className="text-base font-bold flex gap-1">
            <span className="text-gray-600 bg-gray-600 animate-pulse rounded-sm">
              {firstName}
            </span>
            <span className="text-gray-600 bg-gray-600 animate-pulse rounded-sm">
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
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-sm">
            {firstName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Last Name
          </label>
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-sm">
            {lastName}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Email
          </label>
          <p className="font-semibold text-gray-600 bg-gray-600 animate-pulse rounded-sm">
            {email}
          </p>
        </div>
        <div className="flex items-center p-4">
          <label className="block text-gray-700 font-semibold w-32">
            Principal ID
          </label>
          <p className="font-semibold break-all text-gray-600 bg-gray-600 animate-pulse rounded-sm">
            {principalId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileData;
