import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state
const initialState = {
  events: [],
  currentEvent: null,
  eventsLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// creating an event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ backend, text, record, collection_args }) => {
    const response = await backend.createEvent(text, record, collection_args);
    return response;
  }
);

// getting all events by venue
export const getAllEventsByVenue = createAsyncThunk(
  "events/getAllEventsByVenue",
  async ({ backend, chunkSize, pageNo, venueId }) => {
    try {
      const response = await backend.getallEventsbyVenue(chunkSize, pageNo, venueId );
      console.log("Events fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }
);


// Create slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createEvent
      .addCase(createEvent.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = [...state.events, action.payload];
        state.error = null;
        notificationManager.success("Event created successfully");
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.error.message;
      })

      // Handle getAllEventsByVenue
      .addCase(getAllEventsByVenue.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(getAllEventsByVenue.fulfilled, (state, action) => {
        state.eventsLoading = false;
        if (action.meta.arg.pageNo > 1) {
          // Append new page of events to the existing list
          state.events = [...state.events, ...action.payload.data];
        } else {
          state.events = action.payload.data;
      
        }
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.Total_pages;
        state.error = null;
      })
      .addCase(getAllEventsByVenue.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
