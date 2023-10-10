import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem('token'))
  const role = JSON.parse(sessionStorage.getItem('role'))

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("idUser");
    navigate("/");
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-info-subtle"
        fixed="top"
      >
        <Container fluid>
          <Link to={"/"}>
            <img
              src="/TuksonPetsLogo.png"
              alt="Tukson Pets Logo"
              width={"160px"}
            />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {token && role === "user" ? (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ms-4 marginNavbar">
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
              <Nav className="ms-4 marginNavbar">
                <NavLink to={"/cart"} className={"nav-link"}>
                <i className="bi bi-cart"></i> Mi carrito
                </NavLink>
                <Button onClick={logOut} className={"nav-link bg-transparent"}>
                <i className="bi bi-door-open-fill"></i> Cerrar sesión
                </Button>
              </Nav>
            </Navbar.Collapse>
          ) : token && role === "admin" ? (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ms-4 marginNavbar">
                <NavLink to={"/"} className={"nav-link"}>
                  Inicio
                </NavLink>
                <NavLink to={"/products"} className={"nav-link"}>
                  Productos
                </NavLink>
              </Nav>
              <Nav className="ms-4 marginNavbar">
                <NavLink to={"/admin"} className={"nav-link"}>
                <i className="bi bi-person-fill-gear"></i> Administrador
                </NavLink>
                <Button onClick={logOut} className={"nav-link bg-transparent"}>
                <i className="bi bi-door-open-fill"></i> Cerrar sesión
                </Button>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ms-4 marginNavbar">
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
              <Nav className="ms-4 marginNavbar">
                <NavLink to={"/login"} className={"nav-link"}>
                  Iniciar sesión
                </NavLink>
                <NavLink to={"/register"} className={"nav-link"}>
                  Registrarse
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
