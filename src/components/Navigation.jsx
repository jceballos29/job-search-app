import React from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

import logo from "../images/logo.png";

const Navigation = () => {
  const location = useLocation();
  console.log(
    location.pathname === "/register" || location.pathname === "/login"
  );

  return (
    <Navbar className="navigation shadow" collapseOnSelect variant="light" bg="light" expand={"lg"}>
      <Container>
        <Navbar.Brand as={NavLink} to={"/"}>
          <Image src={logo} alt="logo" height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {location.pathname === "/register" ||
        location.pathname === "/login" ? null : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Button
                variant="outline-primary"
                className="navigation__button"
                as={Link}
                to={"/login"}
              >
                Login
              </Button>
              <Button
                className="navigation__button ms-2 text-light"
                as={Link}
                to={"/register"}
                variant="primary"
              >
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
