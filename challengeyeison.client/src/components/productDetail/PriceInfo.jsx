import React from 'react';
import PropTypes from 'prop-types';

const PriceInfo = ({ price, originalPrice, discountPercentage, payment, coupon }) => {
    return (
        <div className="space-y-2">
            {/* Precio original y descuento */}
            {originalPrice && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                        $ {originalPrice.toLocaleString()}
                    </span>
                    {discountPercentage > 0 && (
                        <span className="text-green-600 text-sm">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
            )}

            {/* Precio actual */}
            <div className="flex items-baseline gap-1">
                <span className="text-3xl">$</span>
                <span className="text-4xl font-light">
                    {Math.floor(price).toLocaleString()}
                </span>
                <span className="text-xl">
                    {((price % 1) * 100).toFixed(0).padStart(2, '0')}
                </span>
            </div>

            {/* Información de cuotas */}
            {payment && payment[0] && (
                <div className="text-base text-gray-700">
                    en {payment[0].installments} cuotas de{' '}
                    <span className="font-medium">
                        $ {payment[0].amount.toLocaleString()}
                    </span>
                </div>
            )}

            {/* Link a medios de pago */}
            <button className="text-blue-500 text-sm hover:text-blue-700 cursor-pointer">
                Ver los medios de pago
            </button>

            {/* Cupón de descuento */}
            {coupon && (
                <div className="bg-blue-50 p-3 rounded-lg inline-block mt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">
                            $ {coupon.amount.toLocaleString()} OFF
                        </span>
                        <span className="text-gray-600">con el cupón</span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                            {coupon.code}
                        </span>
                    </div>
                    {coupon.minAmount && (
                        <div className="text-xs text-gray-500 mt-1">
                            Compra mínima ${coupon.minAmount.toLocaleString()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

PriceInfo.propTypes = {
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discountPercentage: PropTypes.number,
    payment: PropTypes.arrayOf(
        PropTypes.shape({
            installments: PropTypes.number,
            amount: PropTypes.number,
        })
    ),
    coupon: PropTypes.shape({
        amount: PropTypes.number,
        code: PropTypes.string,
        minAmount: PropTypes.number,
    }),
};

export default PriceInfo;
