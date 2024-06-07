import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  userPlugPrincipal: null,
  isAuthenticated: false,
  userPlugBalance: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialData,
  reducers: {
    login: (state, action) => {
      state.userPlugPrincipal = action.payload.plugPrincipal;
      state.isAuthenticated = true;
      state.userPlugBalance = action.payload.plugBalance;
    },
    logout: (state) => {
      state.userPlugPrincipal = null;
      state.isAuthenticated = false;
      state.userPlugBalance = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
