"use server";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData, postApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { ResetPasswordFormValues } from "@/schemas/auth.schema";
import { ChangePasswordFormValues } from "@/schemas/settings.schema";
import { ApiResponse } from "@/types/api";
import {
  AuthorizedPerson,
  ContractsLinks,
  IAddAddress,
  UserDashboardData,
  UserData,
} from "@/types/user";
import { revalidatePath } from "next/cache";
export async function fetchUserDashboard(): Promise<UserDashboardData> {
  return fetchApiData<UserDashboardData>(
    httpClient,
    API_ENDPOINTS.GET_USER_DASHBOARD
  );
}
export async function getUserInfo(): Promise<UserData> {
  return postApiData<UserData>(httpClient, API_ENDPOINTS.GET_USER_DATA, {});
}

export async function getPersonalData(): Promise<ContractsLinks> {
  return fetchApiData<ContractsLinks>(
    httpClient,
    API_ENDPOINTS.GET_PERSONAL_DATA
  );
}
export async function changeUser(data: any): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_CHANGE_USER,
    data
  );
}
export async function changePassword(
  data: ChangePasswordFormValues
): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_CHANGE_PASSWORD,
    data
  );
}

export async function addAddresses(data: IAddAddress): Promise<ApiResponse> {
  revalidatePath('/ka/settings/address')
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_ADD_ADDRESS,
    data
  );
}
export async function sendPhoneVerification(data: {
  phone: string;
}): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.SEND_PHONE_VERIFICATION,
    data
  );
}
export async function verifyPhone(data: {
  phone: string;
  code: string;
}): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_VERIFY_PHONE,
    data
  );
}
export async function deleteAddress(data: {
  id: number;
}): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.DELETE_ADDRESS,
    data
  );
}
export async function changeRestrictMessages(data: {
  marketingNotificationFlag: "Y" | "N"
  messageLanguage: "GE" | "EN"
}): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_CHANGE_RESTRICT_MESSAGES,
    data
  );
}
export async function authorizedPersonVerify(data: {
  authorizedPersonId: string
  code: number
}): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_AUTHORIZED_PERSON_VERIFY,
    data
  );
}
export async function getAuthorizedPersons(): Promise<AuthorizedPerson[]> {
  return fetchApiData<AuthorizedPerson[]>(
    httpClient,
    API_ENDPOINTS.GET_AUTHORIZED_PERSONS,
  );
}
export async function getUserNotifications(page: number = 1, perPage: number = 3): Promise<any> {
  const data = { page, perPage }
  return postApiData<any>(httpClient, API_ENDPOINTS.GET_USER_NOTIFICATIONS, data, {
  });
}

export async function readMessage(data: { id: string }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_READ_MESSAGE,
    data
  );
}
export async function deleteMessage(data: { id: string }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_DELETE_MESSAGE,
    data
  );
}
export async function deleteAuthorizedPerson(data: { authorizedPersonId: number }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_USER_AUTHORIZED_PERSON_CANCEL,
    data
  );
}
export async function deleteAllMessages(): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_DELETE_ALL_MESSAGES,
    {}
  );
}
export async function readAllMessages(): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_READ_ALL_MESSAGES,
    {}
  );
}
export async function getUserPartments(): Promise<ApiResponse> {
  return fetchApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.GET_USER_DEPARTMENTS,
  );
}
export async function getUserCities(): Promise<ApiResponse> {
  return fetchApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_GET_CITIES,
  );
}
export async function sendResetPassword(data: { email: string }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_USER_SEND_RESET_PASSWORD,
    data
  );
}

export async function resetPassword({ data, searchParams }: { data: ResetPasswordFormValues, searchParams: { expires: string, userId: string, signature: string } }): Promise<ApiResponse> {
  const { expires, userId, signature } = searchParams
  const urlWithParams = `${API_ENDPOINTS.POST_USER_RESET_PASSWORD}?expires=${expires}&userId=${userId}&signature=${signature}`;

  return postApiData<ApiResponse>(
    httpClient,
    urlWithParams,
    data
  );
}