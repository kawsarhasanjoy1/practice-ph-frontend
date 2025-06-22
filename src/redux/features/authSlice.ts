import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type TInitialState = {
  user: Record<string, any>;
  token: string;
};

const initialState: TInitialState = {
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = {};
      state.token = "";
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

export const authPersistReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
export const { loginUser, logOut } = authSlice.actions;
