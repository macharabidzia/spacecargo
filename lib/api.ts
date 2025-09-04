"use server";

import { logout } from "@/actions/auth.actions";
import { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

type CustomAxiosInstance = AxiosInstance;

interface ApiErrorResponse {
  message?: string;
}

export async function fetchApiData<T>(
  client: CustomAxiosInstance,
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await client.get<T>(endpoint, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as ApiErrorResponse;
    if (axiosError.response?.status === 401) {
      await logout();
    }
    return Promise.reject({
      status: axiosError.response?.status || 500,
      message: errorData?.message || axiosError.message,
    });
  }
}

export async function postApiData<T>(
  client: CustomAxiosInstance,
  endpoint: string,
  data: object | FormData,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await client.post<T>(endpoint, data, config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as ApiErrorResponse;
    if (axiosError.response?.status === 401) {
      await logout();
    }
    return Promise.reject({
      status: axiosError.response?.status || 500,
      message: errorData?.message || axiosError.message,
    });
  }
}
