import { useState, useEffect } from "react";
import { getProductById } from "../api/axiosInstance";

export default function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('🔄 [useProduct] - Hook iniciado:', {
            productId,
            currentProduct: product,
            isLoading: loading
        });

        if (!productId) {
            console.warn('⚠️ [useProduct] - productId es:', productId);
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            console.log('📡 [useProduct] - Iniciando petición:', {
                productId,
                timestamp: new Date().toISOString()
            });

            try {
                setLoading(true);
                console.log('⌛ [useProduct] - Loading activado');

                const data = await getProductById(productId);
                console.log('✅ [useProduct] - Respuesta exitosa:', {
                    data,
                    timestamp: new Date().toISOString()
                });

                setProduct(data);
                setError(null);
            } catch (err) {
                console.error('❌ [useProduct] - Error en petición:', {
                    error: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    responseData: err.response?.data,
                    timestamp: new Date().toISOString()
                });
                setProduct(null);
                setError(err.response?.data?.message || "Error al cargar producto");
            } finally {
                console.log('🏁 [useProduct] - Petición finalizada:', {
                    hasProduct: !!product,
                    hasError: !!error,
                    timestamp: new Date().toISOString()
                });
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // Log de cambios de estado
    useEffect(() => {
        console.log('📊 [useProduct] - Estado actualizado:', {
            productId,
            loading,
            hasProduct: !!product,
            hasError: !!error,
            errorMessage: error,
            timestamp: new Date().toISOString()
        });
    }, [productId, product, loading, error]);

    return { product, loading, error };
}

// Hook para obtener todos los productos
export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productApi.getAll();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setProducts([]);
                setError(err.response?.data?.message || "Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Función para limpiar el caché
    const clearCache = async () => {
        try {
            await productApi.clearCache();
            // Recargar los productos después de limpiar el caché
            const data = await productApi.getAll();
            setProducts(data);
            return { success: true };
        } catch (err) {
            console.error("Error al limpiar caché:", err);
            return { 
                success: false, 
                error: err.response?.data?.message || "Error al limpiar caché" 
            };
        }
    };

    return { products, loading, error, clearCache };
}
