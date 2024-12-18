import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Estilos globais

// Renderiza a aplicação
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
