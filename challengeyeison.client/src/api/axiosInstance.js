import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5065/api/", // backend .NET Core
    timeout: 5000,
});

// Función para obtener un producto por ID
export const getProductById = async (id) => {
    const fullUrl = `${axiosInstance.defaults.baseURL}Producto/${id}`;
    console.log('🌐 [API] - Iniciando petición:', {
        id,
        fullUrl,
        method: 'GET',
        timestamp: new Date().toISOString()
    });

    try {
        const response = await axiosInstance.get(`Producto/${id}`);
        console.log('✅ [API] - Respuesta exitosa:', {
            status: response.status,
            statusText: response.statusText,
            hasData: !!response.data,
            dataType: typeof response.data,
            timestamp: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('❌ [API] - Error en petición:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: fullUrl,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};

export default axiosInstance;