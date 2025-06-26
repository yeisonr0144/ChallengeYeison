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

    if (loading) {
        console.log('⌛ BodyLayout - Mostrando loader');
        return <Loader />;
    }

    if (error || !product) {
        console.log('⚠️ BodyLayout - Error o sin producto:', { error, product });
        return <div className="p-4 text-red-500">Producto no encontrado</div>;
    }

    console.log('✅ BodyLayout - Renderizando producto:', product);
    return (
        <main className="container mx-auto px-4 py-8">
            <ProductLayout product={product} />
        </main>
    );
};

BodyLayout.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any
};