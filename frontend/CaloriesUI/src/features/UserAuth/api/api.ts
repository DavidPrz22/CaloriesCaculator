import { apiClient } from "@/api";
import { apiRequest } from "@/lib/api-error";
import type { User, LoginResponse, RefreshResponse } from "../types/types";
import type { UserAuthSchemaType } from "../schemas/schemas";

export async function login(data: UserAuthSchemaType): Promise<LoginResponse> {
  return apiRequest(apiClient.post<LoginResponse>("/api/users/login", data), "login");
}

export async function signup(data: UserAuthSchemaType): Promise<LoginResponse> {
  return apiRequest(apiClient.post<LoginResponse>("/api/users/signup", data), "signup");
}

export async function getProfile(): Promise<User> {
  return apiRequest(apiClient.get<User>("/api/users/profile"), "getProfile");
}

export async function logout(): Promise<void> {
  return apiRequest(apiClient.post("/api/users/logout"), "logout");
}

export async function refreshAccessToken(): Promise<RefreshResponse> {
  return apiRequest(apiClient.post<RefreshResponse>("/api/users/refresh-token"), "refreshAccessToken");
}
