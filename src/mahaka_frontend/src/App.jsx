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

  // const createEventHandler = async () => {
  //   try {
  //     const response = await backend.createEvent(
  //       "title of the venue#br5f7-7uaaa-aaaaa-qaaca-cai",
  //       {
  //         id: "unique-event-id", 
  //         Description: "testing",
  //         sTicket_limit: 50,
  //         gTicket_limit: 20,
  //         vTicket_limit: 50,
  //         Details: {
  //           StartDate: "2024-09-01",
  //           StartTime: 14,
  //           Location: "Example Location",
  //           EndDate: "2024-09-01",
  //           EndTime: 1,
  //         },
  //         Title: "testing",
  //       },
  //       {
  //         collection_args: {
  //           maxLimit: 1000,
  //           logo: {
  //             data: "example data",
  //             logo_type: "image/png",
  //           },
  //           name: "Event Collection Name",
  //           banner: {
  //             data: "example data",
  //             logo_type: "image",
  //           },
  //           description: "This is a description",
  //           created_at: 1234,
  //           collection_type: { Event: null },
  //           symbol: "symbol",
  //         },
  //       }
  //     );
  
  //     console.log("create event result", response);
  //   } catch (err) {
  //     console.error("Error in create event", err);
  //   }
  // };
  
  

  return (
    <div className="light bg-background">
       {/* <button className="px-2 py-1 border rounded mr-2" onClick={createEventHandler}>
        Create Event
      </button> */}
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
