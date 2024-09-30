import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import venueApiReducer from "./reducers/apiReducers/venueApiReducer";
import userApiReducer from "./reducers/apiReducers/userApiReducer";
import eventApiReducer from "./reducers/apiReducers/eventApiReducer";
import authenticationReducer from "./reducers/auth/authenticationReducer";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    authentication: authenticationReducer,
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
