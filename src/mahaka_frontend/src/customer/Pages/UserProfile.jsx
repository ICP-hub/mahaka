import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useIdentityKit } from "@nfid/identitykit/react";
import LoadingScreenLarge from "../../common/components/LoadingScreenLarge";
import notificationManager from "../../common/utils/notificationManager";

const UserProfileProtected = ({ children }) => {
  const { isConnected } = useSelector((state) => state.authentication);
  const [layoutLoader, setLayoutLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      setTimeout(() => {
        setLayoutLoader(false);
      }, [2000]);
    } else {
      setLayoutLoader(false);
    }
  }, [isConnected]);

  if (layoutLoader) return <LoadingScreenLarge />;
  if (isConnected) {
    return children;
  } else {
    notificationManager.error("Please login to your account first!");
    navigate("/");
  }
};

/* User profile Comp */
const UserProfile = () => {
  const { pathname } = useLocation();
  const profileTabs = [
    { tab: "User Profile", link: "/user/my-profile" },
    { tab: "Bookings", link: "/user/my-booking" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(
    profileTabs.findIndex(({ link }) => pathname === link)
  );

  useEffect(() => {
    setSelectedIndex(profileTabs.findIndex(({ link }) => pathname === link));
  }, [pathname]);

  return (
    <UserProfileProtected>
      <div className="container mx-auto py-8 px-6 md:px-8 min-h-screen">
        <div className="flex justify-between mb-8 items-center relative">
          <div className="flex items-center flex-wrap">
            {profileTabs.map(({ tab, link }, index) => (
              <Link
                key={link}
                to={link}
                className={`${"text-primary hover:text-slate-600"} font-bold md:text-xl transition-colors px-2.5 py-4 border-primary relative border-b-2 min-w-40 max-w-min flex items-center justify-center`}
              >
                <div className="relative">{tab}</div>
                {selectedIndex === index && (
                  <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 border-b-4 border-primary"
                  ></motion.span>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </UserProfileProtected>
  );
};

export default UserProfile;
