import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
const OnePlan = () => {
  const params = useParams();
  const [onePlan, setOnePlan] = useState([]);
  const getOnePlan = async () => {
    const res = await clientAxios.get(`/planes/${params.id}`, config);
    setOnePlan(res.data.onePlan);
  };

  useEffect(() => {
    getOnePlan();
  }, []);
  return (
    <Container className="my-5">
      <Row>
        <Col
          lg={4}
          md={12}
          sm={12}
          className="d-flex justify-content-center my-3"
        >
          <img
            src={onePlan.imagen}
            className="img-fluid rounded-4 ms-4"
            alt="Imagen Plan"
          />
        </Col>
        <Col lg={8} md={12} sm={12} className="my-3">
          <h2>{onePlan.nombre} </h2>
          <hr />
          <h5>${onePlan.precio}/mes</h5>
          <hr />
          <p>{onePlan.descripcion}</p>
          <hr />
          <div className="text-end">
            <Link className="btn botones fs-5" to={"/plan"}>
              <i className="bi bi-calendar-plus-fill me-2"></i>
              Solicitar plan
            </Link>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <Link className="btn botones fs-5" to={"/"}>
          <i className="bi bi-arrow-left-circle"></i> Volver a inicio
        </Link>
      </div>
    </Container>
  );
};

export default OnePlan;
