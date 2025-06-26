import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // si usas estilos
import './styles/meli.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
