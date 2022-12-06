import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFilter: {
    filterType: "",
    newTotalAmountToPayFiltered: 0,
    totalAmount: 0,
  },
  subscriptionsFilter: {},
};

const options = {
  name: "filters",
  initialState,
  reducers: {
    setTotalAmountToPay: (state, action) => {
      const subscriptions = action.payload;

      const pricesArray = [];

      subscriptions.forEach((sub) => pricesArray.push(Number(sub.data.price)));

      state.priceFilter.totalAmount = pricesArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
    },
    /*
    modifyPriceFilter: (state, action) => {
      const { filterTypeName, filterTypeIndex, subscriptions } = action.payload;
      
      state.priceFilter.filterType = filterTypeName;
      
      if (filterTypeIndex === 0) {
      }
    },
    */
  },
};

const filtersSlice = createSlice(options);

//* Exporting reducers
export const { setTotalAmountToPay } = filtersSlice.actions;

//* Selectors
export const selectPriceFilterInfo = (state) => state.filters.priceFilter;
export const selectSubscriptionsFilterInfo = (state) =>
  state.filters.subscriptionsFilter;

export default filtersSlice.reducer;
