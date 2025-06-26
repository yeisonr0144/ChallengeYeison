import React from "react";
import PropTypes from "prop-types";
import "../../styles/meli.css";
import ImageGallery from "./ImageGallery";
import ProductDetail from "./ProductDetail";
import PaymentOptions from "./PaymentOptions";
import SellerInfo from "./SellerInfo";

// Componente de presentación puro
const ProductLayout = ({ product }) => {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-4">
                <span className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer">
                    Volver al listado
                </span>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Columna izquierda - Galería (6 columnas) */}
                <div className="md:col-span-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                        <ImageGallery images={product.images} />
                    </div>
                </div>

                {/* Columna central - Información del producto (3 columnas) */}
                <div className="md:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                        <ProductDetail product={product} />
                    </div>
                </div>

                {/* Columna derecha - Información de compra y vendedor (3 columnas) */}
                <div className="md:col-span-3 space-y-4">
                    {/* Sección de precios y compra */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="space-y-4">
                            <PaymentOptions options={product.payment} />
                            <SellerInfo seller={product.seller} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductLayout.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductLayout; 