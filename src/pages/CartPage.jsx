import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import clientAxios, { config } from "../utils/axiosClient";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));

  const getProdCart = async () => {
    try {
      const resUser = await clientAxios.get(`/users/${idUser}`);
      const { idCart } = resUser.data.oneUser;

      const res = await clientAxios.get(`/cart/${idCart}`, config);
      console.log(res);
      setProducts(res.data.cart.productos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProdCart();
  }, []);
  return (
    <Container className="my-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          {products.length > 0 ? (
            <Table striped bordered hover variant="info" responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <button className="botones btn border-2 mx-2"><i className="bi bi-dash-lg"></i></button>
                      <td>{prod.cantidad}</td>
                      <button className="botones btn border-2 mx-2"><i className="bi bi-plus-lg"></i></button>
                    </td>
                    <td className="text-center">
                      <Button variant="danger"><i className="bi bi-trash3-fill"></i> Eliminar</Button>
                    </td>
                    <td>$</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <>
              <h2>Aún no agregaste nada a tu carrito</h2>
              <hr />
              <div className="text-center">
                <Link className="btn botones fs-5" to={"/products"}>
                  <i className="bi bi-list-task"></i> Ir a productos
                </Link>
              </div>
            </>
          )}
        </Col>
        <Col lg={12} md={12} sm={12}>
          <h2>Total a pagar: $</h2>
          <hr />
          <div className="text-center mt-3">
            <button className="ms-5 btn botones w-75 fs-5">
              <i className="bi me-2 bi-cash-coin"></i> Pagar
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
