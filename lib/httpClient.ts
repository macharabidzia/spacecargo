import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/config/env";
import { cookies, headers } from "next/headers";

const httpClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookie = await cookies();
    const token = cookie.get("spacecargo_session")?.value || null;
    const pathname = (await headers()).get("x-language") || ""; 
    const lang = pathname.split(",")[0].split("-")[0]; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    config.params = {
      ...(config.params || {}),
      language: lang === "en" ? "EN" : "GE",
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default httpClient;
