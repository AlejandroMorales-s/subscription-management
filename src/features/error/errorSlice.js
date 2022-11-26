import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  errorMessage: "",
};

const options = {
  name: "errors",
  initialState,
  reducers: {
    addError: (state, action) => {
      const { errorMessage } = action.payload;

      state.isError = true;
      state.errorMessage = errorMessage;
    },
    removeError: (state) => {
      state.isError = false;
      state.errorMessage = "";
    },
  },
};

const errorSlice = createSlice(options);

//* Exporting reducers
export const { addError, removeError } = errorSlice.actions;

//* Selectors
export const selectErrorStatus = (state) => state.error.isError;
export const selectErrorMessage = (state) => state.error.errorMessage;

export default errorSlice.reducer;
