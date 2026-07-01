import Router, { type Router as RouterType } from 'express';
import { UserSchema } from './zod';
import { UserController } from './controller';  

export function getuserRoutes () : RouterType {
    const userRoutes = Router();

    userRoutes.get('/profile', async (req, res) => {
        const user = req.session.user;
        const userProfile = await UserController.getUserProfile(user!);
        if (!userProfile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json(userProfile);
    }) 

    userRoutes.get('/login', async (req, res) => {
        const { username, password } = req.body;
        const validationResult = UserSchema.safeParse({ username, password });
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error });
        }

        // Proceed with user login logic
        const user = await UserController.loginUser({ username, password });
        req.session.user = user; // Store user info in session
        res.redirect('/profile');
    }) 


    userRoutes.get('/signup', async (req, res) => {
        const { username, password } = req.body;
        const validationResult = UserSchema.safeParse({ username, password });

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error });
        }

        // Proceed with user registration logic
        const user = await UserController.registerUser({ username, password });

        req.session.user = user; // Store user info in session
        res.redirect('/profile');
    
        return res.status(201).json({ message: 'User registered successfully', user });
    }) 


    return userRoutes;
}