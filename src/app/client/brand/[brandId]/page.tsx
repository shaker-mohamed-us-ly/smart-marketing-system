import { getBrandWithProfile } from '@/lib/brand/server-actions';
import { BrandDetailsShell } from '@/components/client/brand/BrandDetailsShell';
import { notFound } from 'next/navigation';

interface BrandDetailPageProps {
  params: Promise<{ brandId: string }>;
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { brandId } = await params;
  const result = await getBrandWithProfile(brandId);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10" style={{ background: 'var(--sms-v8-canvas)' }}>
      <BrandDetailsShell brand={result.data.brand} profile={result.data.profile} />
    </div>
  );
}
