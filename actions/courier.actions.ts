"use server"
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData, postApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { PostSchema } from "@/schemas/post.schema";
import { AuthroizedPersonFormValues } from "@/schemas/settings.schema";
import { ApiResponse, Transaction } from "@/types/api";
import { Courier, CourierApiResponse, CourierData, CourierFormValues } from "@/types/courier";
import { ParcelApiResponse } from "@/types/parcel";
import { IPostAddCourierInfoData } from "@/types/post";

export async function getRequests(page: number, perPage: number, tds_code: string): Promise<Courier[]> {
    const urlWithParams = `${API_ENDPOINTS.GET_REQUESTS}?page=${page}&perPage=${perPage}&tdsCode=${encodeURIComponent(tds_code)}`;
    return fetchApiData<Courier[]>(httpClient, urlWithParams, {
    });
}
export async function getCourierParcels(page: number, perPage: number, tds_code: string): Promise<CourierApiResponse> {
    const urlWithParams = `${API_ENDPOINTS.GET_COURIER_PARCELS}?page=${page}&perPage=${perPage}&tdsCode=${encodeURIComponent(tds_code)}`;
    return fetchApiData<CourierApiResponse>(httpClient, urlWithParams, {
    });
}
export async function createAuthorizedPerson(data: AuthroizedPersonFormValues): Promise<ApiResponse> {
    return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_AUTHORIZED_PERSON_REGISTRATION, data);
}
export async function getAddCourierInfo(): Promise<CourierData> {
    return fetchApiData<CourierData>(httpClient, API_ENDPOINTS.GET_INFO, {
    });
}

export async function courierOrderRegistration(data: CourierFormValues): Promise<ApiResponse> {
    return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_COURIER_ORDER_REGISTRATION, data);
}

export async function postOrderRegistration(data: PostSchema): Promise<ApiResponse> {
    return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_ORDER_REGISTRATION, data);
}

export async function getAddPostInfo(): Promise<IPostAddCourierInfoData> {
    return fetchApiData<IPostAddCourierInfoData>(httpClient, API_ENDPOINTS.GET_POST_INFO, {
    });
}

export async function fillBalance(data: Transaction): Promise<ApiResponse> {
    return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_FILL_BALANCE, data);
} 