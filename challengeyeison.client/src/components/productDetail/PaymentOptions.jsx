import visa from "../../assets/payments/visa.svg";
import mastercard from "../../assets/payments/mastercard.svg";
import amex from "../../assets/payments/amex.svg";
import codensa from "../../assets/payments/codensa.svg";
import effecty from "../../assets/payments/effecty.svg";
import debitVisa from "../../assets/payments/visa_debit.svg";
import debitMaster from "../../assets/payments/mastercard_debit.svg";

export default function PaymentOptions() {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-sm">
            {/* Título */}
            <h3 className="text-lg text-gray-900 mb-4">Medios de pago</h3>

            {/* Alerta */}
            <div className="bg-[#00a650] text-white rounded-md px-3 py-2 text-sm font-medium mb-5 flex items-center gap-2">
                {/* Ícono (puedes reemplazar por uno mejor si usas RemixIcon o Heroicons) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ¡Paga en hasta 12 cuotas con 0% interés!
            </div>

            {/* Crédito */}
            <div className="mb-4">
                <p className="text-gray-800 font-medium mb-2">Tarjetas de crédito</p>
                <div className="flex gap-3 items-center">
                    <img src={visa} alt="Visa" className="h-6" />
                    <img src={mastercard} alt="Mastercard" className="h-6" />
                    <img src={amex} alt="American Express" className="h-6" />
                    <img src={codensa} alt="Codensa" className="h-6" />
                </div>
            </div>

            {/* Débito */}
            <div className="mb-4">
                <p className="text-gray-800 font-medium mb-2">Tarjetas de débito</p>
                <div className="flex gap-3 items-center">
                    <img src={debitVisa} alt="Visa Débito" className="h-6" />
                    <img src={debitMaster} alt="Mastercard Débito" className="h-6" />
                </div>
            </div>

            {/* Efectivo */}
            <div className="mb-4">
                <p className="text-gray-800 font-medium mb-2">Efectivo</p>
                <div className="flex gap-3 items-center">
                    <img src={effecty} alt="Efecty" className="h-6" />
                </div>
            </div>

            {/* Link adicional */}
            <a href="#" className="text-blue-500 text-sm hover:underline mt-2 inline-block">
                Conoce otros medios de pago
            </a>
        </div>
    );
}
