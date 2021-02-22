import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import searchReducer from "./reducers/searchSlice";

const combinedReducer = combineReducers({
  search: searchReducer,
});

// const rootReducer: any = (state: RootState, action: Action) => {
//   return combinedReducer(state, action);
// };

const persistConfig = {
  key: "root",
  storage,
  whitelsit: ["search"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
