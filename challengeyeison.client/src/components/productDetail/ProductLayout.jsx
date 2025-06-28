import React from "react";
import PropTypes from "prop-types";
import ImageGallery from "./ImageGallery";
import ProductDetail from "./ProductDetail";
import PaymentOptions from "./PaymentOptions";
import PriceInfo from "./PriceInfo";
import SellerCard from "./SellerCard";
import ProductQuestions from "../ProductQuestions";
import ProductReviews from "../ProductReviews";
import ProductCharacteristics from './ProductCharacteristics';

const ProductLayout = ({ product, seller }) => {
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
                        <div className="w-full md:w-[35%] pt-6">
                            <ProductDetail product={product} seller={seller} />
                        </div>
                    </div>

                    <div className="p-4 flex md:flex-row flex-col gap-4">
                        {/*<ProductCharacteristics characteristics={product.characteristics} />*/}
                        <ProductCharacteristics />
                    </div>
                </div>
               
                {/* Columna derecha independiente */}
                <div className="md:col-span-3">
                    <div className="p-4 space-y-4">
                        <PriceInfo stock={product.stock} sellerName={seller?.name || product.seller.name} />
                        <SellerCard seller={seller || product.seller} />
                        <PaymentOptions options={product.payment} />
                    </div>
                </div>

                {/* Línea divisoria que ocupa todo el ancho */}
                <div className="col-span-12 border-t border-gray-200" />

                {/* Sección de preguntas alineada a la izquierda como la columna principal */}
                <div className="md:col-span-9">
                    <div className="px-6 pb-6">
                        <ProductQuestions />
                        <ProductReviews />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductLayout.propTypes = {
    product: PropTypes.object.isRequired,
    seller: PropTypes.object,
};

export default ProductLayout;
