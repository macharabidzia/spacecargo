"use server"

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData, postApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { ParcelFormValues } from "@/schemas/parcel.schema";
import { Category } from "@/types";
import { ApiResponse } from "@/types/api";
import { Parcel, ParcelApiResponse } from "@/types/parcel";
import { Department } from "@/types/user";
import { cookies } from "next/headers";

export async function getCategories(): Promise<Category[]> {
    return fetchApiData<Category[]>(httpClient, API_ENDPOINTS.GET_CATEGORIES);
}
export async function createDeclaration(data: any): Promise<ApiResponse> {
    return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_DECLARATION, data);
}
export async function getAwaitingParcels(page: number = 1, perPage: number = 3, tds_code: string = ""): Promise<ParcelApiResponse> {
    const data = { page, perPage, tds_code }
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.GET_AWAITING_PARCELS, data, {
    });
}
export async function getWarehouseParcels(page: number = 1, perPage: number = 3, tds_code: string = ""): Promise<ParcelApiResponse> {
    const data = { page, perPage, tds_code }
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.GET_WAREHOUSE_PARCELS, data, {
    });
}
export async function getSentParcels(page: number = 1, perPage: number = 3, tds_code: string = ""): Promise<ParcelApiResponse> {
    const data = { page, perPage, tds_code }
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.GET_SEND_PARCELS, data, {
    });
}
export async function getReceivedParcels(page: number = 1, perPage: number = 3, tds_code: string = ""): Promise<ParcelApiResponse> {
    const data = { page, perPage, tds_code }
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.GET_RECEIVED_PARCELS, data, {
    });
} export async function getArrivedParcels(page: number = 1, perPage: number = 3, tds_code: string = ""): Promise<ParcelApiResponse> {
    const data = { page, perPage, tds_code }
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.GET_ARRIVED_PARCELS, data, {
    });
}
export async function deleteParcels({ parcelIds }: { parcelIds: string[] }): Promise<ParcelApiResponse> {
    const formData = new FormData();
    parcelIds.forEach(id => {
        formData.append('parcelId', id);
    });
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.DELETE_PARCELS, formData, {
    });
}
export async function editParcel(data: FormData): Promise<ParcelApiResponse> {
    return postApiData<ParcelApiResponse>(httpClient, API_ENDPOINTS.EDIT_PARCEL, data, {
    });
}
export async function getParcel(id: string): Promise<Parcel> {
    return postApiData<Parcel>(httpClient, API_ENDPOINTS.GET_PARCEL_DETAILS, { parcelId: id }, {
    });
}
export async function getDepartments(): Promise<Department[]> {
    return fetchApiData<Department[]>(httpClient, API_ENDPOINTS.GET_DEPARTMENTS, {
    });
}
export async function getToken(): Promise<any> {
    const cookieStore = await cookies()

    const token = cookieStore.get('spacecargo_session')?.value

    return token;
}