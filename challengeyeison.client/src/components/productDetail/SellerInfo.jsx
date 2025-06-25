export default function SellerInfo({ seller }) {
    if (!seller) return null;

    return (
        <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Informaci�n del vendedor</h3>
            <p className="text-sm text-gray-800">
                Nombre: <span className="font-medium">{seller.name}</span>
            </p>
            <p className="text-sm text-gray-600">Ubicaci�n: {seller.location}</p>
            <p className="text-sm text-gray-600">Reputaci�n: {seller.reputation}</p>
        </div>
    );
}
