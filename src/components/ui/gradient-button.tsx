import React from "react";
import { Button } from "./button";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  icon: Icon,
  children,
  className,
  ...props
}) => {
  return (
    <Button
      variant="gradient"
      className={cn(
        "gap-2 h-10 px-6 font-normal text-sm tracking-wide transition-all active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4.5 w-4.5" />}
      <span>{children}</span>
    </Button>
  );
};
export default GradientButton;
