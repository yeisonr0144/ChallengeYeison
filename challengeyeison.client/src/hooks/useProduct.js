import { useState, useEffect } from "react";
import { getProductById, getSellerById } from "../api/axiosInstance";

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('🔄 [useProduct] - Hook iniciado:', {
            productId,
            currentProduct: product ? JSON.stringify(product, null, 2) : null,
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

        const fetchProductAndSeller = async () => {
            console.log('📡 [useProduct] - Iniciando petición:', {
                productId,
                timestamp: new Date().toISOString()
            });

            try {
                setLoading(true);
                setError(null);
                console.log('⌛ [useProduct] - Loading activado');

                const productData = await getProductById(productId);
                
                if (!isSubscribed) {
                    console.log('🚫 [useProduct] - Petición cancelada (componente desmontado)');
                    return;
                }

                console.log('✅ [useProduct] - Respuesta producto exitosa:', {
                    hasData: !!productData,
                    dataType: typeof productData,
                    productData: JSON.stringify(productData, null, 2),
                    sellerId: productData?.seller?.id,
                    timestamp: new Date().toISOString()
                });

                if (!productData) {
                    throw new Error('No se recibieron datos del producto');
                }

                // Agregamos un delay artificial de 1.2 segundos para el producto
                await new Promise(resolve => setTimeout(resolve, 1200));
                setProduct(productData);

                // Si el producto tiene un ID de vendedor, lo obtenemos
                if (productData.seller?.id) {
                    console.log('🔍 [useProduct] - Intentando obtener vendedor:', {
                        sellerId: productData.seller.id,
                        sellerInfo: JSON.stringify(productData.seller, null, 2)
                    });

                    try {
                        const sellerData = await getSellerById(productData.seller.id);
                        if (!isSubscribed) return;

                        console.log('✅ [useProduct] - Respuesta vendedor exitosa:', {
                            hasData: !!sellerData,
                            dataType: typeof sellerData,
                            sellerData: JSON.stringify(sellerData, null, 2),
                            timestamp: new Date().toISOString()
                        });

                        setSeller(sellerData);
                    } catch (sellerError) {
                        console.error('❌ [useProduct] - Error al obtener vendedor:', {
                            error: sellerError.message,
                            status: sellerError.response?.status,
                            statusText: sellerError.response?.statusText,
                            responseData: sellerError.response?.data ? JSON.stringify(sellerError.response.data, null, 2) : null,
                            timestamp: new Date().toISOString()
                        });
                        // No establecemos error general si falla solo el vendedor
                    }
                } else {
                    console.warn('⚠️ [useProduct] - Producto sin ID de vendedor:', {
                        seller: productData.seller ? JSON.stringify(productData.seller, null, 2) : null
                    });
                }

                setError(null);
            } catch (err) {
                if (!isSubscribed) return;

                console.error('❌ [useProduct] - Error en petición:', {
                    error: err.message,
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    responseData: err.response?.data ? JSON.stringify(err.response.data, null, 2) : null,
                    timestamp: new Date().toISOString()
                });

                setProduct(null);
                setSeller(null);
                setError(err.response?.data?.message || "Error al cargar producto");
            } finally {
                if (isSubscribed) {
                    console.log('🏁 [useProduct] - Petición finalizada:', {
                        hasProduct: !!product,
                        hasSeller: !!seller,
                        productFinal: product ? JSON.stringify(product, null, 2) : null,
                        sellerFinal: seller ? JSON.stringify(seller, null, 2) : null,
                        hasError: !!error,
                        isLoading: false,
                        timestamp: new Date().toISOString()
                    });
                    setLoading(false);
                }
            }
        };

        fetchProductAndSeller();

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
            hasSeller: !!seller,
            productData: product ? JSON.stringify(product, null, 2) : null,
            sellerData: seller ? JSON.stringify(seller, null, 2) : null,
            hasError: !!error,
            errorMessage: error,
            timestamp: new Date().toISOString()
        });
    }, [productId, product, seller, loading, error]);

    return { product, seller, loading, error };
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
