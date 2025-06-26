import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import ImageGallery from "./ImageGallery";
import PriceInfo from "./PriceInfo";
import SellerInfo from "./SellerInfo";
import PaymentOptions from "./PaymentOptions";


export default function ProductDetail() {

    const { id } = useParams();

    const { product, loading, error } = useProduct(id);

    if (loading) return <p className="p-6">Cargando producto...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!product) return <p className="p-6 text-gray-500">Producto no encontrado</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageGallery images={product.images} />
                <div>
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
    );
}