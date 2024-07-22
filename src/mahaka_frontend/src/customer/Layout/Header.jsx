import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import "../style/index.css"
import { FaUser } from "react-icons/fa";
import ProfileCard from '../Components/ProfileCard';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
const [isAuthenticated, setisAuthenticated] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [showProfileCard, setShowProfileCard] = useState(false);
  // const profileCardRef = useRef(null);

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  // const handleClickOutside = (event) => {
  //   if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
  //     setShowProfileCard(false);
  //   }
  // };

  // useEffect(() => {
  //   if (showProfileCard) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [showProfileCard]);


  const handleConnectWallet = () => {
    setisAuthenticated(!isAuthenticated);
    setShowProfileCard(!showProfileCard);
  };
  return (
    <>
    {/* navbar start  */}
      <nav className="bg-[#124076]  h-20  lg:flex lg:justify-center lg:items-center sticky top-0 z-9999">
      {/* Desktop navbar start  */}
        <div className="hidden container lg:flex space-x-10  items-center justify-center">
          <h1 className="text-white text-2xl logo font-bold"><Link to='/'>LOGO</Link></h1>
          {/* <div className="hidden md:flex space-x-8  items-center justify-center"> */}
          <form class="flex items-center max-w-lg mx-auto ">
            <div class="relative w-full">
              <input
                type="text"
                id="voice-search"
                class="bg-transparent border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5   dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for events, venues, and more"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <ul className="flex space-x-10"> 
            <li>
              <Link href="#" className="p-2 text-xl text-white font hover-underline-animation">About Mahaka</Link>
              
            </li>
            <li>
              <a href="#" className="p-2 text-xl text-white hover-underline-animation"> Sign in/Log in</a>
            </li>
            <li>
              <a href="#" className="p-2 text-xl text-white hover-underline-animation">Sign up</a>
            </li>
            <li>
              <a href="#" className="p-2 text-xl text-white hover-underline-animation">Create event</a>
            </li>
             <li>
            {isAuthenticated ? (
              <a href="#" className="p-2 ml-32 text-xl text-white  hover-underline-animation  " onClick={toggleProfileCard}><span className='flex justify-center items-center'>User Profile<FaUser className='pl-1'/></span></a>
            ) : (
              <button className="bg-[#F08E1E] text-white py-2 px-4 rounded" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
            )}
            </li>
          </ul>
         
          {/* <button className="bg-[#F08E1E] text-white py-2 px-4 rounded">
            Connect Wallet
          </button> */}
          </div>
  {/* Desktop navbar end  */}
          {/* mobile navbar start  */}
          <div className="lg:hidden flex justify-between  items-center px-5 pt-5">
          <div className="text-white text-2xl logo font-bold">LOGO</div>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none " 
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          
        {/* </div> */}
        <div 
          className={`lg:hidden transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="bg-[#124076] h-screen w-1/2 z-99999">
            <div className="flex flex-col space-y-4 mt-[1.9rem] p-4 pt-10 items-center justify-center">
            <form class="flex items-center max-w-lg mx-auto ">
            <div class="relative w-full">
              <input
                type="text"
                id="voice-search"
                class="bg-transparent border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5   dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for events, venues, and more"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
              <ul className="flex flex-col items-start  justify-start gap-4"> 
            <li>
              <a href="#" className=" text-xl text-white font hover-underline-animation">About Mahaka</a>
            </li>
            <li>
              <a href="#" className=" text-xl text-white hover-underline-animation"> Sign in/Log in</a>
            </li>
            <li>
              <a href="#" className=" text-xl text-white hover-underline-animation">Sign up</a>
            </li>
            <li>
              <a href="#" className=" text-xl text-white hover-underline-animation">Create event</a>
            </li>
            <li>
            {isAuthenticated ? (
              <a href="#" className="text-xl text-white  hover-underline-animation  " onClick={toggleProfileCard}><span className='flex justify-center items-center'>User Profile<FaUser className='pl-1'/></span></a>
            ) : (
              <button className="bg-[#F08E1E] text-white py-2 px-4 rounded" onClick={handleConnectWallet}>
                Connect Wallet
              </button>
            )}
            </li>
          </ul>
         
            </div>
          </div>
        </div>
         {/* mobile navbar end  */}
      </nav>
       {/* navbar end  */}
       {showProfileCard && (
        <ProfileCard
        // profileCardRef={profileCardRef}
        toggleProfileCard={toggleProfileCard}
        handleConnectWallet={handleConnectWallet}
        />
        
      )}
    </>
  );
}
