import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk(
  "fetchSearch",
  async (data: { query: string; searchType: string }) => {
    const { query, searchType } = data;
    return await axios
      .get(`https://api.github.com/search/${searchType}?q=${query}`)
      .then((res) => {
        return { data: res.data.items, query, searchType };
      });
  }
);

export const resetSearch = createAction("restSearch");
