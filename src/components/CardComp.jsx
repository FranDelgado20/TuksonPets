import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardComp = () => {
  return (
    <Col lg={3} md={6} sm={12} className="my-2">
      <Card className="bg-info-subtle">
        <Card.Img variant="top" src="" alt="Imagen" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="info">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardComp;
