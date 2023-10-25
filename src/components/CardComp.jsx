import { useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { errorContactSchema } from "../utils/validationSchemas";

const CardComp = ({ type, products, plan, comment, user, getAllComments }) => {
  const [idCommentEdit, setIdCommentEdit] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdCommentEdit(id);

    setShow(true);
  };
  const eliminarComentario = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteComment = await clientAxios.delete(
            `/comments/${idCommentEdit}`,
            config
          );
          if (deleteComment.status === 200) {
            Swal.fire({
              title: "Comentario eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllComments();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el comentario",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  const editarComentario = async (values, idCommentEdit) => {
    try {
      const editComment = await clientAxios.put(
        `/comments/${idCommentEdit}`,
        {
          mensaje: values.comment,
        },
        config
      );
      if (editComment.status === 200) {
        Swal.fire({
          title: "Comentario editado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllComments();
      }
    } catch (error) {
      Swal.fire({
        title: "No se pudo editar el comentario",
        text: error,
        icon: "error",
      });
    }
  };
  return (
    <>
      {type === "prodsDestacados"
        ? products.map(
            (product) =>
              product.categoria === "Destacado" && (
                <Col lg={4} md={6} sm={12} key={product._id} className="my-2">
                  <Card className="bg-info-subtle sombra">
                    <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>${product.precio}</Card.Text>
                      <hr />
                      <Link
                        className="btn botones"
                        to={`/oneProd/${product._id}`}
                      >
                        Ver más
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        : type === "prods"
        ? products?.map((product) => (
            <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
              <Card className="bg-info-subtle sombra">
                <Card.Img
                  variant="top"
                  src={product.imagen}
                  alt={product.nombre}
                />
                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Text>${product.precio}</Card.Text>
                  <hr />
                  <Link className="btn botones" to={`/oneProd/${product._id}`}>
                    Ver más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        : type === "planes"
        ? plan.map((plan) => (
            <Col lg={4} md={6} sm={12} key={plan._id} className="my-2">
              <Card className="bg-info-subtle sombra">
                <Card.Img variant="top" src={plan.imagen} alt="Imagen" />
                <Card.Body>
                  <Card.Title>{plan.nombre}</Card.Title>
                  <Card.Text>${plan.precio}/mes</Card.Text>
                  <hr />
                  <Link className="btn botones" to={`/onePlan/${plan._id}`}>
                    Ver más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        : type === "prodsCollares"
        ? products.map(
            (product) =>
              product.categoria === "Correas" && (
                <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
                  <Card className="bg-info-subtle sombra">
                    <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>${product.precio}</Card.Text>
                      <hr />
                      <Link
                        className="btn botones"
                        to={`/oneProd/${product._id}`}
                      >
                        Ver más
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        : type === "prodsCamas"
        ? products.map(
            (product) =>
              product.categoria === "Camas" && (
                <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
                  <Card className="bg-info-subtle sombra">
                    <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>${product.precio}</Card.Text>
                      <hr />
                      <Link
                        className="btn botones"
                        to={`/oneProd/${product._id}`}
                      >
                        Ver más
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        : type === "prodsJuguetes"
        ? products.map(
            (product) =>
              product.categoria === "Juguetes" && (
                <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
                  <Card className="bg-info-subtle sombra">
                    <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>${product.precio}</Card.Text>
                      <hr />
                      <Link
                        className="btn botones"
                        to={`/oneProd/${product._id}`}
                      >
                        Ver más
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        : type === "prodsPlatos"
        ? products.map(
            (product) =>
              product.categoria === "Platos de comida" && (
                <Col lg={3} md={6} sm={12} key={product._id} className="my-2">
                  <Card className="bg-info-subtle sombra">
                    <Card.Img variant="top" src={product.imagen} alt="Imagen" />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>${product.precio}</Card.Text>
                      <hr />
                      <Link
                        className="btn botones"
                        to={`/oneProd/${product._id}`}
                      >
                        Ver más
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        : type === "comentarios"
        ? comment.map((comments) => (
            <Col lg={12} md={12} sm={12} key={comments._id} className="my-2">
              <Card className="bg-info-subtle sombra">
                <Card.Body>
                  <Card.Title>{comments.nombreApellido}</Card.Title>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Card.Text>{comments.mensaje}</Card.Text>
                    {comments.email === user.email && (
                      <div>
                        <Button
                          className="me-3"
                          variant="danger"
                          onClick={() => eliminarComentario(comments._id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>

                        <Button
                          variant="primary"
                          onClick={() => handleShow(comments._id)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Body>
                            <Formik
                              initialValues={{
                                comment: "",
                              }}
                              validationSchema={errorContactSchema}
                              onSubmit={(values) =>
                                editarComentario(values, idCommentEdit)
                              }
                            >
                              {({
                                values,

                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                              }) => (
                                <Form.Group className="" controlId="descId">
                                  <Form.Control
                                    placeholder="Edite su comentario aquí"
                                    as="textarea"
                                    name="comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                    className={
                                      errors.comment &&
                                      touched.comment &&
                                      "is-invalid"
                                    }
                                  />

                                  <small className="text-danger">
                                    {errors.comment &&
                                      touched.comment &&
                                      errors.comment}
                                  </small>

                                  <Modal.Footer>
                                    <Button
                                      variant="danger"
                                      onClick={handleClose}
                                    >
                                      Cerrar
                                    </Button>
                                    <Button
                                      variant="success"
                                      onClick={handleSubmit}
                                    >
                                      Aceptar
                                    </Button>
                                  </Modal.Footer>
                                </Form.Group>
                              )}
                            </Formik>
                          </Modal.Body>
                        </Modal>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        : ""}
    </>
  );
};

export default CardComp;
