import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state for Wahana
const initialState = {
  wahanas: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  createWahanaLoader: false,
};

// Creating a wahana
export const createWahana = createAsyncThunk(
  "wahana/createWahana",
  async ({
    backend,
    venueId,
    name,
    symbol,
    decimal,
    totalSupply,
    description,
    banner,
    price,
  }) => {
    try {
      const response = await backend.createWahana(
        venueId,
        name,
        symbol,
        decimal,
        totalSupply,
        description,
        banner,
        price
      );
      return response;
    } catch (error) {
      console.error("Error creating wahana:", error);
      throw error;
    }
  }
);

// Edit wahana

export const edit_wahana = createAsyncThunk(
  "wahana/edit_wahana",
  async ({
    backend,
    venueId,
    wahanaId,
    name,
    symbol,
    decimal,
    totalSupply,
    description,
    banner,
    price,
  }) => {
    try {
      const response = await backend.editWahana(
        wahanaId,
        venueId,
        name,
        symbol,
        decimal,
        totalSupply,
        description,
        banner,
        price
      );
      return response;
    } catch (error) {
      console.error("Error editing wahana:", error);
      throw error;
    }
  }
);

// Getting all wahana by venue
export const getallWahanasbyVenue = createAsyncThunk(
  "wahana/getallWahanasbyVenue",
  async ({ backend, chunkSize, pageNo, venueId }) => {
    try {
      const response = await backend.getAllWahanasbyVenue(
        chunkSize,
        pageNo,
        venueId
      );
      return response;
    } catch (error) {
      console.error("Error fetching wahanas:", error);
      throw error;
    }
  }
);

// Create slice for Wahana API
const wahanaSlice = createSlice({
  name: "wahana",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createWahana
      .addCase(createWahana.pending, (state) => {
        state.createWahanaLoader = true;
      })
      .addCase(createWahana.fulfilled, (state, action) => {
        state.createWahanaLoader = false;
        console.log(action.payload, "create wahana");

        state.wahanas.push(action.payload.ok);
        state.error = null;
        notificationManager.success("Wahana created successfully");
      })
      .addCase(createWahana.rejected, (state, action) => {
        state.createWahanaLoader = false;
        state.error = action.error.message;
        notificationManager.error("Failed to create wahana");
      })


      //Handle edit wahana
      .addCase(edit_wahana.pending,(state)=>{
        state.editWahanaLoader = true;
      })

      .addCase(edit_wahana.fulfilled,(state,action)=>{
        state.editWahanaLoader = false;
        console.log(action.payload, "Edited wahana")

        state.wahanas.push(action.payload.ok);
        state.error = null;
        notificationManager.success("Wahana Edited successfully");
      })

      .addCase(edit_wahana.rejected,(state,action)=>{
        state.createWahanaLoader = false;
        state.error = action.error.message;
        notificationManager.error("Failed to Edit wahana");
      })

      // Handle getallWahanasbyVenue
      .addCase(getallWahanasbyVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallWahanasbyVenue.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          if (action.meta.arg.pageNo > 1) {
            // Append new page of wahanas to the existing list
            state.wahanas = [...state.wahanas, ...action.payload.data];
          } else {
            state.wahanas = action.payload.data;
          }
          state.currentPage = action.payload.current_page || 1;
          state.totalPages = action.payload.Total_pages || 1;
        } else {
          console.warn("Received empty or invalid response from API");
          state.wahanas = [];
          state.currentPage = 1;
          state.totalPages = 1;
        }
        state.error = null;
      })
      .addCase(getallWahanasbyVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        notificationManager.error("Failed to fetch wahanas");
      });
  },
});

export default wahanaSlice.reducer;
