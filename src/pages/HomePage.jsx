import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CardComp from "../components/CardComp";
import clientAxios, { config } from "../utils/axiosClient";

const HomePage = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await clientAxios.get("/products", config)

    setProducts(res.data.getProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Container fluid className="my-3 ">
        <div className="text-end">Clima</div>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <h2>Productos Destacados</h2>
            <hr />
            <Row className="justify-content-center">
              <CardComp products={products} type={"prodsDestacados"}/>
            </Row>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h2>Servicios</h2>
            <hr />
            <Row className="justify-content-center">
              <CardComp />
              <CardComp />
              <CardComp />
            </Row>
          </Col>
          <h2 className="text-center mt-3">Profesionales</h2>
          <CardComp />
          <hr />
          <Col lg={12} md={12} sm={12}>
            <Row>
              <CardComp />
            </Row>
          </Col>

          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Nuestros patrocinadores</h2>
            <hr />
            <div className="d-flex justify-content-center">
              <Carousel data-bs-theme="dark">
                <Carousel.Item>
                  <img
                    className="d-block"
                    src="/patrocinadores/purina.png"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block"
                    src="/patrocinadores/royalCanin.png"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block"
                    src="/patrocinadores/whiskas.png"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <h2 className="mt-3">Comentarios</h2>
            <hr />
            <div className="bg-info-subtle my-2 p-3 w-75 rounded-3 sombra">
              Comentario
            </div>
            <div className="bg-info-subtle my-2 p-3 w-75 rounded-3 sombra">
              Comentario
            </div>
            <div className="bg-info-subtle my-2 p-3 w-75 rounded-3 sombra">
              Comentario
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
