/**
 * Dashboard V8 Icon Mapping
 *
 * Browser-first Prototype Reset — Premium Centered Canvas
 *
 * Icon family: lucide-react (single, consistent line-icon family).
 *
 * Note on @untitledui/icons:
 * - @untitledui/icons is installed, but the existing project standardized on
 *   lucide-react because of type-compatibility issues with the installed
 *   @untitledui/icons version. V8 keeps that proven, type-safe choice so the
 *   production build stays green. The V8 *visual treatment* of icons (frames,
 *   tinting, glow, micro-motion) is fully redesigned vs V7.
 *
 * RSC safety:
 * - This map is consumed only by DashboardV8Icon, which resolves a plain
 *   `iconKey` string into a component. Server components pass serializable
 *   `iconKey` strings — never icon component objects — across the tree.
 */

import {
  Sparkles,
  Brain,
  Wand2,
  Lightbulb,
  Command,
  Gauge,
  Target,
  HeartPulse,
  BarChart3,
  TrendingUp,
  Activity,
  Megaphone,
  AlertTriangle,
  Users,
  CalendarClock,
  Palette,
  Rocket,
  ShieldCheck,
  Share2,
  MessageCircle,
  Camera,
  Music,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
  Settings2,
  Zap,
  Wifi,
  Globe,
  Clock,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const dashboardV8Icons = {
  // Brand intelligence / AI
  aiSpark: Sparkles,
  brain: Brain,
  magic: Wand2,
  insight: Lightbulb,
  command: Command,
  health: Gauge,

  // Metrics
  readiness: Target,
  brandHealth: HeartPulse,
  performance: BarChart3,
  recommendations: Zap,
  trendUp: TrendingUp,

  // Operations / activity
  operations: Activity,
  campaign: Megaphone,
  alert: AlertTriangle,
  audience: Users,
  timing: CalendarClock,

  // Quick actions
  brandDNA: Palette,
  studio: Rocket,
  analytics: TrendingUp,
  shield: ShieldCheck,

  // Channels
  channels: Wifi,
  whatsapp: MessageCircle,
  instagram: Camera,
  tiktok: Music,

  // Connection states
  online: Wifi,
  offlineState: Globe,
  pending: Clock,
  syncing: RefreshCw,

  // Controls / status
  add: Plus,
  openAction: ArrowUpRight,
  up: ArrowUpRight,
  down: ArrowDownRight,
  connected: Check,
  offline: X,
  manage: Settings2,
} satisfies Record<string, LucideIcon>;

export type DashboardV8IconKey = keyof typeof dashboardV8Icons;
