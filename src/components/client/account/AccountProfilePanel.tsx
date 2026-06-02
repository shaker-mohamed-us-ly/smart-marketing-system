"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/shared/Button";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Mail, Shield, UserCircle } from "lucide-react";

interface AccountProfilePanelProps {
  email: string;
  provider?: string;
}

export function AccountProfilePanel({ email, provider }: AccountProfilePanelProps) {
  const t = useTranslations("account");
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.refresh();
      router.push("/login");
    } catch {
      setIsSigningOut(false);
    }
  };

  const providerLabel = provider === "google" ? "Google" : provider === "email" ? t("providerEmail") : provider || t("providerEmail");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl bg-card/80 border border-border/60 p-6 space-y-5">
        {/* User Avatar / Icon */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center">
            <UserCircle className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="font-semibold">{email}</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium mt-1">
              <Shield className="h-3 w-3" />
              {t("statusActive")}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("email")}:</span>
            <span className="font-medium">{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t("provider")}:</span>
            <span className="font-medium">{providerLabel}</span>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="rounded-2xl bg-card/80 border border-border/60 p-6">
        <h2 className="text-lg font-semibold mb-2">{t("sessionTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t("sessionDescription")}</p>
        <Button
          variant="outline"
          size="md"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          {isSigningOut ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t("signingOut")}
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
