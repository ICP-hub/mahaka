import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import { plugLogin } from "./redux/reducers/auth/authReducer";

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
  //    dispatch(createEvent({
  //         backend,
  //         venueId: "Venue Title-br5f7-7uaaa-aaaaa-qaaca-cai",
  //         Event: {
  //           Description: "testing",
  //           GroupTicket: 20,
  //           Details: {
  //             StartDate: "2024-09-01",
  //             StartTime: 14,
  //             Location: "Example Location",
  //             EndDate: "2024-09-01",
  //             EndTime: 1,
  //           },
  //           SingleTicket: 50,
  //           Title: "testing",
  //           VipTicket: 50,
  //         },
  //         eCollection: {
  //           collection_args: {
  //             maxLimit: 1000,
  //             logo: {
  //               data: "example data",
  //               logo_type: "image/png",
  //             },
  //             name: "Event Collection Name",
  //             banner: {
  //               data: "example data",
  //               logo_type: "image",
  //             },
  //             description: "This is a description",
  //             created_at: 1234,
  //             collection_type: { Event: null },
  //             symbol: "symbol",
  //           },
  //         },
  //       })
  //     );
  //     console.log("Event created successfully");
  // };

  // const fetchEventsHandler = async () => {
  //   dispatch(getAllEventsByVenue({
  //         backend,
  //         chunkSize: 10,
  //         pageNo: 1,
  //         venueId: "Venue Title-br5f7-7uaaa-aaaaa-qaaca-cai",
  //       })
  //     );
  //     console.log("Events fetched successfully");

  // };

  // const createVenueHandler = async () => {
  //   try {
  //     const response = await backend.createVenue(
  //       {
  //         collection_args: {
  //           maxLimit: 100,
  //           logo: {
  //             data: "example data",
  //             logo_type: "image",
  //           },
  //           name: "Venue Name",
  //           banner: {
  //             data: "example data",
  //             logo_type: "image",
  //           },
  //           description: "description of the venue.",
  //           created_at: 123456,
  //           collection_type: { Venue: null },
  //           symbol: "venue_symbol",
  //         },
  //         custodian: Principal.fromText("2vxsx-fae"),
  //       },
  //       "Venue Title",
  //       500,
  //       {
  //         StartDate: "2024-09-01",
  //         StartTime: 14,
  //         Location: "Example Location",
  //         EndDate: "2024-09-01",
  //         EndTime: 16,
  //       },
  //       "description of the venue"
  //     );

  //     console.log("create venue result", response);
  //   } catch (err) {
  //     console.error("Error in create venue", err);
  //   }
  // };

  // const { theme, toggleTheme } = useTheme();
  return (
    <div className="light">
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
    </div>
  );
}

export default App;
