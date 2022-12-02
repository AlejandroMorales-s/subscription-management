import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { addError } from "../error/errorSlice";

const createId = () => Math.random().toString(16).slice(2);

//* Async Thunks
export const addNewSubscription = createAsyncThunk(
  "subscription/addNewSubscription",
  async ({ uid, newSubscriptionData }, thunkAPI) => {
    if (!uid || !newSubscriptionData) {
      thunkAPI.dispatch(addError({ errorMessage: "Información incompleta" }));
      throw new Error("Información incompleta");
    }

    newSubscriptionData.id = createId();

    const docRef = doc(database, "users", uid);

    await getDoc(docRef)
      .then((res) => {
        const subscriptionsArray = res.get("subscriptions");
        setDoc(
          docRef,
          { subscriptions: [...subscriptionsArray, newSubscriptionData] },
          { merge: true }
        );
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });

    return newSubscriptionData;
  }
);

const initialState = {
  subscriptions: [],
  isLoading: false,
};

const options = {
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: {
    //* Add a new subscription
    [addNewSubscription.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewSubscription.fulfilled]: (state, action) => {
      state.subscriptions.push(action.payload);
      state.isLoading = false;
    },
    [addNewSubscription.rejected]: (state) => {
      state.isLoading = false;
    },
  },
};

const subscriptionsSlice = createSlice(options);

export default subscriptionsSlice.reducer;
