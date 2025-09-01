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

// ✅ Return static flights data
export async function getFlights(): Promise<
  { Flights_Number: string; Come_Date: string }[]
> {
  return [
    { Flights_Number: "Dongguan - Tbilisi CMR0210", Come_Date: "02-10-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR2509", Come_Date: "25-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR1809", Come_Date: "18-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR1109", Come_Date: "11-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK1009", Come_Date: "10-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0909", Come_Date: "09-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0809", Come_Date: "08-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0609", Come_Date: "06-09-2025" },
    { Flights_Number: "New York - Tbilisi US10478", Come_Date: "05-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0409", Come_Date: "04-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR0409", Come_Date: "04-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0309", Come_Date: "03-09-2025" },
    { Flights_Number: "New York - Tbilisi US10477", Come_Date: "02-09-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK0209", Come_Date: "02-09-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ2608", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ2308", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ2108", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ2108", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ1908", Come_Date: "31-08-2025" },
    { Flights_Number: "Sharjah - Tbilisi G1708", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ1708", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ1608", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ1408", Come_Date: "31-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK3108", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ1208", Come_Date: "31-08-2025" },
    { Flights_Number: "Sharjah - Tbilisi G1008", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ0908", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ0708", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ0508", Come_Date: "31-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ0208", Come_Date: "31-08-2025" },
    { Flights_Number: "ATHENS-TBILISI ATH3008", Come_Date: "30-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK2908", Come_Date: "29-08-2025" },
    { Flights_Number: "New York - Tbilisi US10476", Come_Date: "28-08-2025" },
    { Flights_Number: "New York - Tbilisi US10475", Come_Date: "27-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK2708", Come_Date: "27-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR2708", Come_Date: "27-08-2025" },
    { Flights_Number: "Istambul-Tbilisi TR2608", Come_Date: "26-08-2025" },
    { Flights_Number: "Dubai - Tbilisi FZ2308", Come_Date: "26-08-2025" },
    { Flights_Number: "LONDON-TBILISI LHR2608", Come_Date: "26-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK2608", Come_Date: "26-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK2408", Come_Date: "24-08-2025" },
    { Flights_Number: "ATHENS-TBILISI ATH2308", Come_Date: "23-08-2025" },
    { Flights_Number: "Istambul-Tbilisi TR2208", Come_Date: "22-08-2025" },
    { Flights_Number: "New York - Tbilisi US10474", Come_Date: "22-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK2108", Come_Date: "21-08-2025" },
    { Flights_Number: "Istambul-Tbilisi TR1908", Come_Date: "20-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi CMR2008", Come_Date: "20-08-2025" },
    { Flights_Number: "LONDON-TBILISI LHR1908", Come_Date: "19-08-2025" },
    { Flights_Number: "New York - Tbilisi US10473", Come_Date: "19-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK1908", Come_Date: "19-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK1808", Come_Date: "18-08-2025" },
    { Flights_Number: "ATHENS-TBILISI ATH0908", Come_Date: "17-08-2025" },
    { Flights_Number: "Dongguan - Tbilisi TK1708", Come_Date: "17-08-2025" },
  ];
}

export async function contact(data: ContactFormValues): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_CONTACT_US, data);
}

export async function subscribe(data: { email: string }): Promise<ApiResponse> {
  const { email } = data;
  const endpointWithParams = `${API_ENDPOINTS.POST_SUBSCRIBE}?email=${email}`;
  return fetchApiData<ApiResponse>(httpClient, endpointWithParams);
}
