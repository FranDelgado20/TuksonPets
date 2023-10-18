import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CardComp from "../components/CardComp";
import clientAxios, { config } from "../utils/axiosClient";
import WeatherComp from "../components/WeatherComp";
import Card from "react-bootstrap/Card";

const HomePage = () => {
  const [plan, setPlan] = useState([]);
  const [products, setProducts] = useState([]);
  const [comment, setComment] = useState([]);

  const getAllComments = async () => {
    const res = await clientAxios.get("/comments", config);
    setComment(res.data.getComments);
  };
  const getProducts = async () => {
    const res = await clientAxios.get("/products/all", config);
    setProducts(res.data.allProducts);
  };

  const getPlan = async () => {
    const res = await clientAxios.get("/planes", config);
    setPlan(res.data.allPlans);
  };

  useEffect(() => {
    getProducts(), getPlan(), getAllComments();
  }, []);

  return (
    <>
      <Container fluid className="my-3">
        <Row className="justify-content-end">
          <WeatherComp />
        </Row>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Productos destacados</h2>
            <hr />
            <Row className="justify-content-center">
              <CardComp products={products} type={"prodsDestacados"} />
            </Row>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Nuestros planes</h2>
            <hr />
            <Row className="justify-content-center">
              <CardComp plan={plan} type={"planes"} />
            </Row>
          </Col>
          <h2 className="text-center mt-3">
            Profesionales que trabajan con nosotros
          </h2>
          <hr />
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col lg={3} md={6} sm={12} className="my-2">
                <Card className="bg-info-subtle sombra">
                  <Card.Img
                    variant="top"
                    src="/pros/francisco.png"
                    alt="Imagen"
                  />
                  <Card.Body>
                    <Card.Title>Dr. Francisco Delgado</Card.Title>
                    <hr />
                    <Card.Text>Cirujano</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12} className="my-2">
                <Card className="bg-info-subtle sombra">
                  <Card.Img
                    variant="top"
                    src="/pros/luciano.png"
                    alt="Imagen"
                  />
                  <Card.Body>
                    <Card.Title>Dr. Luciano Kozameh</Card.Title>
                    <hr />
                    <Card.Text>Cardiólogo</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12} className="my-2">
                <Card className="bg-info-subtle sombra">
                  <Card.Img
                    variant="top"
                    src="/pros/sureia.png"
                    alt="Imagen"
                  />
                  <Card.Body>
                    <Card.Title>Dra. Sureia Matar</Card.Title>
                    <hr />
                    <Card.Text>Gastroenteróloga</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12} className="my-2">
                <Card className="bg-info-subtle sombra">
                  <Card.Img
                    variant="top"
                    src="/pros/francis.png"
                    alt="Imagen"
                  />
                  <Card.Body>
                    <Card.Title>Dr. Francis Sir</Card.Title>
                    <hr />
                    <Card.Text>Clínico</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Nuestros patrocinadores</h2>
            <hr />
            <div className="d-flex justify-content-center">
              <Carousel data-bs-theme="dark">
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src="/patrocinadores/purina.png"
                    alt="Purina"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src="/patrocinadores/royalCanin.png"
                    alt="Royal Canin"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src="/patrocinadores/whiskas.png"
                    alt="Whiskas"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Opiniones de nuestros clientes</h2>
            <hr />
            <CardComp type={"comentarios"} comment={comment} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
