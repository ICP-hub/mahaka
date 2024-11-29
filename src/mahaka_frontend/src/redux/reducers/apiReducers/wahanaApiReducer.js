import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";
import { MdDetails } from "react-icons/md";

// Initial state for Wahana
const initialState = {
  wahanas: [],
  loading: false,
  error: null,
  currentPage: 1,
  wahanasPerPage: 3,
  totalPages: 1,
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
  async ({ backend, wahanaData, setIsModalOpen }) => {
    console.log(wahanaData);
    try {
      const response = await backend.createWahana(
        wahanaData.venueId,
        wahanaData.title,
        wahanaData.symbol,
        wahanaData.decimal,
        wahanaData.totalSupply,
        wahanaData.description,
        wahanaData.details,
        wahanaData.isFeatured,
        wahanaData.banner,
        wahanaData.priceIDR,
        wahanaData.priceICP
      );
      // console.log("wahana created successfully", response);
      setIsModalOpen(false);
      return response;
    } catch (error) {
      console.error("Error creating wahana:", error);
      throw error;
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
  async ({ backend, chunkSize, pageNo, venueId }) => {
    try {
      const response = await backend.getAllWahanasbyVenue(
        chunkSize,
        pageNo,
        venueId
      );
      console.log(response, "response of wahanas by venue");
      return response;
    } catch (error) {
      console.error("Error fetching wahanas:", error);
      throw error;
    }
  }
);

// getting the wahana
export const getWahana = createAsyncThunk(
  "wahana/getWahana",
  async ({ backend, selectedWahana, selectedVenue }) => {
    try {
      console.log(selectedWahana);
      console.log(selectedVenue);

      const response = await backend.getWahana(selectedWahana, selectedVenue);
      // console.log(response, "response");
      return response;
    } catch (error) {
      console.error("Error getting wahanas:", error);
      throw error;
    }
  }
);

// Getting all wahanas

export const getAllWahanas = createAsyncThunk(
  "/wahana/getAllWahanas",
  async ({ backend, chunkSize, pageNo }) => {
    try {
      const response = await backend.getAllWahanas(chunkSize, pageNo);
      // console.log(response, "response of getting wahanas");
      return response;
    } catch (error) {
      console.error("error fetching all wahanas", e);
      throw error;
    }
  }
);

// search wahana
export const searchWahanas = createAsyncThunk(
  "wahana/searchWahanas",
  async ({ backend, searchText, chunkSize, pageNo }) => {
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
      throw new error("Error searching wahana", error);
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
        state.createWahanaLoader = false;
        // console.log(action.payload, "create wahana");

        state.wahanas.push(action.payload.ok);
        state.error = null;
        notificationManager.success("Wahana created successfully");
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
        state.loading = false;
        state.searchedWahanaLoading = false;
        state.searchedWahana = action.payload;
        state.wahanas = action.payload;
        state.error = null;
      })
      .addCase(searchWahanas.rejected, (state, action) => {
        state.loading = false;
        state.searchedWahanaLoading = false;
        state.searchedWahana = [];
        // state.error = action.error.message;
        state.error = action.error.message || "An error occurred";
      })

      //Handle edit wahana
      .addCase(edit_wahana.pending, (state) => {
        state.editWahanaLoader = true;
      })

      .addCase(edit_wahana.fulfilled, (state, action) => {
        state.editWahanaLoader = false;
        console.log(action.payload, "Edited wahana");

        state.wahanas.push(action.payload.ok);
        state.error = null;
        notificationManager.success("Wahana Edited successfully");
      })

      .addCase(edit_wahana.rejected, (state, action) => {
        state.createWahanaLoader = false;
        state.error = action.error.message;
        //notificationManager.error("Failed to Edit wahana");
      })

      //Getting all wahanas
      .addCase(getAllWahanas.pending, (state) => {
        // state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWahanas.fulfilled, (state, action) => {
        state.loading = false;
        state.wahanas = action.payload.ok.data;
      })
      .addCase(getAllWahanas.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
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
        // state.wahanasByVenue = state.wahanasByVenue.filter(
        //   (wahana) => wahana.id !== action.payload
        // );
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
        state.wahanasByVenue = action.payload.ok.data;
      })
      .addCase(getAllWahanasbyVenue.rejected, (state, action) => {
        state.singleWahanaLoading = false;
        state.wahanasByVenue = [];
        state.error = action.error.message;
        //notificationManager.error("Failed to fetch wahanas");
      });
  },
});

export const { setPage } = wahanaSlice.actions;

export default wahanaSlice.reducer;
