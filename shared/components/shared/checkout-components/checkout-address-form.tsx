"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "@/shared/components/shared/form-components";
import { AddressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface CheckoutAddressFormProps {
  className?: string;
}
export const CheckoutAddressForm = ({
  className,
}: CheckoutAddressFormProps) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock
      title="3. Адреса доставки "
      contentClassName=""
      className={className}
    >
      <div className="flex flex-col gap-5">
        {/* TODO: Знайти щось для УКР або перенести на нову пошту */}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState: { error } }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {error?.message && <ErrorText text={error.message} />}
            </>
          )}
        />
        <FormTextarea
          className="text-base"
          rows={5}
          name="comment"
          placeholder="Ваш коментар"
        />
      </div>
    </WhiteBlock>
  );
};
