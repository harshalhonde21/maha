// slices/unloadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  entries: [],
  error: null,
};

const unloadingSlice = createSlice({
  name: 'unloading',
  initialState,
  reducers: {
    fetchUnloadingRequest: state => {
      state.loading = true;
    },
    fetchUnloadingSuccess: (state, action) => {
      state.loading = false;
      state.entries = action.payload;
      state.error = null;
    },
    fetchUnloadingFail: (state, action) => {
      state.loading = false;
      state.entries = [];
      state.error = action.payload;
    },
  },
});

export const { fetchUnloadingRequest, fetchUnloadingSuccess, fetchUnloadingFail } = unloadingSlice.actions;

export default unloadingSlice.reducer;
