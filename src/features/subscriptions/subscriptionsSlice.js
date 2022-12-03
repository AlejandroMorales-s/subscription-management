import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { addError } from "../error/errorSlice";

const createId = () => Math.random().toString(16).slice(2);

//* Async Thunks
export const createSubscription = createAsyncThunk(
  "subscription/addNewSubscription",
  async ({ uid, newSubscriptionData }, thunkAPI) => {
    if (!uid || !newSubscriptionData) {
      thunkAPI.dispatch(addError({ errorMessage: "Información incompleta" }));
      throw new Error("Información incompleta");
    }

    const newSubscriptionObject = {
      id: createId(),
      data: newSubscriptionData,
    };

    const docRef = doc(database, "users", uid);

    await getDoc(docRef)
      .then((res) => {
        const subscriptionsArray = res.get("subscriptions");
        setDoc(
          docRef,
          { subscriptions: [...subscriptionsArray, newSubscriptionObject] },
          { merge: true }
        );
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });

    return newSubscriptionObject;
  }
);

export const readUserSubscriptions = createAsyncThunk(
  "subscriptions/readSubscriptions",
  async (uid, thunkAPI) => {
    const docRef = doc(database, "users", uid);
    let subscriptions;

    await getDoc(docRef)
      .then((res) => {
        subscriptions = res.data().subscriptions;
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });
    return subscriptions;
  }
);

export const updateSubscription = createAsyncThunk(
  "subscription/updateSubscription",
  async ({ uid, subscriptionData }, thunkAPI) => {
    const dataUpdatedObj = {};
    let subscriptionsArrayUpdated;

    for (const key in subscriptionData) {
      dataUpdatedObj[key] = subscriptionData[key];
    }

    const docRef = doc(database, "users", uid);

    await getDoc(docRef)
      .then((res) => {
        const subsArrayFromDb = res.data().subscriptions;

        let subToUpdate = subsArrayFromDb.find(
          (sub) => sub.id === dataUpdatedObj.id
        );

        const subsArrayFiltered = subsArrayFromDb.filter(
          (sub) => sub.id !== dataUpdatedObj.id
        );

        subToUpdate = dataUpdatedObj;

        subsArrayFiltered.push(subToUpdate);

        subscriptionsArrayUpdated = subsArrayFiltered;

        setDoc(docRef, { subscriptions: subsArrayFiltered }, { merge: true });
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });

    return subscriptionsArrayUpdated;
  }
);

export const deleteSubscription = createAsyncThunk(
  "subscription/deleteSubscription",
  async ({ uid, subscriptionId }, thunkAPI) => {
    if (!uid || !subscriptionId) {
      thunkAPI.dispatch(addError({ errorMessage: "Información incompleta" }));
      throw new Error("Información incompleta");
    }

    const docRef = doc(database, "users", uid);

    let subsFiltered;

    await getDoc(docRef)
      .then((res) => {
        const subsArray = res.get("subscriptions");

        subsFiltered = subsArray.filter((sub) => sub.id !== subscriptionId);

        setDoc(docRef, { subscriptions: subsFiltered }, { merge: true });
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });

    return subsFiltered;
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
    //* Create subscription
    [createSubscription.pending]: (state) => {
      state.isLoading = true;
    },
    [createSubscription.fulfilled]: (state, action) => {
      state.subscriptions.push(action.payload);
      state.isLoading = false;
    },
    [createSubscription.rejected]: (state) => {
      state.isLoading = false;
    },
    //* Read user's subscriptions
    [readUserSubscriptions.pending]: (state) => {
      state.isLoading = true;
    },
    [readUserSubscriptions.fulfilled]: (state, action) => {
      state.subscriptions = action.payload;
      state.isLoading = false;
    },
    [readUserSubscriptions.rejected]: (state) => {
      state.isLoading = false;
    },
    //* Update subscription
    [updateSubscription.pending]: (state) => {
      state.isLoading = true;
    },
    [updateSubscription.fulfilled]: (state, action) => {
      state.subscriptions = action.payload;
      state.isLoading = false;
    },
    [updateSubscription.rejected]: (state) => {
      state.isLoading = false;
    },
    //* Delete subscription
    [deleteSubscription.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteSubscription.fulfilled]: (state, action) => {
      state.subscriptions = action.payload;
      state.isLoading = false;
    },
    [deleteSubscription.rejected]: (state) => {
      state.isLoading = false;
    },
  },
};

const subscriptionsSlice = createSlice(options);

export default subscriptionsSlice.reducer;
