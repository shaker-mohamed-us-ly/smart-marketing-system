import { BrandProgressStepper } from './BrandProgressStepper';
import { BrandQuickActions } from './BrandQuickActions';
import type { Brand } from '@/lib/brand/types';

interface BrandOverviewTabProps {
  brand: Brand;
  onNavigateToIdentity?: () => void;
}

export function BrandOverviewTab({ brand, onNavigateToIdentity }: BrandOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main readiness panel */}
      <div className="lg:col-span-2 space-y-6">
        <BrandProgressStepper brand={brand} />
      </div>

      {/* Quick actions sidebar */}
      <div className="lg:col-span-1">
        <BrandQuickActions brand={brand} onNavigateToIdentity={onNavigateToIdentity} />
      </div>
    </div>
  );
}
