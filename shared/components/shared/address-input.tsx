"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface AddressInputProps {
  className?: string;
  onChange?: (value?: string) => void;
}
export const AddressInput = ({ className, onChange }: AddressInputProps) => {
  return (
    <>
      <AddressSuggestions
        token="0a93ec30ca06ff606371950405ffc0fb1e7bab1e"
        onChange={(data) => onChange?.(data?.value)}
      />
    </>
  );
};
