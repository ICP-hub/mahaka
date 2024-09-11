import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import venueApiReducer from "./reducers/apiReducers/venueApiReducer";
import userApiReducer from "./reducers/apiReducers/userApiReducer";
import eventApiReducer from "./reducers/apiReducers/eventApiReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    venues: venueApiReducer,
    users: userApiReducer,
    events: eventApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
