import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import CardComp from "../components/CardComp";

const HomePage = () => {
  return (
    <>
      <Container fluid className="my-3 ">
        <div className="text-end">Clima</div>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <h2>Productos Destacados</h2>
            <hr />
            <div className="row">
              <CardComp />
              <CardComp />
              <CardComp />
            </div>
          </Col>

          <Col lg={6} md={12} sm={12}>
            <h2>Servicios</h2>
            <hr />
            <Row>
              <CardComp />
              <CardComp />
              <CardComp />
            </Row>
          </Col>
          <h2 className="text-center mt-3">Profesionales</h2>
          <hr />
          <Col lg={12} md={12} sm={12}>
            <Row>
              <CardComp />
              <CardComp />
              <CardComp />
              <CardComp />
            </Row>
          </Col>

          <Col lg={6} md={12} sm={12}>
            <h2 className="text-center mt-3">Publicidad</h2>
            <hr />
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block w-50"
                  src="Error404.png"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-50"
                  src="Error404.png"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-50"
                  src="Error404.png"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col>
            <h2 className="text-center mt-3">Comentarios</h2>
            <hr />
            <Row>

            <aside className="bg-info-subtle my-2  p-3 w-75 rounded-3 sombra" >
              Comentario
            </aside>
            <aside className="bg-info-subtle  my-2 p-3 w-75 rounded-3 sombra">
              Comentario
            </aside>
            <aside className="bg-info-subtle  my-2 p-3 w-75 rounded-3 sombra">
              Comentario
            </aside>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
