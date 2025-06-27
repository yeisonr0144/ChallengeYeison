import React from "react";

const suggestedTopics = [
    "Comprar más de una opción",
    "Costo y tiempo de envío",
    "Devoluciones gratis",
    "Medios de pago",
    "Garantía",
];

export default function ProductQuestions() {
    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preguntas</h2>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
                {suggestedTopics.map((topic, index) => (
                    <button
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition"
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* Input para preguntar */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pregúntale al vendedor
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition">
                        Preguntar
                    </button>
                </div>
            </div>
        </div>
    );
}
