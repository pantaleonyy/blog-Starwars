import React from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Star Wars Blog</span>

      <div className="dropdown">
        <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
          Favoritos ({store.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item">No hay favoritos</li>
          ) : (
            store.favorites.map((fav, i) => (
              <li key={i} className="dropdown-item d-flex justify-content-between">
                {fav}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => actions.removeFavorite(fav)}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;