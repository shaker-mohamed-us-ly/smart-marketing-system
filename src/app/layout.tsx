import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getServerLocale } from "@/i18n/server";
import { localeDirectionMap } from "@/i18n/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Marketing System",
  description: "Living AI Operating System for Marketing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get locale from server-side cookies
  const locale = await getServerLocale();
  const direction = localeDirectionMap[locale];
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Theme pre-hydration
                  var savedTheme = localStorage.getItem('theme');
                  var html = document.documentElement;
                  
                  if (savedTheme === 'dark') {
                    html.classList.remove('light');
                    html.classList.add('dark');
                  } else {
                    html.classList.remove('dark');
                    html.classList.add('light');
                  }
                  
                  // Language pre-hydration
                  // Check localStorage first, then cookies
                  var savedLocale = localStorage.getItem('locale');
                  if (!savedLocale) {
                    // Try to read from NEXT_LOCALE cookie
                    var match = document.cookie.match(/(^|;)\\s*NEXT_LOCALE=([^;]+)/);
                    if (match) {
                      savedLocale = match[2];
                    } else {
                      // Try legacy locale cookie
                      var legacyMatch = document.cookie.match(/(^|;)\\s*locale=([^;]+)/);
                      if (legacyMatch) {
                        savedLocale = legacyMatch[2];
                      }
                    }
                  }
                  
                  if (savedLocale === 'en') {
                    html.setAttribute('lang', 'en');
                    html.setAttribute('dir', 'ltr');
                  } else {
                    html.setAttribute('lang', 'ar');
                    html.setAttribute('dir', 'rtl');
                  }
                } catch (e) {
                  console.error('Pre-hydration script error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
