import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";
import { MdDetails } from "react-icons/md";

// Initial state for Wahana
const initialState = {
  wahanas: [],
  wahanaByVenue: [],
  loading: true,
  error: null,
  currentPage: 0,
  // wahanasPerPage: 3,
  totalPages: 0,
  createWahanaLoader: false,
  currentWahana: null, // Add currentWahana to hold the selected wahana
  searchedWahana: null,
  searchedWahanaLoading: false,
  wahanasByVenue: null,
  singleWahanaLoading: false,
  deleteWahanaLoading: false,
};

// Creating a wahana
export const createWahana = createAsyncThunk(
  "wahana/createWahana",
  async ({ backend, wahanaData, setIsModalOpen }, { rejectWithValue }) => {
    // console.log(wahanaData);
    try {
      const response = await backend.createWahana(
        wahanaData.venueId,
        wahanaData.title,
        wahanaData.symbol,
        wahanaData.decimal,
        wahanaData.totalSupply,
        wahanaData.description,
        // wahanaData.details,
        wahanaData.isFeatured,
        wahanaData.banner,
        wahanaData.priceIDR
        // wahanaData.priceICP
      );
      if (response.ok) {
        console.log("wahana created successfully", response);
        setIsModalOpen(false);
        return response;
      }
      if (response.err) {
        const errorMessage = Object.keys(response.err);
        // console.log(errorMessage);
        console.error("Error creating wahana ", response.err);
        if (errorMessage.includes("TicketPriceError")) {
          notificationManager.error("Ticket price is too low to proceed");
        } else if (errorMessage.includes("CyclesError")) {
          notificationManager.error("Insufficient Cycles");
        } else {
          notificationManager.error("Error creating wahana!");
        }
        return response;
      }
    } catch (error) {
      notificationManager.error("Failed to create wahana");
      console.error("Error creating wahana:", error);
      return rejectWithValue({ currentPage: 0, currentPage: 0 });
    }
  }
);

// Edit wahana

export const edit_wahana = createAsyncThunk(
  "wahana/edit_wahana",
  async ({
    backend,
    selectedWahana,
    selectedVenue,
    name,
    symbol,
    decimal,
    totalSupply,
    description,
    banner,
    price,
  }) => {
    try {
      const response = await backend.edit_wahana(
        selectedWahana,
        selectedVenue,
        name,
        symbol,
        decimal,
        totalSupply,
        description,
        banner,
        price
      );
      return response;
    } catch (error) {
      console.error("Error editing wahana:", error);
      throw error;
    }
  }
);

// Getting all wahana by venue
export const getAllWahanasbyVenue = createAsyncThunk(
  "wahana/getAllWahanasbyVenue",
  async ({ backend, chunkSize, pageNo, venueId }, { rejectWithValue }) => {
    try {
      const response = await backend.getAllWahanasbyVenue(
        chunkSize,
        pageNo,
        venueId
      );
      // console.log(response, "response of wahanas by venue");
      return response;
    } catch (error) {
      console.error("Error fetching wahanas:", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);

// getting the wahana
export const getWahana = createAsyncThunk(
  "wahana/getWahana",
  async ({ backend, selectedWahana, selectedVenue }, { rejectWithValue }) => {
    try {
      // console.log(selectedWahana);
      // console.log(selectedVenue);
      const response = await backend.getWahana(selectedWahana, selectedVenue);
      // console.log(response, "response get wahana");
      return response;
    } catch (error) {
      console.error("Error getting wahanas:", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);

// Getting all wahanas

export const getAllWahanas = createAsyncThunk(
  "/wahana/getAllWahanas",
  async ({ backend, chunkSize, pageNo }, { rejectWithValue }) => {
    try {
      const response = await backend.getAllWahanas(chunkSize, pageNo);
      // console.log(response, "response of getting wahanas");
      return response;
    } catch (error) {
      console.error("error fetching all wahanas", e);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);

// search wahana
export const searchWahanas = createAsyncThunk(
  "wahana/searchWahanas",
  async ({ backend, searchText, chunkSize, pageNo }, { rejectWithValue }) => {
    try {
      const response = await backend.searchWahanas(
        searchText,
        chunkSize,
        pageNo
      );
      console.log("Response Searching wahana", response);
      return response.data;
    } catch (error) {
      console.error("error searching the wahanas", error);
      return rejectWithValue({ currentPage: 0, totalPages: 0 });
    }
  }
);

// delete wahana
export const deleteWahana = createAsyncThunk(
  "wahana/deleteWahana",
  async ({ backend, venueId, wahanaId, setIsDelete }) => {
    try {
      const response = await backend.deleteWahana(venueId, wahanaId);
      console.log("delete wahana response", response);
      setIsDelete(false);
      notificationManager.success("Wahana deleted successfully!");
      return wahanaId;
    } catch (err) {
      notificationManager.error("Failed to delete wahana");
      setIsDelete(false);
      console.error("error deleting wahana", err);
    }
  }
);

// Create slice for Wahana API
const wahanaSlice = createSlice({
  name: "wahana",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createWahana
      .addCase(createWahana.pending, (state) => {
        state.createWahanaLoader = true;
      })
      .addCase(createWahana.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.createWahanaLoader = false;
          state.wahanas.push(action.payload.ok);
          state.error = null;
          notificationManager.success("Wahana created successfully");
        }
        if (action.payload.err) {
          state.createWahanaLoader = false;
        }
      })
      .addCase(createWahana.rejected, (state, action) => {
        state.createWahanaLoader = false;
        state.error = action.error.message;
        // notificationManager.error("Failed to create wahana");
      })

      // search wahana
      .addCase(searchWahanas.pending, (state) => {
        state.loading = true;
        state.searchedWahanaLoading = true;
      })
      .addCase(searchWahanas.fulfilled, (state, action) => {
        // console.log("searched wahanas in redux",action.payload)
        state.loading = false;
        state.searchedWahanaLoading = false;
        state.searchedWahana = action.payload;
        state.totalPages = parseInt(action.payload.ok.total_pages);
        state.currentPage = parseInt(action.payload.ok.current_page);
        //state.wahanas = action.payload;
        state.error = null;
      })
      .addCase(searchWahanas.rejected, (state, action) => {
        state.loading = false;
        state.searchedWahanaLoading = false;
        state.searchedWahana = [];
        state.totalPages = 0;
        state.currentPage = 0;
        // state.error = action.error.message;
        state.error = action.error.message || "An error occurred";
      })

      //Handle edit wahana
      // .addCase(edit_wahana.pending, (state) => {
      //   state.editWahanaLoader = true;
      // })

      // .addCase(edit_wahana.fulfilled, (state, action) => {
      //   state.editWahanaLoader = false;
      //   console.log(action.payload, "Edited wahana");

      //   state.wahanas.push(action.payload.ok);
      //   state.error = null;
      //   notificationManager.success("Wahana Edited successfully");
      // })

      // .addCase(edit_wahana.rejected, (state, action) => {
      //   state.createWahanaLoader = false;
      //   state.error = action.error.message;

      // })

      //Getting all wahanas
      .addCase(getAllWahanas.pending, (state) => {
        // state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWahanas.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPages = parseInt(action.payload.ok.Total_pages);
        state.currentPage = parseInt(action.payload.ok.current_page);
        state.wahanas = [...action.payload.ok.data];
      })
      .addCase(getAllWahanas.rejected, (state) => {
        state.loading = false;
        // state.status = "failed";
        state.totalPages = 0;
        state.currentPage = 0;
        state.wahanas = [];
        // (state.loading = false), (state.error = action.error.message);
        // notificationManager.error("Failed to fetch wahanas");
      })

      // handle getting single wahana
      .addCase(getWahana.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWahana.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWahana = action.payload.ok; // Update currentWahana with the fetched wahana
        state.error = null;
      })
      .addCase(getWahana.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        //  notificationManager.error("Failed to fetch wahana");
      })
      // delete wahana

      .addCase(deleteWahana.pending, (state) => {
        state.deleteWahanaLoading = true;
      })
      .addCase(deleteWahana.fulfilled, (state, action) => {
        console.log("Deleted wahana ID:", action.payload);
        state.deleteWahanaLoading = false;
        state.wahanas = state.wahanas.filter(
          (wahana) => wahana.id !== action.payload
        );
        state.wahanasByVenue = state.wahanasByVenue.filter(
          (wahana) => wahana.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteWahana.rejected, (state, action) => {
        state.deleteWahanaLoading = false;
        state.error = action.error.message;
      })

      // Handle getallWahanasbyVenue
      .addCase(getAllWahanasbyVenue.pending, (state) => {
        state.singleWahanaLoading = true;
      })
      .addCase(getAllWahanasbyVenue.fulfilled, (state, action) => {
        state.singleWahanaLoading = false;
        state.totalPages = parseInt(action.payload.ok.Total_pages);
        state.currentPage = parseInt(action.payload.ok.current_page);
        state.wahanasByVenue = action.payload.ok.data;
      })
      .addCase(getAllWahanasbyVenue.rejected, (state, action) => {
        state.singleWahanaLoading = false;
        state.wahanasByVenue = [];
        state.totalPages = 0;
        state.currentPage = 0;
        state.error = action.error.message;
        //notificationManager.error("Failed to fetch wahanas");
      });
  },
});

export const { setPage } = wahanaSlice.actions;

export default wahanaSlice.reducer;
