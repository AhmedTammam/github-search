import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import searchReducer from "./searchSlice";

const combinedReducer = combineReducers({
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelsit: ["search"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export { combinedReducer, persistedReducer };
