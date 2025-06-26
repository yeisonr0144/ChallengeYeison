import React from "react";
import "../../styles/meli.css";
import ImageGallery from "../productDetail/ImageGallery";
import PriceInfo from "../productDetail/PriceInfo";
import PaymentOptions from "../productDetail/PaymentOptions";
import SellerInfo from "../productDetail/SellerInfo";

const BodyLayout = ({ children }) => {
    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Columna izquierda - Galería */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <h2 className="text-gray-700">Galería de Imágenes</h2>
                </div>

                {/* Columna central - Información del producto */}
                <div className="col-span-6 bg-white p-4 rounded-lg">
                    <div className="space-y-4">
                        <div className="product-header">
                            <h1 className="text-xl font-semibold text-gray-800">Título del Producto</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-blue-500">★★★★★</div>
                                <span className="text-gray-500">(100 vendidos)</span>
                            </div>
                        </div>

                        <div className="product-price">
                            <div className="line-through text-gray-400">$ 4.661.250</div>
                            <div className="text-2xl font-semibold">$ 3.444.900</div>
                            <div className="text-green-600 text-sm">
                                en 12 cuotas de $ 287.075 con 0% interés
                            </div>
                        </div>

                        <div className="product-options">
                            <div className="mb-4">
                                <h3 className="text-gray-700 mb-2">Color:</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 border-2 border-blue-500 rounded-lg"></div>
                                    <span>Luna Grey</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha - Información de compra */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <div className="space-y-4">
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                            Comprar ahora
                        </button>
                        <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg">
                            Agregar al carrito
                        </button>
                        
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Información del vendedor</h3>
                            <div className="text-sm text-gray-600">
                                <p>Vendido por NEW TECHNOLOGIES</p>
                                <p>MercadoLíder | +5mil ventas</p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <span>✓</span>
                                <span>Envío gratis a todo el país</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <span>✓</span>
                                <span>Devolución gratis</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>✓</span>
                                <span>12 meses de garantía</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyLayout;