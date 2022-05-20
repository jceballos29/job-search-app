import React, { useContext } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import auth from "../api/auth";

import logo from "../assets/images/logo.png";
import { authContext } from "../context/AuthContext";

const Navigation = () => {
  const context = useContext(authContext);

  const handleLogout = () => {
    auth.logout();
    context.setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <Navbar
      className="navigation shadow"
      collapseOnSelect
      variant="light"
      bg="light"
      expand={"lg"}
    >
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          <Image src={logo} alt="logo" height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
