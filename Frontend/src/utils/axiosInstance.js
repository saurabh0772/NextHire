import axios from 'axios';
import { USER_API_END_POINT } from './constant';

// Extract the base URL from the constants
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Crucial for cookies on desktop
});

// Interceptor to attach the token from Redux state (via a dynamic check)
// This is the "Safari Fix" that sends the token in the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        // We can still get the token from localStorage because redux-persist saves it there
        // The key is usually 'persist:root' but it's easier to just use the one we set in AuthSlice
        // If we want to be 100% sure, we can manually set it in localStorage during login/register
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
