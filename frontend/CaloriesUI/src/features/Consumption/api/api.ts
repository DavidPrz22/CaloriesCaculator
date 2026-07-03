import { apiClient } from "@/api";
import { apiRequest } from "@/lib/api-error";
import type { ConsumptionsApiResponse, ConsumptionDetailApiResponse } from "../types/types";

export async function getConsumptions(
  page: number,
  limit: number,
  startDate?: string,
  endDate?: string,
): Promise<ConsumptionsApiResponse> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (startDate) query.set("startDate", startDate);
  if (endDate) query.set("endDate", endDate);

  return apiRequest(
    apiClient.get<ConsumptionsApiResponse>(`/api/calories/consumptions?${query}`),
    "getConsumptions"
  );
}

export async function deleteConsumption(id: number): Promise<void> {
  return apiRequest(apiClient.delete(`/api/calories/consumptions/${id}`), "deleteConsumption");
}

export async function getConsumptionDetail(id: number): Promise<ConsumptionDetailApiResponse> {
  return apiRequest(
    apiClient.get<ConsumptionDetailApiResponse>(`/api/calories/consumptions/${id}`),
    "getConsumptionDetail"
  );
}
