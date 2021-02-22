import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import { SearchBar } from "./components/search-bar";
import { Cards } from "./components/cards";
import { Spinner } from "./components/shared/spinner";
import { Toast } from "./components/shared/toast";
import type { RootState } from "./store";

const StyledAppWrapper = styled.div({
  position: "relative",
  background: "#f5f5f7",
});

function App() {
  const {
    collection: searchResult,
    searchType,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.search);
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <StyledAppWrapper>
      <SearchBar hasSiblings={!!searchResult.length} />
      {isLoading && <Spinner />}
      {!!searchResult.length && (
        <Cards searchResult={searchResult} searchType={searchType} />
      )}
      {error && <Toast message={error} />}
    </StyledAppWrapper>
  );
}

export default App;
