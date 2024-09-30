import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import { plugLogin } from "./redux/reducers/auth/authReducer";
import NotificationToast from "./common/NotificationToast";
import "flatpickr/dist/flatpickr.min.css";
import {
  NFIDStart,
  NFIDSync,
} from "./redux/reducers/auth/authenticationReducer";
import { NFID } from "@nfid/embed";
// import { Principal } from "@dfinity/principal";
// import { createVenue , updateVenue } from "./redux/reducers/apiReducers/venueApiReducer";

function App() {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { NFIDInstance, isConnected } = useSelector(
    (state) => state.authentication
  );
  const states = useSelector((state) => console.log("States are ", state));

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Functional : Instantiate NFID.
  /* ----------------------------------------------------------------------------------------------------- */
  const initNFID = async () => {
    const nfIDInstance = await NFID.init({
      application: {
        name: "NFID Login",
        logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg",
      },
      idleOptions: {
        idleTimeout: 600000,
        captureScroll: true,
        scrollDebounce: 100,
      },
    });
    dispatch(NFIDStart(nfIDInstance));
  };

  useEffect(() => {
    initNFID();
  }, []);

  useEffect(() => {
    if (NFIDInstance) {
      dispatch(NFIDSync(NFIDInstance));
    }
  }, [NFIDInstance, isConnected]);

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

  //   const createEventHandler = async () => {
  //     try {
  //       const response = await backend.createEvent(
  //         "Venue1 Title#br5f7-7uaaa-aaaaa-qaaca-cai",
  //         {
  //            id: "event123",
  //         sTicket_limit: 50,
  //         Description: "Event Description",
  //         logo: {
  //           data: "example-logo-data",
  //           logo_type: "image"
  //         },
  //         banner: {
  //           data: "example-banner-data",
  //           logo_type: "image"
  //         },
  //         Details: {
  //           StartDate: "2024-12-01",
  //           StartTime: "14", // Time as string
  //           Location: "Event Location",
  //           EndDate: "2024-12-01",
  //           EndTime: "18" // Time as string
  //         },
  //         Title: "Event Title",
  //         gTicket_limit: 100,
  //         vTicket_limit: 80
  //       },
  //         {
  //           collection_args: {
  //             maxLimit: 500,
  //             sTicket_limit: 50,
  //             gTicket_price: 100,
  //             logo: {
  //               data: "collection-logo-data",
  //               logo_type: "image"
  //             },
  //             name: "Collection Name",
  //             vTicket_price: 50,
  //             banner: {
  //               data: "collection-banner-data",
  //               logo_type: "image"
  //             },
  //             description: "Collection description",
  //             created_at: BigInt(Date.now()),
  //             collection_type: { Event: null },
  //             sTicket_price: 75,
  //             gTicket_limit: 100,
  //             symbol: "COL",
  //             vTicket_limit: 80,
  //           },
  //         }
  //       );

  //       console.log("create event result", response);
  //     } catch (err) {
  //       console.error("Error in create event", err);
  //     }
  //   };

  //   const updateVenueHandler = async () => {
  //   try {
  //     const venueId = "Venue1 Title#br5f7-7uaaa-aaaaa-qaaca-cai";
  //     const updatedTitle = "Updated Title";
  //     const updatedDescription = "Updated Description";

  //     const eventDetails = {
  //       StartDate: "2024-09-13",
  //       StartTime: "08:00",
  //       Location: "New York",
  //       EndDate: "2024-09-14",
  //       EndTime: "18:00",
  //     };

  //     const capacity = 200;

  //     const logo = {
  //       data: "base64-logo-data",
  //       logo_type: "image/png",
  //     };

  //     const banner = {
  //       data: "base64-banner-data",
  //       logo_type: "image/png",
  //     };

  //     dispatch(updateVenue({
  //       backend,
  //       venueId,
  //       updatedTitle,
  //       updatedDescription,
  //       eventDetails,
  //       capacity,
  //       logo,
  //       banner
  //     }));

  //   } catch (err) {
  //     console.error("Error updating venue:", err);
  //   }
  // };

  //   const createVenueHandler = async () => {
  //     try {
  //       const collectionDetails = {
  //         collection_args: {
  //           maxLimit: 500,
  //           sTicket_limit: 100,
  //           gTicket_price: 50,
  //           logo: {
  //             data: "example data",
  //             logo_type: "image"
  //           },
  //           name: "New Venue Name",
  //           vTicket_price: 30,
  //           banner: {
  //             data: "example data",
  //             logo_type: "image"
  //           },
  //           description: "Description of the venue collection",
  //           created_at: BigInt(Date.now()),
  //           collection_type: { Venue: null },
  //           sTicket_price: 25,
  //           gTicket_limit: 200,
  //           symbol: "VENUE",
  //           vTicket_limit: 150
  //         },
  //         custodian: Principal.fromText("2vxsx-fae")
  //       };
  //       const title = "Venue";
  //       const capacity = 1000;
  //       const details = {
  //         StartDate: "2024-12-01",
  //         StartTime: "14",  // Converted to string
  //         Location: "New Venue Location",
  //         EndDate: "2024-12-01",
  //         EndTime: "18"     // Converted to string
  //       };
  //       const description = "A detailed description of the venue";

  //       const response = await dispatch(createVenue({
  //         backend,
  //         collectionDetails,
  //         title,
  //         capacity,
  //         details,
  //         description
  //       }));
  //       console.log("Venue created:", response);
  //     } catch (err) {
  //       console.error("Error creating venue:", err);
  //     }
  //   };

  return (
    <div className="light bg-background">
      {/* <button className="px-2 py-1 border rounded mr-2" onClick={updateVenueHandler}>
        Update Venue
      </button>
      <button className="px-2 py-1 border rounded mr-2" onClick={createEventHandler}>
        Create Event
      </button>
      <button className="px-2 py-1 border rounded" onClick={createVenueHandler}>
      Create Venue
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
