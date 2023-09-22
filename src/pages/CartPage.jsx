import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const CartPage = () => {
  return (
    <Container className="my-3">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Table striped bordered hover variant="info">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td className="d-flex justify-content-center ">
                  <button className="botones btn border-2 me-2">+</button>
                  <button className="botones btn border-2 ms-2">-</button>
                </td>
                <td>$</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col className="" lg={12} md={12} sm={12}>
          <h2 className="">Total a pagar: $</h2>
          <hr />
        <div className="text-center mt-3">
       
            <button className="ms-5 btn botones w-75 fs-5">
            <i className="bi me-2 bi-cash-coin" ></i> Pagar</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
