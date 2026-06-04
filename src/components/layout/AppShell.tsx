import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  platform: "client" | "control";
  children: React.ReactNode;
  activeItem?: string;
}

const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      platform,
      children,
      activeItem,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-screen bg-background radial-bg", className)}
        {...props}
      >
        <AppSidebar
          platform={platform}
          activeItem={activeItem}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader platform={platform} />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-none">
            {children}
          </main>
        </div>
      </div>
    );
  }
);

AppShell.displayName = "AppShell";

export { AppShell };
