import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import BodyLayout from "../components/common/BodyLayout";

export default function ProductPage() {
    const { id } = useParams();
    console.log('🎯 ProductPage - ID from params:', id);

    const { product, seller, reviews, loading, error } = useProduct(id);
    console.log('📱 ProductPage - Estado actual:', {
        hasProduct: !!product,
        hasSeller: !!seller,
        hasReviews: !!reviews,
        productData: product,
        sellerData: seller,
        reviewsData: reviews,
        loading,
        error,
        id
    });

    return (
        <BodyLayout 
            product={product}
            seller={seller}
            reviews={reviews}
            loading={loading}
            error={error}
        />
    );
}
