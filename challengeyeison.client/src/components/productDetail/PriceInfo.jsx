export default function PriceInfo({ title, price, stock }) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-3xl text-green-600 font-bold">${price?.toLocaleString('es-CO')}</p>
            <p className="text-sm text-gray-600 mt-1">
                {stock > 0 ? `Stock disponible: ${stock}` : 'Sin stock'}
            </p>
            <button
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={stock === 0}
            >
                Comprar ahora
            </button>
        </div>
    );
}
