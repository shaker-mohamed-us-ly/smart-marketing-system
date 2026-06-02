"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shared/Button";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  returnTo: string;
}

export function LoginForm({ returnTo }: LoginFormProps) {
  const t = useTranslations("auth.login");
  const tErrors = useTranslations("auth.errors");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Surface OAuth callback errors from the URL query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error");
    if (urlError) {
      switch (urlError) {
        case "oauth_provider_error":
          setError(tErrors("oauthProviderError"));
          break;
        case "oauth_missing_code":
          setError(tErrors("oauthMissingCode"));
          break;
        case "oauth_env_missing":
          setError(tErrors("oauthEnvMissing"));
          break;
        case "oauth_exchange_failed":
          setError(tErrors("oauthExchangeFailed"));
          break;
        case "oauth_cookie_write_failed":
          setError(tErrors("oauthCookieWriteFailed"));
          break;
        case "oauth_failed":
        case "oauth_callback_failed":
        default:
          setError(tErrors("oauthCallbackFailed"));
          break;
      }
    }
  }, [tErrors]);

  const validate = useCallback((): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = tErrors("invalidEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = tErrors("invalidEmail");
    }

    if (!password) {
      errors.password = tErrors("passwordRequired");
    } else if (password.length < 6) {
      errors.password = tErrors("passwordTooShort");
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password, tErrors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!validate()) {
        return;
      }

      setIsLoading(true);

      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (authError) {
          // Map Supabase error to safe localized message
          const code = authError.status;
          const msg = authError.message?.toLowerCase() || "";

          if (msg.includes("invalid login credentials")) {
            setError(tErrors("invalidCredentials"));
          } else if (msg.includes("email not confirmed")) {
            setError(tErrors("emailNotConfirmed"));
          } else if (code === 429 || msg.includes("rate limit") || msg.includes("too many requests")) {
            setError(tErrors("tooManyAttempts"));
          } else if (msg.includes("network") || msg.includes("fetch")) {
            setError(tErrors("networkError"));
          } else if (msg.includes("supabase") && msg.includes("missing")) {
            setError(tErrors("envMissing"));
          } else {
            setError(tErrors("unknownError"));
          }
          return;
        }

        // Verify session was persisted in cookies before navigating
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setError(tErrors("sessionNotPersisting"));
          return;
        }

        // Refresh server cache so subsequent server actions see the session
        router.refresh();

        // Navigate to the return destination
        router.push(returnTo);
      } catch (err) {
        const errMsg = err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message).toLowerCase()
          : "";

        if (errMsg.includes("supabase") && errMsg.includes("missing")) {
          setError(tErrors("envMissing"));
        } else if (errMsg.includes("network") || errMsg.includes("fetch")) {
          setError(tErrors("networkError"));
        } else {
          setError(tErrors("unknownError"));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, returnTo, router, tErrors, validate]
  );

  const handleGoogleSignIn = useCallback(async () => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(returnTo)}`;
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (oauthError) {
        const msg = oauthError.message?.toLowerCase() || "";
        if (msg.includes("provider")) {
          setError(tErrors("googleProviderNotConfigured"));
        } else {
          setError(tErrors("googleOAuthFailed"));
        }
        setIsGoogleLoading(false);
        return;
      }

      // On success, Supabase redirects the browser to Google OAuth.
      // No further action needed here.
    } catch {
      setError(tErrors("googleOAuthFailed"));
      setIsGoogleLoading(false);
    }
  }, [returnTo, tErrors]);

  const anyLoading = isLoading || isGoogleLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder={t("emailPlaceholder")}
          disabled={anyLoading}
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:opacity-50"
          dir="ltr"
        />
        {fieldErrors.email && (
          <p className="text-sm text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          {t("passwordLabel")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder={t("passwordPlaceholder")}
          disabled={anyLoading}
          autoComplete="current-password"
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:opacity-50"
        />
        {fieldErrors.password && (
          <p className="text-sm text-destructive">{fieldErrors.password}</p>
        )}
      </div>

      {/* General error */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={anyLoading}
        className="w-full"
      >
        {isLoading ? t("submitting") : t("submit")}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card/80 px-2 text-muted-foreground">{t("or")}</span>
        </div>
      </div>

      {/* Google OAuth */}
      <Button
        type="button"
        variant="outline"
        size="md"
        disabled={anyLoading}
        onClick={handleGoogleSignIn}
        className="w-full"
      >
        {isGoogleLoading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
            {t("googleSubmitting")}
          </>
        ) : (
          <>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("continueWithGoogle")}
          </>
        )}
      </Button>
    </form>
  );
}
