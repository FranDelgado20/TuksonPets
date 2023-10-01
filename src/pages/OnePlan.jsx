import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import clientAxios, { config } from '../utils/axiosClient';
const OnePlan = () => {
  const params = useParams();
  const [onePlan, setOnePlan] = useState([])
  const getOnePlan = async () => {
    const res = await clientAxios.get(`/planes/${params.id}`, config)
    setOnePlan(res.data.onePlan)
  }

  useEffect(() => {
    getOnePlan()
  }, [])
  return (
    
    <Container className="my-3">
    <Row>
      <Col lg={6} md={12} sm={12}>
        <div className="bg-info-subtle p-3 w-75  rounded-3 sombra">
          <img src={onePlan.imagen} className="img-fluid rounded-4 ms-4" alt="Imagen Plan" />
        </div>
      </Col>
      <Col lg={6} md={12} sm={12}>
        <h1>{onePlan.nombre} </h1>
        <hr />
      <h5 >{onePlan.descripcion}</h5>
      <hr />
        <h6>${onePlan.precio}/mes</h6>
        <hr />
        <div className="text-end">
          <button className="btn botones ">
          <i className="bi bi-calendar-plus-fill me-2"></i>
              Solicitar plan</button>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default OnePlan