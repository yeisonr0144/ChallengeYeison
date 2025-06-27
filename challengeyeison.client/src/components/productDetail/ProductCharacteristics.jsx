import React from 'react';

const hardcodedCharacteristics = {
    mainFeatures: {
        brand: "Inter Miami",
        model: "2024",
        gender: "Unisex",
        age: "Adultos",
        garmentType: "Camiseta deportiva",
        mainMaterial: "Poliéster",
        fabricDesign: "Estampa localizada",
        printDesign: "Logo del equipo"
    },
    otherFeatures: {
        isSportsWear: "Sí",
        recommendedUses: "Deportivo",
        fabricType: "Dri-FIT",
        mainMaterial: "100% Poliéster",
        sleeveType: "Corta",
        neckType: "Redondo",
        hemType: "Recto",
        hasRecycledMaterials: "Sí"
    }
};

const ProductCharacteristics = ({ characteristics = hardcodedCharacteristics }) => {
    // Si no hay características, no renderizamos nada
    if (!characteristics) return null;

    const { mainFeatures = {}, otherFeatures = {} } = characteristics;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Características del producto</h2>
            
            {/* Características principales resumidas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        {/* SVG placeholder for brand icon */}
                    </div>
                    <span>Marca: {mainFeatures?.brand || 'No especificada'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        {/* SVG placeholder for material icon */}
                    </div>
                    <span>Material principal: {mainFeatures?.mainMaterial || 'No especificado'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        {/* SVG placeholder for design icon */}
                    </div>
                    <span>Diseño De La Tela: {mainFeatures?.fabricDesign || 'No especificado'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        {/* SVG placeholder for print icon */}
                    </div>
                    <span>Diseño Impreso: {mainFeatures?.printDesign || 'No especificado'}</span>
                </div>
            </div>

            {/* Tablas de características detalladas */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Características principales */}
                {Object.keys(mainFeatures).length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Características principales</h3>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            {Object.entries(mainFeatures).map(([key, value], index) => (
                                <div key={key} className={`flex ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                    <div className="w-1/2 p-3 font-medium">{key}</div>
                                    <div className="w-1/2 p-3">{value || 'No especificado'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Otros detalles */}
                {Object.keys(otherFeatures).length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Otros</h3>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            {Object.entries(otherFeatures).map(([key, value], index) => (
                                <div key={key} className={`flex ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                    <div className="w-1/2 p-3 font-medium">{key}</div>
                                    <div className="w-1/2 p-3">{value || 'No especificado'}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCharacteristics;