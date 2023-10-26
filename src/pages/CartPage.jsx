import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import clientAxios, { config } from "../utils/axiosClient";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import Card from "react-bootstrap/Card";
import EditModalComp from "../components/EditModalComp";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [precioTotalPorProducto, setPrecioTotalPorProducto] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [turns, setTurns] = useState([]);
  const [email, setEmail] = useState("");
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
  const token = JSON.parse(sessionStorage.getItem("token"));
  const locationUse = useLocation();
  const searchParams = new URLSearchParams(locationUse.search);
  const status = searchParams.get("status");

  useEffect(() => {
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
      const response = await resUser.json();
      const { email } = response.oneUser;
      setEmail(email);
      if (status === "approved") {
        const templateParams = {
          to_email: email,
          message:
            "Tu pago fue procesado con éxito. ¡Muchas gracias por tu compra!",
        };
        emailjs
          .send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAIL_PUBLIC_KEY
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "¡Pago realizado con éxito!",
              text: "Te llegará un correo a tu Email. Asegurate de checkearlo",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "No se pudo enviar el correo",
              text: error,
            });
          });
      } else if (status === "rejected") {
        Swal.fire({
          icon: "error",
          title: "¡Pago rechazado!",
          text: "Intente nuevamente o comuníquese con su compañía de tarjeta",
        });
      } else if (status === "in_process") {
        Swal.fire({
          icon: "warning",
          title: "Tu pago está siendo procesado",
          text: "Se te enviará un correo cuando esté procesado",
        });
      }
    };
    getUser();
  }, [status]);

  const getProdCart = async () => {
    try {
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
      const response = await resUser.json();
      const { idCart } = response.oneUser;

      const resCart = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/cart/${idCart}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseCart = await resCart.json();
      setProducts(responseCart.cart.productos);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error,
      });
    }
  };

  const getTurns = async () => {
    try {
      const resTurn = await fetch(`${import.meta.env.VITE_URL_DEPLOY}/turns`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseTurn = await resTurn.json();
      setTurns(responseTurn.allTurns);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error,
      });
    }
  };

  const eliminarProd = async (idProd) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este producto del carrito?",
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
        `${import.meta.env.VITE_URL_DEPLOY}/users/${idUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await resUser.json();
      const { idCart } = response.oneUser;

      const resDeleteProd = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/cart/${idCart}/${idProd}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseDelete = await resDeleteProd.json();
      if (responseDelete.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Producto eliminado!",
          showConfirmButton: false,
          timer: 1500,
        });
        getProdCart();
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error!",
        text: error,
      });
    }
  }
  })
};
  const sumarCant = (id) => {
    const filtro = products.find((prod) => prod._id === id);
    if (filtro) {
      filtro.cantidad++;

      setProducts((prevCarrito) =>
        prevCarrito.map((cart) =>
          products._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };
  const restarCant = (id) => {
    const filtro = products.find((prod) => prod._id === id);
    if (filtro && filtro.cantidad > 1) {
      filtro.cantidad--;

      setProducts((prevCarrito) =>
        prevCarrito.map((cart) =>
          products._id === id ? { ...cart, ...filtro } : cart
        )
      );
    }
  };

  const payButton = () => {
    Swal.fire({
      title: "¿Confimar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
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
          const response = await resUser.json();
          const { idCart } = response.oneUser;
          const res = await clientAxios.post(
            "/cart/pay",
            {
              items: products,
              id: idCart
            },
            config
          );
          if (res.status === 200) {
            location.href = res.data.resPay.response.init_point;
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo eliminar el producto",
            text: error.response.data.msg,
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(() => {
    getProdCart(), getTurns();
  }, []);

  useEffect(() => {
    const precios = [];
    let total = 0;
    products.forEach((cart) => {
      const precioTotal = cart.cantidad * cart.precio;
      precios[cart._id] = precioTotal;
      total += precioTotal;
    });
    setPrecioTotalPorProducto(precios);
    setPrecioTotal(total);
  }, [products]);

  const cancelTurn = (id) => {
    Swal.fire({
      title: "¿Estás seguro de cancelar este turno?",
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
              title: "Turno cancelado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getTurns();
          }
        } catch (error) {
          Swal.fire({
            title: "No se pudo cancelar el turno",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <Container className="my-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <h2 className="mb-3">Mi carrito de compras</h2>
          {products.length > 0 ? (
            <>
              <Table striped bordered hover variant="info" responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod._id}>
                      <td>{prod.nombre}</td>
                      <td>${prod.precio}</td>
                      <td className="tdCart">
                        <button
                          className="botones btn border-2 mx-2"
                          onClick={() => restarCant(prod._id)}
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <h6>{prod.cantidad}</h6>
                        <button
                          className="botones btn border-2 mx-2 "
                          onClick={() => sumarCant(prod._id)}
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="danger"
                          onClick={() => eliminarProd(prod._id)}
                        >
                          <i className="bi bi-trash3-fill"></i> Eliminar
                        </Button>
                      </td>
                      <td>${precioTotalPorProducto[prod._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <h4>Total a pagar: ${precioTotal}</h4>
                  <div className="text-center mt-3">
                    <button
                      className="ms-5 btn botones w-75 fs-4"
                      onClick={payButton}
                    >
                      <i className="bi me-2 bi-cash-coin"></i> Pagar
                    </button>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <hr />
              <h4 className="text-center">
                Aún no agregaste nada a tu carrito
              </h4>
              <div className="text-center">
                <Link className="btn botones fs-5 mt-3" to={"/products"}>
                  <i className="bi bi-list-task"></i> Ir a productos
                </Link>
              </div>
            </>
          )}
        </Col>

        <Col>
          <hr />
          <h2>Mis turnos solicitados</h2>
          {turns.filter((turn) => turn.email === email).length > 0 ? (
            <>
              <hr />
              <Row className="justify-content-center">
                {turns
                  .filter((turn) => turn.email === email)
                  .map((turn) => (
                    <Col lg={3} md={6} sm={12} key={turn._id}>
                      <Card className="fondo my-2">
                        <Card.Body>
                          <Card.Title>
                            Paciente: {turn.nombrePaciente}
                          </Card.Title>
                          <hr />
                          <Card.Text>
                            <li>Veterinario: {turn.vet}</li>
                            <li>
                              Fecha y hora: {turn.fecha} | {turn.hora}
                            </li>
                          </Card.Text>
                          <hr />
                          <div className="d-flex justify-content-around">
                            <EditModalComp
                              type={"turns"}
                              turn={turn}
                              getTurns={getTurns}
                            />
                            <Button
                              variant="danger"
                              onClick={() => cancelTurn(turn._id)}
                            >
                              <i className="bi bi-calendar2-x"></i> Cancelar
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <>
              <hr />
              <h4 className="text-center">Aún no solicitaste ningún turno</h4>
              <div className="text-center">
                <Link className="btn botones fs-5 mt-3" to={"/turns"}>
                  <i className="bi bi-calendar-plus-fill me-1"></i> Solicitar un
                  turno
                </Link>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
