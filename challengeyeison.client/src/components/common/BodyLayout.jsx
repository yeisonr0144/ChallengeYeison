import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProductLayout from "../productDetail/ProductLayout";
import Loader from "./Loader";

export const BodyLayout = ({ product, loading, error }) => {
    useEffect(() => {
        console.log('🎨 BodyLayout - Props recibidas:', {
            hasProduct: !!product,
            productData: product,
            loading,
            error
        });
    }, [product, loading, error]);

    const renderContent = () => {
        if (loading) {
            console.log('⌛ BodyLayout - Mostrando loader');
            return (
                <div className="max-w-[1200px] mx-auto p-4">
                    <div className="animate-pulse grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3">
                            <div className="bg-gray-200 h-96 rounded-lg"></div>
                        </div>
                        <div className="md:col-span-6">
                            <div className="bg-gray-200 h-96 rounded-lg"></div>
                        </div>
                        <div className="md:col-span-3 space-y-4">
                            <div className="bg-gray-200 h-48 rounded-lg"></div>
                            <div className="bg-gray-200 h-48 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            );
        }

        if (error || !product) {
            console.log('⚠️ BodyLayout - Error o sin producto:', { error, product });
            return (
                <div className="max-w-[1200px] mx-auto p-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-red-500 text-lg">
                            {error || "Producto no encontrado"}
                        </p>
                    </div>
                </div>
            );
        }

        console.log('✅ BodyLayout - Renderizando producto:', product);
        return <ProductLayout product={product} />;
    };

    return (
        <main className="min-h-screen bg-[#ededed] py-6">
            {renderContent()}
        </main>
    );
};

BodyLayout.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any
};