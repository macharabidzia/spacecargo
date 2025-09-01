"use server";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData, postApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { ContactFormValues } from "@/schemas/contact.schema";
import { ApiResponse } from "@/types/api";

type Gender = {
  disabled: boolean;
  value: string;
  name: string;
};

export async function getGenders(): Promise<Gender[]> {
  return fetchApiData<Gender[]>(httpClient, API_ENDPOINTS.GET_GENDERS);
}
type Flight =
  { Flights_Number: string; Come_Date: string }

export async function getFlights(): Promise<
  Flight[]
> {
  return fetchApiData<Flight[]>(httpClient, API_ENDPOINTS.GET_FLIGHTS)
}

export async function contact(data: ContactFormValues): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_CONTACT_US, data);
}

export async function subscribe(data: { email: string }): Promise<ApiResponse> {
  const { email } = data;
  const endpointWithParams = `${API_ENDPOINTS.POST_SUBSCRIBE}?email=${email}`;
  return fetchApiData<ApiResponse>(httpClient, endpointWithParams);
}
