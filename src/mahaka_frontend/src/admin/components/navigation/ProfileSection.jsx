import ProfileDemoPng from "@/assets/images/profile-demo.png";
import notificationManager from "../../../common/utils/notificationManager";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const { principal } = useSelector((state) => state.authentication);

  const handleCopyPrincipal = () => {
    if (principal) {
      // Try using the modern Clipboard API first
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(principal)
          .then(() => {
            notificationManager.success("Principal copied");
          })
          .catch((err) => {
            console.error("Clipboard API failed:", err);
            fallbackCopy();
          });
      } else {
        // Fallback to document.execCommand if Clipboard API is unavailable
        fallbackCopy();
      }
    } else {
      notificationManager.error("No principal to copy");
    }
  };

  // Fallback method using document.execCommand
  const fallbackCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = principal;
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      notificationManager.success("Principal copied");
    } else {
      notificationManager.error("Failed to copy principal");
    }
  };

  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="relative h-24 w-24">
        {/* <img
          src={ProfileDemoPng}
          alt="profile_pic"
          className="h-full w-full rounded-full"
        /> */}
        <Avvvatars value={"a"} size={96} shadow={true} />
      </div>
      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium leading-normal text-white">
          Admin Name
        </div>
        <div
          className="text-secondaryText mt-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-md font-medium leading-normal cursor-pointer"
          onClick={handleCopyPrincipal}
        >
          {principal}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
