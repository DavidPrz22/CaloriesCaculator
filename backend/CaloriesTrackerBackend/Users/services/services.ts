import type { NextFunction, Request, Response } from "express";
import * as jose from 'jose';
/// <reference path="../../nodeApp/types/express.d.ts" />

export class UserService {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Malformed token' });
        }
        
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_jwt_secret');
            const { payload } = await jose.jwtVerify(token, secret);
            
            // Populate req.user
            req.user = {
                id: payload.id as number,
                username: payload.username as string,
            };
            
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    }

}