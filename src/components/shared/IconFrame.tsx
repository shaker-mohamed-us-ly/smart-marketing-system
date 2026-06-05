import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, ReactNode } from "react";
import styles from "./IconFrame.module.css";

export type IconFrameTone = "violet" | "emerald" | "amber" | "orange" | "sky" | "slate";

export interface IconFrameProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  tone?: IconFrameTone;
  interactive?: boolean;
  decorative?: boolean;
  children: ReactNode;
}

const IconFrame = forwardRef<HTMLDivElement, IconFrameProps>(
  (
    {
      className,
      size = "md",
      tone,
      interactive = false,
      decorative = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-tone={tone}
        className={cn(
          styles.iconFrame,
          styles[size],
          interactive && styles.interactive,
          className
        )}
        aria-hidden={decorative ? true : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

IconFrame.displayName = "IconFrame";

export { IconFrame };
