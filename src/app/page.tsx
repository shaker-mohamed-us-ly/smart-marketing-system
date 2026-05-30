"use client";

import Link from "next/link";
import { PremiumGradientCard } from "@/components/shared/cards/PremiumGradientCard";
import { IconTile } from "@/components/shared/icons/IconTile";
import { SmartButton } from "@/components/shared/SmartButton";
import { LayoutDashboard, Settings, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/theme/ThemeToggle";

export default function Home() {
  const tHome = useTranslations('home');
  const tNav = useTranslations('navigation');

  return (
    <div className="min-h-screen bg-background p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-5xl font-semibold text-foreground mb-4">
              {tHome("title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {tHome("subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/client/dashboard" className="group">
            <PremiumGradientCard variant="violet" className="h-full">
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <IconTile icon={LayoutDashboard} palette="violet" size="lg" />
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-3">{tHome("clientPlatform")}</h2>
                <p className="text-muted-foreground mb-6 flex-1">
                  {tHome("dashboard")}, {tHome("brandDNA")}, {tHome("campaigns")}, {tHome("analytics")}, {tHome("recommendations")}.
                </p>
                <SmartButton variant="primary" className="w-full">
                  {tNav("enterClientPlatform")}
                </SmartButton>
              </div>
            </PremiumGradientCard>
          </Link>

          <Link href="/control/overview" className="group">
            <PremiumGradientCard variant="blue" className="h-full">
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <IconTile icon={Settings} palette="blue" size="lg" />
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-3">{tHome("controlPlatform")}</h2>
                <p className="text-muted-foreground mb-6 flex-1">
                  {tHome("aiBrain")}, {tHome("monitoring")}, {tHome("integrations")}, {tHome("billing")}.
                </p>
                <SmartButton variant="primary" className="w-full">
                  {tNav("enterControlPlatform")}
                </SmartButton>
              </div>
            </PremiumGradientCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
