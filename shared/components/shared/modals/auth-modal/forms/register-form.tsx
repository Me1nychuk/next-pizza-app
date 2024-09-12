import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Title } from "@/shared/components/shared";
import { formRegisterSchema, formRegisterValues } from "./schemas";
import Image from "next/image";
import { FormInput } from "../../../form-components";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";

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
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Вхід в акаунт успішний", { icon: "✅" });

      onClose?.();
    } catch (error) {
      console.error("[LoginForm] error", error);
      toast.error("Не вдалося увійти", { icon: "❌" });
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
            Ввійти
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
