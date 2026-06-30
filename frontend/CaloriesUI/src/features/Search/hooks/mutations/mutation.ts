import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { calculateNutrition, saveConsumption } from "../../api/api";
import { usePlateStore } from "@/ZustandStores";
import type { FoodArg } from "../../schemas/schemas";
import { CONSUMPTION_KEY } from "@/features/Consumption/hooks/queries/queryoptions";

export function useCalculateNutrition() {
  const setNutritionResult = usePlateStore((s) => s.setNutritionResult);

  return useMutation({
    mutationFn: async (items: FoodArg[]) => {
      return calculateNutrition(items);
    },
    onSuccess: (data) => {
      setNutritionResult(data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useSaveConsumption() {
  const navigate = useNavigate();
  const clearPlate = usePlateStore((s) => s.clearPlate);
  const queryclient = useQueryClient()

    return useMutation({
      mutationFn: async (params: {
        totals: { calories: number; protein: number; carbs: number; fat: number };
        items: Array<{
          fdcId: number;
          amount: number;
          nutrition: { calories: number; protein: number; carbs: number; fat: number };
        }>;
      }) => {
        const backendRequest = {
          calorias_consumidas: params.totals.calories,
          proteinas_consumidas: params.totals.protein,
          carbohidratos_consumidos: params.totals.carbs,
          grasas_consumidas: params.totals.fat,
          detalles: params.items.map((r) => ({
            comidaId: r.fdcId,
            cantidad_consumida: r.amount,
            calorias_consumida: r.nutrition.calories,
            proteinas_consumida: r.nutrition.protein,
            carbohidratos_consumida: r.nutrition.carbs,
            grasas_consumida: r.nutrition.fat,
          })),
        };

        await saveConsumption(backendRequest);
        clearPlate();
      },
    onSuccess: () => {
      toast.success("saved");
      queryclient.invalidateQueries({queryKey: [CONSUMPTION_KEY]})
      navigate("/consumption");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}