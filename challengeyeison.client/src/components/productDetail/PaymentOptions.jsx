export default function PaymentOptions({ options }) {
    if (!options || options.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Opciones de pago</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
                {options.map((opt, index) => (
                    <li key={index}>
                        {opt.method} - {opt.installments} cuotas de ${opt.amount?.toLocaleString('es-CO')}
                    </li>
                ))}
            </ul>
        </div>
    );
}
