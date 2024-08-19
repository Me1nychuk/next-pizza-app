import { cn } from "@/shared/lib/utils";
import { Checkbox } from "../ui";

export interface FilterCheckBoxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (value: boolean) => void;
  checked?: boolean;
  name?: string;
}
export const FilterCheckBox = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}: FilterCheckBoxProps) => {
  return (
    <>
      <div className={cn("flex items-center space-x-2")}>
        <Checkbox
          onCheckedChange={onCheckedChange}
          checked={checked}
          value={value}
          className="rounded-[8px] h-6 w-6"
          id={`checkbox-${String(name)}-${String(value)}`}
        />
        <label htmlFor={`checkbox-${String(name)}-${String(value)}`}>
          {text}
        </label>
        {endAdornment}
      </div>
    </>
  );
};
