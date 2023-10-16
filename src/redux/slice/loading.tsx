import { createSlice } from "@reduxjs/toolkit";

import INITIAL_STATE from "../initialState";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: INITIAL_STATE.LOADING,
  reducers: {
    beginAPICall: (state) => {
      state.loading++;
    },
    endAPICall: (state) => {
      state.loading--;
    },
  },
});

export const { beginAPICall, endAPICall } = loadingSlice.actions;

export default loadingSlice.reducer;
