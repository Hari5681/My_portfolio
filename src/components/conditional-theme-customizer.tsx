
'use client';

import { usePathname } from 'next/navigation';
import { CustomizeTheme } from './customize-theme';

export function ConditionalThemeCustomizer() {
  const pathname = usePathname();

  // Only render the theme customizer on the homepage
  if (pathname !== '/') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
        <CustomizeTheme />
    </div>
  );
}
