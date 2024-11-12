import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";

import NotificationToast from "./common/NotificationToast";
import "flatpickr/dist/flatpickr.min.css";
import {
  NFIDStart,
  NFIDSync,
} from "./redux/reducers/auth/authenticationReducer";
import { NFID } from "@nfid/embed";
import { Principal } from "@dfinity/principal";
// import { createVenue , updateVenue } from "./redux/reducers/apiReducers/venueApiReducer";

function App() {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);

  const states = useSelector((state) => console.log("States are ", state));

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Functional : Instantiate NFID.
  /* ----------------------------------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Effects : common dispatches.
  /* ----------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(getAllVenues({ backend: backend, pageLimit: 100, currPage: 0 }));
  }, []);

  // const getallWahanasbyVenueHandler = async()=>{
  //   try{
  //     const response = await backend.getallWahanasbyVenue(
  //       100,
  //       0,
  //       "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
  //     );
  //     console.log("Wahana fetched successfully:", response);
  //   } catch (err) {
  //     console.error("Error fetching wahana:", err);
  //   }
  // };

  //   const createEventHandler = async () => {
  //     try {
  //       const response = await backend.createEvent(
  //         "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
  //         {
  //           id: "event123",
  //           title: "Event Title",
  //           sTicket_limit: 50,
  //           description: "Event Description",
  //           logo: {
  //             data: "example-logo-data",
  //             logo_type: "image"
  //           },
  //           banner: {
  //             data: "example-banner-data",
  //             logo_type: "image"
  //           },
  //           details: {
  //             StartDate: "2024-12-01",
  //             StartTime: 14,
  //             Location: "Event Location",
  //             EndDate: "2024-12-01",
  //             EndTime: 18
  //           },
  //           gTicket_limit: 100,
  //           vTicket_limit: 80
  //         },
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

  //       console.log("Event created successfully:", response);
  //     } catch (err) {
  //       console.error("Error creating event:", err);
  //     }
  //   };

  //   const editEventHandler = async () => {
  //     try {
  //       const response = await backend.edit_event(
  //         "Event1#bw4dl-smaaa-aaaaa-qaacq-cai",
  //         "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
  //         {
  //           collection_args: {
  //             maxLimit: 100,
  //             sTicket_limit: 10,
  //             gTicket_price: 10,
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
  //             description: "new description",
  //             created_at: Math.floor(Date.now() / 1000),
  //             collection_type: { Event: null },
  //             sTicket_price: 75,
  //             gTicket_limit: 100,
  //             symbol: "COL",
  //             vTicket_limit: 80,
  //           }
  //         },
  //         {
  //           id: "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
  //           title: "Event Title",
  //           sTicket_limit: 50,
  //           description: "Event new Description",
  //           logo: {
  //             data: "example-logo-data",
  //             logo_type: "image"
  //           },
  //           banner: {
  //             data: "example-banner-data",
  //             logo_type: "image"
  //           },
  //           details: {
  //             StartDate: "2024-12-01",
  //             StartTime: 14,
  //             Location: "Event new Location",
  //             EndDate: "2024-12-01",
  //             EndTime: 18
  //           },
  //           gTicket_limit: 10,
  //           vTicket_limit: 10
  //         }
  //       );

  //       console.log("Event edited successfully:", response);
  //     } catch (err) {
  //       console.error("Error editing event:", err);
  //     }
  // };

  // const deleteEventHandler = async () => {
  //   try {
  //     const response = await backend.deleteEvent(
  //       "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
  //       Principal.fromText("2vxsx-fae")
  //     );
  //     console.log("Event deleted successfully:", response);
  //   } catch (err) {
  //     console.error("Error deleting event:", err);
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

  //buy tickets
  // const [ticketType, setTicketType] = useState("SinglePass");
  // const [price, setPrice] = useState(100);
  // const buyEventTicketHandler = async () => {
  //   try {
  //     const venueId = "Aarchi Jain#by6od-j4aaa-aaaaa-qaadq-cai";
  //     const eventId = "new event#avqkn-guaaa-aaaaa-qaaea-cai";
  //     const ticketTypeVariant = { [ticketType]: null };
  //     const record = [
  //       {
  //         data: new Uint8Array([1, 2, 3]),
  //         description: "Ticket metadata",
  //         key_val_data: [
  //           {
  //             key: "eventName",
  //             val: { TextContent: "Amazing Concert" }
  //           },
  //           {
  //             key: "date",
  //             val: { TextContent: "2024-12-31" }
  //           }
  //         ],
  //         purpose: { Rendered: null }
  //       }
  //     ];

  //     const response = await backend.buyEventTicket(
  //       venueId,
  //       eventId,
  //       { ticket_type: ticketTypeVariant, price: price },
  //       record
  //     );

  //     console.log("Event ticket purchased successfully:", response);
  //         } catch (err) {
  //           console.error("Error in buying event tickets:", err);
  //         }
  //       };

  //       const buyVenueTicketHandler = async () => {
  //         try {
  //           const venueId = "Aarchi Jain#by6od-j4aaa-aaaaa-qaadq-cai";
  //           const ticketTypeVariant = { [ticketType]: null };
  //           const record = [
  //             {
  //               data: new Uint8Array([4, 5, 6]),
  //               description: "Venue ticket metadata",
  //               key_val_data: [
  //                 {
  //                   key: "venueName",
  //                   val: { TextContent: "Awesome Stadium" }
  //                 },
  //                 {
  //                   key: "validUntil",
  //                   val: { TextContent: "2024-12-31" }
  //                 }
  //               ],
  //               purpose: { Rendered: null }
  //             }
  //           ];

  //           const response = await backend.buyVenueTicket(
  //             venueId,
  //             { ticket_type: ticketTypeVariant, price: price },
  //             record
  //           );
  //           console.log("Venue ticket purchased successfully:", response);
  //         } catch (err) {
  //           console.error("Error in buying venue tickets:", err);
  //         }
  //       };

  //  const createWahanaHandler = async () => {
  //   try {
  //     const response = await backend.createWahana(
  //       "dasara#br5f7-7uaaa-aaaaa-qaaca-cai",
  //       "Example Wahana",
  //       "WAHANA",
  //       8,
  //       1000000,
  //       "An amazing wahana experience",
  //       {
  //         data: "example-banner-data",
  //         logo_type: "image"
  //       },
  //       BigInt(99)
  //     );

  //     console.log("Wahana created successfully:", response);
  //   } catch (err) {
  //     console.error("Error creating wahana:", err);
  //   }
  // };

  // EditWahana Handler

  const editWahanaHandler = async () => {
    try {
      const response = await backend.edit_wahana(
        "bw4dl-smaaa-aaaaa-qaacq-cai",
        "dasara#br5f7-7uaaa-aaaaa-qaaca-cai",
        "EDIT WAHANA",
        "Edit wahana",
        8,
        1000000,
        "Explore the  wahana experience",
        {
          data: "example-banner-data",
          logo_type: "image",
        },
        BigInt(99)
      );

      console.log("Wahana edited successfully:", response);
    } catch (err) {
      console.error("Error editing wahana:", err);
    }
  };

  // get single wahana

  // const getWahana = async()=>{
  //     try{
  //       const response = await backend.getWahana(
  //         selectedWahana,
  //         selectedVenue

  //       );
  //       console.log("Wahana fetched successfully:", response);
  //     } catch (err) {
  //       console.error("Error fetching wahana:", err);
  //     }
  //   };

  return (
    <div className="light bg-background no-scrollbar">
      {/* <button className="px-2 py-1 border rounded mr-2" onClick={editWahanaHandler}>
        Edit wahana
      </button> */}

      {/* <button className="px-2 py-1 border rounded mr-2" onClick={createWahanaHandler}>
        Create wahana
      </button> */}
      {/* <button className="px-2 py-1 border rounded mr-2" onClick={updateVenueHandler}>
        Update Venue
      </button> */}
      {/* <button
        className="px-2 py-1 border rounded mr-2"
        onClick={createEventHandler}
      >
        Create Event
      </button> */}
      {/* <button
        className="px-2 py-1 border rounded mr-2"
        onClick={editEventHandler}
      >
        Edit Event
      </button> */}
      {/* <button className="px-2 py-1 border rounded" onClick={createVenueHandler}>
      Create Venue
    </button> */}
      {/* <button className="px-2 py-1 border rounded" onClick={deleteEventHandler}>
        Delete Event
      </button> */}
      {/* <button className="px-2 py-1 border rounded mr-2" onClick={createWahanaHandler}>
        Create Wahana
      </button> */}

      {/* <button className="px-2 py-1 border rounded" onClick={getallWahanasbyVenueHandler}>
        Fetch Wahana
      </button> */}

      {/* <div className="p-4">
        <select 
          value={ticketType} 
          onChange={(e) => setTicketType(e.target.value)} 
          className="px-2 py-1 border rounded mr-2"
        >
          <option value="SinglePass">Single Pass</option>
          <option value="GroupPass">Group Pass</option>
          <option value="VipPass">VIP Pass</option>
        </select>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))} 
          placeholder="Price" 
          className="px-2 py-1 border rounded mr-2"
        />
        <button className="px-2 py-1 border rounded mr-2" onClick={buyEventTicketHandler}>
          Buy Event Ticket
        </button>
        <button className="px-2 py-1 border rounded" onClick={buyVenueTicketHandler}>
          Buy Venue Ticket
        </button>
      </div> */}

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
