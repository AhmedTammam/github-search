import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
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
    resetSearch: (state, { payload }) => {
      return { ...initialState, searchType: payload };
    },
    setCachedData: (state, { payload }) => {
      state.collection = payload.collection;
      state.query = payload.query;
      state.searchType = payload.searchType;
      state.isLoading = false;
      state.error = payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, { payload }) => {
      const { data, query, searchType } = payload;
      state.collection = data;
      state.query = query;
      state.searchType = searchType;
      state.isLoading = false;
      state.error = !data.length
        ? "We don't have any result related to your search"
        : "";
      const cachedData = JSON.stringify({
        savedQuery: query,
        savedCollection: data,
        savedSearchType: searchType,
        isLoading: false,
        error: !data.length
          ? "We don't have any result related to your search"
          : "",
      });
      storage.setItem("cachedData", cachedData);
    });
    builder.addCase(fetchSearch.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message || "something wrong happen";
    });
  },
});

export const { resetSearch, setCachedData } = searchSlice.actions;

export default searchSlice.reducer;
