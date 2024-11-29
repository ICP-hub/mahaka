import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

const initialState = {
  banners: [],
  currentBanner: null,
  bannerLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  attractionbanners: [],
};

//   add banner

export const addBanner = createAsyncThunk(
  "banner/addBanner",
  async ({ backend, title, redirectUrl, description, category, image }) => {
    try {
      console.log("title in reducer is", title, category);
      const response = await backend.addBanner([
        {
          title,
          redirectUrl,
          description,
          category,
          image,
        },
      ]);
      // action(false);
      // console.log("banner response in reducer", category)
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// get all banners
export const getAllBanners = createAsyncThunk(
  "banner/getAllBanners",
  async ({ backend, category }) => {
    try {
      //console.log("category in reducer", category);
      const response = await backend.getAllBanners(category);
      console.log("banners fetched response is", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// delete banner by image
export const deleteBannerByImage = createAsyncThunk(
  "banner/deleteBannerByImage",



  async ({ backend, image }) => {
    
    await backend.deleteBannerByImage(image);
    return image;
  }
  // async ({ backend, image}) => {
  //   const response =  await backend.deleteBannerByImage(image);
  //   if (response) {
  //     // If deletion is successful, return the image URL
  //     return image;
  //   } else {
  //     // If there is an error, throw the error message
  //     throw new Error(result.err);
  //   }
  // }
);



// Async thunk to clear banners
export const clearAllBanners = createAsyncThunk(
  'banner/clearAllBanners',
  async ({category, backend}) => {
    try {
      console.log("category in clear all in reducer is", category);
      // Replace this with your actual backend API call
      const response = await backend.clearAllBanners(category); // Assume `backend` is your API handler
      if (response.ok) {
        return response.ok; // Success message
      } else {
        throw new Error(response.err); // Handle error
      }
    } catch (error) {
      console.log("Error in clear banners",e)
    }
  }
);


//   create slice
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle addbanner
      .addCase(addBanner.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.bannerLoading = false;
        if (action.meta.arg.category.Attraction !== undefined) {
          // Update only attractionBanners
          state.attractionbanners.push(action.payload);
        } else if (action.meta.arg.category.ThirdParty !== undefined) {
          // Update only thirdPartyBanners
          state.banners.push(action.payload);
        }
       
        // state.banners = [...state.banners, action.payload];
        state.error = null;
        notificationManager.success("banner created successfully");

        // console.log("banner created successfully",state.banners)
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = action.error.message;
      })

      // delete  banner by image
      .addCase(deleteBannerByImage.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(deleteBannerByImage.fulfilled, (state, action) => {
        state.bannerLoading = false;
        console.log("single banner delete",action)
       
          state.attractionbanners = state.attractionbanners.filter(
              (banner) => banner.image !== action.payload
             );
         
         
          state.banners = state.banners.filter(
            (banner) => banner.image !== action.payload
           );

           console.log("single banner delete successfully")
         
      })
      .addCase(deleteBannerByImage.rejected, (state, action) => {
        console.log("Deleted banner rejected:", action.payload);
        state.loading = false;
        state.error = action.error.message;
      })


      // clear all banners

      .addCase(clearAllBanners.pending, (state) => {
        state.bannerLoading = true
       
        state.error = null;
      })
      .addCase(clearAllBanners.fulfilled, (state, action) => {
        state.bannerLoading = false
       
       
        if (action.meta.arg.category.Attraction !== undefined) {
          // Update only attractionBanners
          state.attractionbanners = [];
        } else if (action.meta.arg.category.ThirdParty !== undefined) {
          // Update only thirdPartyBanners
          state.banners = [];
        }
        console.log("Banners are cleared successfully")
      })
      .addCase(clearAllBanners.rejected, (state, action) => {
        
        state.error = action.payload;
       // console.log("Error in clear banner",state.error)
      })

      // get all banners

      .addCase(getAllBanners.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.bannerLoading = false;

        if (action.payload) {
          // Clear the arrays to avoid duplication

          // Iterate over each banner
          action.payload.forEach((banner) => {
            if (banner.category && typeof banner.category === "object") {
              const categoryKey = Object.keys(banner.category)[0]; // Extract the first key from the category object

              if (categoryKey === "ThirdParty") {
                state.banners.push(banner);
              } else if (categoryKey === "Attraction") {
                state.attractionbanners.push(banner);
              }
            }
          });

          console.log(
            "banners fetched successfully",
            state.banners,
            state.attractionbanners
          );
        } else {
          state.banners = [];
          state.attractionbanners = [];
        }

        state.error = null;
      })

      .addCase(getAllBanners.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
