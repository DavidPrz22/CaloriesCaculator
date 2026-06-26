import express from 'express'
import { createCaloriesRouter } from '@/Calories/routes';
const app = express();

app.use("/calories",createCaloriesRouter())
