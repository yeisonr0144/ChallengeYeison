import React from "react";
import "../../styles/meli.css";
import ImageGallery from "../productDetail/ImageGallery";
import ProductDetail from "../productDetail/ProductDetail";
import PriceInfo from "../productDetail/PriceInfo";
import PaymentOptions from "../productDetail/PaymentOptions";
import SellerInfo from "../productDetail/SellerInfo";
import SellerCard from "../productDetail/SellerCard";

const BodyLayout = () => {
    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="grid grid-cols-12 gap-4">
                {/* Columna izquierda - Galería */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <ImageGallery />
                </div>

                {/* Columna central - Información del producto */}
                <div className="col-span-6 bg-white p-4 rounded-lg">
                    <ProductDetail />
                </div>

                {/* Columna derecha - Información de compra y vendedor */}
                <div className="col-span-3 space-y-4">
                    {/* Sección de precios y compra */}
                    <div className="bg-white p-4 rounded-lg">
                        <div className="space-y-4">
                            <PriceInfo />
                            <PaymentOptions />
                            <SellerInfo />
                        </div>
                    </div>

                    {/* Tarjeta del vendedor */}
                    <SellerCard />
                </div>
            </div>
        </div>
    );
};

export default BodyLayout;