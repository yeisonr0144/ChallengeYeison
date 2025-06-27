import React from 'react';

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
            icon: "🔖",
            label: "Marca",
            value: "Inter Miami"
        },
        {
            icon: "👕",
            label: "Material principal",
            value: "Poliéster"
        },
        {
            icon: "📅",
            label: "Modelo",
            value: "2024"
        },
        {
            icon: "📌",
            label: "Tipo de prenda",
            value: "Camiseta deportiva"
        }
    ]
};

const ProductCharacteristics = ({ characteristics = hardcodedCharacteristics }) => {
    const { mainFeatures = {}, otherFeatures = {}, highlights = [] } = characteristics;

    return (
        <div className="mt-10 text-gray-800 font-sans w-full max-w-[1440px] mx-auto px-8">
            <h2 className="text-2xl font-semibold mb-6">Características del producto</h2>

            {/* Características destacadas */}
            {highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-lg text-gray-700">
                            <div className="text-2xl leading-none">
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium leading-tight">{item.label}</span>
                                <span className="text-gray-800 leading-tight">{item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-12">
                {/* Características principales */}
                <div>
                    <h3 className="text-base font-semibold text-left mb-2">Características principales</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-xs text-left">
                            <tbody>
                                {Object.entries(mainFeatures).map(([key, value], i) => (
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
                                {Object.entries(otherFeatures).map(([key, value], i) => (
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
        </div>
    );
};

export default ProductCharacteristics;
