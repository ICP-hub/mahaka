import { configureStore } from "@reduxjs/toolkit";

import venueApiReducer from "./reducers/apiReducers/venueApiReducer";
import userApiReducer from "./reducers/apiReducers/userApiReducer";
import eventApiReducer from "./reducers/apiReducers/eventApiReducer";
import bannerApiReducer from "./reducers/apiReducers/bannerApiReducer";
import wahanaApiReducer from "./reducers/apiReducers/wahanaApiReducer";
import testimonialApiReducer from "./reducers/apiReducers/testimonialApiReducer";

import authenticationReducer from "./reducers/auth/authenticationReducer";
 

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    venues: venueApiReducer,
    users: userApiReducer,
    events: eventApiReducer,
    wahana: wahanaApiReducer,
    banner: bannerApiReducer,
    testimonial:testimonialApiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
