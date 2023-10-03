import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CardComp from "../components/CardComp";
import clientAxios, { config } from "../utils/axiosClient";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [to, setTo] = useState(0);
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);

  const getProducts = async () => {
    const res = await clientAxios.get(
      `/products?to=${to === 0 ? to : to - 1}&limit=8`
    );
    setProducts(res.data.products);
    setLimit(res.data.limit);
    setCount(res.data.count);
  };

  useEffect(() => {
    getProducts();
  }, [to]);
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <h2>Todos nuestros productos</h2>
        <hr />
        <FilterComp />
        <CardComp products={products} type={"prods"} />
        <div className="d-flex justify-content-center mt-3">
          <PaginationComp setTo={setTo} limit={limit} count={count} />
        </div>
      </Row>
    </Container>
  );
};

export default ProductsPage;
