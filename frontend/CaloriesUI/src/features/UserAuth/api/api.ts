import type { User } from "../types/types";
import type { UserAuthSchemaType } from "../schemas/schemas";

const API_BASE = "/api/users";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function login(data: UserAuthSchemaType): Promise<{ user: User }> {
  return fetchApi<{ user: User }>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signup(data: UserAuthSchemaType): Promise<{ user: User }> {
  return fetchApi<{ user: User }>("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProfile(): Promise<User> {
  return fetchApi<User>("/profile");
}

export async function logout(): Promise<void> {
  return fetchApi<void>("/logout", { method: "POST" });
}
