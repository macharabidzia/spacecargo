"use server"

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData, postApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";

export async function getBonusPrizes(): Promise<Voucher[]> {
    return fetchApiData<Voucher[]>(httpClient, API_ENDPOINTS.GET_BONUS_PRIZES, {
    });
}
export async function buyPrize(id: string): Promise<Voucher[]> {
    return postApiData<Voucher[]>(httpClient, API_ENDPOINTS.POST_BUY_VOUCHER, { prizeId: id }, {
    });
}