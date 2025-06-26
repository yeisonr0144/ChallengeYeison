import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { BodyLayout } from "../components/common/BodyLayout";

export default function ProductPage() {
    const { id } = useParams();
    console.log('🎯 ProductPage - ID from params:', id);

    const { product, loading, error } = useProduct(id);
    console.log('📱 ProductPage - Estado actual:', {
        hasProduct: !!product,
        productData: product,
        loading,
        error,
        id
    });

    return (
        <BodyLayout 
            product={product}
            loading={loading}
            error={error}
        />
    );
}
