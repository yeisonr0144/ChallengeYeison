import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5065/api/", // backend .NET Core
    timeout: 5000,
});

export default axiosInstance;