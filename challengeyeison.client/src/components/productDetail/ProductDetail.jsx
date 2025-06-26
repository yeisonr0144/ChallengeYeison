import React from "react";
import PropTypes from 'prop-types';

const ProductDetail = ({ product }) => {
    // Renderizar estrellas basado en el rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-blue-500" : "text-gray-300"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="space-y-6">
            {/* Título y calificaciones */}
            <div className="product-header">
                <div className="flex items-center gap-2 text-sm text-blue-500 mb-1">
                    <span>{product.condition}</span>
                    <span>|</span>
                    <span>+{product.soldQuantity} vendidos</span>
                </div>
                <h1 className="text-2xl text-gray-800 mb-2">
                    {product.title}
                </h1>
                <div className="flex items-center gap-3">
                    <div className="flex text-lg">
                        {renderStars(product.rating.average)}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-lg font-semibold">{product.rating.average}</span>
                        <span className="text-gray-500">({product.rating.totalReviews} calificaciones)</span>
                    </div>
                </div>
            </div>

            {/* Precios y descuentos */}
            <div className="product-price space-y-2">
                {product.discountPercentage > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="line-through text-gray-400">$ {product.originalPrice.toLocaleString()}</span>
                        <span className="text-base text-gray-500">{product.discountPercentage}% OFF</span>
                    </div>
                )}
                <div className="flex items-center gap-3">
                    <span className="text-4xl font-medium">$ {product.price.toLocaleString()}</span>
                </div>
                {product.payment && product.payment.length > 0 && (
                    <div className="text-green-600">
                        en {product.payment[0].installments} cuotas de $ {(product.payment[0].amount).toLocaleString()} con 0% interés
                    </div>
                )}
                <div className="text-blue-500 text-sm hover:text-blue-700 cursor-pointer">
                    Ver los medios de pago
                </div>
            </div>

            {/* Cupón de descuento */}
            <div className="bg-blue-50 p-3 rounded-lg inline-block">
                <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-medium">$ 80.000 OFF</span>
                    <span className="text-gray-600">con el cupón</span>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">COMPRAMELI</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Compra mínima $1.299.900
                </div>
            </div>

            {/* Variantes del producto */}
            <div className="product-options space-y-6">
                {product.variants && product.variants
                    .reduce((groups, variant) => {
                        const group = groups.find(g => g.type === variant.type);
                        if (group) {
                            group.items.push(variant);
                        } else {
                            groups.push({ type: variant.type, items: [variant] });
                        }
                        return groups;
                    }, [])
                    .map(group => (
                        <div key={group.type}>
                            <h3 className="text-gray-700 mb-3 capitalize">{group.type}:</h3>
                            <div className="flex gap-4">
                                {group.items.map(variant => (
                                    <button
                                        key={variant.value}
                                        className={`flex flex-col items-center gap-2 ${
                                            variant.isSelected ? 'opacity-100' : 'opacity-60'
                                        }`}
                                    >
                                        {variant.imageUrl && (
                                            <div 
                                                className={`w-12 h-12 rounded-lg border-2 ${
                                                    variant.isSelected ? 'border-blue-500' : 'border-gray-200'
                                                }`}
                                                style={variant.type === 'color' ? {
                                                    backgroundColor: variant.value,
                                                } : {
                                                    backgroundImage: `url(${variant.imageUrl})`,
                                                    backgroundSize: 'cover'
                                                }}
                                            />
                                        )}
                                        <span className="text-sm">{variant.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Especificaciones técnicas */}
            <div className="product-specs mt-8">
                <h3 className="text-xl text-gray-800 mb-4">Características principales</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Especificaciones principales */}
                            {product.specifications && Object.entries(product.specifications)
                                .filter(([key]) => key !== 'additionalSpecs')
                                .map(([key, value]) => value && (
                                    <div key={key}>
                                        <h4 className="text-gray-500 capitalize">{key}</h4>
                                        <p className="text-gray-700">{value}</p>
                                    </div>
                                ))
                            }
                            
                            {/* Especificaciones adicionales */}
                            {product.specifications?.additionalSpecs && 
                                Object.entries(product.specifications.additionalSpecs)
                                    .map(([key, value]) => (
                                        <div key={key}>
                                            <h4 className="text-gray-500 capitalize">{key}</h4>
                                            <p className="text-gray-700">{value}</p>
                                        </div>
                                    ))
                            }

                            {/* Información del vendedor */}
                            <div>
                                <h4 className="text-gray-500">Vendedor</h4>
                                <p className="text-gray-700">{product.seller.name}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500">Ubicación</h4>
                                <p className="text-gray-700">{product.seller.location}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500">Reputación</h4>
                                <p className="text-gray-700">{product.seller.reputation}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500">Stock disponible</h4>
                                <p className="text-gray-700">{product.stock} unidades</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetail.propTypes = {
    product: PropTypes.shape({
        condition: PropTypes.string.isRequired,
        soldQuantity: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            average: PropTypes.number.isRequired,
            totalReviews: PropTypes.number.isRequired,
        }).isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        discountPercentage: PropTypes.number,
        payment: PropTypes.arrayOf(
            PropTypes.shape({
                installments: PropTypes.number.isRequired,
                amount: PropTypes.number.isRequired,
            })
        ),
        variants: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
                isSelected: PropTypes.bool.isRequired,
                imageUrl: PropTypes.string,
            })
        ),
        specifications: PropTypes.shape({
            additionalSpecs: PropTypes.object,
        }),
        seller: PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            reputation: PropTypes.string.isRequired,
        }).isRequired,
        stock: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductDetail;