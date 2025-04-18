import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config:configReducer
  },
});
export default appStore;
