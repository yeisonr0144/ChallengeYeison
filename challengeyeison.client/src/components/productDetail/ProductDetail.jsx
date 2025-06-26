import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import ProductLayout from "./ProductLayout";

// Componente contenedor que maneja la lógica y el estado
export default function ProductDetail() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    // Pasa todos los estados al componente de presentación
    return (
        <ProductLayout 
            product={product}
            loading={loading}
            error={error}
        />
    );
}