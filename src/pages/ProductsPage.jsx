import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CardComp from "../components/CardComp";
import clientAxios, { config } from "../utils/axiosClient";

const ProductsPage = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await clientAxios.get("/products", config)

    setProducts(res.data.getProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <Container className="my-5">
      <Row>
        <h2>Nuestros productos</h2>
        <hr />
        <div className="d-flex justify-content-center">
          <Form.Group
            className="mb-3 bg-info-subtle p-3 rounded-4 w-50 sombra"
            controlId="categoryId"
          >
            <Form.Label>Filtra los productos por categoría</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Sin categoría seleccionada</option>
              <option value="1">Collares</option>
              <option value="2">Alimento</option>
              <option value="3">Juguetes</option>
            </Form.Select>
          </Form.Group>
        </div>
        <CardComp products={products} type={"prods"}/>
      </Row>
    </Container>
  );
};

export default ProductsPage;
