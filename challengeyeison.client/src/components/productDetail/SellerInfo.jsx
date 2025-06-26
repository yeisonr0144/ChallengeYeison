import React from 'react';
import PropTypes from 'prop-types';

const SellerInfo = ({ seller }) => {
    if (!seller) return null;

    const getReputationColor = (rep) => {
        const levels = {
            'Muy buena': 'bg-green-500',
            'Buena': 'bg-green-400',
            'Regular': 'bg-yellow-500',
            'Mala': 'bg-red-500'
        };
        return levels[rep] || 'bg-gray-300';
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Información del vendedor</h2>
            
            {/* Nombre y ubicación */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">{seller.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Ubicación:</span>
                    <span>{seller.location}</span>
                </div>
            </div>

            {/* Reputación */}
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Reputación:</span>
                    <span className={`px-2 py-0.5 rounded text-white text-sm ${getReputationColor(seller.reputation)}`}>
                        {seller.reputation}
                    </span>
                </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                    <div className="text-2xl font-light text-gray-700">97%</div>
                    <div className="text-xs text-gray-500">Ventas concretadas</div>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                    <div className="text-2xl font-light text-gray-700">98%</div>
                    <div className="text-xs text-gray-500">Calificación positiva</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-light text-gray-700">2h</div>
                    <div className="text-xs text-gray-500">Tiempo de respuesta</div>
                </div>
            </div>

            {/* Botón de contacto */}
            <button className="w-full text-blue-500 text-sm hover:text-blue-700 cursor-pointer mt-4">
                Hacer una pregunta al vendedor
            </button>
        </div>
    );
};

SellerInfo.propTypes = {
    seller: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        reputation: PropTypes.string.isRequired
    }).isRequired
};

export default SellerInfo;
