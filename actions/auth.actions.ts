"use server";

import { cookies, } from "next/headers";
import { redirect } from "next/navigation";
import httpClient from "@/lib/httpClient";
import { postApiData } from "@/lib/api";
import { ApiResponse, ApiResponseMessage } from "@/types/api";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { BaseRegisterValues, LegalProfileValues, PhysicalProfileValues, RegisterFormValues } from "@/schemas/auth.schema";
import { UserStatus, VerificationResponse } from "@/types/user";
interface User {
  id: string;
  userName: string;
  email?: string;
}
interface LoginApiResponse {
  type: 'success';
  message: {
    user: User;
    token: string;
  };
}

export async function login(
  userName: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await httpClient.post<LoginApiResponse>("/user/authenticate?language=GE", {
      userName,
      password,
      channel: "WEB"
    });

    const { token } = response.data.message;

    if (!token) {
      console.error("Login API response did not contain a token.");
      return { success: false, message: "Authentication failed: No token received." };
    }

    const cookieStore = await cookies();
    cookieStore.set("spacecargo_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });
    return { success: true, message: "Login successful!" };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

export async function logout(_formData?: FormData): Promise<void> {
  const cookiesStore = await cookies();
  cookiesStore.delete('spacecargo_session')
  redirect("/");
}
export async function register(data: BaseRegisterValues): Promise<ApiResponseMessage<VerificationResponse>> {

  const response = await postApiData<ApiResponseMessage<VerificationResponse>>(httpClient, API_ENDPOINTS.POST_REGISTER_USER, data);
  if (response.type === "success") {
    const { temporary_token } = response.message;
    const cookieStore = await cookies();
    cookieStore.set("X-Temporary-Token", temporary_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });
  }
  return response
}
export async function getRegistrationStatus(): Promise<ApiResponseMessage<UserStatus>> {
  const cookie = await cookies();
  const token = cookie.get('X-Temporary-Token')?.value || null;
  let v = {}
  if (token) {
    v = { headers: { 'X-Temporary-Token': `${token}` } };
  }
  return postApiData<ApiResponseMessage<UserStatus>>(httpClient, API_ENDPOINTS.POST_REGISTRATION_STATUS, {}, v);
}
export async function verifyRegistrationPhone(data: { user_id: number, code: string }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_REGISTRATIN_VERIFY_PHONE, data, {
  });
}
export async function resendRegistrationPhone(data: { user_id: number }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_REGISTRATION_RESENT_PHONE_CODE, data, {
  });
}
export async function verifyRegistrationEmail(data: { user_id: number, code: string }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_REGISTRATIN_VERIFY_EMAIL, data, {
  });
}
export async function resendRegistrationEmail(data: { user_id: number }): Promise<ApiResponse> {
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_REGISTRATION_RESENT_EMAIL_CODE, data, {
  });
}

export async function completeRegistration(data: LegalProfileValues | PhysicalProfileValues): Promise<ApiResponse> {
  const cookie = await cookies();
  const token = cookie.get('X-Temporary-Token')?.value || null;
  let v = {}
  if (token) {
    v = { headers: { 'X-Temporary-Token': `${token}` } };
  }
  return postApiData<ApiResponse>(httpClient, API_ENDPOINTS.POST_REGISTRATION_COMPLETE_PROFILE, data, v);
}
export async function addRegistrationAddress(data: { city_id: number, address: string }): Promise<ApiResponse> {
  const cookie = await cookies();
  const token = cookie.get('X-Temporary-Token')?.value || null;
  let v = {}
  if (token) {
    v = { headers: { 'X-Temporary-Token': `${token}` } };
  }
  return postApiData<ApiResponse>(
    httpClient,
    API_ENDPOINTS.POST_ADD_REGISTRATION_ADDRESS,
    data,
    v
  );
}
