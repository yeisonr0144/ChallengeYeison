import React, { useState } from "react";

const ratingDetails = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 1 },
];

const characteristics = [
    { name: "Relación precio-calidad", stars: 5 },
    { name: "Durabilidad", stars: 5 },
    { name: "Calidad de la imagen", stars: 5 },
    { name: "Velocidad al usarlo", stars: 5 },
    { name: "Duración de la batería", stars: 5 },
];

const reviews = [
    {
        rating: 5,
        text: "Es un portátil muy rápido y adecuado para diseñar, producir y jugar. Destaca por su buena relación calidad/precio y su diseño estético atractivo.",
        votes: 5,
    },
    {
        rating: 4,
        text: "Excelente producto. !!! Viene tal cual como ellos lo indican. Recomendado 100%%%%.",
        votes: 4,
    },
    {
        rating: 5,
        text: "Un producto multitarea, no lo uso para jugar, pero sí uso 2 pantallas y abro muchas pestañas de chrome, frameworks, etc. Revise el equipo y la batería y todo bien.",
        votes: 3,
    },
    {
        rating: 5,
        text: "Me ha funcionado muy bien para trabajo remoto. La batería dura bastante.",
        votes: 2,
    },
    {
        rating: 5,
        text: "Diseño elegante y excelente rendimiento. Lo recomiendo.",
        votes: 6,
    },
];

export default function ProductReviews() {
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

    return (
        <div className="pt-10 mt-10 border-t border-gray-200 text-sm text-left">
            <h2 className="text-xl text-gray-800 mb-6">Opiniones del producto</h2>

            <div className="grid md:grid-cols-12 gap-6">
                {/* Columna izquierda */}
                <div className="md:col-span-4 space-y-6">
                    <div>
                        <div className="text-4xl font-medium text-blue-600">4.9</div>
                        <div className="flex items-center gap-1 text-blue-600 text-lg">
                            {"★★★★★".split("").map((s, i) => (
                                <span key={i}>★</span>
                            ))}
                        </div>
                        <div className="text-gray-600 mt-1">32 calificaciones</div>
                    </div>

                    {/* Barras de estrellas */}
                    <div className="space-y-1">
                        {ratingDetails.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-4 text-gray-600 text-sm">{item.stars}★</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full"
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Características */}
                    <div>
                        <h3 className="text-gray-800 font-medium text-sm mb-2">
                            Calificación de características
                        </h3>
                        <div className="space-y-2">
                            {characteristics.map((char, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="text-gray-700">{char.name}</span>
                                    <span className="text-blue-600">{"★".repeat(char.stars)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna derecha: comentarios */}
                <div className="md:col-span-8 space-y-6">
                    {/* Filtros */}
                    <div className="flex items-center gap-4">
                        <select className="border border-gray-300 text-sm px-3 py-1 rounded-full focus:outline-none bg-white">
                            <option>Ordenar</option>
                        </select>
                        <select className="border border-gray-300 text-sm px-3 py-1 rounded-full focus:outline-none bg-white">
                            <option>Calificación</option>
                        </select>
                    </div>

                    {/* Comentarios */}
                    <div>
                        <h3 className="text-gray-800 font-medium text-sm mb-2">
                            Opiniones destacadas
                        </h3>
                        <p className="text-gray-500 text-xs mb-4">10 comentarios</p>
                        <div className="space-y-8">
                            {visibleReviews.map((review, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </div>
                                    <p className="text-gray-800 leading-relaxed">{review.text}</p>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 text-xs text-gray-700 border border-gray-300 bg-white px-4 py-1.5 rounded-full hover:bg-gray-100 transition">
                                            <span>¿Te fue útil?</span>
                                            <span>👍</span>
                                            <span className="text-gray-500">({review.votes})</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mostrar más opiniones */}
                        {reviews.length > 3 && (
                            <button
                                className="mt-6 text-blue-500 text-sm hover:underline"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "Mostrar menos opiniones" : "Mostrar todas las opiniones"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
