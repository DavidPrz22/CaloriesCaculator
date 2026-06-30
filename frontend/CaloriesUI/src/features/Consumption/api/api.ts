import type { ConsumptionsApiResponse, ConsumptionDetailApiResponse } from "../types/types";

const API_BASE_URL = "http://localhost:3000/api/calories";

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

  const res = await fetch(`${API_BASE_URL}/consumptions?${query}`);
  if (!res.ok) throw new Error("Failed to fetch consumption records");
  return res.json();
}

export async function deleteConsumption(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/consumptions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete consumption record");
}

export async function getConsumptionDetail(id: number): Promise<ConsumptionDetailApiResponse> {
  const res = await fetch(`${API_BASE_URL}/consumptions/${id}`);
  if (!res.ok) throw new Error("Failed to fetch consumption detail");
  return res.json();
}
