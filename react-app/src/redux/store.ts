import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage as the default storage

// Persist configuration
const persistConfig = {
  key: "user",  // Persist only user slice
  storage,
  whitelist: ["currentUser"], // Only persist currentUser
};

// Wrap userReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Define types for use in dispatch and selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
