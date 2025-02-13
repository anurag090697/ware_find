/** @format */

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wareData from "./dataArray.json";
// console.log(wareData);

export const getWare = createAsyncThunk(
  "warehouse/getWare",
  async ({ searchOpt, query }) => {
    // console.log(searchOpt, query);
    let arr = wareData.filter((ele) => ele[searchOpt].includes(query));

    return arr;
  }
);

export const getWaredeatils = createAsyncThunk(
  "warehouse/getWareDetails",
  async ({ id }) => {
    // console.log(searchOpt, query);
    let arr = wareData.find((ele) => ele.id === id);

    return arr;
  }
);

export const clearWare = createAction("warehouse/clearWare");
// export const
// console.log(s)
const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: { result: [], detailed: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWare.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWare.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
        //   console.log(state.result)
      })
      .addCase(getWare.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getWaredeatils.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailed = action.payload;
      })
      .addCase(clearWare, (state) => {
        state.status = "succeeded";
        state.result = [];
      });
  },
});

export const warehouseReducer = warehouseSlice.reducer;
