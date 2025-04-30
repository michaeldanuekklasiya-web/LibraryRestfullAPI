import { z } from "zod";

const registerUserValidation = z.object({
  name: z.string().min(5).max(100),
  email: z.string().email().min(5).max(100),
  password: z.string().min(8).max(100),
});

const loginUserValidation = z.object({
  email: z.string().email().min(5).max(100),
  password: z.string().min(8).max(100),
});

export { registerUserValidation, loginUserValidation };