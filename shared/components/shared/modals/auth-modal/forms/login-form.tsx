import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, formLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form-components";
import Image from "next/image";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onClose?: () => void;
  className?: string;
}
export const LoginForm = ({ className, onClose }: LoginFormProps) => {
  const form = useForm<formLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: formLoginValues) => {
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
          <div className="flex justify-between items-center">
            <div className="mr-2">
              <Title className="font-bold" size="md">
                Вхід в акаунт
              </Title>
              <p>Введіть свою пошту, щоб увійти</p>
            </div>
            <Image
              alt=""
              width={60}
              height={60}
              src="/assets/images/phone-icon.png"
            />
          </div>

          <FormInput name={"email"} label="Email" required />
          <FormInput
            name={"password"}
            label="Password"
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
