import type { ComidaModel } from '@/prisma/generated/prisma/models/Comida'
import type { Nutrition } from '../zod';

type MacroKey = 'calories' | 'protein' | 'carbs' | 'fat';

export class CaloriesService {


    static calculateNutrient(data: ComidaModel, amount: number, key: MacroKey): number {
        return ((data[key] ?? 0) * amount) / 100;
    }

    static calculateCalories = (data: ComidaModel, amount: number) => this.calculateNutrient(data, amount, 'calories');
    static calculateProtein = (data: ComidaModel, amount: number) => this.calculateNutrient(data, amount, 'protein');
    static calculateCarbs = (data: ComidaModel, amount: number) => this.calculateNutrient(data, amount, 'carbs');
    static calculateFats = (data: ComidaModel, amount: number) => this.calculateNutrient(data, amount, 'fat');

    static calculateItemNutrition(data: ComidaModel, amount: number): Nutrition {
        return {
            calories: this.calculateCalories(data, amount),
            protein: this.calculateProtein(data, amount),
            carbs: this.calculateCarbs(data, amount),
            fat: this.calculateFats(data, amount),
        };
    }

    static calculateTotalNutrition(items: Nutrition[]): Nutrition {
        return items.reduce(
            (acc, item) => ({
                calories: acc.calories + item.calories,
                protein: acc.protein + item.protein,
                carbs: acc.carbs + item.carbs,
                fat: acc.fat + item.fat,
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
    }
}