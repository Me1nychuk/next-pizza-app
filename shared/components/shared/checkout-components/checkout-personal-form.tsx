import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components";

interface CheckoutPersonalFormProps {
  className?: string;
}
export const CheckoutPersonalForm = ({
  className,
}: CheckoutPersonalFormProps) => {
  return (
    <WhiteBlock
      title="2. Персональні дані"
      contentClassName=""
      className={className}
    >
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" type="text" placeholder="Ваше ім'я" />
        <FormInput name="secondName" type="text" placeholder="Ваше прізвище" />
        <FormInput
          name="email"
          type="email"
          placeholder="Ваша електронна пошта"
        />
        <FormInput
          className="appearance-none no-spin"
          name="phone"
          type="text"
          placeholder="Номер телефону"
        />
      </div>
    </WhiteBlock>
  );
};
