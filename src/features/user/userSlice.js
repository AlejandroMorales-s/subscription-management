import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//* Firebase
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../libs/firebase";
import { providerLogin } from "../../libs/auth";
import { auth } from "../../libs/firebase";
import { addError } from "../error/errorSlice";

//* Async thunks
export const loginWithEmail = createAsyncThunk(
  "user/login",
  async ({ password, email }, thunkAPI) => {
    let userData = {};
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const { displayName, email, uid, photoURL } = res.user;
        let role = "";

        const docRef = doc(database, "users", uid);

        await getDoc(docRef)
          .then((data) => (role = data.get("role")))
          .catch((error) => console.log(error));

        userData = {
          displayName,
          email,
          uid,
          photoURL,
          role,
        };
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          thunkAPI.dispatch(
            addError({ errorMessage: "Contraseña incorrecta" })
          );
          throw error;
        }
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });
    return userData;
  }
);

export const loginWithSocialMedia = createAsyncThunk(
  "user/loginWithProvider",
  async (providerId, thunkAPI) => {
    let userData = {};

    await providerLogin(providerId)
      .then(async (res) => {
        const { displayName, email, photoURL, uid } = res.user;
        let role = "";
        const docRef = doc(database, "users", uid);
        await getDoc(docRef)
          .then(async (data) => {
            if (data.get("role") === undefined) {
              await setDoc(docRef, {
                role: "REGULAR",
                subscriptions: [],
              });
            }
            role = data.get("role");
          })
          .catch((error) => console.log(error));

        userData = {
          displayName,
          email,
          uid,
          photoURL,
          role,
        };
      })
      .catch((error) => {
        thunkAPI.dispatch(addError({ errorMessage: error.message }));
        throw error;
      });

    return userData;
  }
);

export const authChangeHandler = createAsyncThunk(
  "user/handlerAuthChange",
  async (auth, thunkAPI) => {
    let userData = {};

    const authHandler = async (auth) => {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (res) => {
          if (res === undefined || res === null) {
            thunkAPI.dispatch(addError({ errorMessage: "Session closed" }));
            reject("Session closed");
          }
          const { uid, displayName, email, photoURL } = res;
          let role = "";

          const docRef = doc(database, "users", uid);

          await getDoc(docRef)
            .then((data) => (role = data.get("role")))
            .catch((error) => console.log(error));

          resolve({
            displayName,
            email,
            uid,
            photoURL,
            role,
          });
        });
      });
    };

    await authHandler(auth)
      .then((res) => {
        userData = res;
      })
      .catch((error) => {
        throw error;
      });

    return userData;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (auth, thunkAPI) => {
    await signOut(auth);

    return initialState;
  }
);

//* Creating store
const initialState = {
  userData: {},
  logged: false,
  isSubmitting: false,
};

const options = {
  name: "user",
  initialState,
  extraReducers: {
    //* Login with email
    [loginWithEmail.pending]: (state) => {
      state.isSubmitting = true;
    },
    [loginWithEmail.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithEmail.rejected]: (state) => {
      state.isSubmitting = false;
    },
    //* Login with provider
    [loginWithSocialMedia.pending]: (state) => {
      state.isSubmitting = true;
    },
    [loginWithSocialMedia.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [loginWithSocialMedia.rejected]: (state) => {
      state.isSubmitting = false;
    },
    //* Auth change handler
    [authChangeHandler.pending]: (state) => {
      state.isSubmitting = true;
    },
    [authChangeHandler.fulfilled]: (state, action) => {
      state.userData = action.payload;

      state.logged = true;
      state.isSubmitting = false;
    },
    [authChangeHandler.rejected]: (state) => {
      state.isSubmitting = false;
    },
    //* logout
    [logout.pending]: (state) => {
      state.isSubmitting = true;
    },
    [logout.fulfilled]: (state) => {
      state.isSubmitting = false;
      state.userData = {};
      state.logged = false;
    },
    [logout.rejected]: (state) => {
      state.isSubmitting = false;
    },
  },
};

const userSlice = createSlice(options);

//* Selectors
export const selectLoggedStatus = (state) => state.user.logged;

export const selectUserData = (state) => state.user.userData;

export const selectIsSubmitting = (state) => state.user.isSubmitting;

export default userSlice.reducer;
