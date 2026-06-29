import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { calculateNutrition } from "../../api/api";
import { usePlateStore } from "@/ZustandStores";
import type { FoodArg } from "../../schemas/schemas";

export function useCalculateNutrition() {
  const navigate = useNavigate();
  const plate = usePlateStore((s) => s.plate);
  const setNutritionResult = usePlateStore((s) => s.setNutritionResult);

return useMutation({
    mutationFn: async () => {
      if (!plate || Object.keys(plate).length === 0) {
        throw new Error("No items in plate");
      }
      const items: FoodArg[] = Object.entries(plate).map(([fdcIdStr, entry]) => ({
        fdcId: Number(fdcIdStr),
        amount: entry.amount,
      }));
      return calculateNutrition(items);
    },
    onSuccess: (data) => {
      setNutritionResult(data);
      navigate("/results");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}