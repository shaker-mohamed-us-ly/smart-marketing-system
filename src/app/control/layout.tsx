import { AppShell } from "@/components/layout/AppShell";

export default function ControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell platform="control">
      {children}
    </AppShell>
  );
}
