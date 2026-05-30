import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";

export interface DNATabsProps extends HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
}

export function DNATabs({ activeTab = "Overview", className, ...props }: DNATabsProps) {
  const t = useTranslations('clientBrandDNA.tabs');
  const tabs = [
    t('overview'),
    t('profile'),
    t('audience'),
    t('products'),
    t('competitors'),
    t('personality'),
    t('voiceTone'),
    t('visualLanguage'),
    t('insights'),
    t('timeline'),
  ];

  return (
    <div className={cn("flex items-center gap-1 border-b border-border/40 mb-8 overflow-x-auto", className)} {...props}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative",
            activeTab === tab
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
