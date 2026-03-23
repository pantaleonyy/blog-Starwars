import { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  people: [],
  favorites: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...state, people: action.payload };

    case "ADD_FAVORITE":
      if (state.favorites.includes(action.payload)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(f => f !== action.payload)
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const actions = {
    getPeople: async () => {
      const resp = await fetch("https://www.swapi.tech/api/people");
      const data = await resp.json();
      dispatch({ type: "SET_PEOPLE", payload: data.results });
    },

    addFavorite: (name) => {
      dispatch({ type: "ADD_FAVORITE", payload: name });
    },

    removeFavorite: (name) => {
      dispatch({ type: "REMOVE_FAVORITE", payload: name });
    }
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalReducer = () => useContext(StoreContext);