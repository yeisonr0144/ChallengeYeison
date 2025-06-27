import React from "react";
import PropTypes from 'prop-types';
import { useState } from 'react';



const ProductDetail = ({ product }) => {
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const productFeatures = product.features || [
        "Unidades por pack: 1.",
        "Es bloqueador.",
        "Es resistente al agua.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es hipoalergénico.",
        "Es libre de parabenos.",
        // Puedes añadir más para probar el truncamiento
    ];

    const maxVisible = 5;
    const visibleFeatures = showAllFeatures ? productFeatures : productFeatures.slice(0, maxVisible);


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
        <div className="relative">
            {/* Icono de corazón */}
            <button className="absolute top-0 right-0 text-gray-500 hover:text-red-500 transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 7.86c0 4.745-6.752 8.486-9.752 11.14-3-2.654-9.752-6.395-9.752-11.14A5.252 5.252 0 0112 5.248a5.252 5.252 0 019.752 2.612z"
                    />
                </svg>
            </button>
            <div className="space-y-6 text-left">
                {/* Etiquetas superiores */}
                <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">MÁS VENDIDO</span>
                    <span className="text-blue-600 underline text-xs cursor-pointer">17º en Portátiles Lenovo</span>
                </div>

                {/* Título y calificaciones */}
                <div>
                    <div className="text-sm text-gray-500">
                        {product.condition || 'Nuevo'} | +{product.soldQuantity || 0} vendidos
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                        {product.title}
                    </h1>
                    {product.rating && (
                        <div className="flex items-center gap-2 text-sm mt-1">
                            <div className="flex text-lg">
                                {renderStars(product.rating.average)}
                            </div>
                            <span className="text-gray-600">({product.rating.totalReviews} opiniones)</span>
                        </div>
                    )}
                </div>

                {/* Oferta del día */}
                <div className="space-y-2">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">OFERTA DEL DÍA</span>

                    {/* Precio original y descuento */}
                    {product.originalPrice && product.discountPercentage > 0 && (
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="line-through">$ {product.originalPrice.toLocaleString()}</span>
                            <span className="ml-2 text-green-600 font-semibold text-sm">{product.discountPercentage}% OFF</span>
                        </div>
                    )}

                    {/* Precio actual */}
                    <div className="text-4xl font-semibold text-gray-800">
                        $ {product.price.toLocaleString()}
                    </div>

                    {/* Cuotas */}
                    {product.payment && product.payment.length > 0 && (
                        <div className="text-sm text-gray-800">
                            en <span className="text-green-600">{product.payment[0].installments} cuotas de $ {(product.payment[0].amount).toLocaleString()} con 0% interés</span>
                        </div>
                    )}
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">
                        Ver los medios de pago
                    </div>
                </div>

                {/* Cupón */}
                <div className="flex items-center gap-2 text-sm">
                    <button className="bg-blue-600 text-white px-2 py-1 text-xs rounded font-semibold">Cupón</button>
                    <span className="text-gray-700 text-xs">$ 80.000 OFF. Compra mínima $1.299.900</span>
                </div>

                {/* Variantes del producto */}
                {product.variants && product.variants.length > 0 && (
                    <div className="product-options space-y-6">
                        {product.variants
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
                                    <h3 className="text-gray-700 mb-2 capitalize text-sm">{group.type}:</h3>
                                    <div className="flex gap-3">
                                        {group.items.map(variant => (
                                            <button
                                                key={variant.value}
                                                className={`flex flex-col items-center gap-1 border px-2 py-2 rounded text-xs ${variant.isSelected ? 'border-blue-500' : 'border-gray-300'
                                                    }`}
                                            >
                                                {variant.imageUrl && (
                                                    <img
                                                        src={variant.imageUrl}
                                                        alt={variant.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                )}
                                                <span className="text-gray-700">{variant.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
                {/* Características destacadas */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">Lo que tienes que saber de este producto</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                        {visibleFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>

                    {productFeatures.length > maxVisible && (
                        <button
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                            className="text-blue-500 text-sm hover:underline mt-1"
                        >
                            {showAllFeatures ? "Ver menos" : "Ver características"}
                        </button>
                    )}
                </div>

            </div>
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
        variants: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                name: PropTypes.string,
                value: PropTypes.string,
                isSelected: PropTypes.bool,
                imageUrl: PropTypes.string,
            })
        ),
        specifications: PropTypes.shape({
            additionalSpecs: PropTypes.object,
        }),
        seller: PropTypes.shape({
            name: PropTypes.string,
            location: PropTypes.string,
            reputation: PropTypes.string,
        }),
        stock: PropTypes.number,
    })
};

export default ProductDetail;
