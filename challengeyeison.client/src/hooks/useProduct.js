import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`Producto/${productId}`);
                setProduct(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al hacer fetch:", err);
                setProduct(null);
                setError(err.response?.data?.message || "Error al cargar producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
}
