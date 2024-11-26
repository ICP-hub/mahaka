import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state
const initialState = {
  events: [],
  eventByVenue: [],
  currentEvent: null,
  error: null,
  currentPage: 1,
  totalPages: 1,
  eventsLoading: true,
  createEventLoader: false,
  buyTicketLoading: false,
  singleEventLoading: false,
  deleteEventLoader: false,
  searchedEvents: null,
  searchEventLoading: false,
};

// creating an event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ closeModal, backend, id, record, collection_args }) => {
    try {
      const response = await backend.createEvent(id, record, collection_args);
      console.log("respones creating event", response);
      closeModal();
      return response;
    } catch (err) {
      console.error("Error creating event ", err);
      notificationManager.error("Error creating event!");
      throw new Error("Error creating event", err);
    }
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
      throw new Error("Error fetching events", error);
    }
  }
);

// getallevents
export const getAllEventsPaginated = createAsyncThunk(
  "events/getAllEventsPaginated",
  async ({ backend }) => {
    try {
      const response = await backend.getAllEventsPaginated(10, 0);
      // console.log("Events fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Error fetching events", error);
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
      throw new Error("Error buying event ticket", error);
    }
  }
);
// fetching a specific event
export const getEvent = createAsyncThunk(
  "events/getEvent",
  async ({ backend, eventIds, venueId }) => {
    try {
      const response = await backend.getEvent(eventIds, venueId);
      // console.log("Event fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Error fetching event", error);
    }
  }
);

// search events

export const searchEvents = createAsyncThunk(
  "events/searchEvents",
  async ({ backend, searchText, chunkSize, pageNo }) => {
    try {
      const response = await backend.searchEvents(
        searchText,
        chunkSize,
        pageNo
      );
      console.log("search response is ", response);
      return response.data;
    } catch (error) {
      console.error("error searching the events", error);
      throw new Error("Error searching event", error);
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
        // console.log(action);
        state.createEventLoader = false;
        state.events = [...state.events, action.payload.ok];
        state.eventByVenue = [...state.eventByVenue, action.payload.ok];
        state.error = null;
        notificationManager.success("Event created successfully");
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createEventLoader = false;
        state.error = action.error.message;
      })

      // search events

      .addCase(searchEvents.pending, (state) => {
        // state.singleEventLoading = true;
        state.searchEventLoading = true;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        // state.singleEventLoading = false;
        // state.events = action.payload;
        state.searchEventLoading = false;
        state.searchedEvents = action.payload;
        state.error = null;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        // state.singleEventLoading = false;
        state.searchEventLoading = false;
        state.searchedEvents = [];
        state.error = "Error searching event";
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
        state.singleEventLoading = true;
      })
      .addCase(getAllEventsByVenue.fulfilled, (state, action) => {
        state.singleEventLoading = false;
        state.eventByVenue = action.payload.ok.data;
      })
      .addCase(getAllEventsByVenue.rejected, (state, action) => {
        state.singleEventLoading = false;
        state.eventByVenue = [];
        state.error = action.error.message;
      })

      // getallevents
      .addCase(getAllEventsPaginated.pending, (state) => {
        state.status = "loading";
        state.eventsLoading = true;
        state.error = null;
      })
      .addCase(getAllEventsPaginated.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = [...action.payload.ok.data];
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(getAllEventsPaginated.rejected, (state, action) => {
        state.status = "failed";
        // state.events = [];
        (state.eventsLoading = false), (state.error = action.error.message);
        // notificationManager.error("Failed to fetch events");
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
        state.singleEventLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.singleEventLoading = false;
        state.currentEvent = action.payload.ok;
        state.error = null;
        notificationManager.success("Event fetched successfully");
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.singleEventLoading = false;
        state.error = action.error.message;
        // notificationManager.error("Failed to fetch event");
      });
  },
});

export default eventSlice.reducer;
