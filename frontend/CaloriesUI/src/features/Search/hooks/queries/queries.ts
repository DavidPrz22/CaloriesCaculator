import { useQuery } from "@tanstack/react-query";
import { categoriesOptions, unitsOptions, searchFoodOptions } from "./queryoptions";
import type { BackendLang } from "../../types/types";

export function useCategories() {
  return useQuery(categoriesOptions);
}

export function useUnits() {
  return useQuery(unitsOptions);
}

export function useSearchFood(query: string, categoriaId: number, lang: BackendLang) {
  return useQuery(searchFoodOptions({ query, categoriaId, lang }));
}
