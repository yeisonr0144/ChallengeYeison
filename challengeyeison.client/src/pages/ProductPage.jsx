import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductDetail from "../components/productDetail/ProductDetail";
import Loader from "../components/common/Loader";

export default function ProductPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return <Loader />;
    if (error || !product) return <div className="p-4 text-red-500">Producto no encontrado</div>;

    return <ProductDetail product={product} />;
}
