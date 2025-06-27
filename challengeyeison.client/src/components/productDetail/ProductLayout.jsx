import React from "react";
import PropTypes from "prop-types";
import "../../styles/meli.css";
import ImageGallery from "./ImageGallery";
import ProductDetail from "./ProductDetail";
import PaymentOptions from "./PaymentOptions";
import SellerInfo from "./SellerInfo";
import PriceInfo from "./PriceInfo";
import SellerCard from "./SellerCard";


// Componente de presentación puro
const ProductLayout = ({ product }) => {
    return (
        <div className="w-full max-w-[1210px] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-4">
                <span className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer">
                    Volver al listado
                </span>
            </div>

            {/* Grid principal compacto */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-white rounded-lg shadow-sm">
                {/* Columna combinada: Galería + Detalles producto */}
                <div className="md:col-span-9">
                    <div className="p-4 flex md:flex-row flex-col gap-4">
                        {/* Galería (65%) */}
                        <div className="w-full md:w-[65%] pr-2">
                            <div className="sticky top-24 self-start">
                                <ImageGallery images={product.images} />
                            </div>
                        </div>

                        {/* Detalles del producto (35%) */}
                        <div className="w-full md:w-[35%] pl-2">
                            <ProductDetail product={product} />
                        </div>
                    </div>
                </div>

                {/* Columna derecha independiente */}
                <div className="md:col-span-3">
                    <div className="p-4 space-y-4">
                        <PriceInfo product={product} />
                        <SellerCard seller={product.seller} />
                        <PaymentOptions options={product.payment} />
                        {/*<SellerInfo seller={product.seller} />*/}
                        
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