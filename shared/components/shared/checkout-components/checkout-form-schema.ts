import { z } from "zod";
export const CheckoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Ім'я повинне містити більше 2-х символів" }),
  secondName: z
    .string()
    .min(2, { message: "Прізвище повинне містити більше 2-х символів" }),
  email: z.string().email({ message: "Невірний формат електронної пошти" }),
  phone: z
    .string()
    .min(10, { message: "Номер телефону повинен містити 10 цифр" }),
  address: z
    .string()
    .min(5, { message: "Адрес повинен містити від 5 символів" }),

  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;
