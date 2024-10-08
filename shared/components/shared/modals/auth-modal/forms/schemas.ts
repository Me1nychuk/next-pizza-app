import { z } from "zod";

export const formPasswordSchema = z
  .string()
  .min(6, { message: "Пароль повинен містити більше 6-х символів" });

export const formFullNameSchema = z
  .string()
  .min(2, { message: "Ім'я повинне містити більше 2-х символів" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Невірний формат електронної пошти" }),
  password: formPasswordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: formFullNameSchema,
      confirmPassword: formPasswordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export const formUpdateInfoSchema = formLoginSchema
  .merge(
    z.object({
      fullName: formFullNameSchema,
      password: z.union([formPasswordSchema, z.string().length(0)]).optional(),
      confirmPassword: z
        .union([formPasswordSchema, z.string().length(0)])
        .optional(),
    })
  )
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type formLoginValues = z.infer<typeof formLoginSchema>;
export type formRegisterValues = z.infer<typeof formRegisterSchema>;
export type formUpdateInfoValues = z.infer<typeof formUpdateInfoSchema>;
