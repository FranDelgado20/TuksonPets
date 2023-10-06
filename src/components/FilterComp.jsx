import React from "react";
import { Link } from "react-router-dom";

const FilterComp = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="mb-3 bg-info-subtle p-3 rounded-4 sombra">
        <h6>Filtra los productos por categoría</h6>
        <hr />
        <div className="dropdown text-center">
          <button
            className="btn botones dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list-task"></i> Categorías
          </button>
          <div className="dropdown-menu text-center">
            <Link to={"/products"} className="dropdown-item">
              Todos
            </Link>
            <hr />
            <Link to={"/products-destacados"} className="dropdown-item">
              Destacados
            </Link>
            <hr />
            <Link to={"/products-collares"} className="dropdown-item">
              Collares
            </Link>
            <hr />
            <Link to={"/products-juguetes"} className="dropdown-item">
              Juguetes
            </Link>
            <hr />
            <Link to={"/products-camas"} className="dropdown-item">
              Camas
            </Link>
            <hr />
            <Link to={"/products-platos"} className="dropdown-item">
              Platos de comida
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
