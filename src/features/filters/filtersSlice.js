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
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    },
    modifyPriceFilter: (state, action) => {
      const { filterTypeName, filterTypeIndex } = action.payload;

      state.priceFilter.filterType = filterTypeName;

      if (filterTypeIndex === 0) {
        state.priceFilter.newTotalAmountToPayFiltered =
          state.priceFilter.totalAmount / 4;
      } else if (filterTypeIndex === 1) {
        state.priceFilter.newTotalAmountToPayFiltered =
          state.priceFilter.totalAmount;
      } else {
        state.priceFilter.newTotalAmountToPayFiltered =
          state.priceFilter.totalAmount * 12;
      }
    },
    subscriptionsFilter: (state, action) => {
      const { subscriptions, filterIndex } = action.payload;

      if (filterIndex === 0) {
        state.subscriptionsFilter = subscriptions;
      } else if (filterIndex === 1) {
        const getPaidSubs = subscriptions.filter(
          (sub) => sub.data.isPaid === true
        );

        state.subscriptionsFilter = getPaidSubs;
      } else if (filterIndex === 2) {
        const getUnpaidSubs = subscriptions.filter(
          (sub) => sub.data.isPaid === false
        );
        state.subscriptionsFilter = getUnpaidSubs;
      }
    },
  },
};

const filtersSlice = createSlice(options);

//* Exporting reducers
export const { setTotalAmountToPay, modifyPriceFilter, subscriptionsFilter } =
  filtersSlice.actions;

//* Selectors
export const selectPriceFilterInfo = (state) => state.filters.priceFilter;
export const selectSubscriptionsFilterInfo = (state) =>
  state.filters.subscriptionsFilter;

export default filtersSlice.reducer;
