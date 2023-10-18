import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ModalComp from "../components/ModalComp";
import TableComp from "../components/TableComp";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [turns, setTurns] = useState([]);
  
  const token = JSON.parse(sessionStorage.getItem("token"))

  const getTurns = async () => {
    const resTurns = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/turns`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    const responseTurns = await resTurns.json()
    setTurns(responseTurns.allTurns)
  };

  const getProducts = async () => {
    const resProducts = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/products/all`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    const responseProducts = await resProducts.json()
    setProducts(responseProducts.allProducts)
  };

  const getUsers = async () => {
    const resUsers = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/users`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    const responseUsers = await resUsers.json()
    setUsers(responseUsers.allUsers)
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
