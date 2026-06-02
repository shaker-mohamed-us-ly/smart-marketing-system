import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/LoginForm";

// Known safe app routes for returnTo validation
const SAFE_RETURN_PATHS = [
  "/client/brand",
  "/client/dashboard",
  "/client/brand-dna",
  "/client/campaigns",
  "/client/content-studio",
  "/client/analytics",
  "/client/recommendations",
  "/client/settings",
  "/control/overview",
  "/control/clients",
  "/control/ai-brain",
  "/control/integrations",
  "/control/learning-center",
  "/control/monitoring",
  "/control/billing",
  "/control/backup",
  "/control/system-settings",
  "/design-system",
  "/",
];

function sanitizeReturnTo(returnTo: string | string[] | undefined): string {
  if (!returnTo || typeof returnTo !== "string") {
    return "/client/brand";
  }

  // Reject absolute URLs
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(returnTo)) {
    return "/client/brand";
  }

  // Reject protocol-relative URLs
  if (returnTo.startsWith("//")) {
    return "/client/brand";
  }

  // Must be a relative path starting with /
  if (!returnTo.startsWith("/")) {
    return "/client/brand";
  }

  // Must match a known safe path (exact or prefix)
  const isSafe = SAFE_RETURN_PATHS.some(
    (safe) => returnTo === safe || returnTo.startsWith(safe + "/")
  );

  return isSafe ? returnTo : "/client/brand";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ returnTo?: string | string[] }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const t = await getTranslations("auth.login");
  const returnTo = sanitizeReturnTo(params?.returnTo);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="p-8 rounded-2xl bg-card/80 border border-border/60 shadow-lg backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground mt-2 text-sm">{t("subtitle")}</p>
          </div>

          {/* Form */}
          <LoginForm returnTo={returnTo} />
        </div>
      </div>
    </div>
  );
}
