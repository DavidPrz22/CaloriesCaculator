import foodinfoClient from "@/nodeApp/apis/foodApi/api";
import { prisma } from '@/prisma/lib/prisma'
import { type lang } from "./types";

export class CaloriesFoodController {
    static async retrieveFoodsCategories() {
        return await prisma.categoria.findMany();
    }

    static async retrieveFoodsMeasures() {
        return await prisma.medida.findMany()
    }

    static async searchFoodbyQuery(query: string, categoriaId: number, lang: lang) {
        const userinput = query.trim();
        if (userinput.length < 2) {
            throw new Error("Invalid query length");
        }

        const searchColumn = lang === "EN" ? "nameEN" : "nameES";

        const cachedData = await prisma.comida.findMany({
            where: {
                [searchColumn]: {
                    contains: userinput,
                    mode: 'insensitive'
                },
                categoriaId: categoriaId,
            }
        });
        return cachedData;
    }
}