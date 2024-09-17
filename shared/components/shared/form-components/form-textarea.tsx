"use client";

import { BadgeAlert } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../../ui";
import { ClearButton, ErrorText } from "@/shared/components/shared";

interface FormTextareaProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
}
export const FormTextarea = ({
  className,
  name,
  label,
  required,
  placeholder,
  rows = 5,
  ...props
}: FormTextareaProps) => {
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
          <p className="font-medium mb-2">
            {label}
            {required && <BadgeAlert />}
          </p>
        )}
        <div className="relative">
          <Textarea
            className="h-12 text-base"
            placeholder={placeholder}
            {...register(name)}
            {...props}
            rows={rows}
          />
          {value && (
            <ClearButton
              onClick={onClickClear}
              className="top-0 translate-y-2"
            />
          )}
        </div>
        {errorText && <ErrorText text={errorText} />}
      </div>
    </>
  );
};
