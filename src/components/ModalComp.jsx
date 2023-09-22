import { Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  errorProdSchema,
  errorRegisterSchema,
} from "../utils/validationSchemas";

const ModalComp = ({ type }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createUser = (values) => {
    console.log(values);
  };
  return (
    <>
      {type === "prod" ? (
        <>
          <button className="btn botones" onClick={handleShow}>
            Crear producto
          </button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo">
              <Modal.Header closeButton>
                <Modal.Title>Crea un nuevo producto aquí</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: "",
                    price: null,
                    desc: "",
                    img: "",
                  }}
                  validationSchema={errorProdSchema}
                  onSubmit={(values) => createProd(values)}
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
                      <Form.Group className="mb-3" controlId="nameId">
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupName">
                            <i className="bi bi-tag-fill"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Ej: Collar"
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={
                              errors.name && touched.name && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.name && touched.name && errors.name}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="priceId">
                        <Form.Label>Precio</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupPrice">
                            <i className="bi bi-currency-dollar"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="999"
                            type="number"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            className={
                              errors.price && touched.price && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.price && touched.price && errors.price}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="descId">
                        <Form.Label>Descripción</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupDesc">
                            <i className="bi bi-file-text-fill"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Detalles del producto"
                            as={"textarea"}
                            rows={2}
                            name="desc"
                            value={values.desc}
                            onChange={handleChange}
                            className={
                              errors.desc && touched.desc && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.desc && touched.desc && errors.desc}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="imgId">
                        <Form.Label>URL de imagen</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupImg">
                            <i className="bi bi-image"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="https://imagen.com/img.png"
                            type="text"
                            name="img"
                            value={values.img}
                            onChange={handleChange}
                            className={
                              errors.img && touched.img && "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.img && touched.img && errors.img}
                        </small>
                      </Form.Group>
                      <hr />
                      <div className="text-end">
                        <button
                          className="btn botones"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Crear producto
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "serv" ? (
        <>
        <button className="btn botones" onClick={handleShow}>
          Crear servicio
        </button>

        <Modal show={show} onHide={handleClose}>
          <div className="fondo">
            <Modal.Header closeButton>
              <Modal.Title>Crea un nuevo servicio aquí</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{
                  name: "",
                  price: null,
                  desc: "",
                  img: "",
                }}
                validationSchema={errorProdSchema}
                onSubmit={(values) => createProd(values)}
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
                    <Form.Group className="mb-3" controlId="nameId">
                      <Form.Label>Nombre</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="groupName">
                          <i className="bi bi-tag-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Ej: Baño completo"
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          className={
                            errors.name && touched.name && "is-invalid"
                          }
                        />
                      </InputGroup>
                      <small className="text-danger">
                        {errors.name && touched.name && errors.name}
                      </small>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priceId">
                      <Form.Label>Precio</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="groupPrice">
                          <i className="bi bi-currency-dollar"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="999"
                          type="number"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          className={
                            errors.price && touched.price && "is-invalid"
                          }
                        />
                      </InputGroup>
                      <small className="text-danger">
                        {errors.price && touched.price && errors.price}
                      </small>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descId">
                      <Form.Label>Descripción</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="groupDesc">
                          <i className="bi bi-file-text-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Detalles del servicio"
                          as={"textarea"}
                          rows={2}
                          name="desc"
                          value={values.desc}
                          onChange={handleChange}
                          className={
                            errors.desc && touched.desc && "is-invalid"
                          }
                        />
                      </InputGroup>
                      <small className="text-danger">
                        {errors.desc && touched.desc && errors.desc}
                      </small>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imgId">
                      <Form.Label>URL de imagen</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="groupImg">
                          <i className="bi bi-image"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="https://imagen.com/img.png"
                          type="text"
                          name="img"
                          value={values.img}
                          onChange={handleChange}
                          className={
                            errors.img && touched.img && "is-invalid"
                          }
                        />
                      </InputGroup>
                      <small className="text-danger">
                        {errors.img && touched.img && errors.img}
                      </small>
                    </Form.Group>
                    <hr />
                    <div className="text-end">
                      <button
                        className="btn botones"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Crear servicio
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </div>
        </Modal>
      </>
      ) : type === "user" ? (
        <>
          <button className="btn botones" onClick={handleShow}>
            Crear usuario
          </button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo">
              <Modal.Header closeButton>
                <Modal.Title>Crea un nuevo usuario aquí</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    email: "",
                    name: "",
                    pass: "",
                    repeatPass: "",
                  }}
                  validationSchema={errorRegisterSchema}
                  onSubmit={(values) => createUser(values)}
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
                            className={
                              errors.email && touched.email && "is-invalid"
                            }
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
                            className={
                              errors.name && touched.name && "is-invalid"
                            }
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
                            className={
                              errors.pass && touched.pass && "is-invalid"
                            }
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
                              errors.repeatPass &&
                              touched.repeatPass &&
                              "is-invalid"
                            }
                          />
                        </InputGroup>
                        <small className="text-danger">
                          {errors.repeatPass &&
                            touched.repeatPass &&
                            errors.repeatPass}
                        </small>
                      </Form.Group>
                      <hr />
                      <div className="text-end">
                        <button
                          className="btn botones"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Crear usuario
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "turn" ? (
        <>
          <button className="btn botones" onClick={handleShow}>
            Crear turno
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ModalComp;
