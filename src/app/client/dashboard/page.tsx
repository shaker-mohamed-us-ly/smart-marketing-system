import { Metadata } from "next";
import { createServerTranslator } from "@/i18n/server";
import ClientDashboardV8 from "@/components/client/dashboard/v8/ClientDashboardV8";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("clientDashboard.title"),
    description: t("clientDashboard.subtitle"),
  };
}

export default async function ClientDashboardPage() {
  return <ClientDashboardV8 />;
}
