import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state
const initialState = {
  events: [],
  eventByVenue: [],
  OngoingEventByVenue: [],
  currentEvent: null,
  error: null,
  currentPage: 0,
  totalPages: 0,
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
      if (response.ok) {
        console.log("respones creating event", response);
        closeModal();
        return response;
      }
      if (response.err) {
        const errorMessage = Object.keys(response.err);
        // console.log(errorMessage);
        console.error("Error creating event ", response.err);
        if (errorMessage.includes("TicketPriceError")) {
          notificationManager.error("Ticket price must be greater than 11000 IDR");
        } else if (errorMessage.includes("CyclesError")) {
          notificationManager.error("Insufficient Cycles");
        } else {
          notificationManager.error("Error creating event!");
        }
        return response;
      }
    } catch (err) {
      console.error("Error creating event ", err);
      notificationManager.error("Error creating event!");
      throw new Error("Error creating event", err);
    }
  }
);

// deleting an event
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async ({ backend, venueId, eventId, setIsDelete }) => {
    try {
      const response = await backend.deleteEvent(venueId, eventId);
      console.log("delete event response", response);
      setIsDelete(false);
      notificationManager.success("Event deleted successfully!");
      return eventId;
    } catch (err) {
      notificationManager.error("Failed to delete Event");
      setIsDelete(false);
      console.error("error deleting event", err);
    }
  }
);

// getting all events by venue
export const getAllEventsByVenue = createAsyncThunk(
  "events/getAllEventsByVenue",
  async ({ backend, chunkSize, pageNo, venueId }, { rejectWithValue }) => {
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
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);
export const getAllOngoingEventsByVenue = createAsyncThunk(
  "events/getAllOngoingEventsByVenue",
  async ({ backend, chunkSize, pageNo, venueId }, { rejectWithValue }) => {
    try {
      const response = await backend.getOngoingEventsbyVenue(
        venueId,
        chunkSize,
        pageNo
      );
      console.log(" ongoing Events fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);

// getallevents
export const getAllEventsPaginated = createAsyncThunk(
  "events/getAllEventsPaginated",
  async ({ backend, pageLimit, currPage }, { rejectWithValue }) => {
    try {
      const response = await backend.getAllEventsPaginated(pageLimit, currPage);
      // console.log("Events fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
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
  async ({ backend, searchText, chunkSize, pageNo }, { rejectWithValue }) => {
    try {
      const response = await backend.searchEvents(
        searchText,
        chunkSize,
        pageNo
      );
      console.log("search response is ", response);
      return response;
    } catch (error) {
      console.error("error searching the events", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
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
        if (action.payload.ok) {
          state.createEventLoader = false;
          state.events = [...state.events, action.payload.ok];
          state.eventByVenue = [...state.eventByVenue, action.payload.ok];
          state.error = null;
          notificationManager.success("Event created successfully");
        }
        if (action.payload.err) {
          state.createEventLoader = false;
        }
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
        console.log(action);
        // state.singleEventLoading = false;
        // state.events = action.payload;
        state.currentPage = parseInt(action.payload.current_page);
        state.totalPages = parseInt(action.payload.total_pages);
        state.searchEventLoading = false;
        state.searchedEvents = action.payload.data;
        state.error = null;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        // state.singleEventLoading = false;
        state.searchEventLoading = false;
        state.currentPage = 0;
        state.totalPages = 0;
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
          (event) => event.id !== action.payload
        );
        state.eventByVenue = state.eventByVenue.filter(
          (event) => event.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.deleteEventLoader = false;
        state.error = action.error.message;
      })

      // Handle getAllEventsByVenue
      .addCase(getAllEventsByVenue.pending, (state) => {
        state.singleEventLoading = true;
      })
      .addCase(getAllEventsByVenue.fulfilled, (state, action) => {
        // console.log(action);
        state.singleEventLoading = false;
        state.currentPage = parseInt(action.payload.ok.current_page);
        state.totalPages = parseInt(action.payload.ok.Total_pages);
        state.eventByVenue = action.payload.ok.data;
      })
      .addCase(getAllEventsByVenue.rejected, (state, action) => {
        state.singleEventLoading = false;
        state.currentPage = 0;
        state.totalPages = 0;
        state.eventByVenue = [];
        state.error = action.error.message;
      })

      .addCase(getAllOngoingEventsByVenue.pending, (state) => {
        state.singleEventLoading = true;
      })
      .addCase(getAllOngoingEventsByVenue.fulfilled, (state, action) => {
        state.singleEventLoading = false;
        console.log(state.singleEventLoading);
        console.log(action);
        state.currentPage = parseInt(action.payload.ok.current_page);
        state.totalPages = parseInt(action.payload.ok.Total_pages);
        state.OngoingEventByVenue = action.payload.ok.data;
      })
      .addCase(getAllOngoingEventsByVenue.rejected, (state, action) => {
        state.singleEventLoading = false;
        state.currentPage = 0;
        state.totalPages = 0;
        state.OngoingEventByVenue = [];
        state.error = action.error.message;
      })

      // getallevents
      .addCase(getAllEventsPaginated.pending, (state) => {
        state.status = "loading";
        state.eventsLoading = true;
        state.error = null;
      })
      .addCase(getAllEventsPaginated.fulfilled, (state, action) => {
        // console.log(action);
        state.eventsLoading = false;
        state.currentPage = parseInt(action.payload.ok.current_page);
        state.totalPages = parseInt(action.payload.ok.Total_pages);
        state.events = [...action.payload.ok.data];
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(getAllEventsPaginated.rejected, (state, action) => {
        state.status = "failed";
        // state.events = [];
        state.currentPage = 0;
        state.totalPages = 0;
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
        // notificationManager.success("Event fetched successfully");
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.singleEventLoading = false;
        state.error = action.error.message;
        // notificationManager.error("Failed to fetch event");
      });
  },
});

export default eventSlice.reducer;
