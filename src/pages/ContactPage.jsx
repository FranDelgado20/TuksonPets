import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { errorContactSchema } from "../utils/validationSchemas";
import InputGroup from "react-bootstrap/InputGroup";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
  const [allComments, setAllComments] = useState([]);
  const [user, setUser] = useState("");
  const getAllComments = async () => {
    const res = await clientAxios.get("/comments", config);
    setAllComments(res.data.getComments);
  };
  const comentarioExistente = allComments.filter(
    (comentario) => comentario?.email === user?.email
  );
  console.log(comentarioExistente);
  const getUser = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_URL_DEPLOY}/users/${idUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await res.json();
    setUser(response.oneUser);
  };
  const enviarComentario = async (values) => {
    try {
      
      const res = await clientAxios.post(
        "/comments",
        {
          email: user.email,
          nombreApellido: user.name,
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
      getAllComments()
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error!",
        text: error.response.data.msg,
      });
    }
  };
  useEffect(() => {
    getUser(), getAllComments();
  }, []);
  return (
    <Container className="my-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 my-1">
          <h3 className="text-center">¿Tienes algo que contarnos?</h3>
          <hr />

          {token && comentarioExistente.length === 1 ? (
            <Form className="bg-info-subtle p-3  rounded-3 ">
              <h2 className="text-center">Oh No!</h2>
              <hr />
              <p>
                
              Al parecer ya existe un comentario con esta cuenta. Si deseas volver a comentar, debes eliminar el comentario anterior o también puedes editarlo desde la página principal. Gracias por comprender.
              </p>
              <Link
                className="btn botonContact align-items-center d-flex justify-content-center "
                to={"/"}
              >
                <i class="bi bi-house-fill me-1"></i>
                Dirigirme al inicio
              </Link>
            </Form>
          ) : token ? (
            <Formik
              initialValues={{
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
                      <Form.Control defaultValue={user.email} disabled />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nameId">
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupName">
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control defaultValue={user.name} disabled />
                    </InputGroup>
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
          ) : (
            <Formik
              initialValues={{}}
              validationSchema={errorContactSchema}
              onSubmit={() => enviarComentario()}
            >
              {() => (
                <Form className="bg-info-subtle p-3  rounded-3 ">
                  <Form.Group className="mb-3" controlId="emailId">
                    <Form.Label>Correo electrónico</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupEmail">
                        <i className="bi bi-envelope-at-fill"></i>
                      </InputGroup.Text>
                      <Form.Control placeholder="name@example.com" disabled />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nameId">
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="groupName">
                        <i className="bi bi-person-circle"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Ejemplo: Juan González"
                        disabled
                      />
                    </InputGroup>
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
                        disabled
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="text-end">
                    <Link
                      className="btn botonContact align-items-center d-flex justify-content-center "
                      to={"/login"}
                    >
                      <i className="bi bi-box-arrow-in-right"></i>
                      Debes iniciar sesión
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          )}
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
