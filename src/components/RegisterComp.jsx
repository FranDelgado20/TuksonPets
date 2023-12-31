import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import { Formik } from "formik";
import {
  errorEditUserSchema,
  errorRegisterOnAdminSchema,
  errorRegisterSchema,
} from "../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import emailjs from "emailjs-com";

const RegisterComp = ({ type, user, getUsers, handleClose }) => {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"))

  const createUser = async (values) => {
    try {
      if (values.pass === values.repeatPass) {
        const res = await clientAxios.post(
          "/users",
          {
            email: values.email,
            name: values.name,
            pass: values.pass,
            phoneNumber: values.tel,
          },
          config
        );
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "Ya puedes iniciar sesión",
            showConfirmButton: false,
            timer: 1500,
          });

          const templateParams = {
            to_email: values.email,
            message:
              "Gracias por registrarte en nuestra página, aquí podrás obtener diversos productos para tus mascotas ya que contamos con la mejor calidad del mercado, también podrás consultar sobre los distintos planes que ofrecemos y solicitar turnos con nuestros profesionales. ¡Gracias por confiar en nosotros!",
          };
          await emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAIL_PUBLIC_KEY
          );
          navigate("/login");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Oh no!",
          text: "Las contraseñas no coinciden",
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

  const createUserOnAdmin = async (values) => {
    try {
      const res = await clientAxios.post("/users", {
        email: values.email,
        name: values.name,
        pass: values.pass,
        phoneNumber: values.tel,
        role: values.role,
      });
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        getUsers();
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error",
        text: error.response.data.msg,
      });
    }
  };

  const editUser = async (values) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: values.name,
          role: values.role,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      })
      const response = await res.json()

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.msg,
          timer: 1500,
          showConfirmButton: false,
        });
        handleClose();
        getUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo editar el usuario",
        text: error
      });
    }
  };
  return (
    <>
      {type === "user" ? (
        <Formik
          initialValues={{
            email: "",
            name: "",
            pass: "",
            repeatPass: "",
            tel: "",
          }}
          validationSchema={errorRegisterSchema}
          onSubmit={(values) => createUser(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                <Form.Label>Nombre y apellido</Form.Label>
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
                    maxLength={10}
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
      ) : type === "admin" ? (
        <Formik
          initialValues={{
            email: "",
            name: "",
            pass: "",
            role: "",
            tel: "",
          }}
          validationSchema={errorRegisterOnAdminSchema}
          onSubmit={(values) => createUserOnAdmin(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
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
              <Form.Group className="mb-3" controlId="nameId">
                <Form.Label>Nombre y apellido</Form.Label>
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
              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Rol</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRole">
                    <i className="bi bi-person-fill-gear"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className={errors.role && touched.role && "is-invalid"}
                  >
                    <option>Rol no seleccionado</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.role && touched.role && errors.role}
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
      ) : type === "editUser" ? (
        <Formik
          initialValues={{
            name: user.name,
            role: user.role,
          }}
          validationSchema={errorEditUserSchema}
          onSubmit={(values) => editUser(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Form.Group className="mb-3" controlId="nameId">
                <Form.Label>Nombre y apellido</Form.Label>
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
              <Form.Group className="mb-3" controlId="roleId">
                <Form.Label>Rol</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="groupRole">
                    <i className="bi bi-person-fill-gear"></i>
                  </InputGroup.Text>
                  <Form.Select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className={errors.role && touched.role && "is-invalid"}
                  >
                    <option>Rol no seleccionado</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </InputGroup>
                <small className="text-danger">
                  {errors.role && touched.role && errors.role}
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
      ) : (
        ""
      )}
    </>
  );
};

export default RegisterComp;
