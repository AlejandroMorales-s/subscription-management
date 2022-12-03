import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/modal/modalSlice";
import errorReducer from "../features/error/errorSlice";
import subscriptionsReducer from "../features/subscriptions/subscriptionsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    error: errorReducer,
    subscriptions: subscriptionsReducer,
  },
});
