import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import { plugLogin } from "./redux/reducers/auth/authReducer";
import NotificationToast from "./common/NotificationToast";
import "flatpickr/dist/flatpickr.min.css";

function App() {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.auth);

  const states = useSelector((state) => console.log("States are ", state));

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Effects : common dispatches.
  /* ----------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(getAllVenues({ backend: backend, pageLimit: 100, currPage: 0 }));
  }, []);
  // Refresh user login
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isPlugLogged");
    if (isLoggedIn) {
      dispatch(plugLogin());
    }
  }, [dispatch]);

  return (
    <div className="light bg-background">
      {/* <div className="p-4">
      <div className="bg-foreground p-4 rounded-2xl">I am {theme} theme.</div>
      <button
        onClick={toggleTheme}
        className="bg-primary px-4 py-2 rounded-2xl"
      >
        Toggle Theme
      </button>
    </div>     */}
      <RouterProvider router={appRoutes} />
      <NotificationToast />
    </div>
  );
}

export default App;
