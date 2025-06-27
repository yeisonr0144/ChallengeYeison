import { useState, useEffect } from "react";
import { getProductById } from "../api/axiosInstance";

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('🔄 [useProduct] - Hook iniciado:', {
            productId,
            currentProduct: product,
            isLoading: loading,
            timestamp: new Date().toISOString()
        });

        if (!productId) {
            console.warn('⚠️ [useProduct] - ID no válido:', productId);
            setLoading(false);
            setError('ID de producto no válido');
            return;
        }

        let isSubscribed = true;

        const fetchProduct = async () => {
            console.log('📡 [useProduct] - Iniciando petición:', {
                productId,
                timestamp: new Date().toISOString()
            });

            try {
                setLoading(true);
                setError(null);
                console.log('⌛ [useProduct] - Loading activado');

                const data = await getProductById(productId);
                
                if (!isSubscribed) {
                    console.log('🚫 [useProduct] - Petición cancelada (componente desmontado)');
                    return;
                }

                console.log('✅ [useProduct] - Respuesta exitosa:', {
                    hasData: !!data,
                    dataType: typeof data,
                    timestamp: new Date().toISOString()
                });

                if (!data) {
                    throw new Error('No se recibieron datos del producto');
                }

                // Agregamos un delay artificial de 2 segundos
                await new Promise(resolve => setTimeout(resolve, 1200));

                setProduct(data);
                setError(null);
            } catch (err) {
                if (!isSubscribed) return;

                console.error('❌ [useProduct] - Error en petición:', {
                    error: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    timestamp: new Date().toISOString()
                });

                setProduct(null);
                setError(err.response?.data?.message || "Error al cargar producto");
            } finally {
                if (isSubscribed) {
                    console.log('🏁 [useProduct] - Petición finalizada:', {
                        hasProduct: !!product,
                        hasError: !!error,
                        isLoading: false,
                        timestamp: new Date().toISOString()
                    });
                    setLoading(false);
                }
            }
        };

        fetchProduct();

        return () => {
            console.log('🧹 [useProduct] - Limpieza del efecto');
            isSubscribed = false;
        };
    }, [productId]);

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
};

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

    const clearCache = async () => {
        try {
            await productApi.clearCache();
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
