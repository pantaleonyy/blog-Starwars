import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout";
import { StoreProvider } from "./hooks/useGlobalReducer";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <StoreProvider>
      <Layout />
    </StoreProvider>
  </React.StrictMode>
);