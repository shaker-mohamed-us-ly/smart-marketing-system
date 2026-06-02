import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Known safe app routes for next/returnTo validation
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

function sanitizeNext(next: string | null): string {
  if (!next) {
    return "/client/brand";
  }

  // Reject absolute URLs
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(next)) {
    return "/client/brand";
  }

  // Reject protocol-relative URLs
  if (next.startsWith("//")) {
    return "/client/brand";
  }

  // Must be a relative path starting with /
  if (!next.startsWith("/")) {
    return "/client/brand";
  }

  // Must match a known safe path (exact or prefix)
  const isSafe = SAFE_RETURN_PATHS.some(
    (safe) => next === safe || next.startsWith(safe + "/")
  );

  return isSafe ? next : "/client/brand";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNext(searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(
      new URL(`/login?error=oauth_failed&returnTo=${encodeURIComponent(next)}`, request.url)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // Do not log the error message or code to avoid leaking tokens or codes
    return NextResponse.redirect(
      new URL(`/login?error=oauth_failed&returnTo=${encodeURIComponent(next)}`, request.url)
    );
  }

  // Success — redirect to sanitized destination
  return NextResponse.redirect(new URL(next, request.url));
}
