import { Router } from "express";
import { CaloriesFoodController } from "./controllers";
import  { SearchFoodQuerySchema } from './zod'
import { ZodError }  from 'zod'


export const CaloriesRouter: Router = Router();

export function createCaloriesRouter(): Router {
    const router = Router();

    const timeLog = (req, res, next) => {
        console.log('Time: ', Date.now());
        next();
    };
    router.use(timeLog);

    router.get("/categories", async (req, res) => {
        const results = await CaloriesFoodController.retrieveFoodsCategories()
        res.json({"categories": results, "status": res.status(200)});
    })

    router.get("/units", async (req, res) => {
        const results = await CaloriesFoodController.retrieveFoodsMeasures()
        res.json({"categories": results, "status": res.status(200)});
    })


    router.get('/search-food', async (req, res) => {
        try {
            // 1. Validate and parse the runtime data
            const validatedQuery = SearchFoodQuerySchema.parse(req.query);
            
            // 2. Pass perfectly typed data to the controller
            const results = await CaloriesFoodController.searchFoodbyQuery(
                validatedQuery.query, 
                validatedQuery.categoriaId, 
                validatedQuery.lang
            );

            res.json({"foods": results, "status": res.status(200)});

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ error: error });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
    


    return router;
}
