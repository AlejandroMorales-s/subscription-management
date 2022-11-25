import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
