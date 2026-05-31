import { Metadata } from "next";
import { createServerTranslator } from "@/i18n/server";
import ClientDashboardV7 from "@/components/client/dashboard/v7/ClientDashboardV7";
import { cn } from "@/lib/utils/cn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("clientDashboard.title"),
    description: t("clientDashboard.subtitle"),
  };
}

export default async function ClientDashboardPage() {
  return (
    <div
      className={cn(
        // Light mode: clean warm-gray/off-white
        "bg-[#F6F7F9]",
        // Dark mode: luxury graphite
        "dark:bg-[#090B0F]",
        // Full height
        "min-h-screen"
      )}
      style={{
        // Light mode subtle radial accent
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)",
      }}
    >
      <ClientDashboardV7 />
    </div>
  );
}
