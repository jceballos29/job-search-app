import React, { useContext } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import auth from "../api/auth";

import logo from "../assets/images/logo.png";
import { authContext } from "../context/AuthContext";

import { IoClipboard, IoExit } from "react-icons/io5";

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
            <NavDropdown
              title={
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary me-2"
                    style={{ width: 40, height: 40 }}
                  >
                    <span className="fw-bold text-light">
                      {context.auth.user.role === "employer" ? "E" : "A"}
                    </span>
                  </div>
                  <span>{context.auth.user.name}</span>
                </div>
              }
            >
              <NavDropdown.Item as={NavLink} end to={"/dashboard"}>
                <IoClipboard size={20} className="me-3" />
                <span>Dashboard</span>
              </NavDropdown.Item>
              <NavDropdown.Item
                className="bg-secondary text-white d-flex align-items-center justify-content-center"
                onClick={handleLogout}
              >
                <IoExit size={20} className="me-3" />
                <span>Cerrar Sesión</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
