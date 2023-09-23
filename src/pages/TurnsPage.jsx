import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorTurnSchema } from "../utils/validationSchemas";
import TurnsComp from "../components/TurnsComp";

const TurnsPage = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <TurnsComp />
    </Container>
  );
};

export default TurnsPage;
