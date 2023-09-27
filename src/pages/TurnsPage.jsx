import React from "react";
import { Container } from "react-bootstrap";
import TurnsComp from "../components/TurnsComp";
const TurnsPage = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <TurnsComp />
    </Container>
  );
};

export default TurnsPage;
