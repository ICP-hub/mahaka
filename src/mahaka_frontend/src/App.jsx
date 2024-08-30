import React from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useSelector } from "react-redux";

function App() {
  // const { theme, toggleTheme } = useTheme();

  const { backend } = useSelector((state) => state.auth);

  // const createEventHandler = async () => {
  //   try {
  //     const response = await backend.createEvent(
  //       "testing-br5f7-7uaaa-aaaaa-qaaca-cai",
  //       {
  //         Description: "tseting",
  //         GroupTicket: 20,
  //         Details: {
  //           StartDate: "2024-09-01",
  //           StartTime: 14,
  //           Location: "Example Location",
  //           EndDate: "2024-09-01",
  //           EndTime: 1,
  //         },
  //         SingleTicket: 50,
  //         Title: "testing",
  //         VipTicket: 50,
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
