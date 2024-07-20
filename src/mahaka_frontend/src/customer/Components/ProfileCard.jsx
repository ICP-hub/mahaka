import React from 'react'
import profile from "../../assets/images/profile.png"
const ProfileCard = ({profileCardRef, toggleProfileCard, handleConnectWallet}) => {
  return (
    <div ref={profileCardRef} className="fixed top-16 right-4 bg-white text-black p-4 rounded-lg shadow-lg z-99999">
    <div className="flex justify-end">
      <button onClick={toggleProfileCard} className='text-3xl text-red-600'>&times;</button>
    </div>
    <div className="flex flex-col items-center">
      <img
        src={profile}
        alt="User Avatar"
        className="w-28 h-28 rounded-full mb-4"
      />
      <p>PrincipalId: ethyl-2345-56789-45</p>
      <a href="#" className="text-blue-500 hover:text-red-600 mt-2" onClick={handleConnectWallet}>Sign out</a>
    </div>
  </div>
  );
};

export default ProfileCard;
