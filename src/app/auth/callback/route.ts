import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

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
  "/client/account",
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
  const providerError = searchParams.get("error");
  const providerErrorDescription = searchParams.get("error_description");

  const isDev = process.env.NODE_ENV === "development";
  let cookiesToSetCount = 0;
  let cookieNamesToSet: string[] = [];
  let callbackStatus: string | null = null;
  let exchangeErrorName: string | null = null;
  let exchangeErrorMessage: string | null = null;

  // If the OAuth provider returned an error (e.g., user denied access)
  if (providerError) {
    callbackStatus = "provider_error";
    if (isDev) {
      console.log("[AUTH CALLBACK] provider_error", {
        hasCode: !!code,
        hasProviderError: true,
        providerErrorName: providerError,
        providerErrorDescription:
          providerErrorDescription?.slice(0, 80) ?? null,
        sanitizedNext: next,
        redirectDestination: `/login?error=oauth_provider_error`,
        callbackStatus,
      });
    }
    return NextResponse.redirect(
      new URL(
        `/login?error=oauth_provider_error&returnTo=${encodeURIComponent(next)}`,
        request.url
      )
    );
  }

  if (!code) {
    callbackStatus = "missing_code";
    if (isDev) {
      console.log("[AUTH CALLBACK] missing_code", {
        hasCode: false,
        hasProviderError: false,
        sanitizedNext: next,
        redirectDestination: `/login?error=oauth_missing_code`,
        callbackStatus,
      });
    }
    return NextResponse.redirect(
      new URL(
        `/login?error=oauth_missing_code&returnTo=${encodeURIComponent(next)}`,
        request.url
      )
    );
  }

  // Build a response pointing to the success destination so we can attach
  // cookies before returning.  The shared server helper cannot be used here
  // because cookies() from next/headers is read-only in Route Handlers.
  let response = NextResponse.redirect(new URL(next, request.url));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    callbackStatus = "env_missing";
    if (isDev) {
      console.log("[AUTH CALLBACK] env_missing", {
        hasCode: true,
        hasProviderError: false,
        envUrlPresent: !!supabaseUrl,
        envKeyPresent: !!supabaseAnonKey,
        sanitizedNext: next,
        redirectDestination: `/login?error=oauth_env_missing`,
        callbackStatus,
      });
    }
    return NextResponse.redirect(
      new URL(
        `/login?error=oauth_env_missing&returnTo=${encodeURIComponent(next)}`,
        request.url
      )
    );
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const all = request.cookies.getAll();
        return all;
      },
      setAll(cookiesToSet) {
        cookiesToSetCount = cookiesToSet.length;
        cookieNamesToSet = cookiesToSet.map((c) => c.name);
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    callbackStatus = "exchange_failed";
    exchangeErrorName = error.name ?? null;
    exchangeErrorMessage = error.message?.slice(0, 120) ?? null;
    if (isDev) {
      console.log("[AUTH CALLBACK] exchange_failed", {
        hasCode: true,
        hasProviderError: false,
        sanitizedNext: next,
        exchangeAttempted: true,
        exchangeSucceeded: false,
        exchangeErrorName,
        exchangeErrorMessage,
        cookiesToSetCount,
        cookieNamesToSet,
        redirectDestination: `/login?error=oauth_exchange_failed`,
        callbackStatus,
      });
    }
    // Discard any partial cookies and redirect to login with error
    return NextResponse.redirect(
      new URL(
        `/login?error=oauth_exchange_failed&returnTo=${encodeURIComponent(next)}`,
        request.url
      )
    );
  }

  callbackStatus = "success";
  if (isDev) {
    console.log("[AUTH CALLBACK] success", {
      hasCode: true,
      hasProviderError: false,
      sanitizedNext: next,
      exchangeAttempted: true,
      exchangeSucceeded: true,
      cookiesToSetCount,
      cookieNamesToSet,
      redirectDestination: next,
      callbackStatus,
    });
  }

  // Success — response carries the session cookies written by setAll
  return response;
}
