import React from "react";
import { BadgeAlert } from "lucide-react";
import { Input } from "../../ui";
import { ClearButton, ErrorText } from "@/shared/components/shared";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}
export const FormInput = ({
  className,
  name,
  label,
  required,
  placeholder,
  ...props
}: FormInputProps) => {
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
          <Input
            className="h-12 text-base"
            name={name}
            placeholder={placeholder}
            {...props}
          />
          <ClearButton />
        </div>
        <ErrorText text="Поле обов'язкове для вводу" className="mt-2" />
      </div>
    </>
  );
};
