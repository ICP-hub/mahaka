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
import { getAllEventsPaginated } from "./redux/reducers/apiReducers/eventApiReducer";
import { getAllTestimonials} from "./redux/reducers/apiReducers/testimonialApiReducer";
import { createTestimonial } from "./redux/reducers/apiReducers/testimonialApiReducer";
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

  

  useEffect(() => {
    const fetchBanners = async (category) => {
      console.log("useeffect category", category);
      try {
        await dispatch(getAllBanners({ backend, category }));
      } catch (e) {
        console.log("Error in fetching banners:", e);
      }
    };
  
    // Fetch both categories concurrently
  
    // Wait for both fetches to complete
    const fetchBannersSequentially = async () => {

      await fetchBanners({ ThirdParty: null });
     await fetchBanners({ Attraction: null });
    
     
    };
  
    fetchBannersSequentially();
  }, [dispatch,backend]);
  

  useEffect(() => {
    dispatch(getAllEventsPaginated({ backend: backend }));
  }, []);

  useEffect(()=>{
    dispatch(getAllTestimonials({backend:backend}))
  },[])



  const testimonial = {
   
    title: "anil", // 
  description: "anil", // 
  location: "anil",
  }
  
  // const handleTest = async () => {
  //   try {
  //     const result = await backend.createTestimonial(
  //       testimonial.description,
  //       testimonial.title,
  //       testimonial.location
          
  //       )
  //      // Unwrap to handle the result directly
  //     console.log("Successfully created testimonial", result);
  //   } catch (error) {
  //     console.log("Error in creating the testimonial", error);
  //   }
  // };


  // const handleTest = async () => {
  //   try {
  //     const result = await dispatch(
  //       createTestimonial({
  //         backend,
  //         title: "anil",
  //         description: "anil",
  //         location: "hyderabad"
  //       })
  //     ).unwrap(); // Unwrap to handle the result directly
  //     console.log("Successfully created testimonial", result);
  //   } catch (error) {
  //     console.log("Error in creating the testimonial", error);
  //   }
  // };

  return (
    <div>
      {/* <button className = "border p-3" onClick ={handleTest}>create test</button> */}
      <RouterProvider router={appRoutes} />
      <NotificationToast />
    </div>
  );
}

export default App;
