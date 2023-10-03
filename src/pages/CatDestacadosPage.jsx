import React, { useEffect, useState } from "react";
import clientAxios, { config } from "../utils/axiosClient";
import FilterComp from "../components/FilterComp";
import CardComp from "../components/CardComp";
import { Container, Row } from "react-bootstrap";

const CatDestacadosPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await clientAxios.get("/products/all", config);

    setProducts(res.data.allProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <h2>Destacados</h2>
        <hr />
        <FilterComp />

          <CardComp products={products} type={"prodsDestacados"} />
      </Row>
    </Container>
  );
};

export default CatDestacadosPage;
