import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./logSlice";

const store = configureStore({
  reducer: {
    auth: logReducer 
  }
});

export default store;