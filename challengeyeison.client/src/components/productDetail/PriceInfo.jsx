export default function PriceInfo({ title, price, stock }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm w-full font-sans">
            {/* Envío */}
            <div className="mb-2 leading-tight">
                <p className="text-green-600 font-medium text-sm">
                    Envío gratis <span className="text-gray-800">a todo el país</span>
                </p>
                <p className="text-xs text-gray-500">
                    Conoce los tiempos y las formas de envío.{" "}
                    <span className="text-blue-500 hover:underline cursor-pointer text-xs">
                        Calcular cuándo llega
                    </span>
                </p>
            </div>

            {/* Stock */}
            <div className="my-4">
                <p className="text-base font-semibold text-gray-900">¡Última disponible!</p>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2 mb-4">
                <button
                    className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition"
                    disabled={stock === 0}
                >
                    Comprar ahora
                </button>
                <button
                    className="w-full px-4 py-2 bg-blue-100 text-blue-500 text-sm font-semibold rounded cursor-not-allowed"
                    disabled
                >
                    Agregar al carrito
                </button>
            </div>

            {/* Vendedor */}
            <div className="text-xs text-gray-800 mb-4 leading-snug">
                Vendido por{" "}
                <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                    NEW TECNOLOGIES
                </span>
                <br />
                <span className="text-gray-500">MercadoLíder | +5mil ventas</span>
            </div>

            {/* Beneficios */}
            <ul className="space-y-3 text-xs text-gray-800">
                <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-600 mt-0.5">↩️</span>
                    <span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            Devolución gratis
                        </span>. Tienes 30 días desde que lo recibes.
                    </span>
                </li>
                <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-600 mt-0.5">🔒</span>
                    <span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            Compra Protegida
                        </span>, recibe el producto que esperabas o te devolvemos tu dinero.
                    </span>
                </li>
                <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-600 mt-0.5">🛠️</span>
                    <span>12 meses de garantía de fábrica.</span>
                </li>
            </ul>
        </div>
    );
}
