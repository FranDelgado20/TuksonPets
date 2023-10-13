import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../utils/axiosClient";
import Swal from "sweetalert2";

const OneProd = () => {
  const params = useParams();
  const [prod, setProd] = useState({});
  const [cartProds, setCartProds] = useState([]);
  const idUser = JSON.parse(sessionStorage.getItem("idUser"));
  const token = JSON.parse(sessionStorage.getItem("token"));

  const getOneProd = async () => {
    const res = await clientAxios.get(`/products/${params.id}`);

    setProd(res.data.oneProduct);
  };

  const getCart = async () => {
    try {
      if(idUser){

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
        
        setCartProds(responseCart.cart.productos);
      }
      } catch (error) {
        Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error!",
        text: error,
      });
    }
  };

  const addCart = async (idProd) => {
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

      const prodExistente = cartProds.find((prod) => prod._id === idProd);
      if (prodExistente) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "¡Al parecer hubo un error!",
          text: "El producto ya existe en el carrito",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      const resCart = await fetch(
        `${import.meta.env.VITE_URL_DEPLOY}/cart/${idCart}/${idProd}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseCart = await resCart.json();

      if (responseCart.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Producto agregado al carrito!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "¡Al parecer hubo un error!",
          text: responseCart.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Al parecer hubo un error!",
        text: error,
      });
    }
  };

  useEffect(() => {
    getOneProd();
    getCart();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col
          lg={4}
          md={12}
          sm={12}
          className="d-flex justify-content-center my-3"
        >
          <img
            src={prod.imagen}
            className="img-fluid rounded-4"
            alt="Imagen Producto"
          />
        </Col>
        <Col lg={8} md={12} sm={12} className="my-3">
          <h2>{prod.nombre}</h2>
          <hr />
          <h4>${prod.precio}</h4>
          <hr />
          <p>{prod.descripcion}</p>
          <hr />
          <div className="text-end">
            {token ? (
              <button
                onClick={() => addCart(prod._id)}
                className="btn botones fs-5"
              >
                <i className="bi bi-cart-plus-fill me-2"></i>
                Agregar al carrito
              </button>
            ) : (
              <Link className="btn botones fs-5" to={"/login"}>
                <i className="bi bi-cart-plus-fill me-2"></i>
                Agregar al carrito
              </Link>
            )}
          </div>
        </Col>
      </Row>
      <hr />
      <div className="text-center">
        <Link className="btn botones fs-5" to={"/products"}>
          <i className="bi bi-arrow-left-circle"></i> Volver a productos
        </Link>
      </div>
    </Container>
  );
};

export default OneProd;
