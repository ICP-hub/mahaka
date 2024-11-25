import React, { useEffect, useRef, useState } from "react";
import "../style/index.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiMiniBars3,
  HiOutlineTicket,
  HiOutlineUser,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
// import { getUserDetailsByCaller } from "../../redux/reducers/apiReducers/userApiReducer";
import useLogin from "../../common/hooks/useLogin";
import ProfileDemoImg from "../../assets/images/profile-demo.png";
import { Link, useNavigate } from "react-router-dom";
import { ConnectWallet, useIdentityKit } from "@nfid/identitykit/react";
import Avvvatars from "avvvatars-react";
import TranslationForCustomer from "../../TranslationForCustomer";
import {
  GrAction,
  GrCopy,
  GrCurrency,
  GrTicket,
  GrUnlink,
  GrUserAdmin,
  GrUserManager,
  GrUserSettings,
} from "react-icons/gr";
import { MdOutlineManageAccounts } from "react-icons/md";
import notificationManager from "../../common/utils/notificationManager";
import { useAuth } from "../../connect/useClient";

const NavLinks = [
  { title: "HOME", url: "/" },
  { title: "ABOUT MAHAKA", url: "/about-us" },
  { title: "SERVICES", url: "/our-services" },
  { title: "CONTACT US", url: "/contact-us" },
  // { title: "WAHANAS", url: "/wahanas" },
];

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNavigation = () => setIsNavOpen((prev) => !prev);
  const navigate = useNavigate();
  const { user } = useIdentityKit();
  const { isConnected, login, logout } = useAuth();
  // useEffect(() => {
  //   if (isConnected) {
  //     navigate("/user-profile");
  //   }
  // }, [isConnected, navigate]);
  // Effect if sidenav open overflow hidden

  return (
    <div className="bg-[#124076]">
      <div className="flex px-6 md:px-8 container mx-auto user_header items-center z-999">
        <LogoSection />
        <div className="hidden md:flex items-center justify-center w-full">
          <div className="flex items-center relative gap-8">
            <SearchBox />
            <div className="flex items-center">
              <NavHorizontal />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <TranslationForCustomer />
          <div className="md:hidden flex items-center space-x-2">
            <div className="p-1 rounded-full relative h-10 w-10 flex items-center justify-center hover:bg-hover">
              <button onClick={toggleNavigation}>
                <HiMiniBars3 size={24} />
              </button>
            </div>
            {isConnected && <ConnectBtn />}
          </div>
          <div className="hidden md:flex">
            <ConnectBtn />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isNavOpen && (
          <NavVertical isNavOpen={isNavOpen} onNavOpen={setIsNavOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}

const LogoSection = () => {
  return <div className="text-2xl font-black">LOGO</div>;
};

const SearchBox = () => {
  return (
    <div className="flex items-center">
      <div className="border border-white flex min-h-12 items-center px-2 rounded-lg">
        <input
          type="text"
          placeholder="Search for events, venues and more"
          className="bg-transparent outline-none w-full placeholder:text-white placeholder:truncate"
        />
        <HiMagnifyingGlass size={24} />
      </div>
    </div>
  );
};

const NavHorizontal = () => {
  const swipeLeft = {
    initial: { backgroundColor: "transparent", x: "-100%", opacity: 0 },
    hover: {
      backgroundColor: "white",
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const swipeRight = {
    initial: { backgroundColor: "transparent", x: "100%", opacity: 0 },
    hover: {
      backgroundColor: "white",
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <nav className="flex items-center gap-12 font-medium over">
      {NavLinks.map((link, index) => (
        // Replace button with Link later
        <Link to={link.url} key={index}>
          <motion.div
            key={index}
            initial="initial"
            whileHover="hover"
            className="min-w-max"
          >
            <h4>{link.title}</h4>
            <div className="flex">
              <motion.div
                variants={swipeRight}
                className="h-0.5 w-full bg-white"
              ></motion.div>
              <motion.div
                variants={swipeLeft}
                className="h-0.5 w-full"
              ></motion.div>
            </div>
          </motion.div>
        </Link>
      ))}
    </nav>
  );
};

const NavVertical = ({ isNavOpen, onNavOpen }) => {
  const { user } = useIdentityKit();
  return (
    <motion.nav
      initial={{ opacity: 0, x: -512 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: -512 }}
      transition={{ stiffness: 300 }}
      className="md:hidden absolute border-t border-gray-500 inset-x-0 bg-[#124076] text-white z-50 h-screen"
    >
      <div className="flex flex-col container mx-auto px-6 text-4xl font-black">
        {NavLinks.map((link, index) => (
          // Replace button with Link later
          <Link to={link.url} key={index} onClick={() => onNavOpen(false)}>
            <div key={index} className="py-4">
              <h4>{link.title}</h4>
            </div>
          </Link>
        ))}
        {!user && (
          <div className="py-4">
            <ConnectBtn />
          </div>
        )}
      </div>
    </motion.nav>
  );
};

const ConnectBtn = () => {
  const { user, connect } = useIdentityKit();
  const { isConnected, login, logout, balance } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const ConnectBtn1 = ({ onClick, ...props }) => (
    <button
      onClick={onClick}
      className="min-h-12 px-2 bg-[#F08E1E] text-white font-medium rounded-lg hover:bg-orange-600 max-w-max min-w-max"
    >
      Connect wallet
    </button>
  );
  if (!isConnected) {
    return (
      <ConnectWallet
        connectButtonComponent={ConnectBtn1}
        className="rounded-full bg-black"
      />
    );
  }

  return (
    <div className="relative h-20 flex items-center justify-center">
      <div
        className="h-12 w-12 p-0.5 border border-[#F08E1E] rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsMenuOpen((pv) => !pv)}
      >
        <Avvvatars value={user?.principal?.toText()} size={40} shadow={true} />
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ stiffness: 300 }}
          className="absolute top-20 bg-gray-900 min-w-80 right-0 rounded-xl"
        >
          <ProfileMenu onClose={handleCloseMenu} />
        </motion.div>
      )}
    </div>
  );
};

// Profile menu : export if required
const ProfileMenu = ({ onClose }) => {
  const { user, icpBalance, disconnect } = useIdentityKit();
  const { currentUserByCaller } = useSelector((state) => state.users);
  const { isConnected, login, logout, balance, principal } = useAuth();

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.principal?.toText());
    notificationManager.success("Wallet address copied!");
    // navigator.clipboard
    //   .writeText(user.principal.toText())
    //   .then(() => notificationManager.success("Wallet address copied!"))
    //   .catch((err) => console.error("Failed to copy text:", err));
  };

  return (
    <div className="flex flex-col p-2 rounded-xl overflow-hidden">
      {currentUserByCaller &&
        Object.keys(currentUserByCaller?.role)[0] === "admin" && (
          <Link
            to="/admin"
            className="px-4 py-2 hover:bg-hover rounded-md flex items-center flex-auto space-x-2"
            onClick={onClose}
          >
            <div>
              <GrUserAdmin size={20} />
            </div>
            <div>Admin Dashboard</div>
          </Link>
        )}

      {currentUserByCaller &&
        Object.keys(currentUserByCaller?.role)[0] === "manager" && (
          <Link
            to="/management"
            className="px-4 py-2 hover:bg-hover rounded-md flex items-center flex-auto space-x-2"
            onClick={onClose}
          >
            <div>
              <GrUserManager size={20} />
            </div>
            <div>Management Dashboard</div>
          </Link>
        )}
      <Link
        to="/user/my-profile"
        className="px-4 py-2 hover:bg-hover rounded-md flex items-center flex-auto space-x-2"
        onClick={onClose}
      >
        <div>
          <GrUserSettings size={20} />
        </div>
        <div>My Profile</div>
      </Link>
      <Link
        to="/user/my-booking"
        className="px-4 py-2 hover:bg-hover rounded-md flex items-center flex-auto space-x-2"
        onClick={onClose}
      >
        <div>
          <GrTicket size={20} />
        </div>
        <div>My Bookings</div>
      </Link>
      <div className="px-4 py-2 rounded-md flex items-center flex-auto cursor-pointer">
        <div className="flex items-center space-x-2">
          <GrAction size={20} />
          <div>Wallet</div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button
            className="p-2 hover:bg-indigo-600 rounded-full"
            onClick={handleCopy}
          >
            <GrCopy />
          </button>
          <div className="bg-gray-500 rounded-md px-2 min-w-36 max-w-36 overflow-hidden truncate">
            {principal?.toText()}
          </div>
        </div>
      </div>
      <div className="px-4 py-2 rounded-md flex items-center flex-auto cursor-pointer">
        <div className="flex items-center space-x-2">
          <GrCurrency size={20} />
          <div>Balance</div>
        </div>
        <div className="ml-auto">
          <div className="bg-gray-500 rounded-md px-2 min-w-36 max-w-36 overflow-hidden truncate flex items-center justify-center">
            {balance}
          </div>
        </div>
      </div>
      <div
        className="px-4 py-2 hover:bg-hover rounded-md flex items-center flex-auto cursor-pointer"
        onClick={() => {
          logout();
          onClose();
        }}
      >
        <div className="flex items-center space-x-2">
          <GrUnlink size={20} />
          <div>Disconnect</div>
        </div>
      </div>
    </div>
  );
};

// const ConnectWalletBtn = ({ onNavOpen }) => {
//   const { isConnected, login, logout, principal } = useAuth();
//   const dispatch = useDispatch();

//   // const { loginWithPlug } = useLogin();

//   if (isConnected)
//     return (
//       <Link
//         to="/user-profile"
//         onClick={() => onNavOpen(false)}
//         className="p-2 rounded-full border-2 border-secondary"
//       >
//         {/* <img
//           src={ProfileDemoImg}
//           alt="Profile-pic"
//           className="h-12 w-12 md:h-8 md:w-8 rounded-full"
//         /> */}
//         <Avvvatars value={principal} shadow={true} />
//       </Link>
//     );

//   return (
//     <ConnectWallet
//       connectButtonComponent={ConnectBtn}
//       className="rounded-full bg-black"
//     />
//   );
// };

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
// const [isAuthenticated, setisAuthenticated] = useState(false)
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const [showProfileCard, setShowProfileCard] = useState(false);
//   // const profileCardRef = useRef(null);

//   const toggleProfileCard = () => {
//     setShowProfileCard(!showProfileCard);
//   };

//   // const handleClickOutside = (event) => {
//   //   if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
//   //     setShowProfileCard(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (showProfileCard) {
//   //     document.addEventListener('mousedown', handleClickOutside);
//   //   } else {
//   //     document.removeEventListener('mousedown', handleClickOutside);
//   //   }
//   //   return () => {
//   //     document.removeEventListener('mousedown', handleClickOutside);
//   //   };
//   // }, [showProfileCard]);

//   const handleConnectWallet = () => {
//     setisAuthenticated(!isAuthenticated);
//     setShowProfileCard(!showProfileCard);
//   };
//   return (
//     <>
//     {/* navbar start  */}
//       <nav className="bg-[#124076]  h-20  lg:flex lg:justify-center lg:items-center sticky top-0 z-9999">
//       {/* Desktop navbar start  */}
//         <div className="hidden container lg:flex space-x-10  items-center justify-center">
//           <h1 className="text-white text-2xl logo font-bold"><Link to='/'>LOGO</Link></h1>
//           {/* <div className="hidden md:flex space-x-8  items-center justify-center"> */}
//           <form class="flex items-center max-w-lg mx-auto ">
//             <div class="relative w-full">
//               <input
//                 type="text"
//                 id="voice-search"
//                 class="bg-transparent border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5   dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search for events, venues, and more"
//                 required
//               />
//               <button
//                 type="button"
//                 class="absolute inset-y-0 end-0 flex items-center pe-3"
//               >
//                 <svg
//                   class="w-4 h-4 text-gray-500 dark:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>

//           <ul className="flex space-x-10">
//             <li>
//               <Link href="#" className="p-2 text-xl text-white font hover-underline-animation">About Mahaka</Link>

//             </li>
//             <li>
//               <a href="#" className="p-2 text-xl text-white hover-underline-animation"> Sign in/Log in</a>
//             </li>
//             <li>
//               <a href="#" className="p-2 text-xl text-white hover-underline-animation">Sign up</a>
//             </li>
//             <li>
//               <a href="#" className="p-2 text-xl text-white hover-underline-animation">Create event</a>
//             </li>
//              <li>
//             {isAuthenticated ? (
//               <a href="#" className="p-2 ml-32 text-xl text-white  hover-underline-animation  " onClick={toggleProfileCard}><span className='flex justify-center items-center'>User Profile<FaUser className='pl-1'/></span></a>
//             ) : (
//               <button className="bg-[#F08E1E] text-white py-2 px-4 rounded" onClick={handleConnectWallet}>
//                 Connect Wallet
//               </button>
//             )}
//             </li>
//           </ul>

//           {/* <button className="bg-[#F08E1E] text-white py-2 px-4 rounded">
//             Connect Wallet
//           </button> */}
//           </div>
//   {/* Desktop navbar end  */}
//           {/* mobile navbar start  */}
//           <div className="lg:hidden flex justify-between  items-center px-5 pt-5">
//           <div className="text-white text-2xl logo font-bold">LOGO</div>
//             <button
//               onClick={toggleMenu}
//               className="text-white focus:outline-none "
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={
//                     isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//           </div>

//         {/* </div> */}
//         <div
//           className={`lg:hidden transition-transform duration-300 ease-in-out transform ${
//             isOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="bg-[#124076] h-screen w-1/2 z-99999">
//             <div className="flex flex-col space-y-4 mt-[1.9rem] p-4 pt-10 items-center justify-center">
//             <form class="flex items-center max-w-lg mx-auto ">
//             <div class="relative w-full">
//               <input
//                 type="text"
//                 id="voice-search"
//                 class="bg-transparent border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5   dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search for events, venues, and more"
//                 required
//               />
//               <button
//                 type="button"
//                 class="absolute inset-y-0 end-0 flex items-center pe-3"
//               >
//                 <svg
//                   class="w-4 h-4 text-gray-500 dark:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//               <ul className="flex flex-col items-start  justify-start gap-4">
//             <li>
//               <a href="#" className=" text-xl text-white font hover-underline-animation">About Mahaka</a>
//             </li>
//             <li>
//               <a href="#" className=" text-xl text-white hover-underline-animation"> Sign in/Log in</a>
//             </li>
//             <li>
//               <a href="#" className=" text-xl text-white hover-underline-animation">Sign up</a>
//             </li>
//             <li>
//               <a href="#" className=" text-xl text-white hover-underline-animation">Create event</a>
//             </li>
//             <li>
//             {isAuthenticated ? (
//               <a href="#" className="text-xl text-white  hover-underline-animation  " onClick={toggleProfileCard}><span className='flex justify-center items-center'>User Profile<FaUser className='pl-1'/></span></a>
//             ) : (
//               <button className="bg-[#F08E1E] text-white py-2 px-4 rounded" onClick={handleConnectWallet}>
//                 Connect Wallet
//               </button>
//             )}
//             </li>
//           </ul>

//             </div>
//           </div>
//         </div>
//          {/* mobile navbar end  */}
//       </nav>
//        {/* navbar end  */}
//        {showProfileCard && (
//         <ProfileCard
//         // profileCardRef={profileCardRef}
//         toggleProfileCard={toggleProfileCard}
//         handleConnectWallet={handleConnectWallet}
//         />

//       )}
//     </>
//   );
// }
