import React from "react";
import { Link } from "react-router-dom";

const FooterComp = () => {
  return (
    <footer className="py-3 bg-info-subtle">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 margenLogo">
            <div className="img-fluid text-center">
              <img src="/TuksonPetsLogo.png" alt="Tukson Pets Logo" width="300px" />
            </div>
          </div>
          <hr className="displayNone" />
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5>Más información</h5>
            <Link className="my-1 nav-link" to={"/aboutus"}>Sobre nosotros</Link>
            <Link className="my-1 nav-link" to={"/contact"}>Contacto</Link>
            <h6>Visitanos: Av. Alem 1086</h6>
          </div>
          <hr className="displayNone" />
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="text-center">
              Buscanos en nuestras redes
            </h5>
            <div className="d-flex justify-content-center">
              <Link
                className="mx-3"
                to={"*"}
              >
                <i className="bi bi-facebook fs-1 fb"></i>
              </Link>
              <Link
                className="mx-3"
                to={"*"}
              >
                <i className="bi bi-whatsapp fs-1 wp"></i>
              </Link>
              <Link
                className="mx-3"
                to={"*"}
              >
                <i className="bi bi-instagram fs-1 ig"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
