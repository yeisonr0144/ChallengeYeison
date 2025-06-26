import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import ImageGallery from "./ImageGallery";
import PriceInfo from "./PriceInfo";
import SellerInfo from "./SellerInfo";
import PaymentOptions from "./PaymentOptions";

export default function ProductDetail() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="animate-pulse bg-gray-200 h-8 w-48 mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-96 w-full"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );

    if (!product) return (
        <div className="max-w-[1200px] mx-auto p-4">
            <p className="text-gray-500 text-lg">Producto no encontrado</p>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto bg-white">
            {/* Breadcrumb */}
            <div className="p-4 text-sm text-gray-500">
                Volver al listado
            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row gap-8 p-4">
                {/* Left column - Gallery */}
                <div className="md:w-[700px]">
                    <ImageGallery images={product.images} />
                </div>

                {/* Right column - Product info */}
                <div className="flex-1 min-w-[300px]">
                    <div className="sticky top-4">
                        <PriceInfo
                            title={product.title}
                            price={product.price}
                            stock={product.stock}
                        />
                        <PaymentOptions options={product.payment} />
                        <SellerInfo seller={product.seller} />
                    </div>
                </div>
            </div>
        </div>
    );
}