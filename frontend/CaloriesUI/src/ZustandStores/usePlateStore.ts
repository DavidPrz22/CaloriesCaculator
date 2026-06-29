import { create } from "zustand";
import type { Comida, PlateEntry } from "../features/Search/types/types";
import type { CalculateNutrientsResponse } from "../features/Search/schemas/schemas";


interface PlateStore {
  plate: Record<number, PlateEntry>;
  nutritionResult: CalculateNutrientsResponse | null;
  addToPlate: (comida: Comida) => void;
  setAmount: (fdcId: number, amount: number) => void;
  removeFromPlate: (fdcId: number) => void;
  setNutritionResult: (result: CalculateNutrientsResponse) => void;
  clearNutritionResult: () => void;
  clearPlate: () => void;
}

export const usePlateStore = create<PlateStore>()((set) => ({
  plate: {},
  nutritionResult: null,
  addToPlate: (comida) =>
    set((state) =>
      state.plate[comida.FDCID]
        ? state
        : {
            plate: {
              ...state.plate,
              [comida.FDCID]: {
                nameEN: comida.nameEN,
                nameES: comida.nameES,
                calories: comida.calories,
                protein: comida.protein,
                carbs: comida.carbs,
                fat: comida.fat,
                categoria: comida.categoria,
                amount: 0,
                medidaAbreviation: comida.medida.abreviation,
              },
            },
          }
    ),
  setAmount: (fdcId, amount) =>
    set((state) => ({
      plate: {
        ...state.plate,
        [fdcId]: { ...state.plate[fdcId], amount },
      },
    })),
  removeFromPlate: (fdcId) =>
    set((state) => {
      const newplate = { ...state.plate };
      delete newplate[fdcId];
      return { plate: newplate };
    }),
  setNutritionResult: (result) => set({ nutritionResult: result }),
  clearNutritionResult: () => set({ nutritionResult: null }),
  clearPlate: () => set({ plate: {}, nutritionResult: null }),
}));
