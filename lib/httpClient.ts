// lib/httpClient.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env'; // Example of validated env vars

const httpClient: AxiosInstance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL, // Use validated env variable
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor
httpClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Example: Add Authorization token to requests
        // If you have another authentication mechanism (e.g., a custom JWT stored in localStorage
        // or a Redux store), you would add it here.
        // For server components or API routes, token handling would be different.
        if (typeof window !== 'undefined') { // Client-side
            // Example: Retrieve token from localStorage
            const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual key
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        // You could add other headers or logging here
        return config;
    },
    (error: AxiosError) => {
        // console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
httpClient.interceptors.response.use(
    (response: any) => response, // Simply return the response if successful
    (error: AxiosError) => {
        // Handle global errors (e.g., 401 Unauthorized, 403 Forbidden, 500 Server Error)
        // You might dispatch a Redux action, redirect, or show a global notification
        if (error.response) {
            // const { status, data } = error.response;
            // switch (status) {
            //   case 401:
            //     // Handle unauthorized: e.g., redirect to login
            //     // if (typeof window !== 'undefined') window.location.href = '/login';
            //     break;
            //   case 403:
            //     // Handle forbidden
            //     break;
            //   // ... other status codes
            // }
        } else if (error.request) {
            // The request was made but no response was received
            // console.error('Network error or no response:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.error('Axios config error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default httpClient;
