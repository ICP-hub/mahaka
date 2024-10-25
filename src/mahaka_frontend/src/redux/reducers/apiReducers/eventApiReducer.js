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
  createEventLoader: false,
  buyTicketLoading: false,
  deleteEventLoader: false,
};

// creating an event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ backend, text, record, collection_args }) => {
    const response = await backend.createEvent(text, record, collection_args);
    return response;
  }
);

// deleting an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ backend, venueId, custodianId }) => {
    const response = await backend.deleteEvent(venueId, custodianId);
    return response;
  }
);

// getting all events by venue
export const getAllEventsByVenue = createAsyncThunk(
  "events/getAllEventsByVenue",
  async ({ backend, chunkSize, pageNo, venueId }) => {
    try {
      const response = await backend.getallEventsbyVenue(
        chunkSize,
        pageNo,
        venueId
      );
      console.log("Events fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }
);

//buy Event Ticket
export const buyEventTicket = createAsyncThunk(
  "events/buyEventTicket",
  async ({ backend, venueId, eventId, ticket_type, record }) => {
    try {
      const response = await backend.buyEventTicket(
        venueId,
        eventId,
        ticket_type,
        record
      );
      console.log("Ticket purchase response:", response);
      return response;
    } catch (error) {
      console.error("Error buying event ticket:", error);
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
        state.createEventLoader = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.createEventLoader = false;
        state.events = [...state.events, action.payload.ok];
        state.error = null;
        notificationManager.success("Event created successfully");
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createEventLoader = false;
        state.error = action.error.message;
      })

      // Handle deleteEvent
      .addCase(deleteEvent.pending, (state) => {
        state.deleteEventLoader = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.deleteEventLoader = false;
        state.events = state.events.filter(
          (event) => event.id !== action.meta.arg.custodianId
        );
        state.error = null;
        notificationManager.success("Event deleted successfully");
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.deleteEventLoader = false;
        state.error = action.error.message;
        notificationManager.error("Failed to delete event");
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
      })
      .addCase(buyEventTicket.pending, (state) => {
        state.buyTicketLoading = true;
      })
      .addCase(buyEventTicket.fulfilled, (state, action) => {
        state.buyTicketLoading = false;
        state.tickets = [...state.tickets, action.payload];
        state.error = null;
        notificationManager.success("Event ticket purchased successfully");
      })
      .addCase(buyEventTicket.rejected, (state, action) => {
        state.buyTicketLoading = false;
        state.error = action.error.message;
        notificationManager.error("Failed to purchase event ticket");
      });
  },
});

export default eventSlice.reducer;
