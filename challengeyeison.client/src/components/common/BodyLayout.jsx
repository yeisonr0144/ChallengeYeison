import React from "react";
import "../../styles/meli.css";

export default function BodyLayout() {
    return (
        <div className="body-wrapper">
            <div className="body-container">
                <div className="body-main">

                    {/* Aquí va la info del producto */}
                    <h2>Nombre del Producto</h2>
                    <p>Detalles, imágenes, descripción, etc.</p>
                </div>
                <div className="body-sidebar">
                    {/* Aquí va la info adicional */}
                    <h3>Precio</h3>
                    <p>Botón de compra, datos del vendedor, etc.</p>
                </div>
            </div>
        </div>
    );
}