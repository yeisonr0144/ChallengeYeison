import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

export function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`products/${productId}`)
            .then((res) => setProduct(res.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [productId]);

    return { product, loading, error };
}
