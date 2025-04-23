import { object, string } from "zod";

export const createAccountSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    // .max(32, "Password must be less than 32 characters")
    // .regex(/[a-zA-Z]/, {
    //   message: "Password must contain at least one letter.",
    // })
    // .regex(/[0-9]/, { message: "Password must contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Password must contain at least one special character.",
    // })
    .trim(),
  confirmPassword: string({ required_error: "Confirm your password" }).trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match!",
  path: ["confirmPassword"],
});

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});
