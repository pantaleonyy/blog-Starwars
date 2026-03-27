import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../components/FavoritesContext.jsx";

import { PersonCard } from "../components/PersonCard.jsx";
import { PlanetCard } from "../components/PlanetCard.jsx";
import { VehicleCard } from "../components/VehicleCard.jsx";

export const Favorites = () => {
  const { favorites } = useFavorites();

  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const favoritePeopleIds = useMemo(
    () =>
      favorites
        .filter((x) => x.startsWith("people-"))
        .map((x) => x.replace("people-", "")),
    [favorites]
  );

  const favoritePlanetIds = useMemo(
    () =>
      favorites
        .filter((x) => x.startsWith("planet-"))
        .map((x) => x.replace("planet-", "")),
    [favorites]
  );

  const favoriteVehicleIds = useMemo(
    () =>
      favorites
        .filter((x) => x.startsWith("vehicle-"))
        .map((x) => x.replace("vehicle-", "")),
    [favorites]
  );

  useEffect(() => {
    const fetchMany = async (baseUrl, ids) => {
      const results = await Promise.allSettled(
        ids.map(async (id) => {
          const res = await fetch(`${baseUrl}/${id}`);
          if (!res.ok) throw new Error(`${baseUrl}/${id} -> ${res.status}`);
          const data = await res.json();
          return data.result?.properties;
        })
      );

     
      return results
        .filter((r) => r.status === "fulfilled" && r.value)
        .map((r) => r.value);
    };

    const loadFavs = async () => {
      try {
        setLoading(true);
        setError(null);

        const [peopleData, planetsData, vehiclesData] = await Promise.all([
          fetchMany("https://www.swapi.tech/api/people", favoritePeopleIds),
          fetchMany("https://www.swapi.tech/api/planets", favoritePlanetIds),
          fetchMany("https://www.swapi.tech/api/vehicles", favoriteVehicleIds),
        ]);

        setPeople(peopleData);
        setPlanets(planetsData);
        setVehicles(vehiclesData);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar algunos favoritos (SWAPI a veces limita requests).");
      } finally {
        setLoading(false);
      }
    };

    loadFavs();
  }, [favoritePeopleIds, favoritePlanetIds, favoriteVehicleIds]);

  const totalFavorites = people.length + planets.length + vehicles.length;

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#14181c",
        minHeight: "100vh",
        color: "#a1a1a1",
      }}
    >
      <Link to="/" className="btn btn-outline-warning mb-3 ms-3">
        <i className="fa-solid fa-arrow-left me-2"></i>
        Volver
      </Link>

      <div className="container">
        <h2 className="fw-bold text-warning text-uppercase mb-4">Favoritos</h2>

        {loading && <p>Cargando favoritos...</p>}

        {!loading && favorites.length === 0 && <p>No tienes favoritos todavía.</p>}

        {!loading && error && <p className="text-danger">{error}</p>}

        {!loading && favorites.length > 0 && totalFavorites === 0 && (
          <p>
            Tienes favoritos guardados, pero no se pudieron cargar (posible límite de requests).
          </p>
        )}

        {!loading && people.length > 0 && (
          <>
            <h4 className="text-warning text-uppercase mt-4 mb-3">Personajes</h4>
            <div className="d-flex flex-wrap">
              {people.map((p) => (
                <PersonCard
                  key={p.name}
                  id={p.url?.split("/").pop()} 
                  name={p.name}
                  gender={p.gender}
                  hair={p.hair_color}
                  eyeColor={p.eye_color}
                />
              ))}
            </div>
          </>
        )}

        {!loading && planets.length > 0 && (
          <>
            <h4 className="text-warning text-uppercase mt-5 mb-3">Planetas</h4>
            <div className="d-flex flex-wrap">
              {planets.map((pl) => (
                <PlanetCard
                  key={pl.name}
                  id={pl.url?.split("/").pop()}
                  name={pl.name}
                  population={pl.population}
                  climate={pl.climate}
                  terrain={pl.terrain}
                />
              ))}
            </div>
          </>
        )}

        {!loading && vehicles.length > 0 && (
          <>
            <h4 className="text-warning text-uppercase mt-5 mb-3">Vehículos</h4>
            <div className="d-flex flex-wrap">
              {vehicles.map((v) => (
                <VehicleCard
                  key={v.name}
                  id={v.url?.split("/").pop()}
                  name={v.name}
                  model={v.model}
                  manufacturer={v.manufacturer}
                  vehicleClass={v.vehicle_class}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};