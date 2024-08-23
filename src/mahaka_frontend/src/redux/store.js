import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import venueApiReducer from "./reducers/apiReducers/venueApiReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    venues: venueApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
