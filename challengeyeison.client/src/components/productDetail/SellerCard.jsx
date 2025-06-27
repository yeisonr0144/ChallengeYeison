import React from 'react';

const SellerCard = ({ seller }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm w-full">
            {/* Cabecera: Logo + Nombre + Seguir */}
            <div className="relative flex flex-wrap items-start gap-y-2 mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={
                            seller.logo ||
                            "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.9/mercadolibre/logo__large_plus.png"
                        }
                        alt="Logo vendedor"
                        className="w-12 h-12 rounded-md object-contain"
                    />
                    <div>
                        <p className="font-semibold text-sm text-gray-900 leading-none truncate max-w-[110px]">
                            {seller.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                            +{5} Seguidores · +{15} Productos
                        </p>
                    </div>
                </div>

                {/* Botón flotante */}
                <button className="absolute right-0 -top-1 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 font-medium">
                    Seguir
                </button>
            </div>

            {/* Nivel MercadoLíder */}
            <div className="text-green-600 text-sm font-medium mb-1 text-left">🏅 MercadoLíder</div>
            <p className="text-xs text-gray-600 mb-3 text-left">¡Uno de los mejores del sitio!</p>

            {/* Barra de reputación */}
            <div className="flex w-full h-1 gap-x-1 overflow-hidden">
                <div className="flex-1 bg-[#f23d4f] rounded-l-full"></div>     
                <div className="flex-1 bg-[#ff7733]"></div>
                <div className="flex-1 bg-[#ffe600]"></div>
                <div className="flex-1 bg-[#aadb1e]"></div>
                <div className="flex-1 bg-[#00a650] rounded-r-full"></div>
            </div>


            {/* Métricas */}
            <div className="grid grid-cols-3 text-center text-xs text-gray-700 mb-4">
                <div>
                    <div className="font-semibold text-sm">+5mil</div>
                    <p className="text-[11px] text-gray-500 mt-1">Ventas concretadas</p>
                </div>
                <div>
                    <div className="text-green-600 text-base">💬</div>
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
