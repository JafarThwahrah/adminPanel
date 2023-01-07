/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit"; 
import contactSlice from './features/contactSlice'
const store = configureStore({
  reducer: {
    contact: contactSlice,
  },
});

export default store;
