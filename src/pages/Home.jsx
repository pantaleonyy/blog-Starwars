import React, { useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

const Home = () => {
  const { store, actions } = useGlobalReducer();

  useEffect(() => {
    actions.getPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Star Wars 🚀</h1>

      <div className="row">
        {store.people.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card p-3 m-3">
              <h5>{item.name}</h5>

              <button
                className="btn btn-primary"
                onClick={() => actions.addFavorite(item.name)}
              >
                ⭐ Favorito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;