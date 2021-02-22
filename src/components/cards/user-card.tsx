import React, { FC } from "react";
import styled from "@emotion/styled";

import type { UserProps } from "../../types/entities/user";

const StyledUserCard = styled.div({
  display: "flex",
  alignItems: "center",
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.15)",
  overflow: "hidden",
  padding: 20,
  "&:hover": {
    boxShadow: "6px 4px 10px 3px rgba(0,0,0,0.05)",
  },
  "@media (max-width: 768px)": {
    padding: 10,
    alignItems: "flex-start",
  },
});

const StyledAvatar = styled.img({
  width: 80,
  height: 80,
  borderRadius: "50%",
  marginRight: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  "@media (max-width: 768px)": {
    width: 40,
    height: 40,
    marginRight: 8,
  },
});

const StyledUserName = styled.a({
  display: "block",
  textDecoration: "none",
  textTransform: "capitalize",
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#101010",
  marginBottom: 15,
  "@media (max-width: 768px)": {
    fontSize: 14,
    marginBottom: 4,
  },
});

const StyledUserScore = styled.a({
  margin: 0,
  fontSize: 16,
  color: "grey",
  "@media (max-width: 768px)": {
    fontSize: 12,
  },
});

const UserCard: FC<{
  user: UserProps;
}> = ({ user }) => {
  const { avatar_url, login, score, html_url } = user;

  return (
    <StyledUserCard>
      <StyledAvatar src={avatar_url} alt="user_image" />
      <div>
        <StyledUserName href={html_url} target="_blank">
          {login}
        </StyledUserName>
        <StyledUserScore>
          Score: <span>{score}</span>
        </StyledUserScore>
      </div>
    </StyledUserCard>
  );
};

export { UserCard };
