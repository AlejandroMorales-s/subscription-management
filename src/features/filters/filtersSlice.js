import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFilter: {},
  subscriptionsFilter: {},
};

const options = {
  name: "filters",
  initialState,
  reducers: {},
};

const filtersSlice = createSlice(options);

export default filtersSlice.reducer;
