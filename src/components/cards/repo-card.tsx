import React, { FC } from "react";
import styled from "@emotion/styled";

import RepoIcon from "./git-repository-icon-github.svg";
import type { RepositoryProps } from "../../types/entities/repositry";

const StyledRepoCard = styled.div({
  display: "flex",
  alignItems: "flex-start",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.15)",
  overflow: "hidden",
  padding: 20,
  "&:hover": {
    boxShadow: "6px 4px 10px 3px rgba(0,0,0,0.05)",
  },
  "@media (max-width: 768px)": {
    padding: 10,
  },
});

const StyledRepoIfo = styled.div({
  width: "100%",
});

const StyledRepoIcon = styled.img({
  width: 15,
  marginRight: 12,
});

const StyledRepoName = styled.a({
  textDecoration: "none",
  display: "block",
  marginBottom: 8,
});

const StyledRepoDescription = styled.p({
  margin: "6px 0",
  fontSize: 14,
  color: "grey",
});

const StyledRepoUpdatedDate = styled.span({
  fontSize: 14,
  color: "grey",
});

const StyledRepoUtilsWrapper = styled.div({
  marginTop: 10,
  display: "flex",
  gridGap: 10,
  "@media (max-width: 768px)": {
    display: "block",
  },
});

const StyledRepoUtils = styled.p({
  fontSize: 12,
  padding: 4,
  border: "1px solid #3a3d42",
  borderRadius: 5,
  color: "grey",
  width: "fit-content",
  "&>span": {
    marginLeft: 4,
  },
});

const StyledOwnerInfo = styled.div({
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid lightgrey",
  paddingTop: 10,
});

const StyledOwnerAvatar = styled.img({
  width: 30,
  borderRadius: "50%",
  border: "1px solid rgba(0,0,0,0.15)",
  marginRight: 10,
});

const StyledOwnerName = styled.a({
  textDecoration: "none",
});

const RepoCard: FC<{
  repository: RepositoryProps;
}> = ({ repository }) => {
  const {
    full_name,
    html_url,
    description,
    updated_at,
    forks_count,
    stargazers_count,
    language,
    owner: { login, avatar_url, html_url: owner_html_url },
  } = repository;

  const utcDate = new Date(updated_at);
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(utcDate);

  return (
    <StyledRepoCard>
      <StyledRepoIcon src={RepoIcon} alt="repo-icon" />
      <StyledRepoIfo>
        <StyledRepoName href={html_url} target="_blank">
          {full_name}
        </StyledRepoName>
        <StyledRepoDescription>{description}</StyledRepoDescription>
        <StyledRepoUpdatedDate>Updated on {date}</StyledRepoUpdatedDate>
        <StyledRepoUtilsWrapper>
          {language && <StyledRepoUtils>{language}</StyledRepoUtils>}
          <StyledRepoUtils>
            Star:
            <span>123{stargazers_count}</span>
          </StyledRepoUtils>
          <StyledRepoUtils>
            Fork: <span>000{forks_count}</span>
          </StyledRepoUtils>
        </StyledRepoUtilsWrapper>
        <StyledOwnerInfo>
          <StyledOwnerAvatar src={avatar_url} alt={`${login}-avatar`} />
          <StyledOwnerName href={owner_html_url} target="_blank">
            {login}
          </StyledOwnerName>
        </StyledOwnerInfo>
      </StyledRepoIfo>
    </StyledRepoCard>
  );
};

export { RepoCard };
