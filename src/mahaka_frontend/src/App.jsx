import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import NotificationToast from "./common/NotificationToast";
import "flatpickr/dist/flatpickr.min.css";
import { ConnectWallet, useIdentityKit } from "@nfid/identitykit/react";
import { updateAuthData } from "./redux/reducers/auth/authenticationReducer";
import { getUserDetailsByCaller } from "./redux/reducers/apiReducers/userApiReducer";
// import { createVenue , updateVenue } from "./redux/reducers/apiReducers/venueApiReducer";

function App() {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const states = useSelector((state) => console.log("States are ", state));

  const {
    isInitializing,
    user,
    isUserConnecting,
    icpBalance,
    signer,
    identity,
    delegationType,
    accounts,
    connect,
    disconnect,
    fetchIcpBalance,
  } = useIdentityKit();
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Functional : Instantiate NFID.
  /* ----------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    if (user) {
      dispatch(updateAuthData({ user, identity }));
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserDetailsByCaller({ backend: backend }));
  }, [backend]);
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ Effects : common dispatches.
  /* ----------------------------------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(getAllVenues({ backend: backend, pageLimit: 100, currPage: 0 }));
  }, []);

  return (
    <div className="light bg-background no-scrollbar">
      <RouterProvider router={appRoutes} />
      <NotificationToast />
    </div>
  );
}

export default App;
