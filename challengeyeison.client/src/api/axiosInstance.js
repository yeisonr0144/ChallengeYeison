import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5065/api/", // backend .NET Core
    timeout: 5000,
});

// Función para obtener un producto por ID
export const getProductById = async (id) => {
    const fullUrl = `${axiosInstance.defaults.baseURL}Producto/${id}`;
    console.log('🌐 [API] - Iniciando petición producto:', {
        id,
        fullUrl,
        method: 'GET',
        timestamp: new Date().toISOString()
    });

    try {
        const response = await axiosInstance.get(`Producto/${id}`);
        console.log('✅ [API] - Respuesta exitosa producto:', {
            status: response.status,
            statusText: response.statusText,
            hasData: !!response.data,
            dataType: typeof response.data,
            data: JSON.stringify(response.data, null, 2),
            timestamp: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('❌ [API] - Error en petición producto:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            responseData: error.response?.data ? JSON.stringify(error.response.data, null, 2) : null,
            url: fullUrl,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};

// Función para obtener un vendedor por ID
export const getSellerById = async (id) => {
    const fullUrl = `${axiosInstance.defaults.baseURL}Seller/${id}`;
    console.log('🌐 [API] - Iniciando petición vendedor:', {
        id,
        fullUrl,
        method: 'GET',
        timestamp: new Date().toISOString()
    });

    try {
        const response = await axiosInstance.get(`Seller/${id}`);
        console.log('✅ [API] - Respuesta exitosa vendedor:', {
            status: response.status,
            statusText: response.statusText,
            hasData: !!response.data,
            dataType: typeof response.data,
            data: JSON.stringify(response.data, null, 2),
            timestamp: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('❌ [API] - Error en petición vendedor:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            responseData: error.response?.data ? JSON.stringify(error.response.data, null, 2) : null,
            url: fullUrl,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};

export default axiosInstance;