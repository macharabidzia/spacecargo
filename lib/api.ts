"use server";

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
    // Remove session cookie on error
    throw new Error(
      errorData?.message ||
        axiosError.message ||
        `Failed to fetch from ${endpoint}`
    );
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

    // Remove session cookie on error

    throw new Error(
      errorData?.message ||
        axiosError.message ||
        `Failed to post to ${endpoint}`
    );
  }
}
