import ProfileDemoPng from "@/assets/images/profile-demo.png";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const { principal } = useSelector((state) => state.authentication);
  const { currentUserByCaller } = useSelector((state) => state.users);
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="relative h-24 w-24">
        {/* <img
          src={ProfileDemoPng}
          alt="profile_pic"
          className="h-full w-full rounded-full"
        /> */}
        <Avvvatars value={"A"} size={96} shadow={true} />
      </div>
      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium leading-normal text-white">
          {currentUserByCaller ? (
            <div className="flex items-center w-full justify-center">
              <div>{currentUserByCaller.firstName}</div>
              <div className="ml-1.5">{currentUserByCaller.lastName}</div>
            </div>
          ) : (
            "Manager Name"
          )}
        </div>
        <div className="text-secondaryText mt-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-md font-medium leading-normal">
          {principal}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
