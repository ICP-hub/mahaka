import React from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
// import { useDispatch, useSelector } from 'react-redux';
// import { createVenue } from '../src/redux/reducers/apiReducers/venueApiReducer';

function App() {
  // const dispatch = useDispatch();
  // const { backend } = useSelector(state => state.auth);

  // const handleCreateVenue = () => {
  //   dispatch(createVenue({
  //     backend,
  //     collectionArgs: {
  //       maxLimit: 100,
  //       logo: {
  //         data: "example data",
  //         logo_type: "image"
  //       },
  //       name: "Venue Name",
  //       banner: {
  //         data: "example data",
  //         logo_type: "image"
  //       },
  //       description: "description of the venue.",
  //       created_at: 123456,
  //       symbol: "venue_symbol"
  //     },
  //     custodian: "2vxsx-fae",
  //     title: "Venue Title",
  //     capacity: 500,
  //     details: {
  //       StartDate: "2024-09-01",
  //       StartTime: 14,
  //       Location: "Example Location",
  //       EndDate: "2024-09-01", 
  //       EndTime: 16,
  //     },
  //     description: "description of the venue"
  //   }));
  // };

  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="light">
      {/* <button onClick={handleCreateVenue}>Create Venue</button> */}
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
