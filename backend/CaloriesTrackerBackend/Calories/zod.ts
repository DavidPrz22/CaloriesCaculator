import { z } from "zod";

export const SearchFoodQuerySchema = z.object({
    query: z.string().min(2, "Query must be at least 2 characters long"),
    lang: z.enum(["EN", "ES"]),
    categoriaId: z.coerce.number(),
});


const foodArgs = z.object({
    fdcId: z.coerce.number().min(0, "Number has to be minimum 0"),
    amount: z.coerce.number().min(1, "Number has to be minimum 1"),
})

export const calculateNutrientsArgs = z.array(foodArgs);

export type SearchFoodQuery = z.infer<typeof SearchFoodQuerySchema>;
export type CalculateNutrientsInput = z.infer<typeof calculateNutrientsArgs>;


export const NutritionSchema = z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
});

export const CalculatedItemSchema = z.object({
    fdcId: z.number(),
    names: z.object({
        en: z.string(),
        es: z.string(),
    }),
    nutrition: NutritionSchema,
    amount: z.number(),
});

export const CalculateNutrientsResponseSchema = z.object({
    items: z.array(CalculatedItemSchema),
    totals: NutritionSchema,
});

export type Nutrition = z.infer<typeof NutritionSchema>;
export type CalculatedItem = z.infer<typeof CalculatedItemSchema>;
export type CalculateNutrientsResponse = z.infer<typeof CalculateNutrientsResponseSchema>;

export const ConsumoDetalleInputSchema = z.object({
    comidaId: z.number(),
    cantidad_consumida: z.number().min(1),
    calorias_consumida: z.number().min(0),
    proteinas_consumida: z.number().min(0),
    carbohidratos_consumida: z.number().min(0),
    grasas_consumida: z.number().min(0),
});

export const SaveConsumptionInputSchema = z.object({
    calorias_consumidas: z.number().min(0),
    proteinas_consumidas: z.number().min(0),
    carbohidratos_consumidos: z.number().min(0),
    grasas_consumidas: z.number().min(0),
    detalles: z.array(ConsumoDetalleInputSchema).min(1),
});

export type SaveConsumptionInput = z.infer<typeof SaveConsumptionInputSchema>;

export const CreateComidaSchema = z.object({
    FDCID: z.number(),
    nameES: z.string().min(1),
    nameEN: z.string().min(1),
    categoriaId: z.number(),
    medidaId: z.number(),
    calories: z.number().nullable().optional(),
    protein: z.number().nullable().optional(),
    carbs: z.number().nullable().optional(),
    fat: z.number().nullable().optional(),
});

export const UpdateComidaSchema = CreateComidaSchema.partial();
