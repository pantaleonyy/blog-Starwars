
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);

        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }

        const data = await res.json();
        console.log("Vehicle details:", data);
        setVehicle(data.result.properties);
      } catch (err) {
        console.error(err);
        setError("Error cargando el vehículo");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5">
        <p className="text-warning">Cargando vehículo...</p>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container my-5">
        <p className="text-danger">{error || "Vehículo no encontrado"}</p>
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
              {vehicle.name}
            </h2>

            <p className="text-muted mb-4">
              {vehicle.name} es un vehículo del universo de Star Wars. Aquí puedes
              describirlo para tu vlog: en qué escenas aparece, qué lo hace especial, etc.
            </p>

            <hr className="border-secondary" />

            <div className="row mt-4">
              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Modelo</p>
                <p className="mb-0">{vehicle.model}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Fabricante</p>
                <p className="mb-0">{vehicle.manufacturer}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Clase</p>
                <p className="mb-0">{vehicle.vehicle_class}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Costo</p>
                <p className="mb-0">{vehicle.cost_in_credits}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Longitud</p>
                <p className="mb-0">{vehicle.length}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Tripulación</p>
                <p className="mb-0">{vehicle.crew}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Pasajeros</p>
                <p className="mb-0">{vehicle.passengers}</p>
              </div>

              <div className="col-6 col-md-3 mb-3">
                <p className="text-uppercase text-warning mb-1">Velocidad máx.</p>
                <p className="mb-0">{vehicle.max_atmosphering_speed}</p>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-12 col-md-6 mb-3">
                <p className="text-uppercase text-warning mb-1">Consumibles</p>
                <p className="mb-0">{vehicle.consumables}</p>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <p className="text-uppercase text-warning mb-1">Capacidad de carga</p>
                <p className="mb-0">{vehicle.cargo_capacity}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};