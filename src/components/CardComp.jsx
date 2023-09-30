import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardComp = ({ type, products }) => {
  return (
    <>
      {type === "prodsDestacados" ? (
        products.map(
          (product) =>
            product.categoria === "Destacado" && (
              <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
                <Card className="bg-info-subtle sombra">
                  <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                  <Card.Body>
                    <Card.Title>{product.nombre}</Card.Title>
                    <Card.Text>${product.precio}</Card.Text>
                    <hr />
                    <Link
                      className="btn botones"
                      to={`/oneProd/${product._id}`}
                    >
                      Ver más
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
        )
      ) : type === "prods" ? (
        products.map(
          (product) =>
        <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
          <Card className="bg-info-subtle sombra">
            <Card.Img variant="top" src={product.imagen} alt="Imagen" />
            <Card.Body>
              <Card.Title>{product.nombre}</Card.Title>
              <Card.Text>${product.precio}</Card.Text>
              <hr />
              <Link className="btn botones" to={`/oneProd/${product._id}`}>
                Ver más
              </Link>
            </Card.Body>
          </Card>
        </Col>
      )) : (
        ""
      )}
    </>
  );
};

export default CardComp;
