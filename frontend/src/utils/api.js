import axios from 'axios';
import { apiUrl } from '../constants/apiUrl';

// Create a new axios instance with the baseURL and default headers
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor for setting Authorization header
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;
