import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import { plugLogin } from "./redux/reducers/auth/authReducer";
import NotificationToast from "./common/NotificationToast";
import "flatpickr/dist/flatpickr.min.css";
import { updateVenue } from "./redux/reducers/apiReducers/venueApiReducer";

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

  // const updateVenueHandler = async () => {
  //   try {
  //     const response = dispatch(updateVenue({
  //       backend,
  //       venueId: "qwertyu#b77ix-eeaaa-aaaaa-qaada-cai",
  //       events: [
  //         {
  //           id: "Event ID",
  //           sTicket_limit: 20,
  //           Description: "Event Description",
  //           Details: {
  //             StartDate: "2024-09-01",
  //             StartTime: 14,
  //             Location: "Updated Location",
  //             EndDate: "2024-09-01",
  //             EndTime: 16,
  //           },
  //           Title: "Updated Event Title",
  //           gTicket_limit: 30,
  //           vTicket_limit: 10,
  //         },
  //       ],
  //       title: "Updated Venue Title",
  //       description: "Updated venue description",
  //       details: {
  //         StartDate: "2024-09-01",
  //         StartTime: 14,
  //         Location: "Updated Venue Location",
  //         EndDate: "2024-09-01",
  //         EndTime: 16,
  //       },
  //       capacity: 500
  //     }));


  //     console.log("Update venue result", response);
  //   } catch (err) {
  //     console.error("Error in updating venue", err);
  //   }
  // };

  const updateVenueHandler = async () => {
    try {
      const venueId = "qwertyu#b77ix-eeaaa-aaaaa-qaada-cai"; // Replace with the actual venue ID
      
      const response = await dispatch(updateVenue({
        backend,
        venueId, // Pass the venueId here
        updatedTitle: "Updated Title", // text: Updated title
        updatedDescription: "Updated Description", // text: Updated description
        startDate: "2024-10-01", // text: Start date
        startTime: 14, // int: Start time (24-hour format)
        location: "Updated Location", // text: Location
        endDate: "2024-10-01", // text: End date
        endTime: 16, // int: End time (24-hour format)
        capacity: 500, // nat: Capacity
      }));
  
      console.log("Update venue result", response);
    } catch (err) {
      console.error("Error in updating venue", err);
    }
  };
  
  return (
    <div className="light bg-background">
      <button className="px-2 py-1 border rounded" onClick={updateVenueHandler}>
        Update Venue
      </button>
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
