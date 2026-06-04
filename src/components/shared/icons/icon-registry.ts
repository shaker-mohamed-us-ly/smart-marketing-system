import { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Dna,
  Target,
  PenTool,
  Send,
  BarChart3,
  Lightbulb,
  Settings,
  User,
  Eye,
  Users,
  Brain,
  Puzzle,
  BookOpen,
  Activity,
  CreditCard,
  Database,
  Cog,
} from "lucide-react";

export interface IconRegistryEntry {
  icon: LucideIcon;
}

export const iconRegistry: Record<string, IconRegistryEntry> = {
  // Client Platform
  "/client/dashboard": { icon: LayoutDashboard },
  "/client/brand": { icon: Building2 },
  "/client/brand-dna": { icon: Dna },
  "/client/campaigns": { icon: Target },
  "/client/content-studio": { icon: PenTool },
  "/client/publishing": { icon: Send },
  "/client/analytics": { icon: BarChart3 },
  "/client/recommendations": { icon: Lightbulb },
  "/client/settings": { icon: Settings },
  "/client/account": { icon: User },

  // Control Platform
  "/control/overview": { icon: Eye },
  "/control/clients": { icon: Users },
  "/control/ai-brain": { icon: Brain },
  "/control/integrations": { icon: Puzzle },
  "/control/learning-center": { icon: BookOpen },
  "/control/monitoring": { icon: Activity },
  "/control/billing": { icon: CreditCard },
  "/control/backup": { icon: Database },
  "/control/system-settings": { icon: Cog },
};

export function getIconForRoute(route: string): LucideIcon | undefined {
  return iconRegistry[route]?.icon;
}
