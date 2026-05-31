/**
 * Dashboard V8 Hero — compact command header.
 *
 * Left: AI badge, title, subtitle, primary (Liquid Sweep) + secondary
 * (Aurora Border) actions. Right: live system status side-panel.
 * All text arrives as plain strings (i18n resolved on the server).
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8Button } from "./DashboardV8Button";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8HeroProps {
  badgeLabel: string;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  statusLabel: string;
  healthLabel: string;
  healthValue: string;
  learningLabel: string;
  learningValue: string;
}

export function DashboardV8Hero({
  badgeLabel,
  title,
  subtitle,
  primaryActionLabel,
  secondaryActionLabel,
  statusLabel,
  healthLabel,
  healthValue,
  learningLabel,
  learningValue,
}: DashboardV8HeroProps) {
  return (
    <section className={cn(styles.hero, styles.reveal, styles.r1)}>
      <span className={styles.heroGlow} aria-hidden="true" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span data-tone="violet" className={styles.heroBadge}>
            <DashboardV8Icon iconKey="aiSpark" size="chip" tone="violet" />
            {badgeLabel}
          </span>
          <span data-tone="emerald" className={styles.statusPill}>
            <span className={styles.statusDot} aria-hidden="true" />
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DashboardV8Button
            variant="primary"
            icon={<DashboardV8Icon iconKey="command" size="chip" tone="violet" />}
          >
            {primaryActionLabel}
          </DashboardV8Button>
          <DashboardV8Button
            variant="secondary"
            icon={<DashboardV8Icon iconKey="analytics" size="chip" tone="sky" />}
          >
            {secondaryActionLabel}
          </DashboardV8Button>
        </div>
      </div>

      <div className={styles.heroSidePanel}>
        <div className="flex items-center gap-3">
          <DashboardV8Icon iconKey="brain" size="panel" tone="violet" />
          <div className="flex flex-col">
            <span className={cn("text-sm font-bold", styles.sectionTitle)}>{healthLabel}</span>
            <span className={cn("text-xs", styles.textFaint)}>{learningLabel}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div data-tone="emerald" className="rounded-2xl border px-3 py-3" style={{ borderColor: "var(--tone-border)", background: "var(--tone-bg)" }}>
            <div className={cn("text-xs", styles.textMuted)}>{healthLabel}</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--tone-text)" }}>{healthValue}</div>
          </div>
          <div data-tone="violet" className="rounded-2xl border px-3 py-3" style={{ borderColor: "var(--tone-border)", background: "var(--tone-bg)" }}>
            <div className={cn("text-xs", styles.textMuted)}>{learningLabel}</div>
            <div className="text-lg font-extrabold" style={{ color: "var(--tone-text)" }}>{learningValue}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
