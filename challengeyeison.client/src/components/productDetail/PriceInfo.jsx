import QuantitySelect from "../QuantitySelect";

export default function PriceInfo({ stock, sellerName }) {
    console.log('🔵 PriceInfo props:', { stock, sellerName });
    
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm w-full font-sans">
            {/* Envío */}   
            <div className="mb-2 leading-tight">
                <p className="text-green-600 font-medium text-sm text-left">
                    Envío gratis <span className="text-gray-800">a todo el país</span>
                </p>
                <p className="text-xs text-gray-500 text-left">
                    Conoce los tiempos y las formas de envío.{" "}
                    <span className="text-blue-500 hover:underline cursor-pointer text-xs">
                        Calcular cuándo llega
                    </span>
                </p>
            </div>

            {/* Stock + Cantidad */}
            <div className="my-4">
                <p className="text-base font-semibold text-gray-900 text-left mb-1">Stock disponible</p>

                <div className="flex items-center text-sm text-gray-800 gap-1">
                    <span className="text-gray-800">Cantidad:</span>

                    {/* Componente con unidad y flecha */}
                    <div className="flex items-center">
                        <QuantitySelect stock={stock} />
                    </div>

                    <span className="text-[10px] text-gray-500 whitespace-nowrap">({stock} disponibles)</span>
                </div>
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
            <div className="text-xs text-gray-800 mb-4 leading-snug text-left">
                Vendido por{" "}
                <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                    {sellerName}
                </span>
                <br />
                <span className="text-gray-500">MercadoLíder | +5mil ventas</span>
            </div>

            {/* Beneficios */}
            <ul className="space-y-3 text-xs text-gray-800 text-left">
                <li className="flex items-start gap-2 leading-tight text-gray-500">
                    <span className="text-gray-600 mt-0.5">↩️</span>
                    <span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            Devolución gratis
                        </span >. Tienes 30 días desde que lo recibes.
                    </span>
                </li>
                <li className="flex items-start gap-2 leading-tight text-gray-600">
                    <span className="text-gray-600 mt-0.5">🔒</span>
                    <span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                            Compra Protegida
                        </span>, recibe el producto que esperabas o te devolvemos tu dinero.
                    </span>
                </li>
                <li className="flex items-start gap-2 leading-tight text-gray-500">
                    <span className="text-gray-600 mt-0.5">🛠️</span>
                    <span>12 meses de garantía de fábrica.</span>
                </li>
            </ul>
        </div>
    );
}
