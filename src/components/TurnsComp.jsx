import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { errorTurnSchema } from "../utils/validationSchemas";

const TurnsComp = ({ type }) => {
  const createTurn = (values) => {
    console.log(values);
  };
  return (
    <>
      {type === "admin" ? (
        <Formik
          initialValues={{
            nameServ: "",
            namePatient: "",
            date: "",
            time: "",
            vet: "",
          }}
          validationSchema={errorTurnSchema}
          onSubmit={(values) => createTurn(values)}
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
                <Form.Label>Nombre del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupName">
                    <i className="bi bi-tag-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Toby"
                    type="text"
                    name="namePatient"
                    value={values.namePatient}
                    onChange={handleChange}
                    className={
                      errors.namePatient && touched.namePatient && "is-invalid"
                    }
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.namePatient &&
                    touched.namePatient &&
                    errors.namePatient}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="servId">
                <Form.Label>Servicio deseado</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupPrice">
                    <i className="bi bi-list-task"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="nameServ"
                    value={values.nameServ}
                    onChange={handleChange}
                    className={
                      errors.nameServ && touched.nameServ && "is-invalid"
                    }
                  >
                    <option>Servicio no seleccionado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.nameServ && touched.nameServ && errors.nameServ}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="vetId">
                <Form.Label>Veterinario</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupVet">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="vet"
                    value={values.vet}
                    onChange={handleChange}
                    className={errors.vet && touched.vet && "is-invalid"}
                  >
                    <option>Veterinario no seleccionado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.vet && touched.vet && errors.vet}
                </small>
              </Form.Group>
              <div className="d-flex justify-content-around">
                <Form.Group className="mb-3" controlId="dateId">
                  <Form.Label>Fecha</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupDate">
                      <i className="bi bi-calendar"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      className={errors.date && touched.date && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.date && touched.date && errors.date}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3" controlId="timeId">
                  <Form.Label>Hora</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupTime">
                      <i className="bi bi-clock"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      className={errors.time && touched.time && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.time && touched.time && errors.time}
                  </small>
                </Form.Group>
              </div>
              <hr />
              <div className="text-end">
                <button
                  className="btn botones"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Crear turno
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            nameServ: "",
            namePatient: "",
            date: "",
            time: "",
            vet: "",
          }}
          validationSchema={errorTurnSchema}
          onSubmit={(values) => createTurn(values)}
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
            <Form className="bg-info-subtle p-3 rounded-4 w-75">
              <h3>Solicita tu turno aquí</h3>
              <hr />
              <Form.Group className="mb-3" controlId="nameId">
                <Form.Label>Nombre del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupName">
                    <i className="bi bi-tag-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Toby"
                    type="text"
                    name="namePatient"
                    value={values.namePatient}
                    onChange={handleChange}
                    className={
                      errors.namePatient && touched.namePatient && "is-invalid"
                    }
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.namePatient &&
                    touched.namePatient &&
                    errors.namePatient}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="servId">
                <Form.Label>Servicio deseado</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupPrice">
                    <i className="bi bi-list-task"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="nameServ"
                    value={values.nameServ}
                    onChange={handleChange}
                    className={
                      errors.nameServ && touched.nameServ && "is-invalid"
                    }
                  >
                    <option>Servicio no seleccionado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.nameServ && touched.nameServ && errors.nameServ}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="vetId">
                <Form.Label>Veterinario</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupVet">
                    <i className="bi bi-file-text-fill"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="vet"
                    value={values.vet}
                    onChange={handleChange}
                    className={errors.vet && touched.vet && "is-invalid"}
                  >
                    <option>Veterinario no seleccionado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.vet && touched.vet && errors.vet}
                </small>
              </Form.Group>
              <div className="d-flex justify-content-around turnForm">
                <Form.Group className="mb-3 turnFormFecha" controlId="dateId">
                  <Form.Label>Fecha</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupDate">
                      <i className="bi bi-calendar"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      className={errors.date && touched.date && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.date && touched.date && errors.date}
                  </small>
                </Form.Group>
                <Form.Group className="mb-3" controlId="timeId">
                  <Form.Label>Hora</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupTime">
                      <i className="bi bi-clock"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      className={errors.time && touched.time && "is-invalid"}
                    />
                  </InputGroup>
                  <small className="text-danger">
                    {errors.time && touched.time && errors.time}
                  </small>
                </Form.Group>
              </div>
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
      )}
    </>
  );
};

export default TurnsComp;
