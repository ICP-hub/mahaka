import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import NavigationVertical from "./navigation/NavigationVertical";

const AdminLayout = () => {
  return (
    <>
      <div className="layout">
        <div className="min-h-screen">
          <NavigationVertical />
          <div className="flex w-full min-w-0 flex-auto flex-col">
            <AppBar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
