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

    static async searchFoodbyQuery(query: string, lang: lang, categoriaId: number) {
        const userinput = query.trim();
        if (userinput.length < 2) {
            throw new Error("Invalid query length");
        }

        const searchColumn = lang === "EN" ? "nameEN" : "nameES";

        const cachedData = await prisma.comida.findMany({
            where: {
                [searchColumn]: {
                    contains: userinput,
                    mode: 'insensitive',
                },
                ...(
                    categoriaId !== 1 && { 
                        categoriaId: categoriaId,
                    }),
                },
            select: {
                id: true,
                FDCID: true,
                nameES: true,
                nameEN: true,
                calories: true,
                protein: true,
                carbs: true,
                fat: true,
                categoria: {
                    select: {
                        id: true,
                        nameES: true,
                        nameEN: true
                    }
                },
                // Explicitly excluding medidaId by NOT listing it
                medida: {
                    select: {
                        id: true,
                        nameES: true,
                        nameEN: true,
                        abreviation: true
                    }
                }
            }
        });

        return cachedData;
    }
}