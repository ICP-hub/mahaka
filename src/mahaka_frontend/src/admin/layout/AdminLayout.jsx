import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import NavigationVertical from "./navigation/NavigationVertical";
import ScreenOverlayBlur from "../../common/ScreenOverlay";
import useNavigationControl from "../../common/hooks/useNavigationControl";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../redux/reducers/apiReducers/userApiReducer";

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

  return (
    <>
      {state.isOpen && (
        <ScreenOverlayBlur onOverlayClicked={handleNavigationOnSmallScreen} />
      )}
      <div className={`layout ${selected}`}>
        <div className="text-text">
          <NavigationVertical navigationState={state} />
          <div className="flex w-full min-w-0 flex-auto flex-col overflow-y-auto custom-scroll bg-background">
            <AppBar
              toggleNavigation={toggleNavigation}
              selected={selected}
              setSelected={setSelected}
            />

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
