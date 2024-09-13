import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, formRegisterValues } from "./schemas";
import { FormInput } from "../../../form-components";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/api/actions";

interface RegisterFormProps {
  className?: string;
  onClose?: () => void;
}
export const RegisterForm = ({ className, onClose }: RegisterFormProps) => {
  const form = useForm<formRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: formRegisterValues) => {
    try {
      const resp = await registerUser(data);

      toast.success("Ви успішно зареєструвались, підтвердить свою пошту", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      console.error("[LoginForm] error", error);
      toast.error("Не вдалося зареєструвались", { icon: "❌" });
    }
  };
  return (
    <>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name={"email"} label="Email" type="email" required />
          <FormInput name={"fullName"} label="Ім'я" required />
          <FormInput
            name={"password"}
            label="Пароль"
            type="password"
            required
          />
          <FormInput
            name={"confirmPassword"}
            label="Повторіть пароль"
            type="password"
            required
          />
          <Button
            loading={form.formState.isSubmitting}
            className="h-12 text-base"
            type="submit"
          >
            Зареєструватись
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
