// ticketReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching ticket details by venue or event
export const fetchTicketDetails = createAsyncThunk(
  "tickets/fetchTicketDetails",
  async ({ backend, collectionId }, { rejectWithValue }) => {
    try {
      const details = await backend.getDIPdetails(collectionId);
      return details;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    ticketDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTicketDetails: (state) => {
      state.ticketDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(fetchTicketDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTicketDetails } = ticketSlice.actions;
export default ticketSlice.reducer;
