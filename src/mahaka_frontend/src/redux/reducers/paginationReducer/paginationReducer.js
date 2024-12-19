import { createSlice } from "@reduxjs/toolkit";

// Initial state with default page number values
const initialState = {
  userlistPageNum: 1,
  eventlistPageNum: 1,
  venuelistPageNum: 1,
  wahanalistPageNum: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    incrementPage: (state, action) => {
      const { key } = action.payload;
      state[key] += 1;
    },

    decrementPage: (state, action) => {
      const { key } = action.payload;
      if (state[key] > 1) {
        state[key] -= 1;
      }
    },
  },
});

export const { setPage, incrementPage, decrementPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
