import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import BodyLayout from '../components/common/BodyLayout';
import ProductLayout from '../components/productDetail/ProductLayout';

const ProductPage = () => {
    const { id } = useParams();
    const { product, isLoading, error } = useProduct(id);

    return (
        <BodyLayout isLoading={isLoading} error={error}>
            <div className="bg-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <ProductLayout product={product} />
                </div>
            </div>
        </BodyLayout>
    );
};

export default ProductPage;
