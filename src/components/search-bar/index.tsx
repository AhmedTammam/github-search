import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import styled from "@emotion/styled";

import GithubIcon from "./github.svg";
import { fetchSearch } from "../../store/actions";
import { restSearch } from "../../store/reducers/searchSlice";
import type { RootState } from "../../store";

const StyledWrapper = styled.div((props: { hasSiblings: boolean }) => ({
  display: props.hasSiblings ? "block" : "flex",
  justifyContent: "center",
  alignItems: "center",
  height: props.hasSiblings ? "100%" : "100vh",
  marginBottom: 20,
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
  const oldQuery = useSelector((state: RootState) => state.search.query);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("users");
  const TERM_LENGTH_TO_START_SEARCH = 3;

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    debounce((query, searchType) => {
      if (query.length >= TERM_LENGTH_TO_START_SEARCH && query !== oldQuery) {
        const searchData = {
          query,
          searchType,
        };
        dispatch(fetchSearch(searchData));
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (query.length < TERM_LENGTH_TO_START_SEARCH) {
      dispatch(restSearch());
    }
  }, [query, dispatch]);

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
              setSearchType(newSearchType);
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
