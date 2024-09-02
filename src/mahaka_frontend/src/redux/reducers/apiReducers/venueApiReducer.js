import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Principal } from "@dfinity/principal";

// initial states
const initialState = {
  venues: [],
  currentVenue: null,
  loading: true,
  error: null,
};

// async operations
export const getAllVenues = createAsyncThunk(
  "venues/getAllVenues",
  async ({ backend, pageLimit, currPage }) => {
    const response = await backend.getAllVenues(pageLimit, currPage);
    return response.data;
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
    await backend.deleteVenue(venueId);
    return venueId;
  }
);

// UpdateVenue : Fix later : depend on object
export const updateVenue = createAsyncThunk(
  "venues/updateVenue",
  async (venue) => {}
);

//Create Venue
export const createVenue = createAsyncThunk(
  "venues/createVenue",
  async ({ backend, collectionArgs, custodian, title, capacity, details, description}) => {
      const response = await backend.createVenue(
        {
          collection_args: {
            maxLimit: collectionArgs.maxLimit,
            logo: collectionArgs.logo,
            name: collectionArgs.name,
            banner: collectionArgs.banner,
            description: collectionArgs.description,
            created_at: collectionArgs.created_at,
            collection_type: { Venue: null },
            symbol: collectionArgs.symbol
          },
          custodian: Principal.fromText(custodian),
        },
        title,
        capacity,
        details,
        description
      );
      return response;
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
        state.venues = action.payload;
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
        state.loading = true;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = state.venues.filter(
          (venue) => venue.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

    // Fix later : create and update
    //   .addCase(updateVenue.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateVenue.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.venues = state.venues.map((venue) =>
    //       venue.id === action.payload.id ? action.payload : venue
    //     );
    //     state.error = null;
    //   })
    //   .addCase(updateVenue.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   })
    .addCase(createVenue.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createVenue.fulfilled, (state, action) => {
      state.loading = false;
      state.venues.push(action.payload);
      state.error = null;
    })
    .addCase(createVenue.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default venueSlice.reducer;
