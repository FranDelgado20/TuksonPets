import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const OneProd = () => {
  return (
    <Container className="my-3">
      <Row>
        <Col lg={6} md={12} sm={12}>
          <div className="bg-info-subtle p-3 w-75 rounded-3 sombra">
            <img src="Error404.png" className="img-fluid" alt="" />
          </div>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <h1>Nombre del producto</h1>
          <hr />
        <h5>Descripcion</h5>
        <hr />
          <h6>precio $</h6>
          <hr />
          <div className="text-end">
            <button className="btn botones ">
            <i className="bi bi-cart-plus-fill me-2"></i>
                Agregar al carrito</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OneProd;
