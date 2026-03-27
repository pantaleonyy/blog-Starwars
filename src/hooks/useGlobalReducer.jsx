
import { createContext, useContext, useReducer } from "react";
import { initialStore, reducer } from "../store.js";

const GlobalContext = createContext();


export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialStore);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default function useGlobalReducer() {
  return useContext(GlobalContext);
}