import { Formik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { errorLoginSchema } from "../utils/validationSchemas";
import InputGroup from "react-bootstrap/InputGroup";

const LoginPage = () => {
  const handleClick = (values) => {
    console.log(values);
  };
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Formik
        initialValues={{
          email: "",
          pass: "",
        }}
        validationSchema={errorLoginSchema}
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
            <h3>Ingresá a tu cuenta</h3>
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
              <hr />
            <div className="text-end">

            <Button variant="info" type="submit" onClick={handleSubmit}>
              Ingresar
            </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
