import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext.jsx"; 

export const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <nav
      className="navbar navbar-dark"
      style={{
        backgroundColor: "#000000",
        borderBottom: "2px solid #f5c518",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/StarWarsLogo.jpeg"
            alt="Star Wars"
            style={{ height: "100px" }}
          />
        </Link>

        <Link
          to="/favorites"
          className="btn btn-outline-warning position-relative"
          style={{ borderRadius: "50%" }}
        >
          <i className="fa-solid fa-heart"></i>

          {favorites.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};