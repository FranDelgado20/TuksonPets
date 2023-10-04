import React from "react";
import { Container } from "react-bootstrap";
import RegisterComp from "../components/RegisterComp";

const RegisterPage = () => {

  return (
    <>
      <Container className="my-5 d-flex justify-content-center">
        <RegisterComp type={"user"}/>
      </Container>
      <div className="d-flex justify-content-center mb-5 m-1">
        <img src="/TuksonPetsLogo.png" alt="Logo" className="img-fluid bg-info-subtle p-3 rounded-5" />
      </div>
    </>
  );
};

export default RegisterPage;
