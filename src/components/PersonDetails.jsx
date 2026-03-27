
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/${id}`);

        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }

        const data = await res.json();
        console.log("Person details:", data);
        setPerson(data.result.properties);
      } catch (err) {
        console.error(err);
        setError("Error cargando el personaje");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5">
        <p className="text-warning">Cargando personaje...</p>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="container my-5">
        <p className="text-danger">{error || "Personaje no encontrado"}</p>
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
              {person.name}
            </h2>

            <p className="text-muted mb-4">
              {person.name} es un personaje del universo de Star Wars. Aquí
              puedes describirlo con tus propias palabras para tu vlog:
              historia, películas, personalidad, etc.
            </p>

            <hr className="border-secondary" />

            <div className="row mt-4">
              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Género</p>
                <p className="mb-0">{person.gender}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Altura</p>
                <p className="mb-0">{person.height} cm</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Masa</p>
                <p className="mb-0">{person.mass}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Año de
                  nacimiento</p>
                <p className="mb-0">{person.birth_year}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Cabello</p>
                <p className="mb-0">{person.hair_color}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Ojos</p>
                <p className="mb-0">{person.eye_color}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Piel</p>
                <p className="mb-0">{person.skin_color}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};