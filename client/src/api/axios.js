import axios from 'axios';

// Create an instance with defaults
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://kp-product-assisment-3.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
