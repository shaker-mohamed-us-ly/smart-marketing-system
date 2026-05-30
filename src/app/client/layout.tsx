import { AppShell } from "@/components/layout/AppShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell platform="client">
      {children}
    </AppShell>
  );
}
