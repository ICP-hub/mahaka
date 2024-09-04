import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import NavigationVertical from "./navigation/NavigationVertical";
import ScreenOverlayBlur from "../../common/ScreenOverlay";
import useNavigationControl from "../../common/hooks/useNavigationControl";

const AdminLayout = () => {
  const { state, toggleNavigation } = useNavigationControl();

  // Navbar close on overlay click
  const handleNavigationOnSmallScreen = () => {
    if (state.isOpen) {
      toggleNavigation(false);
    }
  };

  return (
    <>
      {state.isOpen && (
        <ScreenOverlayBlur onOverlayClicked={handleNavigationOnSmallScreen} />
      )}
      <div className="layout">
        <div className="min-h-screen">
          <NavigationVertical navigationState={state} />
          <div className="flex w-full min-w-0 flex-auto flex-col">
            <AppBar toggleNavigation={toggleNavigation} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
