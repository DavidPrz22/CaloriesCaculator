import { z } from "zod";

export const SearchFoodQuerySchema = z.object({
    query: z.string().min(2, "Query must be at least 2 characters long"),
    lang: z.enum(["EN", "ES"]),
    categoriaId: z.coerce.number(),
});

export type SearchFoodQuery = z.infer<typeof SearchFoodQuerySchema>;