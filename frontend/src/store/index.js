import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import bookReducer from "./bookSlice";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    message: messageReducer,
    book: bookReducer,
  },
  middleware: [thunk],
});
export const persistor = persistStore(store);
