import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { errorProdSchema } from "../utils/validationSchemas";
import { Formik } from "formik";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
import RegisterComp from "./RegisterComp";
import TurnsComp from "./TurnsComp";

const EditModalComp = ({
  type,
  prod,
  getProducts,
  user,
  getUsers,
  turn,
  getTurns,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProduct = async (values) => {
    try {
      const res = await clientAxios.put(
        `/products/${prod._id}`,
        {
          nombre: values.name,
          precio: values.precio,
          descripcion: values.desc,
          categoria: values.cat,
          imagen: values.img,
        },
        config
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          timer: 1500,
          showConfirmButton: false,
        });
        handleClose();
        getProducts();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo editar el producto",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <>
      {type === "prods" ? (
        <>
          <Button variant="info" onClick={handleShow} className="my-2 mx-2">
            <i className="bi bi-pencil-fill"></i> Editar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo">
              <Modal.Header closeButton>
                <Modal.Title>Edita este producto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: prod.nombre,
                    price: prod.precio,
                    desc: prod.descripcion,
                    img: prod.imagen,
                    cat: prod.categoria,
                  }}
                  validationSchema={errorProdSchema}
                  onSubmit={(values) => editProduct(values)}
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
                            <i className="bi bi-card-text"></i>
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
                      <Form.Group className="mb-3" controlId="catId">
                        <Form.Label>Categoría</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="groupCat">
                            <i className="bi bi-tag-fill"></i>
                          </InputGroup.Text>
                          <Form.Select
                            name="cat"
                            value={values.cat}
                            onChange={handleChange}
                            className={
                              errors.cat && touched.cat && "is-invalid"
                            }
                          >
                            <option value="Destacado">Destacado</option>
                            <option value="Juguetes">Juguetes</option>
                            <option value="Correas">Correas</option>
                            <option value="Camas">Camas</option>
                            <option value="Platos de comida">
                              Platos de comida
                            </option>
                          </Form.Select>
                        </InputGroup>
                        <small className="text-danger">
                          {errors.cat && touched.cat && errors.cat}
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
                            rows={3}
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
                          Guardar cambios
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "users" ? (
        <>
          <Button variant="info" onClick={handleShow} className="my-2 mx-2">
            <i className="bi bi-pencil-fill"></i> Editar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo">
              <Modal.Header closeButton>
                <Modal.Title>Edita este usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RegisterComp
                  type={"editUser"}
                  user={user}
                  getUsers={getUsers}
                  handleClose={handleClose}
                />
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : type === "turns" ? (
        <>
          <Button variant="info" onClick={handleShow} className="my-2 mx-2">
            <i className="bi bi-pencil-fill"></i> Editar
          </Button>

          <Modal show={show} onHide={handleClose}>
            <div className="fondo">
              <Modal.Header closeButton>
                <Modal.Title>Edita este turno</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TurnsComp
                  type={"editTurn"}
                  turn={turn}
                  getTurns={getTurns}
                  handleClose={handleClose}
                />
              </Modal.Body>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default EditModalComp;
