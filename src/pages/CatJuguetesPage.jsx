import React, { useEffect, useState } from "react";
import clientAxios, { config } from "../utils/axiosClient";
import FilterComp from "../components/FilterComp";
import CardComp from "../components/CardComp";
import { Container, Row } from "react-bootstrap";

const CatJuguetesPage = () => {
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
        <h2>Juguetes</h2>
        <hr />
        <FilterComp />

          <CardComp products={products} type={"prodsJuguetes"} />
      </Row>
    </Container>
  );
};

export default CatJuguetesPage;
