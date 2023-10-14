import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/ProfileSlice";

export const Store = configureStore({
  reducer: {
    Profile: ProfileReducer,
  },
});
