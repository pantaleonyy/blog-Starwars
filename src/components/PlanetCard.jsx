import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext.jsx";

export const PlanetCard = ({ id, name, population, climate, terrain }) => {
  const { favorites, toggleFavorite } = useFavorites();


    const favId = `planet-${id}`;
  const isFavorite = favorites.includes(favId);

  const imageUrl =
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      className="card bg-dark text-light mx-3 my-3"
      style={{ width: "16rem", border: "2px solid #f5c518" }}
    >
   
      <img
        src={imageUrl}
        alt={name}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning mb-3 text-uppercase">{name}</h5>

        <p className="mb-1 text-uppercase">
          <span className="fw-bold">Población: </span>
          {population}
        </p>

        <p className="mb-1 text-uppercase">
          <span className="fw-bold">Clima: </span>
          {climate}
        </p>

        <p className="mb-3 text-uppercase">
          <span className="fw-bold">Terreno: </span>
          {terrain}
        </p>

        <hr className="border-secondary mb-2" />

        <div className="d-flex justify-content-between align-items-center mt-auto">
         
          <Link
            to={`/planet/${id}`}
            className="btn btn-warning btn-sm fw-semibold text-uppercase"
          >
            Más información
          </Link>

          <button
            type="button"
            onClick={() => toggleFavorite(favId)}
            className="btn btn-outline-light btn-sm border-0"
            title="Agregar/Quitar favorito"
          >
            <i
              className={
                isFavorite
                  ? "fa-solid fa-heart text-warning"
                  : "fa-regular fa-heart text-light"
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}