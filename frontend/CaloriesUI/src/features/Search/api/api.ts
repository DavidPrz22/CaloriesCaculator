import { fetchApi } from "../utils/api";
import { CategoriesResponseSchema, UnitsResponseSchema, SearchFoodResponseSchema, CalculateNutrientsResponseSchema, FoodArgSchema } from "../schemas/schemas";
import type { Categoria, Medida, Comida, BackendLang } from "../types/types";
import type { FoodArg, CalculateNutrientsResponse } from "../schemas/schemas";

export async function fetchCategories(): Promise<Categoria[]> {
  try {
    const data = await fetchApi<{ categories: Categoria[] }>("/categories");
    return CategoriesResponseSchema.parse(data).categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch categories", { cause: error });
  }
}

export async function fetchUnits(): Promise<Medida[]> {
  try {
    const data = await fetchApi<{ units: Medida[] }>("/units");
    return UnitsResponseSchema.parse(data).units;
  } catch (error) {
    console.error("Error fetching units:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch units", { cause: error });
  }
}

export async function searchFood(params: {
  query: string;
  categoriaId: number;
  lang: BackendLang;
}): Promise<Comida[]> {
  try {
    const { query, categoriaId, lang } = params;
    const searchParams = new URLSearchParams({
      query,
      lang,
      categoriaId: String(categoriaId),
    });
    const data = await fetchApi<{ foods: Comida[] }>(`/search-food?${searchParams}`);
    return SearchFoodResponseSchema.parse(data).foods;
  } catch (error) {
    console.error("Error searching food:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to search food", { cause: error });
  }
}

export async function calculateNutrition(items: FoodArg[]): Promise<CalculateNutrientsResponse> {
  try {
    const validatedItems = FoodArgSchema.array().parse(items);
    const data = await fetchApi<CalculateNutrientsResponse>("/calculate", {
      method: "POST",
      body: JSON.stringify(validatedItems.length > 0 ? validatedItems : []),
    });
    return CalculateNutrientsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error calculating nutrition:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to calculate nutrition", { cause: error });
  }
}


