import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

const initialState = {
  attractionBanners: [],
  thirdPartyBanners:[],
  banners:[],

    currentBanner: null,
    bannerLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    
  };

//   add banner 

export const addBanner = createAsyncThunk(
    "banner/addBanner",
    async ({
      backend,
      title,
      redirectUrl,
      description,
      category,
      image
    
     
    }) => {
      
     
      try {
        console.log("title in reducer is",title,category)
        const response = await backend.addBanner([
          {
          title,
          redirectUrl,
          description,
          category,
          image
          }
        ]);
        // action(false);
       // console.log("banner response in reducer", category)
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  export const getAllBanners = createAsyncThunk(
    "banner/getAllBanners",
    async ({
      backend,
      category
     
    }) => {
     
      try {
       console.log("category in reducer",category)
        const response = await backend.getAllBanners(
            category
         
        );
       // console.log("banners fetched response is", response)
        return response;
      } catch (error) {
        throw error;
      }
    }
  );



//   create slice 
const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
 
    },
    extraReducers: (builder) => {
      builder
        // Handle addbanner
        .addCase(addBanner.pending, (state) => {
          state.bannerLoading = true;
        })
        .addCase(addBanner.fulfilled, (state, action) => {
          state. bannerLoading = false;
          
          state.banners.push(action.payload); 
          // state.banners = [...state.banners, action.payload];
          state.error = null;
          notificationManager.success("banner created successfully");

          // console.log("banner created successfully",state.banners)

        })
        .addCase(addBanner.rejected, (state, action) => {
          state. bannerLoading = false;
          state.error = action.error.message;
        })

        // get all banners

        .addCase(getAllBanners.pending, (state) => {
            state.bannerLoading = true;
          })
          .addCase(getAllBanners.fulfilled, (state, action) => {
            state. bannerLoading = false;

            if (action.meta.arg.category.Attraction !== undefined) {
              // Update only attractionBanners
              state.attractionBanners = action.payload;
            } else if (action.meta.arg.category.ThirdParty !== undefined) {
              // Update only thirdPartyBanners
              state.thirdPartyBanners = action.payload;
            }
           
          
              // Log the separated banners
              console.log("Attraction Banners:", state.attractionBanners);
              console.log("Third Party Banners:", state.thirdPartyBanners);
          
              // Update state
             
         
           // notificationManager.success("banners fetched successfully");
            // console.log("banners fetched successfully",state.banners)
          })
          .addCase(getAllBanners.rejected, (state, action) => {
            state.bannerLoading = false;
            state.error = action.error.message;
          })




    }

    })

    export default bannerSlice.reducer;