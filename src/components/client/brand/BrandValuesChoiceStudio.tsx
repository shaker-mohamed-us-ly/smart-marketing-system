'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { BrandValueGlyph } from './BrandValueGlyph';
import type { BrandValuesState, BrandValueItem, BrandValueKey } from '@/lib/brand/types';
import { RotateCcw, Check, Save } from 'lucide-react';

interface Props {
  initialValues?: BrandValuesState | null;
  onSave: (values: BrandValuesState) => Promise<void>;
  disabled?: boolean;
}

const COPPER = '#c4945c';
const COPPER_LIGHT = 'rgba(196,148,92,0.12)';
const COPPER_MID = 'rgba(196,148,92,0.30)';
const COPPER_STRONG = 'rgba(196,148,92,0.55)';
const COPPER_DARK = 'rgba(196,148,92,0.50)';
const COPPER_GLOW = 'rgba(196,148,92,0.08)';

const PRESET_KEYS: BrandValueKey[] = [
  'trust', 'quality', 'speed', 'simplicity', 'luxury', 'customer_closeness', 'innovation', 'professionalism', 'transparency',
];

const IMPACTS: Record<string, { design: string; marketing: string; content: string; publishing: string; anti: string }> = {
  trust:      { design: 'نظيف وموثوق', marketing: 'إثبات الثقة', content: 'لا وعود مبالغة', publishing: 'ثابت ومنتظم', anti: 'تجنب الغموض' },
  quality:    { design: 'رفيع التفاصيل', marketing: 'إبراز الجودة', content: 'لا صور رديئة', publishing: 'انتقائي وهادئ', anti: 'تجنب التسرع' },
  speed:      { design: 'مباشر وواضح', marketing: 'عروض سريعة', content: 'لا تعقيد', publishing: 'سريع ومباشر', anti: 'تجنب التأخير' },
  simplicity: { design: 'بسيط ونظيف', marketing: 'رسالة واضحة', content: 'لا لف ودوران', publishing: 'موجز ومفيد', anti: 'تجنب التعقيد' },
  luxury:     { design: 'فاخر وراقي', marketing: 'قيمة لا سعر', content: 'لا خصومات مبتذلة', publishing: 'نادر لكن قوي', anti: 'تجنب الصخب' },
  customer_closeness: { design: 'دافئ وقريب', marketing: 'قصص عملاء', content: 'لا لغة آلية', publishing: 'تفاعلي وقريب', anti: 'تجنب اللامبالاة' },
  innovation: { design: 'جريء وعصري', marketing: 'إطلاقات منتجات', content: 'لا تكرار', publishing: 'أول من ينشر', anti: 'تجنب التقليد' },
  professionalism: { design: 'منظم ومحترف', marketing: 'إثبات الكفاءة', content: 'لا أخطاء لغوية', publishing: 'ثابت ومنتظم', anti: 'تجنب الاستهتار' },
  transparency: { design: 'واضح ومفتوح', marketing: 'أسعار واضحة', content: 'لا شروط خفية', publishing: 'مباشر وصريح', anti: 'تجنب الغموض' },
};

function CompassRoseSVG({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
      <path d="M32 4 L36 24 L32 28 L28 24 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
      <path d="M32 60 L28 40 L32 36 L36 40 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1" />
      <path d="M4 32 L24 28 L28 32 L24 36 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1" />
      <path d="M60 32 L40 36 L36 32 L40 28 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function BrandValuesChoiceStudio({ initialValues, onSave, disabled }: Props) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.brandValues');
  const [selected, setSelected] = useState<BrandValueItem[]>(initialValues?.selected || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isSel = useCallback((k: string) => selected.some((s) => s.key === k), [selected]);

  const toggle = useCallback((key: BrandValueKey) => {
    setSaved(false);
    setSelected((prev) => {
      const exists = prev.find((x) => x.key === key);
      if (exists) return prev.filter((x) => x.key !== key);
      if (prev.length >= 3) return prev;
      return [...prev, { id: `${key}-${Date.now()}`, key, label: t(`valueLabels.${key}`), iconKey: key }];
    });
  }, [t]);

  const clear = useCallback(() => { setSelected([]); setSaved(false); }, []);

  const save = useCallback(async () => {
    setSaving(true); setSaved(false);
    try {
      await onSave({ version: 1, selected, updatedAt: new Date().toISOString() });
      setSaved(true);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  }, [selected, onSave]);

  const count = selected.length;
  const canAdd = count < 3;
  const activeImpacts = selected.map((s) => IMPACTS[s.key]).filter(Boolean);

  return (
    <>
      <style>{`
        @keyframes tokenEnter {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroAppear {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lensUpdate {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes savedReveal {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .token-enter {
          animation: tokenEnter 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-appear {
          animation: heroAppear 350ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .lens-update {
          animation: lensUpdate 280ms ease-out both;
        }
        .saved-reveal {
          animation: savedReveal 200ms ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .token-enter, .hero-appear, .lens-update, .saved-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="relative rounded-2xl border p-5 sm:p-7" style={{ background: 'var(--sms-v8-surface)', borderColor: 'var(--sms-v8-border)' }}>
        {/* Gallery Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-6 w-1 rounded-full shrink-0" style={{ background: COPPER }} />
          <div>
            <h3 className="text-base font-semibold tracking-tight" style={{ color: 'var(--sms-v8-text)' }}>{t('title')}</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
              {count}/3 {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Selected Values Gallery */}
        <div className="mb-6">
          {selected.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border" style={{ background: 'var(--sms-v8-surface-2)', borderColor: 'var(--sms-v8-border)', borderStyle: 'dashed' }}>
              <CompassRoseSVG className="w-16 h-16 mb-4" style={{ color: 'var(--sms-v8-text-3)' }} />
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--sms-v8-text-2)' }}>{t('emptyTitle')}</p>
              <p className="text-xs" style={{ color: 'var(--sms-v8-text-3)' }}>{t('emptyDesc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {selected.map((it, idx) => {
                const key = it.key as BrandValueKey;
                return (
                  <button
                    key={it.id}
                    onClick={() => toggle(key)}
                    className="group relative flex flex-col items-center gap-2.5 py-6 px-4 rounded-xl text-center transition-all duration-200 hero-appear"
                    style={{
                      background: `linear-gradient(160deg, ${COPPER_LIGHT} 0%, ${COPPER_GLOW} 100%)`,
                      border: `2px solid ${COPPER}`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px ${COPPER_GLOW}, 0 0 0 1px ${COPPER_MID}`,
                      animationDelay: `${idx * 80}ms`,
                      cursor: 'pointer',
                    }}
                    type="button"
                  >
                    {/* Selected checkmark badge */}
                    <span
                      className="absolute -top-2 -end-2 flex items-center justify-center w-6 h-6 rounded-full border-2"
                      style={{ background: COPPER, borderColor: 'var(--sms-v8-surface)' }}
                    >
                      <Check className="h-3.5 w-3.5" style={{ color: '#fff' }} strokeWidth={3} />
                    </span>
                    <span className="flex items-center justify-center w-14 h-14 rounded-xl" style={{ background: COPPER_LIGHT }}>
                      <BrandValueGlyph value={it.key as BrandValueKey} size="lg" style={{ color: COPPER }} />
                    </span>
                    <p className="text-sm font-bold leading-tight" style={{ color: 'var(--sms-v8-text)' }}>{it.label}</p>
                    <p className="text-xs font-medium" style={{ color: COPPER }}>{t(`valueCues.${key}`)}</p>
                  </button>
                );
              })}
              {Array.from({ length: 3 - selected.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex flex-col items-center justify-center gap-2.5 py-6 px-4 rounded-xl border-2"
                  style={{ background: 'var(--sms-v8-surface-2)', borderColor: 'var(--sms-v8-border)', borderStyle: 'dashed', opacity: 0.45 }}
                >
                  <span className="flex items-center justify-center w-14 h-14 rounded-xl" style={{ background: 'var(--sms-v8-surface)' }}>
                    <span className="h-6 w-6 rounded-full border-2 border-dashed" style={{ borderColor: 'var(--sms-v8-border)' }} />
                  </span>
                  <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>—</p>
                  <p className="text-xs" style={{ color: 'var(--sms-v8-text-3)' }}>&nbsp;</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save / Clear Controls Toolbar */}
        {selected.length > 0 && (
          <div className="flex items-center justify-between gap-3 mb-6 p-3 rounded-xl border" style={{ background: 'var(--sms-v8-surface-2)', borderColor: 'var(--sms-v8-border)' }}>
            <div className="flex items-center gap-2">
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full saved-reveal" style={{ background: COPPER_LIGHT, color: COPPER }}>
                  <Check className="h-3 w-3" strokeWidth={3} />
                  {t('saved')}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clear}
                disabled={disabled || saving}
                className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                style={{ color: 'var(--sms-v8-text-2)', background: 'var(--sms-v8-surface)' }}
                type="button"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('clear')}</span>
              </button>
              <Button size="sm" onClick={save} disabled={disabled || saving} icon={<Save className="h-4 w-4" />}>
                {saving ? t('saving') : t('save')}
              </Button>
            </div>
          </div>
        )}

        {selected.length === 0 && saved && (
          <p className="text-xs mb-5 font-medium saved-reveal text-center" style={{ color: COPPER }}>{t('saved')}</p>
        )}

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'var(--sms-v8-border)' }} />

        {/* Values Palette */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--sms-v8-text-3)' }}>{t('paletteTitle')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {PRESET_KEYS.map((key, idx) => {
              const active = isSel(key);
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  disabled={disabled || (!active && !canAdd)}
                  className="group relative flex flex-col items-center gap-2 py-4 px-2 sm:py-3 sm:px-2 rounded-xl text-center transition-all duration-180 token-enter"
                  style={{
                    background: active
                      ? `linear-gradient(145deg, ${COPPER_LIGHT} 0%, ${COPPER_GLOW} 100%)`
                      : 'var(--sms-v8-surface-2)',
                    border: active ? `2px solid ${COPPER}` : '1.5px solid var(--sms-v8-border)',
                    boxShadow: active ? `inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px ${COPPER_GLOW}` : 'none',
                    opacity: !active && !canAdd ? 0.35 : 1,
                    cursor: !active && !canAdd ? 'not-allowed' : 'pointer',
                    animationDelay: `${idx * 30}ms`,
                  }}
                  type="button"
                >
                  {active && (
                    <span
                      className="absolute -top-1.5 -end-1.5 flex items-center justify-center w-5 h-5 rounded-full border-2"
                      style={{ background: COPPER, borderColor: 'var(--sms-v8-surface)' }}
                    >
                      <Check className="h-3 w-3" style={{ color: '#fff' }} strokeWidth={3} />
                    </span>
                  )}
                  <span
                    className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg transition-transform duration-150 group-hover:scale-105"
                    style={{
                      background: active ? COPPER_LIGHT : 'var(--sms-v8-surface)',
                      color: active ? COPPER : 'var(--sms-v8-text-2)',
                    }}
                  >
                    <BrandValueGlyph value={key} size="sm" />
                  </span>
                  <p className="text-xs font-semibold leading-tight" style={{ color: active ? 'var(--sms-v8-text)' : 'var(--sms-v8-text-2)' }}>{t(`valueLabels.${key}`)}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Impact Lens */}
        {activeImpacts.length > 0 && (
          <div className="lens-update">
            <div className="h-px mb-5" style={{ background: 'var(--sms-v8-border)' }} />
            <div className="flex items-center gap-2 mb-4">
              <span className="h-5 w-1 rounded-full" style={{ background: COPPER }} />
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--sms-v8-text-3)' }}>{t('impactTitle')}</p>
            </div>
            <div className="rounded-xl border p-4 sm:p-5" style={{ background: 'var(--sms-v8-surface-2)', borderColor: 'var(--sms-v8-border)' }}>
              {[
                { key: 'design', label: t('impactDesign'), dot: COPPER, chipBg: 'rgba(196,148,92,0.10)', chipBorder: 'rgba(196,148,92,0.25)', chipText: COPPER },
                { key: 'marketing', label: t('impactMarketing'), dot: '#a78bfa', chipBg: 'rgba(167,139,250,0.10)', chipBorder: 'rgba(167,139,250,0.25)', chipText: '#a78bfa' },
                { key: 'content', label: t('impactContent'), dot: '#22d3ee', chipBg: 'rgba(34,211,238,0.10)', chipBorder: 'rgba(34,211,238,0.25)', chipText: '#22d3ee' },
                { key: 'publishing', label: t('impactPublishing'), dot: '#34d399', chipBg: 'rgba(52,211,153,0.10)', chipBorder: 'rgba(52,211,153,0.25)', chipText: '#34d399' },
              ].map((row) => (
                <div key={row.key} className="flex items-start gap-3 py-3 border-b last:border-b-0" style={{ borderColor: 'var(--sms-v8-border)' }}>
                  <span className="h-2.5 w-2.5 rounded-full shrink-0 mt-0.5" style={{ background: row.dot }} />
                  <div className="shrink-0 min-w-0">
                    <p className="text-xs font-bold" style={{ color: 'var(--sms-v8-text)' }}>{row.label}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {activeImpacts.map((imp, i) => (
                      <span key={`${row.key}-${i}`} className="text-xs font-medium px-2.5 py-1 rounded-lg border" style={{ background: row.chipBg, borderColor: row.chipBorder, color: row.chipText }}>
                        {(imp as any)[row.key]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 pt-3 mt-1 border-t rounded-b-xl" style={{ borderColor: 'var(--sms-v8-border)' }}>
                <span className="h-2.5 w-2.5 rounded-full shrink-0 mt-0.5" style={{ background: '#ef4444' }} />
                <div className="shrink-0 min-w-0">
                  <p className="text-xs font-bold" style={{ color: '#ef4444' }}>{t('impactAvoid')}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                  {[...new Set(activeImpacts.map((imp) => imp.anti))].map((anti) => (
                    <span key={anti} className="text-xs font-medium px-2.5 py-1 rounded-lg border" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.20)', color: '#ef4444' }}>
                      {anti}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
