import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import styled from "@emotion/styled";

import GithubIcon from "./github.svg";
import { fetchSearch } from "../../store/actions";
import { resetSearch, setCachedData } from "../../store/reducers/searchSlice";
import { useLocalStorage } from "../../helpers";
import type { RootState } from "../../types/state";

const StyledWrapper = styled.div((props: { hasSiblings: boolean }) => ({
  display: props.hasSiblings ? "block" : "flex",
  justifyContent: "center",
  alignItems: "center",
  height: props.hasSiblings ? "100%" : "100vh",
  padding: props.hasSiblings ? "50px 200px 20px" : 0,
  background: props.hasSiblings ? "lightgrey" : "100vh",
  "@media (max-width: 768px)": {
    padding: 0,
    "&>div": {
      width: props.hasSiblings ? "auto" : "100%",
      padding: 25,
    },
  },
}));

const StyledInfo = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
});

const StyledInfoImg = styled.img({
  width: 40,
  height: 40,
  marginRight: 12,
});

const StyledInfoTitle = styled.h1({
  margin: "0 0 4px",
  fontSize: 22,
});

const StyledInfoSubTitle = styled.p({
  margin: 0,
  color: "grey",
});

const StyledInputsWrapper = styled.div({
  width: 450,
  display: "grid",
  gridTemplateColumns: "75% 25%",
  "@media (max-width: 768px)": {
    width: "100%",
    gridTemplateColumns: "70% 30%",
  },
});

const StyledInput = styled.input({
  marginRight: 12,
  padding: 5,
  fontSize: 16,
  border: "2px solid #ccc",
  borderRadius: 2,
});

const StyledSelect = styled.select({
  fontSize: 16,
  color: "grey",
  padding: 10,
  border: "2px solid #ccc",
  boxSizing: "border-box",
});

const SearchBar: FC<{ hasSiblings: boolean }> = ({ hasSiblings }) => {
  const [query, setQuery] = useState("");
  const searchType = useSelector((state: RootState) => state.search.searchType);
  const TERM_LENGTH_TO_START_SEARCH = 3;

  const dispatch = useDispatch();
  const localStorage = useLocalStorage();

  const handleSearch = useCallback(
    debounce((query, searchType) => {
      const loweredCaseQuery = query.toLowerCase();

      if (loweredCaseQuery.length >= TERM_LENGTH_TO_START_SEARCH) {
        const cashedData = checkCache(loweredCaseQuery, searchType);

        if (cashedData) {
          const payload = {
            query: cashedData.savedQuery,
            searchType: cashedData.savedSearchType,
            collection: cashedData.savedCollection,
            error: cashedData.error,
          };
          return dispatch(setCachedData(payload));
        }

        const searchData = {
          query: loweredCaseQuery,
          searchType,
        };
        return dispatch(fetchSearch(searchData));
      }
      return dispatch(resetSearch(searchType));
    }, 1000),
    []
  );

  const checkCache = (searchQuery: string, searchType: string) => {
    const cachedData = localStorage.getItem("cachedData");

    if (cachedData) {
      const {
        savedQuery,
        savedSearchType,
        savedCollection,
        error,
      } = JSON.parse(cachedData);

      if (searchQuery === savedQuery && searchType === savedSearchType)
        return { savedQuery, savedSearchType, savedCollection, error };
    }
    return false;
  };

  useEffect(() => {
    if (query.length < TERM_LENGTH_TO_START_SEARCH) {
      dispatch(resetSearch(searchType));
    }
  }, [query, searchType, dispatch]);

  return (
    <StyledWrapper hasSiblings={hasSiblings}>
      <div>
        <StyledInfo>
          <StyledInfoImg alt="github-icon" src={GithubIcon} />
          <div>
            <StyledInfoTitle>Github Searcher</StyledInfoTitle>
            <StyledInfoSubTitle>
              Search users or repositories below
            </StyledInfoSubTitle>
          </div>
        </StyledInfo>
        <StyledInputsWrapper>
          <StyledInput
            type="text"
            placeholder="Start typing to search.."
            value={query}
            onChange={(e) => {
              const newQuery = e.target.value;
              setQuery(newQuery);
              handleSearch(newQuery, searchType);
            }}
          />
          <StyledSelect
            defaultValue={searchType}
            onChange={(e) => {
              const newSearchType = e.target.value;
              handleSearch(query, newSearchType);
            }}
          >
            <option value="users">user</option>
            <option value="repositories">repositry</option>
          </StyledSelect>
        </StyledInputsWrapper>
      </div>
    </StyledWrapper>
  );
};

export { SearchBar };
