import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";


const initialState = {
    ongoingEvents: [],
   
    error: null,
    currentPage: 1,
    totalPages: 1,
    ongoingEventsLoading: false,
   
  };


  export const getOngoingEvents = createAsyncThunk(
    "ongoingevents/getOngoingEvents",
    async ({ backend }) => {
      try {
        const response = await backend.getOngoingEvents(10, 0);
        // console.log("Events fetched:", response);
        return response;
      } catch (error) {
        console.error("Error fetching ongoingevents:", error);
        throw new Error("Error fetching ongoingevents", error);
      }
    }
  );

  const ongoingeventSlice = createSlice({
    name: "ongoingevents",
    initialState,
    reducers: {
      setPage: (state, action) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(getOngoingEvents.pending, (state) => {
       // console.log("ongoing events in redux",action)
       // state.status = "loading";
        state.ongoingEventsLoading = true;
        state.error = null;
      })
      .addCase(getOngoingEvents.fulfilled, (state, action) => {
       // console.log("ongoing events in redux",action)
        state.ongoingEventsLoading = false;
        state.ongoingEvents = [...action.payload.ok.data];
        state.error = null;
        //state.status = "succeeded";
      })
      .addCase(getOngoingEvents.rejected, (state, action) => {
        state.ongoingEventsLoading = false;
      
       // state.status = "failed";
         state.ongoingEvents = [];
       // (state.ongoingEventsLoading = false), (state.error = action.error.message);
        // notificationManager.error("Failed to fetch events");
      })


    }
    })

    export default ongoingeventSlice.reducer;
  