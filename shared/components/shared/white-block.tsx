import React from "react";
import { cn } from "@/shared/lib/utils";

import { Title } from "@/shared/components/shared";

interface WhiteBlockProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
}
export const WhiteBlock = ({
  className,
  children,
  endAdornment,
  contentClassName,
  title,
}: WhiteBlockProps) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between px-8 py-6 border-b border-b-gray-100">
          <Title className="font-extrabold " size="lg">
            {title}
          </Title>

          {endAdornment}
        </div>
      )}
      <div className={cn("p-8 ", contentClassName)}>{children}</div>
    </div>
  );
};
