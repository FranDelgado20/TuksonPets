import React from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalComp from "../components/ModalComp";

const AdminPage = () => {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between">
        <h3>Productos</h3>
        <ModalComp type="prod"/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>URL de imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </Table>
      <div className="mt-2 d-flex justify-content-between">
        <h3>Servicios</h3>
        <ModalComp type="serv"/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>URL de imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </Table>
      <div className="mt-2 d-flex justify-content-between">
        <h3>Usuarios registrados</h3>
        <ModalComp type="user"/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre y apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </Table>
      <div className="mt-2 d-flex justify-content-between">
        <h3>Turnos</h3>
        <ModalComp type="turn"/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del paciente</th>
            <th>Veterinario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Servicio seleccionado</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </Table>
      <h3 className="mt-2">Pacientes y sus dueños</h3>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>Nombre del paciente</th>
            <th>Raza</th>
            <th>Especie</th>
            <th>Nombre y apellido del dueño</th>
            <th>Número de teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </Table>

    </Container>
  );
};

export default AdminPage;
