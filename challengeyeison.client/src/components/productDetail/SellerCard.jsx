import React from 'react';

const SellerCard = ({ seller }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm w-full">
            {/* Cabecera: Logo + Nombre + Seguir */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={seller.logo || "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.9/mercadolibre/logo__large_plus.png"}
                        alt="Logo vendedor"
                        className="w-12 h-12 rounded-md object-contain"
                    />
                    <div>
                        <p className="font-semibold text-gray-900 leading-none">{seller.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">
                            +{seller.followers} Seguidores · +{seller.products} Productos
                        </p>
                    </div>
                </div>
                <button className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 font-medium">
                    Seguir
                </button>
            </div>

            {/* Nivel MercadoLíder */}
            <div className="text-green-600 text-sm font-medium mb-1">🏅 MercadoLíder Platinum</div>
            <p className="text-xs text-gray-600 mb-3">¡Uno de los mejores del sitio!</p>

            {/* Barra de reputación */}
            <div className="flex h-2 overflow-hidden rounded mb-3">
                <div className="w-1/5 bg-red-400"></div>
                <div className="w-1/5 bg-orange-400"></div>
                <div className="w-1/5 bg-yellow-400"></div>
                <div className="w-1/5 bg-lime-400"></div>
                <div className="w-1/5 bg-green-500"></div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 text-center text-xs text-gray-700 mb-4">
                <div>
                    <div className="font-semibold text-sm">+5mil</div>
                    <p className="text-[11px] text-gray-500 mt-1">Ventas concretadas</p>
                </div>
                <div>
                    <div className="text-green-600 text-base">👍</div>
                    <p className="text-[11px] text-gray-500 mt-1">Brinda buena atención</p>
                </div>
                <div>
                    <div className="text-green-600 text-base">⏱️</div>
                    <p className="text-[11px] text-gray-500 mt-1">Entrega sus productos a tiempo</p>
                </div>
            </div>

            {/* Botón */}
            <button className="w-full bg-blue-50 text-blue-600 text-sm font-medium py-2 rounded hover:bg-blue-100 transition">
                Ir a la página del vendedor
            </button>
        </div>
    );
};

export default SellerCard;
