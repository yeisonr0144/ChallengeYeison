import React from "react";
import "../../styles/meli.css";
import ImageGallery from "./ImageGallery";
import PriceInfo from "./PriceInfo";
import PaymentOptions from "./PaymentOptions";
import SellerInfo from "./SellerInfo";

// Componente de presentación puro
export default function ProductLayout({ 
    product,
    loading,
    error
}) {
    if (loading) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="animate-pulse bg-gray-200 h-8 w-48 mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-96 w-full"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );

    if (!product) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <p className="text-gray-500 text-lg">Producto no encontrado</p>
        </div>
    );

    return (
        <div className="body-wrapper">
            {/* Breadcrumb */}
            <div className="max-w-[1200px] mx-auto p-4">
                <span className="text-sm text-gray-500">
                    Volver al listado
                </span>
            </div>

            <div className="body-container">
                {/* Columna principal - Galería e información */}
                <div className="body-main">
                    <ImageGallery images={product.images} />
                    <div className="mt-8">
                        <h1 className="text-2xl font-normal mb-4">{product.title}</h1>
                        {/* Aquí puedes agregar más detalles del producto */}
                    </div>
                </div>

                {/* Columna lateral - Precio y acciones */}
                <div className="body-sidebar">
                    <div className="sticky top-4">
                        <PriceInfo
                            title={product.title}
                            price={product.price}
                            stock={product.stock}
                        />
                        <PaymentOptions options={product.payment} />
                        <SellerInfo seller={product.seller} />
                    </div>
                </div>
            </div>
        </div>
    );
} 