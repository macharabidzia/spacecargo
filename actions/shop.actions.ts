import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { ShopResponse } from "@/types/shop";

export async function getShops(
  page: number = 1,
  perPage: number = 3
): Promise<ShopResponse> {
  const data = { page, perPage };
  return fetchApiData<ShopResponse>(httpClient, API_ENDPOINTS.GET_SHOPS, {
    params: data
  });
}
