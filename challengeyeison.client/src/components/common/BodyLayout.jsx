import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/meli.css";
import ImageGallery from "../productDetail/ImageGallery";
import ProductDetail from "../productDetail/ProductDetail";
import PriceInfo from "../productDetail/PriceInfo";
import PaymentOptions from "../productDetail/PaymentOptions";
import SellerInfo from "../productDetail/SellerInfo";
import SellerCard from "../productDetail/SellerCard";
import useProduct from "../../hooks/useProduct";

const BodyLayout = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="animate-pulse grid grid-cols-12 gap-4">
                <div className="col-span-3 bg-gray-200 h-96 rounded-lg"></div>
                <div className="col-span-6 bg-gray-200 h-96 rounded-lg"></div>
                <div className="col-span-3 space-y-4">
                    <div className="bg-gray-200 h-48 rounded-lg"></div>
                    <div className="bg-gray-200 h-48 rounded-lg"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-[1200px] mx-auto p-4 text-red-500">
            Error al cargar el producto: {error}
        </div>
    );

    if (!product) return null;

    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Columna izquierda - Galería */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <ImageGallery images={product.images} />
                </div>

                {/* Columna central - Información del producto */}
                <div className="col-span-6 bg-white p-4 rounded-lg">
                    <ProductDetail product={product} />
                </div>

                {/* Columna derecha - Información de compra y vendedor */}
                <div className="col-span-3 space-y-4">
                    {/* Sección de precios y compra */}
                    <div className="bg-white p-4 rounded-lg">
                        <div className="space-y-4">
                            <PriceInfo product={product} />
                            <PaymentOptions payment={product.payment} />
                            <SellerInfo seller={product.seller} />
                        </div>
                    </div>

                    {/* Tarjeta del vendedor */}
                    <SellerCard seller={product.seller} />
                </div>
            </div>
        </div>
    );
};

export default BodyLayout;