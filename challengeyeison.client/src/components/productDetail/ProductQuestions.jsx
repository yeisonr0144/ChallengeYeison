import React, { useState } from "react";

const suggestedTopics = [
    "Comprar más de una opción",
    "Costo y tiempo de envío",
    "Devoluciones gratis",
    "Medios de pago",
    "Garantía"
];

export default function ProductQuestions() {
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newQuestion = {
            text: question,
            date: new Date().toLocaleDateString(),
            id: Date.now()
        };

        setQuestions([newQuestion, ...questions]);
        setQuestion("");
    };

    const handleTopicClick = (topic) => {
        setQuestion(topic);
    };

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
                        onClick={() => handleTopicClick(topic)}
                        className="bg-blue-100 text-blue-700 text-sm px-3 py-2 rounded-md hover:bg-blue-200 transition text-left"
                        type="button"
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* Formulario de pregunta */}
            <form onSubmit={handleSubmit}>
                <label className="block text-base font-medium text-gray-800 mb-1">
                    Pregúntale al vendedor
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-blue-600 transition"
                    >
                        Preguntar
                    </button>
                </div>
            </form>

            {/* Lista de preguntas */}
            {questions.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-base font-medium text-gray-800 mb-4">
                        Última realizada
                    </h3>
                    <div className="space-y-6">
                        {questions.map((q) => (
                            <div key={q.id} className="border-b border-gray-200 pb-4">
                                <p className="text-gray-800 mb-2">{q.text}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">{q.date}</span>
                                    <button className="text-blue-500 hover:underline">
                                        Denunciar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
