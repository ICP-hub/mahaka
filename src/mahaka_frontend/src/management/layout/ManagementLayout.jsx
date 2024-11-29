import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import NavigationVertical from "./navigation/NavigationVertical";
import ScreenOverlayBlur from "../../common/ScreenOverlay";
import useNavigationControl from "../../common/hooks/useNavigationControl";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsByVenue } from "../../redux/reducers/apiReducers/eventApiReducer";
import { getVenue } from "../../redux/reducers/apiReducers/venueApiReducer";
import { getAllWahanasbyVenue } from "../../redux/reducers/apiReducers/wahanaApiReducer";

const ManagementLayout = () => {
  const { state, toggleNavigation } = useNavigationControl();
  const { currentUserByCaller } = useSelector((state) => state.users);
  const { backend } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (currentUserByCaller) {
      dispatch(
        getAllEventsByVenue({
          backend,
          chunkSize: 10,
          pageNo: 0,
          venueId: currentUserByCaller.assignedVenue.id,
        })
      );
    }
  }, [currentUserByCaller]);

  // user wise venue
  useEffect(() => {
    if (currentUserByCaller) {
      dispatch(
        getVenue({
          backend: backend,
          venueId: currentUserByCaller.assignedVenue.id,
        })
      );
    }
  }, [currentUserByCaller]);

  // User wise wahana
  useEffect(() => {
    if (currentUserByCaller) {
      dispatch(
        getAllWahanasbyVenue({
          backend,
          chunkSize: 10,
          pageNo: 0,
          venueId: currentUserByCaller.assignedVenue.id,
        })
      );
    }
  }, [currentUserByCaller]);

  return (
    <>
      {state.isOpen && (
        <ScreenOverlayBlur onOverlayClicked={handleNavigationOnSmallScreen} />
      )}
      <div className={`layout ${selected}`}>
        <div className="min-h-screen text-text">
          <NavigationVertical navigationState={state} />
          <div className="flex w-full min-w-0 flex-auto flex-col overflow-y-auto h-screen custom-scroll">
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

export default ManagementLayout;
