import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { ApiResponse } from "@/types/api";
import { Parcel } from "@/types/parcel";

export async function getCashbackTransactions(page: number = 1, perPage: number = 3,): Promise<ApiResponse<Parcel[]>> {
    return fetchApiData<ApiResponse<Parcel[]>>(httpClient, API_ENDPOINTS.GET_CASHBACK_TRANSACTIONS, {
          params: { page, perPage }
    });
} 