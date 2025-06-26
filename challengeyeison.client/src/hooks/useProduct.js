import { useState, useEffect } from "react";
//import axios from "../api/axiosInstance";
import axios from "axios";

export default function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        setLoading(true);
        axios
            .get(`/api/Producto/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error al hacer fetch:", err);
                setProduct(null);
                setError(err.response?.data?.message || "Error al cargar producto");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

    return { product, loading, error };
}
