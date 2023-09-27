import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { errorRegisterSchema } from "../utils/validationSchemas";
import { Link } from "react-router-dom";

const RegisterComp = ({ type }) => {
  const handleClick = (values) => {
    console.log(values);
  };
  return (
    <>
      {type !== "admin" ? (
        <Formik
          initialValues={{
            email: "",
            name: "",
            pass: "",
            repeatPass: "",
            tel: "",
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
            <Form className="bg-info-subtle p-3 w-75 rounded-3 sombra">
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
              <Form.Group className="mb-3" controlId="nameId">
                <Form.Label>Nombre y Apellido</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupName">
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
              <Form.Group className="mb-3" controlId="telId">
                <Form.Label>Número de teléfono</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupTel">
                    <i className="bi bi-telephone-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Formato: 000-0000000"
                    type="number"
                    name="tel"
                    value={values.tel}
                    onChange={handleChange}
                    className={errors.tel && touched.tel && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.tel && touched.tel && errors.tel}
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
              <div className="d-flex justify-content-between">
                <Link to={"/login"} className="linkFooter">
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
                <button
                  className="btn botones"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Registrarse
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
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
            <Form>
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
                <button
                  className="btn botones"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Registrarse
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default RegisterComp;
