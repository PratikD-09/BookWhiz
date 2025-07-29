// userRedux.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: any | null;
  isFetching: boolean;
  error: boolean;
}

let initialState: UserState = {
  isFetching: false,
  currentUser: null ,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
