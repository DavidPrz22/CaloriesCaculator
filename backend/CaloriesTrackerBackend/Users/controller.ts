import { prisma } from "@/prisma/lib/prisma";
import bcrypt from "bcrypt";
import { type UserSchemaType} from './zod';
export class UserController {

    static async comparePasswords(plainPassword: string, hashedPassword: string) {
        // Logic to compare passwords
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    }

    static async hashPassword(password: string) {
        // Logic to hash password
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }



    static async loginUser({ username, password }: UserSchemaType) {

        // Logic to login user
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.comparePasswords(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return {
            id: user.id,
            username: user.username
        };
    }

    static async registerUser({ username, password }: UserSchemaType) {
        // Logic to register user
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = await prisma.user.create({
            
            data: {
                username,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
            },
        });

        return newUser;
    
    }

    static async getUserProfile(user: { id: number; username: string } | undefined) {
        // Logic to retrieve user profile

        if (!user) {
            return null;
        }
        const userProfile = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                username: true,
            },
        });

        return userProfile;
    }

}