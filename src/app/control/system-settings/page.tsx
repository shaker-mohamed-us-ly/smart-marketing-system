import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { Settings, Lock, Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ControlSystemSettingsPage() {
  const t = await getTranslations();
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card variant="glass" className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto mb-6 animate-subtle-pulse shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Settings className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold mb-2">{t("controlSystemSettings.systemConfiguration")}</CardTitle>
          <CardDescription className="text-base">
            {t("controlSystemSettings.controlEveryAspect")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <Lock className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlSystemSettings.security")}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlSystemSettings.network")}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <Settings className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlSystemSettings.config")}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("controlSystemSettings.systemConfigurationHubDescription")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
