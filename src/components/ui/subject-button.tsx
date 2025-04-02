
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const subjectButtonVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      subjectColor: {
        blue: "border-ap-blue text-ap-blue hover:bg-ap-blue/10",
        green: "border-ap-green text-ap-green hover:bg-ap-green/10",
        orange: "border-ap-orange text-ap-orange hover:bg-ap-orange/10",
        purple: "border-ap-purple text-ap-purple hover:bg-ap-purple/10",
        yellow: "border-ap-yellow text-ap-yellow hover:bg-ap-yellow/10",
        red: "border-ap-red text-ap-red hover:bg-ap-red/10",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      subjectColor: "blue",
      size: "default",
    },
  }
);

export interface SubjectButtonProps
  extends ButtonProps,
    VariantProps<typeof subjectButtonVariants> {
  subjectColor?: "blue" | "green" | "orange" | "purple" | "yellow" | "red";
  children: React.ReactNode;
}

const SubjectButton = React.forwardRef<HTMLButtonElement, SubjectButtonProps>(
  ({ className, variant = "outline", subjectColor, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(subjectButtonVariants({ subjectColor, size, className }))}
        {...props}
      />
    );
  }
);

SubjectButton.displayName = "SubjectButton";

export { SubjectButton, subjectButtonVariants };
