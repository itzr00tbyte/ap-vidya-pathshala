import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

const subjectButtonVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      subjectColor: {
        blue: "border-ev-blue text-ev-blue hover:bg-ev-blue/10",
        green: "border-ev-green text-ev-green hover:bg-ev-green/10",
        orange: "border-ev-orange text-ev-orange hover:bg-ev-orange/10",
        purple: "border-ev-purple text-ev-purple hover:bg-ev-purple/10",
        yellow: "border-ev-yellow text-ev-yellow hover:bg-ev-yellow/10",
        red: "border-ev-red text-ev-red hover:bg-ev-red/10",
      },
      fontSize: {
        default: "text-base",
        sm: "text-sm",
      },
      isChapterStyle: {
        true: "w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5",
        false: "",
      },
      isQuizStyle: {
        true: "rounded-full px-4 py-2 flex items-center justify-center gap-2",
        false: "",
      }
    },
    defaultVariants: {
      subjectColor: "blue",
      fontSize: "default",
      isChapterStyle: false,
      isQuizStyle: false,
    },
  }
);

export interface SubjectButtonProps
  extends ButtonProps,
    Omit<VariantProps<typeof subjectButtonVariants>, "size"> {
  subjectColor?: "blue" | "green" | "orange" | "purple" | "yellow" | "red";
  fontSize?: "default" | "sm";
  isChapterStyle?: boolean;
  isQuizStyle?: boolean;
  children: React.ReactNode;
}

const SubjectButton = React.forwardRef<HTMLButtonElement, SubjectButtonProps>(
  ({ className, variant = "outline", subjectColor, fontSize, isChapterStyle, isQuizStyle, size, ...props }, ref) => {
    // If we're using isQuizStyle with a color, set the background color to match that subject
    const backgroundColorClass = isQuizStyle && subjectColor && variant === "default" 
      ? `bg-ev-${subjectColor} text-white hover:bg-ev-${subjectColor}/90` 
      : "";
    
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          subjectButtonVariants({ 
            subjectColor, 
            fontSize, 
            isChapterStyle, 
            isQuizStyle, 
            className 
          }),
          backgroundColorClass
        )}
        {...props}
      />
    );
  }
);

SubjectButton.displayName = "SubjectButton";

export { SubjectButton, subjectButtonVariants };
