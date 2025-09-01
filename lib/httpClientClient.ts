"use client";
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { env } from "@/config/env";
import { useGlobalDataStore } from "@/store/GlobalDataStore";

const clientHttpClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,

});

clientHttpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useGlobalDataStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('Axios Interceptor: No token available in GlobalDataStore for Authorization header.');
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

clientHttpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Authentication error (401/403) on client-side.");
        }
        return Promise.reject(error);
    }
);

export default clientHttpClient;