import React from "react";

interface AuthFormProps {
  className?: string;
}
export const AuthForm = ({ className }: AuthFormProps) => {
  return (
    <>
      <div className={className}>AuthForm</div>
    </>
  );
};
