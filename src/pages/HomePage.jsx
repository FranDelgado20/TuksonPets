import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CardComp from "../components/CardComp";
import clientAxios, { config } from "../utils/axiosClient";

const HomePage = () => {
  const [plan, setPlan] = useState([]);
  const [products, setProducts] = useState([]);
  const [pros, setPros] = useState([]);
  const [comment, setComment] = useState([])

  const getAllComments = async () => {
    const res = await clientAxios.get('/comments', config)
    setComment(res.data.getComments)
  }
  const getProducts = async () => {
    const res = await clientAxios.get("/products/all", config);
    setProducts(res.data.allProducts);
  };

  const getPlan = async () => {
    const res = await clientAxios.get("/planes", config);
    setPlan(res.data.allPlans);
  };

  const getPros = async () => {
    const res = await clientAxios.get("/pros", config);
    setPros(res.data.allPros);
  };

  useEffect(() => {
    getProducts(), getPlan(), getPros(),getAllComments()
  }, []);

  return (
    <>
      <Container fluid className="my-3">
        <div className="text-end">Clima</div>
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
              <CardComp pros={pros} type={"pros"} />
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
            <h2 className="mt-3">Comentarios</h2>
            <hr />
            <CardComp type={'comentarios'} comment={comment}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
