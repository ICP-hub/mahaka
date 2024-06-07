import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  // Middleware : disable serialize warning
  // Will need middleware for redux thunk as well : handle async
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
