import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import moviesReducer from "./moviesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    movies: moviesReducer,
  },
});
export default appStore;
