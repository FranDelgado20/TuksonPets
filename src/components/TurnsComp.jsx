import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  errorEditTurnSchema,
  errorPlanSchema,
  errorTurnOnAdminSchema,
  errorTurnSchema,
} from "../utils/validationSchemas";
import clientAxios from "../utils/axiosClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const TurnsComp = ({ type, getTurns, handleClose, turn }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
  const token = JSON.parse(sessionStorage.getItem("token"));

  const getUser = async () => {
    const resUser = await fetch(
      `${import.meta.env.VITE_URL_DEPLOY}/users/${idUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseUser = await resUser.json();
    setUser(responseUser.oneUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  const createTurn = async (values) => {
    try {
      const resTurn = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/turns`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          nombrePaciente: values.namePatient,
          desc: values.desc,
          nombreDueno: user.name,
          tel: user.phoneNumber,
          vet: values.vet,
          fecha: values.date,
          hora: values.time,
          raza: values.raza,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseTurn = await resTurn.json();
      if (responseTurn.status === 201) {
        Swal.fire({
          icon: "success",
          title: responseTurn.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: responseTurn.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Parece que hubo un error",
        text: error,
      });
    }
  };

  const createTurnOnAdmin = async (values) => {
    try {
      const resTurn = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/turns`, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          nombrePaciente: values.namePatient,
          desc: values.desc,
          nombreDueno: values.nameOwner,
          tel: values.tel,
          vet: values.vet,
          fecha: values.date,
          hora: values.time,
          raza: values.raza,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseTurn = await resTurn.json();

      if (responseTurn.status === 201) {
        Swal.fire({
          icon: "success",
          title: responseTurn.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        getTurns();
        handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: responseTurn.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Parece que hubo un error",
        text: error,
      });
    }
  };
  const requestPlan = async (values) => {
    try {
      const res = await clientAxios.post("/planes/request", {
        email: values.email,
        nombreApellido: values.name,
        mensaje: values.desc,
        tel: values.tel,
      });
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          text: "Se te enviará un mensaje a tu Email. Asegurate de checkearlo",
        });
        const templateParams = {
          to_email: values.email,
          message:
            "Hemos visto que has solicitado más información acerca de uno de nuestros planes. Próximamente nos pondremos en contacto contigo, por favor espera pacientemente. ¡Gracias por confiar en nosotros!",
        };
        await emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        );
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Parece que hubo un error",
        text: error.response.data.msg,
      });
    }
  };
  const editTurn = async (values) => {
    try {
      if (values.time !== turn.hora || values.date !== turn.fecha) {
        const resEditTurn = await fetch(
          `${import.meta.env.VITE_URL_DEPLOY}/turns/${turn._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              nombrePaciente: values.namePatient,
              raza: values.raza,
              fecha: values.date,
              hora: values.time,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseEdit = await resEditTurn.json();
        if (responseEdit.status === 200) {
          Swal.fire({
            icon: "success",
            title: responseEdit.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          getTurns();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: responseEdit.msg,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else {
        const resEditTurn = await fetch(
          `${import.meta.env.VITE_URL_DEPLOY}/turns/${turn._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              nombrePaciente: values.namePatient,
              raza: values.raza,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseEdit = await resEditTurn.json();
        if (responseEdit.status === 200) {
          Swal.fire({
            icon: "success",
            title: responseEdit.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          getTurns();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: responseEdit.msg,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Parece que hubo un error",
        text: error,
      });
    }
  };
  return (
    <>
      {type === "admin" ? (
        <Formik
          initialValues={{
            desc: "",
            email: "",
            namePatient: "",
            nameOwner: "",
            tel: "",
            date: "",
            time: "",
            vet: "",
            raza: "",
          }}
          validationSchema={errorTurnOnAdminSchema}
          onSubmit={(values) => createTurnOnAdmin(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Form.Group className="mb-3" controlId="namePatientId">
                <Form.Label>Nombre del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupNamePatient">
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
              <Form.Group className="mb-3" controlId="razaId">
                <Form.Label>Especie y raza del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRaza">
                    <i className="bi bi-gear"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Perro - Pastor alemán | Gato - Siamés"
                    type="text"
                    name="raza"
                    value={values.raza}
                    onChange={handleChange}
                    className={errors.raza && touched.raza && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.raza && touched.raza && errors.raza}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="nameOwnerId">
                <Form.Label>Nombre del dueño</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupNameOwner">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Juan González"
                    type="text"
                    name="nameOwner"
                    value={values.nameOwner}
                    onChange={handleChange}
                    className={
                      errors.nameOwner && touched.nameOwner && "is-invalid"
                    }
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.nameOwner && touched.nameOwner && errors.nameOwner}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="emailId">
                <Form.Label>Correo electrónico del dueño</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupEmail">
                    <i className="bi bi-envelope-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="name@example.com"
                    type="text"
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
              <Form.Group className="mb-3" controlId="telId">
                <Form.Label>Número de teléfono del dueño</Form.Label>
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
              <Form.Group className="mb-3" controlId="descId">
                <Form.Label>Detalles de la cita</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupDesc">
                    <i className="bi bi-file-text-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="desc"
                    as={"textarea"}
                    rows={"3"}
                    value={values.desc}
                    placeholder="Cuentenos el motivo de la cita"
                    onChange={handleChange}
                    className={errors.desc && touched.desc && "is-invalid"}
                  ></Form.Control>
                </InputGroup>
                <small className="text-danger">
                  {errors.desc && touched.desc && errors.desc}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="vetId">
                <Form.Label>Veterinario</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupVet">
                    <i className="bi bi-capsule"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="vet"
                    value={values.vet}
                    onChange={handleChange}
                    className={errors.vet && touched.vet && "is-invalid"}
                  >
                    <option>Veterinario no seleccionado</option>
                    <option value="Dr. Francisco Delgado">
                      Dr. Francisco Delgado
                    </option>
                    <option value="Dra. Sureia Matar">Dra. Sureia Matar</option>
                    <option value="Dr. Luciano Kozameh">
                      Dr. Luciano Kozameh
                    </option>
                    <option value="Dr. Francis Sir">Dr. Francis Sir</option>
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
                <Form.Group className="mb-3 ms-1" controlId="timeId">
                  <Form.Label>Hora</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupTime">
                      <i className="bi bi-clock"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="time"
                      value={values.time}
                      className={errors.time && touched.time && "is-invalid"}
                      onChange={handleChange}
                    >
                      {!values.date ? (
                        <option>Fecha y hora no especificadas</option>
                      ) : (
                        <>
                          <option>Horario no especificado</option>
                          <option value="08:00">08:00</option>
                          <option value="08:30">08:30</option>
                          <option value="09:00">09:00</option>
                          <option value="09:30">09:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                        </>
                      )}
                    </Form.Select>
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
                  <i className="bi bi-calendar-plus"></i> Crear turno
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : type === "plan" ? (
        <Formik
          initialValues={{
            desc: "",
            email: "",
            name: "",
            tel: "",
          }}
          validationSchema={errorPlanSchema}
          onSubmit={(values) => requestPlan(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="bg-info-subtle p-3 rounded-4 w-75">
              <h3>Consulta sobre tu plan</h3>
              <hr />
              <Form.Group className="mb-3" controlId="emailId">
                <Form.Label>Correo electrónico</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupEmail">
                    <i className="bi bi-tag-fill"></i>
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
                <Form.Label>Nombre y apellido</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupName">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Juan González"
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
              <Form.Group className="mb-3" controlId="descId">
                <Form.Label>Consulta sobre el plan</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupDesc">
                    <i className="bi bi-file-text-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="desc"
                    as={"textarea"}
                    rows={"3"}
                    value={values.desc}
                    placeholder="Dejenos un mensaje sobre sus dudas acerca del plan"
                    onChange={handleChange}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
              <hr />
              <div className="text-end">
                <button
                  className="btn botones"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <i className="bi bi-calendar-plus"></i> Solicitar plan
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : type === "editTurn" ? (
        <Formik
          initialValues={{
            namePatient: turn.nombrePaciente,
            raza: turn.raza,
            date: turn.fecha,
            time: turn.hora,
          }}
          validationSchema={errorEditTurnSchema}
          onSubmit={(values) => editTurn(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Form.Group className="mb-3" controlId="namePatientId">
                <Form.Label>Nombre del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupNamePatient">
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
              <Form.Group className="mb-3" controlId="razaId">
                <Form.Label>Especie y raza del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRaza">
                    <i className="bi bi-gear"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Perro - Pastor alemán | Gato - Siamés"
                    type="text"
                    name="raza"
                    value={values.raza}
                    onChange={handleChange}
                    className={errors.raza && touched.raza && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.raza && touched.raza && errors.raza}
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
                <Form.Group className="mb-3 ms-1" controlId="timeId">
                  <Form.Label>Hora</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="groupTime">
                      <i className="bi bi-clock"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="time"
                      value={values.time}
                      className={errors.time && touched.time && "is-invalid"}
                      onChange={handleChange}
                    >
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="16:00">16:00</option>
                      <option value="16:30">16:30</option>
                      <option value="17:00">17:00</option>
                      <option value="17:30">17:30</option>
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                    </Form.Select>
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
                  Guardar cambios
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            desc: "",
            namePatient: "",
            date: "",
            time: "",
            vet: "",
            raza: "",
          }}
          validationSchema={errorTurnSchema}
          onSubmit={(values) => createTurn(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="bg-info-subtle p-3 rounded-4 w-75">
              <h3>Solicita tu turno aquí</h3>
              <hr />
              <Form.Group className="mb-3" controlId="namePatientId">
                <Form.Label>Nombre del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupNamePatient">
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
              <Form.Group className="mb-3" controlId="razaId">
                <Form.Label>Especie y raza del paciente</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRaza">
                    <i className="bi bi-gear"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ej: Perro - Pastor alemán | Gato - Siamés"
                    type="text"
                    name="raza"
                    value={values.raza}
                    onChange={handleChange}
                    className={errors.raza && touched.raza && "is-invalid"}
                  />
                </InputGroup>
                <small className="text-danger">
                  {errors.raza && touched.raza && errors.raza}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="nameOwnerId">
                <Form.Label>Nombre del dueño</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupNameOwner">
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control defaultValue={user.name} disabled />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="telId">
                <Form.Label>Número de teléfono</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupTel">
                    <i className="bi bi-telephone-fill"></i>
                  </InputGroup.Text>
                  <Form.Control defaultValue={user.phoneNumber} disabled />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="descId">
                <Form.Label>Detalles de la cita</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupDesc">
                    <i className="bi bi-file-text-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    name="desc"
                    as={"textarea"}
                    rows={"3"}
                    placeholder="Cuentenos el motivo de la cita"
                    value={values.desc}
                    onChange={handleChange}
                    className={errors.desc && touched.desc && "is-invalid"}
                  ></Form.Control>
                </InputGroup>
                <small className="text-danger">
                  {errors.desc && touched.desc && errors.desc}
                </small>
              </Form.Group>
              <Form.Group className="mb-3" controlId="vetId">
                <Form.Label>Veterinario</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupVet">
                    <i className="bi bi-capsule"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="vet"
                    value={values.vet}
                    onChange={handleChange}
                    className={errors.vet && touched.vet && "is-invalid"}
                  >
                    <option>Veterinario no seleccionado</option>
                    <option value="Dr. Francisco Delgado">
                      Dr. Francisco Delgado
                    </option>
                    <option value="Dra. Sureia Matar">Dra. Sureia Matar</option>
                    <option value="Dr. Luciano Kozameh">
                      Dr. Luciano Kozameh
                    </option>
                    <option value="Dr. Francis Sir">Dr. Francis Sir</option>
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
                    <Form.Select
                      name="time"
                      className={errors.time && touched.time && "is-invalid"}
                      onChange={handleChange}
                    >
                      {!values.date ? (
                        <option>Fecha y hora no especificadas</option>
                      ) : (
                        <>
                          <option>Horario no especificado</option>
                          <option value="08:00">08:00</option>
                          <option value="08:30">08:30</option>
                          <option value="09:00">09:00</option>
                          <option value="09:30">09:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                        </>
                      )}
                    </Form.Select>
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
                  <i className="bi bi-calendar-plus"></i> Solicitar turno
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
