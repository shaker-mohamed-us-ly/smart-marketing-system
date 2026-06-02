import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AccountProfilePanel } from "@/components/client/account/AccountProfilePanel";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=/client/account");
  }

  const t = await getTranslations("account");

  const provider =
    user.app_metadata?.provider === "google"
      ? "google"
      : user.identities?.[0]?.provider === "google"
        ? "google"
        : "email";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <AccountProfilePanel email={user.email || ""} provider={provider} />
    </div>
  );
}
