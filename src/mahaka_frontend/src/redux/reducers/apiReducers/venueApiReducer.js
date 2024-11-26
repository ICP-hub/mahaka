import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../../common/utils/notificationManager";
import { NotEqualStencilFunc } from "three";

// initial states
const initialState = {
  venues: [],
  currentVenue: null,
  loading: true,
  error: null,
  createVenueLoader: false,
  buyTicketLoading: false,
  totalPages: 0,
  currentPage: 0,
  deleteLoading: false,
  searchedVenues: null,
  searchVenueLoading: false,
};

// async operations
export const getAllVenues = createAsyncThunk(
  "venues/getAllVenues",
  async ({ backend, pageLimit, currPage }) => {
    const response = await backend.getAllVenues(pageLimit, currPage);
    // console.log("response:", response);
    return {
      data: response.data,
      totalPages: Number(response.Total_pages),
      currPage: Number(response.current_page),
    };
  }
);

// Get single venue
export const getVenue = createAsyncThunk(
  "venues/getVenue",
  async ({ backend, venueId }) => {
    const response = await backend.getVenue(venueId);
    return response;
  }
);

// Delete venue
export const deleteVenue = createAsyncThunk(
  "venues/deleteVenue",
  async ({ backend, venueId }) => {
    try {
      const response = await backend.deleteVenue(venueId);
      return venueId;
    } catch (err) {
      console.error("Error deleting venue", err);
      throw err;
    }
  }
);

// UpdateVenue
export const updateVenue = createAsyncThunk(
  "venues/updateVenue",
  async ({
    backend,
    collectionDetails,
    venueId,
    updatedTitle,
    updatedDescription,
    eventDetails,
    capacity,
    logo,
    banner,
    action,
  }) => {
    try {
      const response = await backend.updateVenue(
        collectionDetails,
        venueId,
        updatedTitle,
        updatedDescription,
        eventDetails,
        capacity,
        logo,
        banner
      );
      action(false);
      return response;
    } catch (err) {
      console.error("Error while updating venue", err);
      throw new Error("Error creating venue", err);
    }
  }
);

//Create Venue
export const createVenue = createAsyncThunk(
  "venues/createVenue",
  async ({
    backend,
    collectionDetails,
    title,
    capacity,
    details,
    description,
    action,
  }) => {
    try {
      const response = await backend.createVenue(
        collectionDetails,
        title,
        capacity,
        details,
        description
      );
      action(false);
      // console.log("response creating venue", response);
      return response;
    } catch (error) {
      console.error("Error creating venue", error);
      throw new Error("Error creating venue", error);
    }
  }
);

//buy Venue Ticket
export const buyVenueTicket = createAsyncThunk(
  "venues/buyVenueTicket",
  async ({ backend, venueId, ticket_type, record }) => {
    try {
      const response = await backend.buyVenueTicket(
        venueId,
        ticket_type,
        record
      );
      // console.log("Venue ticket purchase response:", response);
      return response;
    } catch (error) {
      console.error("Error buying venue ticket:", error);
      throw new Error("Error creating venue", error);
    }
  }
);
export const searchVenues = createAsyncThunk(
  "venues/searchVenues",
  async ({ backend, searchText, pageLimit, currPage }) => {
    try {
      const response = await backend.searchVenues(
        searchText,
        pageLimit,
        currPage
      );
      console.log("response search venue", response);
      return { data: response.data };
    } catch (err) {
      console.error("Error Searching venue", err);
      throw new Error("Error searching venue", err);
    }
  }
);

// Create slice
const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenues.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currPage;
        state.error = null;
      })
      .addCase(getAllVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVenue = action.payload;
        state.error = null;
      })
      .addCase(getVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteVenue.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.venues = state.venues.filter(
          (venue) => venue.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message;
      })

      // Fix later : create and update
      .addCase(updateVenue.pending, (state) => {
        state.createVenueLoader = true;
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        state.createVenueLoader = false;
        const updatedVenue = action.payload.ok;

        state.venues = state.venues.map((venue) =>
          venue.id === updatedVenue.id ? updatedVenue : venue
        );
        if (state.currentVenue && state.currentVenue.id === updatedVenue.id) {
          state.currentVenue = updatedVenue;
        }
        state.error = null;
        notificationManager.success("Venue updated successfully");
      })
      .addCase(updateVenue.rejected, (state, action) => {
        state.createVenueLoader = false;
        state.error = action.error.message;
        notificationManager.error("Failed to update venue");
      })
      .addCase(createVenue.pending, (state) => {
        state.createVenueLoader = true;
        state.error = null;
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.createVenueLoader = false;

        state.venues.push(action.payload.ok[1]);
        state.error = null;
        notificationManager.success("Venue created successfully");
      })
      .addCase(createVenue.rejected, (state, action) => {
        state.createVenueLoader = false;
        state.error = action.error.message;
        notificationManager.error("Failed to create venue");
      })

      .addCase(buyVenueTicket.pending, (state) => {
        state.buyTicketLoading = true;
      })
      .addCase(buyVenueTicket.fulfilled, (state, action) => {
        state.buyTicketLoading = false;
        state.tickets = [...state.tickets, action.payload];
        state.error = null;
        notificationManager.success("Venue ticket purchased successfully");
      })
      .addCase(buyVenueTicket.rejected, (state, action) => {
        state.buyTicketLoading = false;
        state.error = action.error.message;
        notificationManager.error("Failed to purchase venue ticket");
      })
      .addCase(searchVenues.pending, (state) => {
        state.searchVenueLoading = true;
      })
      .addCase(searchVenues.fulfilled, (state, action) => {
        state.searchVenueLoading = false;
        state.searchedVenues = action.payload.data;
        state.error = null;
      })
      .addCase(searchVenues.rejected, (state, action) => {
        state.searchVenueLoading = false;
        state.searchedVenues = [];
        state.error = action.error.message;
      });
  },
});

export default venueSlice.reducer;
