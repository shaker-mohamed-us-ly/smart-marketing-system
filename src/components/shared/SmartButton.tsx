"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useState } from "react";
import { Button } from "./Button";

export interface SmartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const SmartButton = forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, className, ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200",
      ghost: "hover:bg-secondary/50 transition-all duration-200",
      outline: "border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200",
      danger: "bg-error text-error-foreground hover:bg-error/90 hover:shadow-lg hover:shadow-error/20 transition-all duration-200",
      success: "bg-success text-success-foreground hover:bg-success/90 hover:shadow-lg hover:shadow-success/20 transition-all duration-200",
    };

    return (
      <Button
        ref={ref}
        variant={variant === "primary" || variant === "danger" || variant === "success" ? "primary" : variant === "outline" ? "outline" : variant === "secondary" ? "secondary" : "ghost"}
        size={size}
        disabled={loading}
        className={cn(
          "relative overflow-hidden",
          variantStyles[variant],
          {
            "scale-95": isPressed && !loading,
            "opacity-80 cursor-not-allowed": loading,
          },
          className
        )}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SmartButton.displayName = "SmartButton";

export { SmartButton };
