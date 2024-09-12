"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import {
  formUpdateInfoValues,
  formUpdateInfoSchema,
} from "./modals/auth-modal/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Container, Title } from "@/shared/components/shared";
import { FormInput } from "./form-components";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/api/actions";

interface ProfileFormProps {
  className?: string;
  user: User;
}
export const ProfileForm = ({ className, user }: ProfileFormProps) => {
  const form = useForm<formUpdateInfoValues>({
    resolver: zodResolver(formUpdateInfoSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: formUpdateInfoValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Дані профіля оновлено", { icon: "✅" });
    } catch (error) {
      console.error("[ProfileForm Update] error", error);
      toast.error("Не вдалося оновити дані профілю", { icon: "❌" });
    }
  };

  const onClickSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Ви вийшли з вашого акаунту", { icon: "✅" });
  };
  return (
    <Container className="my-10 relative">
      <Title className="font-extrabold mb-8 text-[36px]">
        Профіль {user.fullName || "Користувача"}
      </Title>

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput label="Ім'я" name="fullName" required />
          <FormInput label="Пошта" name="email" type="email" required />

          <FormInput label="Новий пароль" name="password" type="password" />
          <FormInput
            label="Повторіть пароль"
            name="confirmPassword"
            type="password"
          />

          <Button disabled={form.formState.isSubmitting} type="submit">
            Оновити дані
          </Button>

          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            variant="secondary"
            onClick={onClickSignOut}
          >
            Вийти з профілю
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
