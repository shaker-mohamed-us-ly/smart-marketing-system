import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/AppShell";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Defense-in-depth: if middleware did not redirect (e.g., dev mode on Windows),
    // redirect here before rendering any protected UI.
    // Exact returnTo is handled by middleware in production; layout uses safe fallback.
    redirect("/login?returnTo=/client/brand");
  }

  return (
    <AppShell platform="client">
      {children}
    </AppShell>
  );
}
