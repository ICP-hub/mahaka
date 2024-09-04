import ProfileDemoPng from "@/assets/images/profile-demo.png";

const ProfileSection = () => {
  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="relative h-24 w-24">
        <img
          src={ProfileDemoPng}
          alt="profile_pic"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium leading-normal text-white">
          Admin Name
        </div>
        <div className="text-secondaryText mt-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-md font-medium leading-normal">
          uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
