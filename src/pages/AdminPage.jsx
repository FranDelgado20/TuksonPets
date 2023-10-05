import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalComp from "../components/ModalComp";
import clientAxios, { config } from "../utils/axiosClient";
import TableComp from "../components/TableComp";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [turns, setTurns] = useState([]);

  const getTurns = async () => {
    const resTurns = await clientAxios.get("/turns", config);
    setTurns(resTurns.data.allTurns);
  };

  const getProducts = async () => {
    const resProducts = await clientAxios.get("/products/all");
    setProducts(resProducts.data.allProducts);
  };

  const getUsers = async () => {
    const resUsers = await clientAxios.get("/users", config);
    setUsers(resUsers.data.allUsers);
  };

  useEffect(() => {
    getProducts(), getUsers(), getTurns();
  }, []);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between">
        <h3>Usuarios registrados</h3>
        <ModalComp type="user" getUsers={getUsers}/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre y apellido</th>
            <th>Número de teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <TableComp users={users} type="users" getUsers={getUsers} />
        </tbody>
      </Table>
      <div className="mt-4 d-flex justify-content-between">
        <h3>Pacientes y turnos</h3>
        <ModalComp type="turn" getTurns={getTurns}/>
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>Nombre del paciente</th>
            <th>Especie y raza</th>
            <th>Veterinario</th>
            <th>Fecha y hora del turno</th>
            <th>Nombre del dueño</th>
            <th>Número de teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <TableComp turns={turns} type="turns" getTurns={getTurns} />
        </tbody>
      </Table>
      <div className="mt-4 d-flex justify-content-between">
        <h3>Productos</h3>
        <ModalComp type="prod" getProducts={getProducts} />
      </div>
      <hr />
      <Table striped bordered hover responsive variant="info">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>URL de imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <TableComp
            products={products}
            getProducts={getProducts}
            type="prods"
          />
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
