import React from "react";
import PropTypes from "prop-types";

const ProductDetail = ({ product }) => {
    if (!product) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        );
    }

    const renderStars = (rating = 0) => {
        return (
            <div className="flex items-center gap-2">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                            key={star} 
                            className={`text-lg ${star <= rating ? 'text-blue-500' : 'text-gray-300'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span className="text-gray-500 text-sm">
                    ({product.rating?.totalReviews || 0})
                </span>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* Estado y vendidos */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{product.condition === 'new' ? 'Nuevo' : 'Usado'}</span>
                <span>|</span>
                <span>{product.soldQuantity || 0} vendidos</span>
            </div>

            {/* Título y calificaciones */}
            <div>
                <h1 className="text-xl font-normal text-gray-800 mb-1">
                    {product.title}
                </h1>
                {renderStars(product.rating?.average)}
            </div>

            {/* Precio y descuento */}
            <div className="mt-6">
                {product.originalPrice && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                            $ {product.originalPrice.toLocaleString()}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="text-green-600 text-sm">
                                {product.discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                )}
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl">$</span>
                    <span className="text-4xl font-light">
                        {Math.floor(product.price).toLocaleString()}
                    </span>
                    <span className="text-xl">
                        {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
                    </span>
                </div>
                {product.payment && product.payment[0] && (
                    <div className="text-base text-gray-700">
                        en {product.payment[0].installments} cuotas de{' '}
                        <span className="font-medium">
                            $ {product.payment[0].amount.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            {/* Cupón de descuento */}
            {product.coupon && (
                <div className="bg-blue-50 p-3 rounded-lg inline-block mt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">
                            $ {product.coupon.amount.toLocaleString()} OFF
                        </span>
                        <span className="text-gray-600">con el cupón</span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                            {product.coupon.code}
                        </span>
                    </div>
                    {product.coupon.minAmount && (
                        <div className="text-xs text-gray-500 mt-1">
                            Compra mínima ${product.coupon.minAmount.toLocaleString()}
                        </div>
                    )}
                </div>
            )}

            {/* Características principales */}
            <div className="mt-8">
                <h2 className="text-lg font-medium mb-4">Características principales</h2>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    {product.specifications && Object.entries(product.specifications)
                        .filter(([key]) => key !== 'additionalSpecs' && Boolean(key))
                        .map(([key, value]) => value && (
                            <div key={key} className="py-2 px-1">
                                <h3 className="text-gray-500 text-sm capitalize">{key}</h3>
                                <p className="text-gray-700">{value}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Descripción */}
            {product.description && (
                <div className="mt-8">
                    <h2 className="text-lg font-medium mb-4">Descripción</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                        {product.description}
                    </p>
                </div>
            )}
        </div>
    );
};

ProductDetail.propTypes = {
    product: PropTypes.shape({
        condition: PropTypes.string,
        soldQuantity: PropTypes.number,
        title: PropTypes.string,
        rating: PropTypes.shape({
            average: PropTypes.number,
            totalReviews: PropTypes.number,
        }),
        price: PropTypes.number,
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
        specifications: PropTypes.object,
        description: PropTypes.string,
    })
};

export default ProductDetail;