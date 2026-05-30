import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/Card";
import { CreditCard, Receipt, DollarSign } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ControlBillingPage() {
  const t = await getTranslations();
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card variant="glass" className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto mb-6 animate-subtle-pulse shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <CreditCard className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold mb-2">{t("controlBilling.billingCenter")}</CardTitle>
          <CardDescription className="text-base">
            {t("controlBilling.financialClarityAndControl")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <Receipt className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlBilling.invoices")}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <DollarSign className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlBilling.plans")}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{t("controlBilling.payment")}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("controlBilling.billingCommandCenterDescription")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
