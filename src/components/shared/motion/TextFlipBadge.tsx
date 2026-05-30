"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState, useEffect } from "react";

export interface TextFlipBadgeProps extends HTMLAttributes<HTMLDivElement> {
  texts: string[];
  interval?: number;
}

export function TextFlipBadge({
  texts,
  interval = 3000,
  className,
  ...props
}: TextFlipBadgeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium",
        className
      )}
      {...props}
    >
      <span
        key={currentIndex}
        className="animate-text-flip"
        style={{
          animation: "text-flip 0.3s ease-out",
        }}
      >
        {texts[currentIndex]}
      </span>
    </div>
  );
}
