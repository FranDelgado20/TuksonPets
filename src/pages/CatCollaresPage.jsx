import React, { useEffect, useState } from "react";
import clientAxios, { config } from "../utils/axiosClient";
import FilterComp from "../components/FilterComp";
import CardComp from "../components/CardComp";
import { Container, Row } from "react-bootstrap";

const CatCollaresPage = () => {
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
        <h2>Collares y correas</h2>
        <hr />
        <FilterComp />

        <CardComp products={products} type={"prodsCollares"} />
      </Row>
    </Container>
  );
};

export default CatCollaresPage;
