import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import styles from "./Card.module.css";

export type CardTone = "violet" | "emerald" | "amber" | "orange" | "sky" | "slate";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle" | "interactive" | "panel" | "bordered" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  tone?: CardTone;
  fullWidth?: boolean;
  as?: "div" | "section" | "article";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      tone,
      fullWidth = false,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        data-tone={tone}
        className={cn(
          styles.surface,
          styles[variant],
          styles[`pad${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
          tone && styles.toneAccent,
          fullWidth && styles.fullWidth,
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.header, className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.content, className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.footer, className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
