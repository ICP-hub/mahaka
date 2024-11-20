import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

const initialState = {
    banners: [],
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
     image,
     
    }) => {
      
      //console.log("title in reducer is",title,category,image)
      try {
        const response = await backend.addBanner(
           title,
           redirectUrl,
           description,
           category,
           image   
        );
        // action(false);
        console.log("banner response in reducer", response)
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
        console.log("banners fetched response is", response)
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
           
            if (action.payload) {
            
                // Append new page of events to the existing list
               // state.banners = [...state.banners, ...action.payload];
               state.banners = action.payload || []
                console.log("banners fetched successfully",state.banners)
              } else {
                state.banners = []
              }
              // state.currentPage = action.payload.ok.current_page;
              // state.totalPages = action.payload.ok.Total_pages;
              state.error = null;
          
            notificationManager.success("banners fetched successfully");
            // console.log("banners fetched successfully",state.banners)
          })
          .addCase(getAllBanners.rejected, (state, action) => {
            state.bannerLoading = false;
            state.error = action.error.message;
          })




    }

    })

    export default bannerSlice.reducer;