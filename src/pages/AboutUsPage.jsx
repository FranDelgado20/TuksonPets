import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AboutUsPage = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <h3 className="text-center">Tukson Pets - Clínica veterinaria 🐶 🐱 💉</h3>
          <hr />
          <p>
            Tukson Pets es la página dedicada a la clínica veterinaria del mismo
            nombre, ubicada en San Miguel de Tucumán, Tucumán, Argentina.
            Nosotros nos comprometemos a cuidar de tu mascota como se merece.
            ¡Traela y deja que disfrute nuestros servicios! ¡Gracias por confiar
            en nosotros!
          </p>
        </Col>
        <Col lg={12} md={12} sm={12} className="mt-3">
          <h3>El equipo de desarrolladores de Tukson Pets</h3>
          <hr />
          <Row>
            <Col lg={2} md={6} sm={12} className="d-flex justify-content-center">
              <img
                src="/about-us/Santi.jpg"
                alt="Imagen Santi"
                className="img-fluid rounded-5"
              />
            </Col>
            <Col lg={10} md={6} sm={12}>
              <h4 className="mt-2">Santiago Agustín Jaime | Scrum Master</h4>
              <hr />
              <p>
                Hola! Soy Santiago Agustín Jaime y tengo 20 años. En el año 2021
                hice el ingreso a la carrera de Medicina, quedando afuera por un
                punto. Luego, en el año 2022 decidí optar por irme a otra
                carrera la cual tenía cosas que me interesaban: Ingeniería en
                Sistemas, puesto que me encanta todo lo relacionado a la
                computación. Sin embargo, al cursar durante todo ese año me di
                cuenta que la mayoría de materias me disgustaban, excepto una:
                programación. Esa es la historia del por qué hoy estoy aquí.
              </p>
              <div className="text-center">
                <a
                  className="btn btn-info text-end"
                  href="https://github.com/SantiJaime"
                  target="_blank"
                >
                  <i className="bi bi-github"></i> Github
                </a>
              </div>
            </Col>
          </Row>
          <hr />
        </Col>
        <Col lg={12} md={12} sm={12} className="mt-3">
          <Row>
            <Col lg={2} md={6} sm={12} className="d-flex justify-content-center">
              <img
                src="/about-us/Fran.jpg"
                alt="Imagen Fran"
                className="img-fluid rounded-5"
              />
            </Col>
            <Col lg={10} md={6} sm={12}>
              <h4 className="mt-2">Francisco Delgado | Tech Leader</h4>
              <hr />
              <p>
                Soy estudiante de Medicina de la UNT y estoy cursando el 3°año
                de la carrera. Decidí adentrarme dentro del mundo de la
                Programación Web ya que me parece un campo de estudio muy amplio
                e interesante y que aportara muchas aptitudes a mi vida laboral
                debido al gran avance de la tecnología en estos últimos años.
              </p>
              <div className="text-center">
                <a
                  className="btn btn-info text-end"
                  href="https://github.com/FranDelgado20"
                  target="_blank"
                >
                  <i className="bi bi-github"></i> Github
                </a>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
