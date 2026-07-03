import { apiClient } from "@/api";
import { apiRequest } from "@/lib/api-error";
import type { Comida, PaginatedComidas } from '../types';

export async function getComidas(page: number = 1, limit: number = 50, search: string = ''): Promise<PaginatedComidas> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search
  });
  
  return apiRequest(
    apiClient.get<PaginatedComidas>(`/api/calories/comida?${query}`),
    "getComidas"
  );
}

export async function createComida(data: Partial<Comida>): Promise<Comida> {
  return apiRequest(apiClient.post<Comida>('/api/calories/comida', data), "createComida");
}

export async function updateComida(id: number, data: Partial<Comida>): Promise<Comida> {
  return apiRequest(apiClient.put<Comida>(`/api/calories/comida/${id}`, data), "updateComida");
}

export async function deleteComida(id: number): Promise<void> {
  return apiRequest(apiClient.delete(`/api/calories/comida/${id}`), "deleteComida");
}
