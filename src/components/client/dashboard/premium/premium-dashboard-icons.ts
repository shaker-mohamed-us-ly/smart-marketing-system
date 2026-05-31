/**
 * Premium Dashboard Icon Mapping V4.2
 * Lucide Icons - Untitled UI Style Guidelines
 * 
 * Icon Family: lucide-react (fallback from @untitledui/icons due to type compatibility)
 * Style: Line icons (clean, neutral, consistent)
 * Stroke Width: 1.75–2px (via Lucide defaults)
 * 
 * Icon Sizes:
 * - Section icon: 20–22px
 * - Card icon: 18–20px
 * - Mini button icon: 14–16px
 * - Status icon/dot: 8–10px
 * 
 * Icon Frame:
 * - Square, not circle
 * - 38–44px for section/card
 * - 30–34px for small controls
 * - Radius: 10–14px
 * 
 * Usage Rules:
 * - One icon family only (lucide-react)
 * - No mixed duotone/solid/line styles
 * - No emoji icons
 * - No oversized platform logos
 * - Platform icons: neutralized inside same square frame
 * - Decorative icons: aria-hidden="true"
 * - Icon-only buttons: aria-label required
 */

import {
  // Command & Navigation
  Command,
  Home,
  Settings,
  ArrowUpRight,
  ExternalLink,
  
  // AI & Intelligence
  Star,
  Sparkles,
  Brain,
  Wand2,
  Lightbulb,
  
  // Analytics & Performance
  BarChart2,
  BarChart3,
  TrendingUp,
  ChartLine,
  
  // Health & Success
  ShieldCheck,
  Shield,
  Activity,
  HeartPulse,
  CheckCircle,
  
  // Campaign & Action
  Target,
  Megaphone,
  Zap,
  
  // Timing & Warning
  Clock,
  CalendarClock,
  AlertTriangle,
  
  // Users & Audience
  Users,
  User,
  
  // Content & Media
  File,
  FileText,
  Palette,
  Edit,
  
  // Channels & Social
  Share2,
  MessageCircle,
  Video,
  Radio,
  Send,
  
  // Status
  Check,
  X,
  Info,
  AlertCircle,
  
  // System
  RefreshCw,
  MoreHorizontal,
  Menu,
  Search,
} from "lucide-react";

export const dashboardIcons = {
  // Command Header
  commandHeader: Sparkles,
  aiBadge: Sparkles,
  quickAction: Zap,
  analytics: BarChart2,
  systemHealth: ShieldCheck,
  
  // Scoreboard
  campaignReadiness: Target,
  target: Target,
  brandHealth: HeartPulse,
  health: HeartPulse,
  contentPerformance: BarChart3,
  aiRecommendations: Sparkles,
  
  // Strategic Insights
  strategicInsights: Lightbulb,
  insights: Lightbulb,
  timing: CalendarClock,
  intelligence: Brain,
  highImpact: TrendingUp,
  growth: TrendingUp,
  magic: Wand2,
  
  // Activity Stream
  activity: Activity,
  campaignActivity: Megaphone,
  aiActivity: Sparkles,
  warningActivity: AlertTriangle,
  audienceActivity: Users,
  
  // Quick Actions
  quickActions: Zap,
  brandIdentity: Palette,
  campaignStudio: Megaphone,
  analyticsCenter: Users,
  audience: Users,
  contentStudio: Zap,
  competitorIntelligence: Sparkles,
  
  // Channels
  channels: Share2,
  whatsapp: MessageCircle,
  instagram: Video,
  tiktok: Radio,
  youtube: Video,
  
  // Actions
  openAction: ArrowUpRight,
  viewAll: ExternalLink,
  settings: Settings,
  
  // Status
  statusConnected: Check,
  statusOffline: X,
  statusWarning: AlertCircle,
};

export type DashboardIconKey = keyof typeof dashboardIcons;
