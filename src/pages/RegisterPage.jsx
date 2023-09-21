import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { errorRegisterSchema } from "../utils/validationSchemas";
import { Container } from "react-bootstrap";

const RegisterPage = () => {
  const handleClick = (values) => {
    console.log(values);
  };

  return (
    <>
      <Container className="my-5 d-flex justify-content-center">
        <Formik
          initialValues={{
            email: "",
            name: "",
            pass: "",
            repeatPass: "",
          }}
          validationSchema={errorRegisterSchema}
          onSubmit={(values) => handleClick(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="bg-info-subtle p-3 w-75 rounded-3">
              <h3>Crea tu cuenta aquí</h3>
              <hr />
              <Form.Group className="mb-3" controlId="emailId">
                <Form.Label>Correo electrónico</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupEmail">
                    <i className="bi bi-envelope-at-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email && touched.email && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.email && touched.email && errors.email}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="usernameId">
                <Form.Label>Nombre y Apellido</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupUsername">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ejemplo: Juan González"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={errors.name && touched.name && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.name && touched.name && errors.name}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="passId">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupPass">
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="***********"
                    type="password"
                    name="pass"
                    value={values.pass}
                    onChange={handleChange}
                    className={errors.pass && touched.pass && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.pass && touched.pass && errors.pass}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="repeatPassId">
                <Form.Label>Repetir contraseña</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRepeatPass">
                    <i className="bi bi-key-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="***********"
                    type="password"
                    name="repeatPass"
                    value={values.repeatPass}
                    onChange={handleChange}
                    className={
                      errors.repeatPass && touched.repeatPass && "is-invalid"
                    }
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.repeatPass && touched.repeatPass && errors.repeatPass}
                </small>
              </Form.Group>
              <hr />
              <div className="text-end">
                <Button variant="info" type="submit" onClick={handleSubmit}>
                  Registrarse
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
      <div className="d-flex justify-content-center mb-5 m-1">
        <img src="/TuksonPetsLogo.png" alt="Logo" className="img-fluid bg-info-subtle p-3 rounded-5" />
      </div>
    </>
  );
};

export default RegisterPage;
