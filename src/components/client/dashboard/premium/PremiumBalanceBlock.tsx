import { cn } from "@/lib/utils/cn";

export interface PremiumBalanceBlockProps {
  className?: string;
  variant?: "square" | "rectangle" | "column";
}

export function PremiumBalanceBlock({
  className,
  variant = "square",
}: PremiumBalanceBlockProps) {
  const variantClasses = {
    square: "aspect-square",
    rectangle: "aspect-[16/9]",
    column: "aspect-[9/16]",
  };

  return (
    <div
      className={cn(
        "rounded-[20px]",
        variantClasses[variant],
        className
      )}
      style={{
        backgroundColor: "rgba(241, 245, 249, 0.5)",
      }}
    />
  );
}
