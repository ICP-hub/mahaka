import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state for DIP details
const initialState = {
  dipDetails: null,
  dipDetailsLoading: false,
  error: null,
};

// Get DIP details async thunk
export const getDIPdetails = createAsyncThunk(
  "dip/getDIPdetails",
  async ({ backend, principal }) => {
    try {
      const response = await backend.getDIPdetails(principal);
      console.log("DIP details fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching DIP details:", error);
      throw error;
    }
  }
);

// Create slice
const dipDetailsSlice = createSlice({
  name: "dipDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDIPdetails.pending, (state) => {
        state.dipDetailsLoading = true;
        state.error = null;
      })
      .addCase(getDIPdetails.fulfilled, (state, action) => {
        state.dipDetailsLoading = false;
        state.dipDetails = action.payload;
        state.error = null;
        notificationManager.success("DIP details fetched successfully");
      })
      .addCase(getDIPdetails.rejected, (state, action) => {
        state.dipDetailsLoading = false;
        state.dipDetails = null;
        state.error = action.error.message || "Failed to fetch DIP details";
        notificationManager.error("Failed to fetch DIP details");
      });
  },
});

export default dipDetailsSlice.reducer;