import React from 'react'
import TurnsComp from "../components/TurnsComp";
import { Container } from "react-bootstrap";

const PlanPage = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
    <TurnsComp type={'plan'} />
  </Container>
  )
}

export default PlanPage