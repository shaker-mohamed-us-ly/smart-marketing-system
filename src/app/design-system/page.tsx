import { Button } from "@/components/shared/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedShell } from "@/components/shared/AnimatedShell";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { TrendingUp, Users, Target, Zap, Sparkles, Cpu, Globe, BarChart3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function DesignSystemPage() {
  const t = await getTranslations();
  return (
    <div className="min-h-screen bg-background radial-bg">
      <div className="container mx-auto px-4 py-16">
        <AnimatedShell>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6 animate-breathing">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("designSystem.livingAIOperatingSystem")}</span>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight mb-4">
              {t("designSystem.designSystem")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("designSystem.description")}
            </p>
          </div>
        </AnimatedShell>

        <div className="space-y-16">
          {/* Luxury Color Palette */}
          <AnimatedShell delay={0.1}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.luxuryTechColorPalette")}</CardTitle>
                <CardDescription>
                  {t("designSystem.luxuryTechColorPaletteDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-medium mb-4 text-muted-foreground">{t("designSystem.baseColors")}</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#fafbfc] border border-border/60" />
                        <p className="text-sm font-medium">{t("designSystem.softWhite")}</p>
                        <p className="text-xs text-muted-foreground">#fafbfc</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#f5f6f7]" />
                        <p className="text-sm font-medium">{t("designSystem.warmNeutral")}</p>
                        <p className="text-xs text-muted-foreground">#f5f6f7</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#2d313a]" />
                        <p className="text-sm font-medium">{t("designSystem.graphite")}</p>
                        <p className="text-xs text-muted-foreground">#2d313a</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#6b7280]" />
                        <p className="text-sm font-medium">{t("designSystem.premiumGray")}</p>
                        <p className="text-xs text-muted-foreground">#6b7280</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-4 text-muted-foreground">{t("designSystem.accentColors")}</p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#4f46e5]" />
                        <p className="text-sm font-medium">{t("designSystem.primary")}</p>
                        <p className="text-xs text-muted-foreground">#4f46e5</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#3b82f6]" />
                        <p className="text-sm font-medium">{t("designSystem.intelligentBlue")}</p>
                        <p className="text-xs text-muted-foreground">#3b82f6</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#7c3aed]" />
                        <p className="text-sm font-medium">{t("designSystem.elegantViolet")}</p>
                        <p className="text-xs text-muted-foreground">#7c3aed</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-16 rounded-xl bg-[#06b6d4]" />
                        <p className="text-sm font-medium">{t("designSystem.luxuryCyan")}</p>
                        <p className="text-xs text-muted-foreground">#06b6d4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Typography */}
          <AnimatedShell delay={0.2}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.premiumTypography")}</CardTitle>
                <CardDescription>
                  {t("designSystem.premiumTypographyDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-semibold mb-2">{t("designSystem.inter")}</p>
                    <p className="text-muted-foreground">Clean, modern, professional</p>
                  </div>
                  <div className="pt-6 border-t border-border/60">
                    <p className="text-4xl font-semibold mb-2" style={{ fontFamily: 'var(--font-ibm-plex-arabic)' }}>
                      {t("designSystem.ibmPlexSansArabic")}
                    </p>
                    <p className="text-muted-foreground">Elegant, readable, premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Platform Personalities */}
          <AnimatedShell delay={0.3}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.platformPersonalities")}</CardTitle>
                <CardDescription>
                  Each platform has its own character and feel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-indigo-600/10 to-emerald-500/10 border border-border/60">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t("designSystem.clientPlatform")}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Calm, elegant, premium, beautiful, growth-oriented
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-border/60">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t("designSystem.controlPlatform")}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Executive, command-center, alive, premium
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-border/60">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t("designSystem.aiCore")}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Intelligent, mysterious, subtle, futuristic
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Components */}
          <AnimatedShell delay={0.4}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.premiumComponents")}</CardTitle>
                <CardDescription>
                  Luxury cards, elegant buttons, refined badges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-medium mb-4 text-muted-foreground">{t("designSystem.buttons")}</p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">{t("designSystem.primary")}</Button>
                      <Button variant="secondary">{t("designSystem.secondary")}</Button>
                      <Button variant="ghost">{t("designSystem.ghost")}</Button>
                      <Button variant="outline">{t("designSystem.outline")}</Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border/60">
                    <p className="text-sm font-medium mb-4 text-muted-foreground">{t("designSystem.badges")}</p>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="default">{t("designSystem.default")}</Badge>
                      <Badge variant="success">{t("designSystem.success")}</Badge>
                      <Badge variant="warning">{t("designSystem.warning")}</Badge>
                      <Badge variant="error">{t("designSystem.error")}</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border/60">
                    <p className="text-sm font-medium mb-4 text-muted-foreground">{t("designSystem.statusPills")}</p>
                    <div className="flex flex-wrap gap-4">
                      <StatusPill status="active" />
                      <StatusPill status="inactive" />
                      <StatusPill status="pending" />
                      <StatusPill status="success" />
                      <StatusPill status="error" />
                      <StatusPill status="warning" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Cards */}
          <AnimatedShell delay={0.5}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.luxuryCards")}</CardTitle>
                <CardDescription>
                  Soft depth, premium shadows, elegant hover states.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>{t("designSystem.default")}</CardTitle>
                      <CardDescription>{t("designSystem.premiumShadowWithHoverElevation")}</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>{t("designSystem.elevated")}</CardTitle>
                      <CardDescription>{t("designSystem.enhancedDepthWithSmoothTransitions")}</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle>{t("designSystem.glass")}</CardTitle>
                      <CardDescription>{t("designSystem.subtleTransparencyWithBackdropBlur")}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Metric Cards */}
          <AnimatedShell delay={0.6}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>{t("designSystem.livingMetrics")}</CardTitle>
                <CardDescription>
                  Data cards with intelligent trends and elegant presentation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    title={t("designSystem.totalRevenue")}
                    value="$124,500"
                    change="+12.5%"
                    changeType="positive"
                    icon={TrendingUp}
                  />
                  <MetricCard
                    title={t("designSystem.activeUsers")}
                    value="8,432"
                    change="+5.2%"
                    changeType="positive"
                    icon={Users}
                  />
                  <MetricCard
                    title={t("designSystem.campaigns")}
                    value="24"
                    change="+3"
                    changeType="positive"
                    icon={Target}
                  />
                  <MetricCard
                    title={t("designSystem.aiScore")}
                    value="94"
                    change="-2.1%"
                    changeType="negative"
                    icon={Zap}
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>

          {/* Future OS Preview */}
          <AnimatedShell delay={0.7}>
            <Card variant="glass" className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center animate-subtle-pulse">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>{t("designSystem.futureMarketingOS")}</CardTitle>
                    <CardDescription>
                      A glimpse into what's possible with this design system
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-semibold mb-2">{t("designSystem.welcomeToTheFuture")}</h3>
                      <p className="text-muted-foreground text-lg">
                        Your AI-powered marketing command center is ready
                      </p>
                    </div>
                    <Button variant="primary" size="lg" className="hover-elevation">
                      {t("designSystem.launchCampaign")}
                    </Button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <MetricCard
                      title={t("designSystem.aiPredictions")}
                      value="94.2%"
                      change="+2.3%"
                      changeType="positive"
                      icon={Sparkles}
                    />
                    <MetricCard
                      title={t("designSystem.marketReach")}
                      value="2.4M"
                      change="+18.2%"
                      changeType="positive"
                      icon={Globe}
                    />
                    <MetricCard
                      title={t("designSystem.growthRate")}
                      value="34.8%"
                      change="+8.3%"
                      changeType="positive"
                      icon={BarChart3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedShell>
        </div>
      </div>
    </div>
  );
}
