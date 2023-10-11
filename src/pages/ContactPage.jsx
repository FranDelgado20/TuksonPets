import { Formik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { errorContactSchema } from "../utils/validationSchemas";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";

const ContactPage = () => {
  const enviarComentario = async (values) => {
    try {
      const res = await clientAxios.post(
        "/comments",
        {
          email: values.email,
          nombreApellido: values.name,
          mensaje: values.comment,
        },
        config
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Comentarios enviados con éxito!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error!",
        text: error.response.data.msg,
      });
    }
  };
  return (
    <Container className="my-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 my-1">
          <h3 className="text-center">¿Tienes algo que contarnos?</h3>
          <hr />
          <Formik
            initialValues={{
              email: "",
              name: "",
              comment: "",
            }}
            validationSchema={errorContactSchema}
            onSubmit={(values) => enviarComentario(values)}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form className="bg-info-subtle p-3  rounded-3 ">
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
                <Form.Group className="mb-3" controlId="descId">
                  <Form.Label>Comentarios</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupDesc">
                      <i className="bi bi-file-text-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Dejenos un mensaje"
                      as="textarea"
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      className={
                        errors.comment && touched.comment && "is-invalid"
                      }
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.comment && touched.comment && errors.comment}
                  </small>
                </Form.Group>
                <div className="text-end">
                  <button
                    className="btn botonContact"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i className="bi bi-send-check me-1"></i>
                    Enviar comentarios
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mt-1 mb-5">
          <h3 className="text-center">¡Buscanos en nuestro local!</h3>
          <hr />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9059794104787!2d-65.224492889841!3d-26.842942590193424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d65d59f1571%3A0xa30f7b29eb586879!2sTukson%20Pets!5e0!3m2!1ses-419!2sar!4v1695307880963!5m2!1ses-419!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-100 h-100 rounded-3"
          ></iframe>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
