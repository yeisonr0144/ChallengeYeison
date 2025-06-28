import visa from "../../assets/payments/visa.svg";
import mastercard from "../../assets/payments/mastercard.svg";
import amex from "../../assets/payments/amex.svg";
import codensa from "../../assets/payments/codensa.svg";
import effecty from "../../assets/payments/effecty.svg";
import debitVisa from "../../assets/payments/visa_debit.svg";
import debitMaster from "../../assets/payments/mastercard_debit.svg";
import { CreditCardIcon } from "@heroicons/react/24/outline";


export default function PaymentOptions() {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-sm">
            {/* Título */}
            <h3 className="text-lg text-gray-900 mb-4 text-left">Medios de pago</h3>

            {/* Alerta */}
            <div className="bg-[#00a650] text-white rounded-md px-4 py-3 text-sm font-medium mb-5 flex items-center gap-3 text-left">
                <CreditCardIcon className="h-5 w-5 text-white flex-shrink-0" />
                <p className="leading-snug">
                    ¡Paga en hasta <span className="font-semibold">12 cuotas</span> con <span className="font-semibold">0% interés</span>!
                </p>
            </div>

            {/* Crédito */}
            <div className="mb-4">
                <p className="text-gray-800 font-normal mb-2 text-left text-[15px]">Tarjetas de crédito</p>
                <div className="flex gap-3 items-center">
                    <img src={visa} alt="Visa" className="h-6" />
                    <img src={mastercard} alt="Mastercard" className="h-6" />
                    <img src={amex} alt="American Express" className="h-6" />
                    <img src={codensa} alt="Codensa" className="h-6" />
                </div>
            </div>

            {/* Débito */}
            <div className="mb-4">
                <p className="text-gray-800 font-normal mb-2 text-left text-[15px]">Tarjetas de débito</p>
                <div className="flex gap-3 items-center">
                    <img src={debitVisa} alt="Visa Débito" className="h-6" />
                    <img src={debitMaster} alt="Mastercard Débito" className="h-6" />
                </div>
            </div>

            {/* Efectivo */}
            <div className="mb-4">
                <p className="text-gray-800 font-normal mb-2 text-left text-[15px]">Efectivo</p>
                <div className="flex gap-3 items-center">
                    <img src={effecty} alt="Efecty" className="h-6" />
                </div>
            </div>

            {/* Link adicional */}
            <a href="#" className="text-blue-500 text-sm hover:underline mt-2 block text-left">
                Conoce otros medios de pago
            </a>
        </div>
    );
}
