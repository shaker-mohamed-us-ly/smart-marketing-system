"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface AnimatedShellProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

const AnimatedShell = forwardRef<HTMLDivElement, AnimatedShellProps>(
  ({ className, delay = 0, children, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return <div ref={ref} className={className} {...props}>{children}</div>;
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedShell.displayName = "AnimatedShell";

export { AnimatedShell };
