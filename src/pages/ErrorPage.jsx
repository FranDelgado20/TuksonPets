import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <img
            src="/Error404.png"
            alt="Error"
            className="img-fluid rounded-5"
          />
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <Link className="btn botones fs-5" to={"/"}>
          <i className="bi bi-house-fill"></i> Volver a inicio
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
