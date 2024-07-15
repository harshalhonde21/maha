import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entries: null,
  error: null,
};

const chpSlice = createSlice({
  name: "chp",
  initialState,
  reducers: {
    fetchChpRequest: (state) => {
      state.loading = true;
    },
    fetchChpSuccess: (state, action) => {
      state.loading = false;
      state.entries = action.payload;
      state.error = null;
    },
    fetchChpFail: (state, action) => {
      state.loading = false;
      state.entries = null;
      state.error = action.payload;
    },
  },
});

export const { fetchChpRequest, fetchChpSuccess, fetchChpFail } = chpSlice.actions;


export default chpSlice.reducer;

