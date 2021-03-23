import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 80px 80px 300px;
  align-items: center;
  height: 70px;
  background-color: lightblue;
`;

const Button = styled.button`
  background-color: "white";
  border: none;
  margin-left: 30px;
  transform: scale(1.2);
  border-radius: 3px;
  cursor: pointer;
`;

const Nav = ({ logoutUser, user }) => {

  return (
    <Container>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {
        user &&
        <span>
          <strong>{user.name}</strong> is logged in
          <Button onClick={logoutUser}>logout</Button>
        </span>
      }
    </Container>
  );
};

export default Nav;
