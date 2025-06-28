import React, { useState } from "react";
import StarIcon from "../common/StarIcon";

export default function ProductReviews({ reviews: reviewData }) {
    const [showAll, setShowAll] = useState(false);

    if (!reviewData) {
        return null;
    }

    const { rating, ratingDetails, characteristics, reviews } = reviewData;
    const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

    return (
        <div className="pt-10 mt-10 border-t border-gray-200 text-sm text-left">
            <h2 className="text-xl text-gray-800 mb-6">Opiniones del producto</h2>

            <div className="grid md:grid-cols-12 gap-6">
                {/* Columna izquierda */}
                <div className="md:col-span-4 space-y-6">
                    <div className="flex items-start gap-4">
                        {/* Calificación numérica */}
                        <div className="text-4xl font-medium text-[#3483fa]">{rating.average}</div>

                        {/* Estrellas + texto debajo */}
                        <div className="flex flex-col items-start">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={`rating-star-${i}`} className="w-4 h-4 text-blue-600 fill-[#3483fa]" />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{rating.totalReviews} calificaciones</p>
                        </div>
                    </div>

                    {/* Barras de estrellas */}
                    <div className="space-y-2">
                        {ratingDetails.map((item, i) => (
                            <div key={`rating-detail-${i}`} className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                                    <div
                                        className="h-full bg-[#999999]"
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                                <span className="flex items-center text-gray-400 text-sm min-w-[40px]">
                                    {item.stars}
                                    <span className="text-[13px] ml-1.5">★</span>
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Características */}
                    <div>
                        <h3 className="text-gray-800 font-medium text-sm mb-3">
                            Calificación de características
                        </h3>
                        <div className="space-y-4">
                            {characteristics.map((char, i) => (
                                <div key={`characteristic-${i}`} className="flex flex-col items-start">
                                    <span className="text-gray-700 text-sm">{char.name}</span>
                                    <div className="flex gap-0.5 mt-1 text-blue-600 fill-[#3483fa]">
                                        {[...Array(char.stars)].map((_, j) => (
                                            <StarIcon key={`char-star-${i}-${j}`} className="text-blue-600 w-4 h-4" />
                                        ))}
                                    </div>
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
                        <p className="text-gray-500 text-xs mb-4">{reviews.length} comentarios</p>
                        <div className="space-y-8">
                            {visibleReviews.map((review, i) => (
                                <div key={`review-${i}`} className="space-y-3">
                                    <div className="flex gap-0.5 text-base">
                                        {[...Array(review.rating)].map((_, j) => (
                                            <StarIcon key={`review-star-${i}-${j}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-800 leading-relaxed text-sm">{review.text}</p>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 text-xs text-gray-700 border border-gray-300 bg-white px-4 py-1.5 rounded-full hover:bg-gray-100 transition">
                                            <span>¿Te fue útil?</span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.02125 6.25775L5.87824 5.91279L8.37994 0.751802L9.40301 1.24803C10.7777 1.91481 11.4317 3.50825 10.9218 4.94852L10.6452 5.72977L13.4447 5.69542C13.737 5.69184 14.0274 5.74166 14.3018 5.84245C15.546 6.29952 16.184 7.67866 15.727 8.92284L14.5609 12.0968C13.8627 13.9974 11.9079 15.1293 9.91198 14.7887L6.35827 14.1822L5.11866 14.1974L5.13337 15.3972L0.984325 15.4481L0.859204 5.24885L5.00825 5.19795L5.02125 6.25775ZM6.75603 6.85303L8.93573 2.3563C9.72188 2.77187 10.0895 3.7038 9.79057 4.54802L8.93988 6.95078L13.4594 6.89533C13.6056 6.89354 13.7508 6.91845 13.888 6.96885C14.5101 7.19738 14.8291 7.88695 14.6006 8.50904L13.4345 11.683C12.9358 13.0406 11.5395 13.8491 10.1139 13.6058L6.50639 12.9901L6.39809 12.9816L5.10394 12.9975L5.03705 7.54496L6.75603 6.85303ZM3.91858 14.212L2.16951 14.2334L2.07383 6.43404L3.82306 6.41258L3.91858 14.212Z" fill="black" fillOpacity="0.55"></path>
                                            </svg>
                                            <span className="text-gray-500">({review.votes})</span>
                                        </button>
                                        <span className="text-gray-400 text-xs ml-auto">{review.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mostrar más opiniones */}
                        {reviews.length > 3 && (
                            <button
                                className="mt-6 text-blue-600 text-sm hover:underline"
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
