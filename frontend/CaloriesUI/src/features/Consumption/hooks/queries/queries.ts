import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { consumptionDetailQueryOptions, consumptionHistoryQueryOptions } from "./queryoptions";
import type { ConsumoRecord } from "@/ZustandStores/useHistoryStore";

export function useConsumptionDetail(id: number | null) {
  return useQuery(consumptionDetailQueryOptions(id));
}

export function useConsumptionHistory(page: number, limit: number, startDate?: string, endDate?: string): UseQueryResult<ConsumoRecord[], Error> {
  return useQuery(consumptionHistoryQueryOptions(page, limit, startDate, endDate));
}
