/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { warehouseReducer } from "./slice";

const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
  },
});

export default store;
