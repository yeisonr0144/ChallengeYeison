import React from "react";

const suggestedTopics = [
    "Comprar más de una opción",
    "Costo y tiempo de envío",
    "Devoluciones gratis",
    "Medios de pago",
    "Garantía"
];

export default function ProductQuestions() {
    return (
        <div className="mt-8 pt-6 text-left">
            {/* Título */}
            <h2 className="text-2xl font-normal text-gray-900 mb-4">Preguntas</h2>

            {/* Subtítulo */}
            <p className="text-base font-medium text-gray-800 mb-3">¿Qué quieres saber?</p>

            {/* Botones sugeridos */}
            <div className="flex flex-wrap gap-2 mb-6">
                {suggestedTopics.map((topic, index) => (
                    <button
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm px-3 py-2 rounded-md hover:bg-blue-200 transition text-left"
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* Formulario de pregunta */}
            <div>
                <label className="block text-base font-medium text-gray-800 mb-1">
                    Pregúntale al vendedor
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button className="bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-blue-600 transition">
                        Preguntar
                    </button>
                </div>
            </div>
        </div>
    );
}
