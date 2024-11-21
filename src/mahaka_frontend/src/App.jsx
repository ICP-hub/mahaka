import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./routes/app.routing";
import { useDispatch, useSelector } from "react-redux";
import { getAllVenues } from "./redux/reducers/apiReducers/venueApiReducer";
import { addBanner } from "./redux/reducers/apiReducers/bannerApiReducer";
import { getAllBanners } from "./redux/reducers/apiReducers/bannerApiReducer";
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

  


  // const handleBanner = async ()=>{
  //   try{
  //     const bannerData = [
  //       {
  //         title: "anil",
  //         redirectUrl: "anil",
  //         description: "anil",
  //         category: { ThirdParty:null }, 
  //         image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAAAgEBAY2BGQAAAABJRU5ErkJggg==",
  //       },
  //     ];

  //     // const response = await backend.addBanner(bannerData);
  // dispatch(addBanner({backend, bannerData:bannerData}))
     
  //     // console.log("banner response is",response)
  //   }catch(e){
  //     console.log("Error in creating banner",e)

  //   }
  //  }




  // const fetchBanners = async (category) => {
  //   console.log("category is", category)
  //   try {
  //     // Call the backend's getAllBanners function (without passing any arguments)
  //     //const response = await backend.getAllBanners(category);
  
  //     // Now you can handle the response, which should be an array of banners
  //    // console.log("Banner fetched response:", response);
  //     dispatch(getAllBanners ({backend, category}))
  
      
  //   } catch (e) {
  //     console.error("Error in fetching banners", e);
  //   }
  // };
  
  return (
    <div className="light bg-background no-scrollbar">
      {/* <button onClick = {handleBanner}>create banner</button> */}
      {/* <button
  onClick={() => fetchBanners({ ThirdParty: null })} // Pass '#Attraction' as the category
  className="border p-3 mx-5"
>
  Fetch Banners
</button> */}
      <RouterProvider router={appRoutes} />
      <NotificationToast />
    </div>
  );
}

export default App;
