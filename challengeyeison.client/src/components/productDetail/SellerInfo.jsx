import React from 'react';
import PropTypes from 'prop-types';

const SellerInfo = ({ seller }) => {
    const { name, location, reputation, metrics } = seller;

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
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Información del vendedor</h2>
            
            {/* Nombre y ubicación */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Ubicación:</span>
                    <span>{location}</span>
                </div>
            </div>

            {/* Reputación */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Reputación:</span>
                    <span className={`px-2 py-0.5 rounded text-white text-sm ${getReputationColor(reputation)}`}>
                        {reputation}
                    </span>
                </div>
            </div>

            {/* Métricas */}
            {metrics && (
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200">
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-700">{metrics.sales}</div>
                        <div className="text-xs text-gray-500">Ventas concretadas</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-200">
                        <div className="text-2xl font-light text-gray-700">{metrics.rating}%</div>
                        <div className="text-xs text-gray-500">Calificación positiva</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-light text-gray-700">{metrics.responseTime}h</div>
                        <div className="text-xs text-gray-500">Tiempo de respuesta</div>
                    </div>
                </div>
            )}

            {/* Botón de contacto */}
            <button className="w-full text-blue-500 text-sm hover:text-blue-700 cursor-pointer">
                Hacer una pregunta al vendedor
            </button>
        </div>
    );
};

SellerInfo.propTypes = {
    seller: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        reputation: PropTypes.string.isRequired,
        metrics: PropTypes.shape({
            sales: PropTypes.number,
            rating: PropTypes.number,
            responseTime: PropTypes.number
        })
    }).isRequired
};

export default SellerInfo;
