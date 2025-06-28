import React, { useState } from 'react';
import {
    TagIcon,
    CalendarIcon,
    CubeIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const hardcodedCharacteristics = {
    mainFeatures: {
        Marca: "Inter Miami",
        Modelo: "2024",
        Género: "Unisex",
        Edad: "Adultos",
        "Tipo de prenda": "Camiseta deportiva",
        "Formato de venta": "Unidad",
        "Diseño de la tela": "Estampa localizada"
    },
    otherFeatures: {
        "Es deportiva": "Sí",
        "Usos recomendados": "Deportivo",
        "Tipo de tela": "Dri-FIT",
        Composición: "100% Poliéster",
        "Material principal": "Poliéster",
        "Tipo de manga": "Corta",
        "Tipo de cuello": "Redondo",
        "Forma del calce": "Recto",
        "Con materiales reciclados": "Sí",
        "Con bordado": "No"
    },
    highlights: [
        {
            icon: <TagIcon />,
            label: "Marca",
            value: "Inter Miami",
        },
        {
            icon: <CubeIcon />,
            label: "Material principal",
            value: "Poliéster",
        },
        {
            icon: <CalendarIcon />,
            label: "Modelo",
            value: "2024",
        },
        {
            icon: <UserIcon />,
            label: "Tipo de prenda",
            value: "Camiseta deportiva",
        },
    ]
};

const ProductCharacteristics = ({ characteristics = hardcodedCharacteristics }) => {
    const { mainFeatures = {}, otherFeatures = {}, highlights = [] } = characteristics;
    const [expanded, setExpanded] = useState(false);

    // Mostrar solo primeros 5 si no está expandido
    const maxVisible = 5;
    const visibleMain = expanded ? Object.entries(mainFeatures) : Object.entries(mainFeatures).slice(0, maxVisible);
    const visibleOther = expanded ? Object.entries(otherFeatures) : Object.entries(otherFeatures).slice(0, maxVisible);

    return (
        <div className="mt-10 text-gray-800 font-sans w-full max-w-[1440px] mx-auto px-8 text-left">
            <h2 className="text-2xl font-semibold mb-6">Características del producto</h2>

            {/* Características destacadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-800">
                        <div className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full">
                            {React.cloneElement(item.icon, { className: "w-5 h-5 text-gray-700" })}
                        </div>
                        <p className="leading-tight">
                            {item.label}: <span className="font-semibold">{item.value}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Tablas de características */}
            <div className="grid md:grid-cols-2 gap-12">
                {/* Principales */}
                <div>
                    <h3 className="text-base font-semibold text-left mb-2">Características principales</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-xs text-left">
                            <tbody>
                                {visibleMain.map(([key, value], i) => (
                                    <tr key={key} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#ebebeb" }}>
                                        <td className="w-1/2 px-4 py-4 font-medium">{key}</td>
                                        <td className="w-1/2 px-4 py-4">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Otros */}
                <div>
                    <h3 className="text-base font-semibold text-left mb-2">Otros</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-xs text-left">
                            <tbody>
                                {visibleOther.map(([key, value], i) => (
                                    <tr key={key} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#ebebeb" }}>
                                        <td className="w-1/2 px-4 py-4 font-medium">{key}</td>
                                        <td className="w-1/2 px-4 py-4">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Botón Ver más / Ver menos */}
            <div className="mt-4">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-[#3483fa] text-sm font-normal hover:underline flex items-center gap-1"
                >
                    {expanded ? "Ver menos características" : "Ver todas las características"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#3483fa"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default ProductCharacteristics;
