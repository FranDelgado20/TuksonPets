import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import EditModalComp from "./EditModalComp";
import emailjs from "emailjs-com";

const TableComp = ({
  type,
  products,
  users,
  turns,
  getProducts,
  getUsers,
  getTurns,
}) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const deleteProd = (id) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/products/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await res.json();
          if (response.status === 200) {
            Swal.fire({
              title: "Producto eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getProducts();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el producto",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  const deleteUser = (id, role) => {
    if (role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "No es posible eliminar un usuario administrador",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    Swal.fire({
      title: "¿Estás seguro de borrar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resUser = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/users/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseUser = await resUser.json();
          const { idCart } = responseUser.deletedUser;
          const resCart = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/cart/${idCart}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseCart = await resCart.json();
          if (responseUser.status === 200 && responseCart.status === 200) {
            Swal.fire({
              title: "Usuario eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getUsers();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el usuario",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  const deleteTurn = (id, email) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_URL_DEPLOY}/turns/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await res.json();
          if (response.status === 200) {
            Swal.fire({
              title: "Turno eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getTurns();
            const templateParams = {
              to_email: email,
              message:
                "Tu turno ha sido cancelado por motivos profesionales, por favor visita nuestra página si deseas solicitar un nuevo turno",
            };
            await emailjs.send(
              import.meta.env.VITE_EMAIL_SERVICE_ID,
              import.meta.env.VITE_EMAIL_TEMPLATE_ID,
              templateParams,
              import.meta.env.VITE_EMAIL_PUBLIC_KEY
            );
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el turno",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      {type === "prods"
        ? products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.imagen}</td>
              <td className="text-center">
                <EditModalComp
                  type={"prods"}
                  prod={prod}
                  getProducts={getProducts}
                />
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteProd(prod._id)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))
        : type === "users"
        ? users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <EditModalComp type={"users"} getUsers={getUsers} user={user} />
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteUser(user._id, user.role)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))
        : type === "turns"
        ? turns.map((turn) => (
            <tr key={turn._id}>
              <td>{turn.nombrePaciente}</td>
              <td>{turn.raza}</td>
              <td>{turn.vet}</td>
              <td>
                {turn.fecha} | {turn.hora}
              </td>
              <td>{turn.nombreDueno}</td>
              <td>{turn.tel}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  className="my-2 mx-2"
                  onClick={() => deleteTurn(turn._id, turn.email)}
                >
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </Button>
              </td>
            </tr>
          ))
        : ""}
    </>
  );
};

export default TableComp;
