import { z } from "zod";

export const UserAuthSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserAuthSchemaType = z.infer<typeof UserAuthSchema>;

export const UserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
