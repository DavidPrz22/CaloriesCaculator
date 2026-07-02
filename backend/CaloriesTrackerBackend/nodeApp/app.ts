import express from 'express'
import cors from "cors";

import { UserService } from '../Users/services/services';
import { createCaloriesRouter } from '@/Calories/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    // Removed session middleware
    // Note: If you mount user routes like /login or /signup, ensure they are mounted BEFORE this middleware
    // or apply validateJWT only to protected routes instead of globally!
app.use(UserService.validateJWT); // Add JWT validation middleware


app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5175',
    ],
    credentials: true
}));

// Logger middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    next();
});

app.use("/api/calories", createCaloriesRouter())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});