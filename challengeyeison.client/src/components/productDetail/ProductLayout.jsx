import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import ImageGallery from "./ImageGallery";
import ProductDetail from "./ProductDetail";
import PaymentOptions from "./PaymentOptions";
import PriceInfo from "./PriceInfo";
import SellerCard from "./SellerCard";
import ProductQuestions from "./ProductQuestions";
import ProductReviews from "./ProductReviews";
import ProductCharacteristics from './ProductCharacteristics';

const ProductLayout = ({ product, seller, reviews }) => {
    const firstColor = product.variants.find(v => v.type === "color")?.value;
    const [selectedColor, setSelectedColor] = useState(firstColor || null);

    // Obtener imágenes según color
    const selectedVariantImages =
        product.variants.find((v) => v.type === "color" && v.value === selectedColor)?.images || product.images;

    return (
        <div className="w-full max-w-[1210px] mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-4">
                <span className="text-sm text-gray-500 hover:text-blue-500 cursor-pointer">
                    Volver al listado
                </span>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 bg-white rounded-lg shadow-sm">
                {/* Sección Principal (Galería + Detalles) */}
                <div className="xl:col-span-9 flex flex-col">
                    {/* Contenedor Galería + Detalles */}
                    <div className="flex flex-col xl:flex-row gap-4 p-4">
                        {/* Galería - Se expande a full width < 1280px */}
                        <div className="w-full xl:w-[65%]">
                            <div className="sticky top-24">
                                <ImageGallery images={selectedVariantImages} />
                            </div>
                        </div>
                        
                        {/* Detalles Producto - Va debajo en < 1280px */}
                        <div className="w-full xl:w-[35%]">
                            <ProductDetail 
                                product={product} 
                                seller={seller} 
                                selectedColor={selectedColor} 
                                setSelectedColor={setSelectedColor} 
                            />
                        </div>
                    </div>

                    {/* Características */}
                    <div className="p-4">
                        <ProductCharacteristics />
                    </div>
                </div>

                {/* Columna Derecha - Va al final en < 1280px */}
                <div className="xl:col-span-3">
                    <div className="p-4 space-y-4">
                        <PriceInfo 
                            stock={product.stock} 
                            sellerName={seller?.name || product.seller.name} 
                        />
                        <SellerCard seller={seller || product.seller} />
                        <PaymentOptions options={product.payment} />
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="col-span-full border-t border-gray-200" />

                {/* Preguntas y Reviews */}
                <div className="xl:col-span-9 px-6 pb-6">
                    <ProductQuestions />
                    <ProductReviews reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

ProductLayout.propTypes = {
    product: PropTypes.object.isRequired,
    seller: PropTypes.object,
    reviews: PropTypes.object,
};

export default ProductLayout;
