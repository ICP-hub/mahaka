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
  async ({ backend, id, record, collection_args }) => {
    const response = await backend.createEvent(id, record, collection_args);
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

// getallevents

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async ({ backend, chunkSize, pageNo, venueId }) => {
    try {
      const response = await backend.getAllEvents(
        chunkSize,
        pageNo,
      
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
// fetching a specific event
export const getEvent = createAsyncThunk(
  "events/getEvent",
  async ({ backend, eventIds, venueId }) => {
    try {
      const response = await backend.getEvent(eventIds, venueId);
      console.log("Event fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  }
);

// search events 

export const searchEvents= createAsyncThunk(
  "events/searchEvents",
  async ({ backend, searchText, chunkSize, pageNo }) => {
    try {
      const response = await backend.searchEvents(
        searchText,
        chunkSize,
        pageNo
      );
       return response.data;
      // console.log("search response is ",response.data)
    } catch (error) {
      console.error("error searching the events", error);
      throw error;
    }
  }
);

// Create slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {

    setPage: (state, action) => {
      state.currentPage = action.payload;
  },
  },
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

      // search events 

      .addCase(searchEvents.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        state.eventsLoading = false;
        // state.error = action.error.message;
        state.error = action.error.message || "An error occurred";
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
          state.events = [...state.events, ...action.payload.ok];
        } else {
          state.events = action.payload.ok.data;
        }
        state.currentPage = action.payload.ok.current_page;
        state.totalPages = action.payload.ok.Total_pages;
        state.error = null;
      })
      .addCase(getAllEventsByVenue.rejected, (state, action) => {
        state.eventsLoading = false;
        state.events = [];
        state.error = action.error.message;
      })

      // getallevents
      .addCase(getAllEvents.pending, (state) => {
        state.status = "loading";
        state. eventsLoading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state. eventsLoading = false;

        if (action.payload && action.payload.ok.data) {
          state.events = action.payload.ok.data;
          state.currentPage = action.payload.ok.current_page;
          state.totalPages = action.payload.ok.Total_pages;
           console.log("the events are  page is", state.events)
        } else {
          console.warn("Received empty or invalid response from API");
          state.events = [];
          state.currentPage = 1;
          state.totalPages = 1;
        }
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.status = "failed";
        state.events = [];
        (state. eventsLoading = false), (state.error = action.error.message);
        notificationManager.error("Failed to fetch events");
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
      })
      .addCase(getEvent.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.currentEvent = action.payload.ok;
        state.error = null;
        notificationManager.success("Event fetched successfully");
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.error.message;
        notificationManager.error("Failed to fetch event");
      });
  },
});

export default eventSlice.reducer;
