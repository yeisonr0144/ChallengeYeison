import React from 'react';
import PropTypes from 'prop-types';

const PaymentOptions = ({ stock }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            {/* Stock y envío */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-green-600">Stock disponible</span>
                    <span className="text-gray-700">
                        {stock > 0 ? `${stock} unidades` : 'Sin stock'}
                    </span>
                </div>

                {/* Envío gratis */}
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">Envío gratis</span>
                    <span className="text-gray-600">a todo el país</span>
                </div>

                {/* Ubicación */}
                <div className="text-gray-600 text-sm">
                    Conoce los tiempos y las formas de envío
                </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
                <button 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={stock === 0}
                >
                    Comprar ahora
                </button>
                <button 
                    className="w-full bg-blue-100 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                    disabled={stock === 0}
                >
                    Agregar al carrito
                </button>
            </div>

            {/* Beneficios */}
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <span>Compra Protegida</span>
                    <span className="text-xs">•</span>
                    <span>recibe el producto que esperabas o te devolvemos tu dinero</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <span>Mercado Puntos</span>
                    <span className="text-xs">•</span>
                    <span>Sumas 180 puntos</span>
                </div>
            </div>
        </div>
    );
};

PaymentOptions.propTypes = {
    stock: PropTypes.number.isRequired,
};

export default PaymentOptions;
