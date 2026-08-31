import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required").toLowerCase(),
  phone: z.string().trim().min(7).max(30).optional(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
  email: z.string().trim().email("Valid email is required").toLowerCase(),
  password: z.string().min(1, "Password is required")
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(20, "Google token is required")
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required")
});