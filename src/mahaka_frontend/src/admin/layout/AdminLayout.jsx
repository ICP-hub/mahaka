import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import NavigationVertical from "./navigation/NavigationVertical";
import ScreenOverlayBlur from "../../common/ScreenOverlay";
import useNavigationControl from "../../common/hooks/useNavigationControl";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../redux/reducers/apiReducers/userApiReducer";
import { getAllWahanas } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import notificationManager from "../../common/utils/notificationManager";

// Protected route for admin
const AdminProtected = ({ children }) => {
  const { userLoading, currentUserByCaller } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && currentUserByCaller) {
      if (!Object.keys(currentUserByCaller.role).includes("admin")) {
        notificationManager.error("User is not an admin!");
        navigate("/");
      }
    } else if (!userLoading && !currentUserByCaller) {
      notificationManager.error("User is not an admin!");
      navigate("/");
    }
  }, [currentUserByCaller]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return currentUserByCaller &&
    Object.keys(currentUserByCaller.role).includes("admin")
    ? children
    : null;
};

/* Main Layout */
const AdminLayout = () => {
  const { state, toggleNavigation } = useNavigationControl();
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);

  // Initialize `selected` state from localStorage or default to 'light'
  const [selected, setSelected] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Save theme to localStorage whenever `selected` changes
  useEffect(() => localStorage.setItem("theme", selected), [selected]);

  const handleNavigationOnSmallScreen = () => {
    if (state.isOpen) {
      toggleNavigation(false);
    }
  };

  // Init members in admin side
  useEffect(() => {
    dispatch(listUsers({ backend: backend, pageLimit: 100, currPage: 0 }));
  }, []);

  // Fetch wahanas
  useEffect(() => {
    dispatch(getAllWahanas({ backend: backend, chunkSize: 10, pageNo: 0 }));
  }, []);

  return (
 <>
      {state.isOpen && (
        <ScreenOverlayBlur onOverlayClicked={handleNavigationOnSmallScreen} />
      )}
      <div className={`layout ${selected} h-full`}>
        <div className="text-text">
          <NavigationVertical navigationState={state} />
          <div className="flex w-full min-w-0 flex-auto flex-col bg-background h-screen overflow-y-auto sm:overflow-hidden">
            <AppBar
              toggleNavigation={toggleNavigation}
              selected={selected}
              setSelected={setSelected}
            />

            <div className="sm:overflow-y-auto custom-scroll">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
