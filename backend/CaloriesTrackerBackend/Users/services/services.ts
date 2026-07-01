import type { NextFunction, RequestHandler, Request, Response } from "express";
import session from "express-session";

export class UserService {

    static AddSession() : RequestHandler {
        return session({
            secret: process.env.SESSION_SECRET || '3453dfgwe4t345sdfg43e5q5rasfasdfvqsd', // Use an environment variable in production
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, // Set to true if using HTTPS in production
                httpOnly: true,
            },
        })
    }

    static validateSession(req: Request, res: Response, next: NextFunction) {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    }
}