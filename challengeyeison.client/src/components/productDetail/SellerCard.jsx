import React from 'react';
import {
    ChatBubbleLeftRightIcon,
    ClockIcon,
    CheckCircleIcon
} from "@heroicons/react/24/solid";

const MedalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {/* Cinta superior */}
        <path d="M8 2H16L14 8H10L8 2Z" fill="#fff" stroke="#00a650" strokeWidth="2" />

        {/* Círculo medalla */}
        <circle cx="12" cy="14" r="5" fill="#fff" stroke="#00a650" strokeWidth="2" />

        {/* Estrella dentro de la medalla (opcional) */}
        <path
            d="M12 11.5L13.09 13.63L15.45 13.91L13.72 15.42L14.18 17.77L12 16.6L9.82 17.77L10.28 15.42L8.55 13.91L10.91 13.63L12 11.5Z"
            fill="#00a650"
        />
    </svg>
);

const BubbleCheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mx-auto mb-1">
        <path d="M4 4H20V14H7L4 17V4Z" stroke="#666" strokeWidth="2" fill="#fff" />
        <circle cx="17" cy="7" r="3" fill="#00a650" />
        <path d="M16 7L17 8L19 6" stroke="#fff" strokeWidth="2" />
    </svg>
);
const ClockCheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mx-auto mb-1">
        <circle cx="12" cy="12" r="8" stroke="#666" strokeWidth="2" fill="#fff" />
        <path d="M12 8V12H15" stroke="#666" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" fill="#00a650" />
        <path d="M16 17L17 18L19 16" stroke="#fff" strokeWidth="2" />
    </svg>
);


import PropTypes from 'prop-types';

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
                            {seller.metrics && `+${seller.metrics.completedSales} ventas concretadas`}
                        </p>
                    </div>
                </div>

                {/* Botón flotante */}
                <button className="absolute right-0 -top-1 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 font-medium">
                    Seguir
                </button>
            </div>

            {/* Nivel MercadoLíder */}
            {seller.level && (
                <>
                    <div className="mb-2 text-left flex items-center text-green-600 font-semibold text-sm">
                    <MedalIcon />
                         {seller.level}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{seller.levelDescription}</p>
                </>
            )}

            {/* Barra de reputación */}
            <div className="flex w-full h-1 gap-x-1 overflow-hidden mb-4">
                <div className="flex-1 bg-[#f23d4f] rounded-l-full"></div>
                <div className="flex-1 bg-[#ff7733]"></div>
                <div className="flex-1 bg-[#ffe600]"></div>
                <div className="flex-1 bg-[#aadb1e]"></div>
                <div className="flex-1 bg-[#00a650] rounded-r-full"></div>
            </div>

            {/* Métricas */}
            {seller.metrics && (
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-700 mb-4">
                    <div>
                        <div className="font-semibold text-sm">{seller.metrics.completedSales.toLocaleString()}</div>
                        <p className="text-[11px] text-gray-500 mt-1">Ventas concretadas</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <BubbleCheckIcon />
                        <p className="text-[11px] text-gray-500 mt-1">
                            {seller.metrics?.badges?.find(badge => badge.type === 'customerService')?.text || 'Brinda buena atención'}
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <ClockCheckIcon />
                        <p className="text-[11px] text-gray-500 mt-1">
                            {seller.metrics?.badges?.find(badge => badge.type === 'delivery')?.text || 'Entrega sus productos a tiempo'}
                        </p>
                    </div>
                </div>
            )}


            {/* Botón */}
            <button className="w-full bg-blue-50 text-blue-600 text-sm font-medium py-2 rounded hover:bg-blue-100 transition">
                Ir a la página del vendedor
            </button>
        </div>
    );
};

SellerCard.propTypes = {
    seller: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string,
        level: PropTypes.string,
        levelDescription: PropTypes.string,
        badges: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                text: PropTypes.string,
                icon: PropTypes.string,
            })
        ),
        metrics: PropTypes.shape({
            completedSales: PropTypes.number,
            customerServiceRating: PropTypes.number,
            onTimeDeliveryRating: PropTypes.number,
            cancellationRate: PropTypes.number,
            claimRate: PropTypes.number,
            badges: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string,
                    text: PropTypes.string,
                    icon: PropTypes.string,
                })
            ),
        }),
    }).isRequired,
};

export default SellerCard;
