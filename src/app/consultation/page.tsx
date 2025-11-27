'use client';

import { useRouter } from 'next/navigation';
import ConsultationBooking from '@/components/ConsultationBooking';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ConsultationPage() {
  const router = useRouter();

  return (
    <ConsultationBooking
      reportData={null}
      companyInfo={null}
      assessmentScore={0}
      onBack={() => router.push('/reports')}
      onSuccess={() => {
        router.push('/');
      }}
    />
  );
}
