import { queryOptions } from "@tanstack/react-query";
import { fetchCategories, fetchUnits, searchFood } from "../../api/api";
import type { BackendLang } from "../../types/types";

export const categoriesOptions = queryOptions({
  queryKey: ["categories"] as const,
  queryFn: fetchCategories,
  staleTime: Infinity,
});

export const unitsOptions = queryOptions({
  queryKey: ["units"] as const,
  queryFn: fetchUnits,
  staleTime: Infinity,
});

export function searchFoodOptions(params: {
  query: string;
  categoriaId: number;
  lang: BackendLang;
}) {
  return queryOptions({
    queryKey: ["searchFood", params] as const,
    queryFn: () => searchFood(params),
    enabled: params.query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
