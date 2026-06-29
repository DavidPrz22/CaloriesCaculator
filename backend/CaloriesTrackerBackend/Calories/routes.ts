import { Router } from "express";
import { CaloriesFoodController } from "./controllers";
import { SearchFoodQuerySchema, calculateNutrientsArgs } from './zod'
import { ZodError }  from 'zod'


export const CaloriesRouter: Router = Router();

export function createCaloriesRouter(): Router {
    const router = Router();

    router.get("/categories", async (req, res) => {
        const results = await CaloriesFoodController.retrieveFoodsCategories()
        res.status(200).json({"categories": results});
    })

    router.get("/units", async (req, res) => {
        const results = await CaloriesFoodController.retrieveFoodsMeasures()
        res.status(200).json({"units": results});
    })


    router.get('/search-food', async (req, res) => {
        try {
            // 1. Validate and parse the runtime data
            const validatedQuery = SearchFoodQuerySchema.parse(req.query);
            
            // 2. Pass perfectly typed data to the controller
            const results = await CaloriesFoodController.searchFoodbyQuery(
                validatedQuery.query, 
                validatedQuery.lang,
                validatedQuery.categoriaId, 
            );

            res.status(200).json({"foods": results});

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ error: error });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
    
    router.post('/calculate', async (req, res) => {
        try {
            const validatedBody = calculateNutrientsArgs.parse(req.body);
            const response = await CaloriesFoodController.calculateNutrients(validatedBody);
            res.status(200).json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ error: error });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });

    router.post('/save-consumption', async (req, res) => {
        try {
            
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ error: error });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    })
    return router;
}
