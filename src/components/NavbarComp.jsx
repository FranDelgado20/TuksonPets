import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-info-subtle" fixed="top">
      <Container fluid>
        <Link to={"/"}>
          <img
            src="/TuksonPetsLogo.png"
            alt="Tukson Pets Logo"
            width={"160px"}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-4 mt-3">
            <NavLink to={"/"} className={"nav-link"}>
              Inicio
            </NavLink>
            <NavLink to={"/products"} className={"nav-link"}>
              Productos
            </NavLink>
            <NavLink to={"/turns"} className={"nav-link"}>
              Solicitar turnos
            </NavLink>
          </Nav>
          <Nav className="ms-4 mt-3">
            <NavLink to={"/login"} className={"nav-link"}>
              Iniciar sesión
            </NavLink>
            <NavLink to={"/register"} className={"nav-link"}>
              Registrarse
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
