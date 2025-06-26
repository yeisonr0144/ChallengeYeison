import React from 'react';

const SellerCard = ({ seller }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            {/* Cabecera del vendedor */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">NT</span>
                </div>
                <div>
                    <h3 className="font-medium">NEW TECHNOLOGIES</h3>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-blue-600">MercadoLíder Platinum</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">Seguir</span>
                    </div>
                </div>
            </div>

            {/* Estadísticas del vendedor */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="border-r">
                    <div className="text-sm text-gray-600">+5mil</div>
                    <div className="text-xs text-gray-500">Ventas concretadas</div>
                </div>
                <div className="border-r">
                    <div className="text-sm text-gray-600">
                        <span className="text-green-500">97%</span>
                    </div>
                    <div className="text-xs text-gray-500">Brinda buena atención</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">
                        <span className="text-green-500">98%</span>
                    </div>
                    <div className="text-xs text-gray-500">Entrega sus productos a tiempo</div>
                </div>
            </div>

            {/* Ubicación */}
            <div className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Ubicación</span>
                <p>{seller.location}</p>
            </div>

            {/* Reputación */}
            <div className="mb-4">
                <div className="flex h-2 mb-1">
                    <div className="w-1/5 bg-red-400"></div>
                    <div className="w-1/5 bg-orange-400"></div>
                    <div className="w-1/5 bg-yellow-400"></div>
                    <div className="w-1/5 bg-lime-400"></div>
                    <div className="w-1/5 bg-green-400"></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                    {seller.reputation}
                </div>
            </div>

            {/* Botón de ver más */}
            <button className="w-full text-blue-600 text-sm py-2 hover:bg-blue-50 rounded-lg transition-colors">
                Ir a la página del vendedor
            </button>
        </div>
    );
};

export default SellerCard; 