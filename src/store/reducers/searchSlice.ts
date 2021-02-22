import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch } from "../actions";

export interface SearchState {
  query: string;
  collection: [];
  searchType: "users" | "repositories" | string;
  isLoading: boolean;
  error: string;
}

export const initialState: SearchState = {
  query: "",
  collection: [],
  searchType: "users",
  isLoading: false,
  error: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    restSearch: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, { payload }) => {
      state.collection = payload.data;
      state.query = payload.query;
      state.searchType = payload.searchType;
      state.isLoading = false;
    });
    builder.addCase(fetchSearch.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message || "something wrong happen";
    });
  },
});

export const { restSearch } = searchSlice.actions;

export default searchSlice.reducer;
