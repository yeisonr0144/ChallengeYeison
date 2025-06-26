import React from "react";
import "../../styles/meli.css";

export default function BodyLayout() {
    return (
        <div className="body-wrapper">
            <div className="body-container">
                <div className="body-main">

                    {/* Aqu� va la info del producto */}
                    <h2>Nombre del Producto</h2>
                    <p>Detalles, im�genes, descripci�n, etc.</p>
                </div>
                <div className="body-sidebar">
                    {/* Aqu� va la info adicional */}
                    <h3>Precio</h3>
                    <p>Bot�n de compra, datos del vendedor, etc.</p>
                </div>
            </div>
        </div>
    );
}