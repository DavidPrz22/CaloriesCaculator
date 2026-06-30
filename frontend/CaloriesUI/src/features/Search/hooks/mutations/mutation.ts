import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { calculateNutrition, saveConsumption } from "../../api/api";
import { usePlateStore } from "@/ZustandStores";
import { useHistoryStore } from "@/ZustandStores/useHistoryStore";
import type { FoodArg } from "../../schemas/schemas";

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
  const addRecord = useHistoryStore((s) => s.addRecord);

  return useMutation({
    mutationFn: async (params: {
      totals: { calories: number; protein: number; carbs: number; fat: number };
      items: Array<{
        fdcId: number;
        amount: number;
        nutrition: { calories: number; protein: number; carbs: number; fat: number };
      }>;
    }) => {
      const detalles = params.items.map((r) => ({
        comidaId: r.fdcId,
        cantidad_consumida: r.amount,
        calorias_consumida: r.nutrition.calories,
        protein_consumida: r.nutrition.protein,
        carbs_consumida: r.nutrition.carbs,
        fat_consumida: r.nutrition.fat,
      }));

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

      const record = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        calorias_consumidas: params.totals.calories,
        protein_consumida: params.totals.protein,
        carbs_consumida: params.totals.carbs,
        fat_consumida: params.totals.fat,
        detalles,
      };
      addRecord(record);
      clearPlate();
    },
    onSuccess: () => {
      toast.success("saved");
      navigate("/history");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}