import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL="https://blog-backend-1-23dz.onrender.com";
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;