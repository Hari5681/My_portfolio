
'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingScreen } from './loading-screen';

function VisitorGateComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem('hasVisitedPortfolio');
      
      if (!hasVisited && pathname !== '/visitor') {
        router.push('/visitor');
      } else {
        setIsVerified(true);
      }
    }
  }, [pathname, router]);

  if (!isVerified) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}


export function VisitorGate({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <VisitorGateComponent>{children}</VisitorGateComponent>
        </Suspense>
    )
}
