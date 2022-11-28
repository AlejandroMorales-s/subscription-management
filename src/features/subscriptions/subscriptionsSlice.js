import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [],
  isLoading: false,
};

const options = {
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: {},
};

const subscriptionsSlice = createSlice(options);

export default subscriptionsSlice.reducer;
