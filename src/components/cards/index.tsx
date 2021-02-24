import React, { FC } from "react";
import styled from "@emotion/styled";

import { UserCard } from "./user-card";
import { RepoCard } from "./repo-card";

import type { UserProps } from "../../types/entities/user";
import type { RepositoryProps } from "../../types/entities/repositry";

const StyledCardsWrapper = styled.div({
  margin: "20px auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "30px",
  width: "80%",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "45% 45%",
    gridGap: "15px",
    padding: "0 10px",
    width: "100%",
  },
});

const Cards: FC<{
  searchResult: [];
  searchType: string;
}> = ({ searchResult, searchType }) => {
  return (
    <StyledCardsWrapper>
      {searchType === "users"
        ? searchResult.map((user: UserProps) => (
            <UserCard key={user.id} user={user} />
          ))
        : searchResult.map((repositry: RepositoryProps) => (
            <RepoCard key={repositry.id} repository={repositry} />
          ))}
    </StyledCardsWrapper>
  );
};

export { Cards };
