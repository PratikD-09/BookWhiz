// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

// Combine reducers if needed
const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: "user",
      storage,
      whitelist: ["currentUser"], // only persist currentUser
    },
    userReducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

