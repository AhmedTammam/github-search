import { combinedReducer } from "../store/reducers";

export type RootState = ReturnType<typeof combinedReducer>;
