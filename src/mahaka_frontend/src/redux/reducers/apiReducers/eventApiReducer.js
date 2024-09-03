import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async ({ backend, venueId, Event, eCollection }) => {
      const response = await backend.createEvent(venueId, Event, eCollection);
      return response;
  }
);

// getting all events by venue
export const getAllEventsByVenue = createAsyncThunk(
  "events/getAllEventsByVenue",
  async ({ backend, chunkSize, pageNo, venueId }) => {  
      const response = await backend.getallEventsbyVenue(chunkSize, pageNo, venueId);
      return response;
    } 
);

// Create slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createEvent.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.currentEvent = action.payload;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.error.message;
      })
      
      .addCase(getAllEventsByVenue.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(getAllEventsByVenue.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload.data;
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
