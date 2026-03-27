import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const PlanetDetails = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/planets/${id}`);

        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }

        const data = await res.json();
        console.log("Planet details:", data);
        setPlanet(data.result.properties);
      } catch (err) {
        console.error(err);
        setError("Error cargando el planeta");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5">
        <p className="text-warning">Cargando planeta...</p>
      </div>
    );
  }

  if (error || !planet) {
    return (
      <div className="container my-5">
        <p className="text-danger">{error || "Planeta no encontrado"}</p>
        <Link to="/" className="btn btn-warning mt-3">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#14181c", minHeight: "100vh" }}
    >
      <div className="container">
        <Link to="/" className="btn btn-outline-warning mb-4">
          ← Volver
        </Link>

        <div className="card bg-dark text-light border-0">
          <div className="card-body">
            <h2 className="text-warning text-uppercase mb-3">
              {planet.name}
            </h2>

            <p className="text-muted mb-4">
              {planet.name} es un planeta del universo de Star Wars. Aquí puedes
              describirlo para tu vlog: ambiente, importancia, películas donde aparece, etc.
            </p>

            <hr className="border-secondary" />

            <div className="row mt-4">
              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Clima</p>
                <p className="mb-0">{planet.climate}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Terreno</p>
                <p className="mb-0">{planet.terrain}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Población</p>
                <p className="mb-0">{planet.population}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Diámetro</p>
                <p className="mb-0">{planet.diameter}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Gravedad</p>
                <p className="mb-0">{planet.gravity}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Rotación</p>
                <p className="mb-0">{planet.rotation_period}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Órbita</p>
                <p className="mb-0">{planet.orbital_period}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Agua superficial</p>
                <p className="mb-0">{planet.surface_water}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};