import visa from "../../assets/payments/visa.svg";
import mastercard from "../../assets/payments/mastercard.svg";
import amex from "../../assets/payments/amex.svg";
import codensa from "../../assets/payments/codensa.svg";
import effecty from "../../assets/payments/effecty.svg";
import debitVisa from "../../assets/payments/visa_debit.svg";
import debitMaster from "../../assets/payments/mastercard_debit.svg";

export default function PaymentOptions() {
    return (
        <div className="payment-box bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Medios de pago</h3>

            <div className="bg-green-500 text-white rounded-md py-2 px-3 text-sm font-medium mb-4 flex items-center gap-2">
                <i className="ri-secure-payment-line"></i> {/* usa RemixIcon o cámbialo por un ícono SVG */}
                ¡Paga en hasta 12 cuotas con 0% interés!
            </div>

            <div className="mb-3">
                <p className="text-gray-800 font-medium mb-2">Tarjetas de crédito</p>
                <div className="flex gap-2 items-center">
                    <img src={visa} alt="Visa" className="h-6" />
                    <img src={mastercard} alt="Mastercard" className="h-6" />
                    <img src={amex} alt="American Express" className="h-6" />
                    <img src={codensa} alt="Codensa" className="h-6" />
                </div>
            </div>

            <div className="mb-3">
                <p className="text-gray-800 font-medium mb-2">Tarjetas de débito</p>
                <div className="flex gap-2 items-center">
                    <img src={debitVisa} alt="Visa Débito" className="h-6" />
                    <img src={debitMaster} alt="Mastercard Débito" className="h-6" />
                </div>
            </div>

            <div className="mb-3">
                <p className="text-gray-800 font-medium mb-2">Efectivo</p>
                <div className="flex gap-2 items-center">
                    <img src={effecty} alt="Efecty" className="h-6" />
                </div>
            </div>

            <a href="#" className="text-blue-500 text-sm hover:underline mt-2 block">
                Conoce otros medios de pago
            </a>
        </div>
    );
}
