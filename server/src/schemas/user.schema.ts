import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  profilePic: z.string().url().optional(),
  email: z.string().email(),
  followers: z.array(z.string().length(24)), // ObjectId as string
  following: z.array(z.string().length(24)),
});
export const LoginSchema = UserSchema.pick({
  username: true,
  password: true,
});
export const RegisterSchema = UserSchema.pick({
  username: true,
  password: true,
  email: true,
  profilePic: true,
}).extend({
  followers: z.array(z.string().length(24)).optional().default([]),
  following: z.array(z.string().length(24)).optional().default([]),
});

export type UserType = z.infer<typeof UserSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
