import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import clientAxios, { config } from "../utils/axiosClient";
import Swal from "sweetalert2";
const OneProd = () => {
  // const idCart = JSON.parse(sessionStorage.getItem('idCart'))
  const params = useParams();
  const [prod, setProd] = useState({});
  const [cartProds, setCartProds] = useState([])

  const getCart = async () => {
    const res = await clientAxios.get(`/${idCart}`, config)
    setCartProds(res.data.cart)
  }
  const getOneProd = async () => {
    const res = await clientAxios.get(`/products/${params.id}`, config);

    setProd(res.data.oneProduct);
  };

  const addCart = async (idProd) => {
    try {
      const idUser = JSON.parse(sessionStorage.getItem("idUser"));
      const resUser = await clientAxios.get(`/users/${idUser}`, config);

      const { idCart } = resUser.data.oneUser;

      const resCart = await clientAxios.post(
        `/cart/${idCart}/${idProd}`,
        {},
        config)
      console.log(resCart)

    } catch (error) {
      console.log(error)
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Al parecer hubo un error!",
        text: error.response.data.msg,
      })
    }
  }
 
  useEffect(() => {
    getOneProd();
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
            <button onClick={() => addCart(prod._id)} className="btn botones fs-5">
              <i className="bi bi-cart-plus-fill me-2"></i>
              Agregar al carrito
            </button>
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
