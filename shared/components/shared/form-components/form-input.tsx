"use client";

import React from "react";
import { BadgeAlert } from "lucide-react";
import { Input } from "../../ui";
import { ClearButton, ErrorText } from "@/shared/components/shared";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
}
export const FormInput = ({
  className,
  name,
  label,
  required,
  placeholder,
  ...props
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <>
      <div className={className}>
        {label && (
          <p className="font-medium mb-2 flex gap-1 items-center">
            {label}
            {required && <BadgeAlert size={12} color="red" />}
          </p>
        )}
        <div className="relative">
          <Input
            className="h-12 text-base"
            placeholder={placeholder}
            {...register(name)}
            {...props}
          />
          {value && <ClearButton onClick={onClickClear} />}
        </div>
        {errorText && <ErrorText text={errorText} />}
      </div>
    </>
  );
};
