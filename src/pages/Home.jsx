import React, { useEffect, useState } from "react";
import { PersonCard } from "../components/PersonCard.jsx";
import { PlanetCard } from "../components/PlanetCard.jsx";
import { VehicleCard } from "../components/VehicleCard.jsx";

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [peopleRes, planetsRes, vehiclesRes] = await Promise.all([
          fetch("https://www.swapi.tech/api/people?expanded=true"),
          fetch("https://www.swapi.tech/api/planets?expanded=true"),
          fetch("https://www.swapi.tech/api/vehicles?expanded=true"),
        ]);

        if (!peopleRes.ok || !planetsRes.ok || !vehiclesRes.ok) {
          throw new Error("Error cargando datos de SWAPI");
        }

        const peopleData = await peopleRes.json();
        const planetsData = await planetsRes.json();
        const vehiclesData = await vehiclesRes.json();

        setPeople(peopleData.results || []);
        setPlanets(planetsData.results || []);
        setVehicles(vehiclesData.results || []);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar los datos de Star Wars.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid py-5" style={{ backgroundColor: "#14181c" }}>
        <h2 className="text-warning">Cargando datos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5" style={{ backgroundColor: "#14181c" }}>
        <h2 className="text-danger">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#14181c" }}>
     
      <h2 className="fw-bold text-warning text-uppercase mb-3">Personajes</h2>
      <div className="d-flex flex-nowrap overflow-auto gap-3 pb-3">
        {people.map((p) => (
          <div key={p.uid} className="flex-shrink-0">
            <PersonCard
              id={p.uid}
              name={p.properties.name}
              gender={p.properties.gender}
              hair={p.properties.hair_color}
              eyeColor={p.properties.eye_color}
            />
          </div>
        ))}
      </div>

  
      <h2 className="fw-bold text-light text-uppercase mt-4 mb-3">Planetas</h2>
      <div className="d-flex flex-nowrap overflow-auto gap-3 pb-3">
        {planets.map((pl) => (
          <div key={pl.uid} className="flex-shrink-0">
            <PlanetCard
              id={pl.uid}
              name={pl.properties.name}
              population={pl.properties.population}
              climate={pl.properties.climate}
              terrain={pl.properties.terrain}
            />
          </div>
        ))}
      </div>

     
      <h2 className="fw-bold text-light text-uppercase mt-4 mb-3">Vehículos</h2>
      <div className="d-flex flex-nowrap overflow-auto gap-3 pb-3">
        {vehicles.map((v) => (
          <div key={v.uid} className="flex-shrink-0">
            <VehicleCard
              id={v.uid}
              name={v.properties.name}
              model={v.properties.model}
              manufacturer={v.properties.manufacturer}
              vehicleClass={v.properties.vehicle_class}
            />
          </div>
        ))}
      </div>
    </div>
  );
};