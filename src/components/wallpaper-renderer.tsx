
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/theme-provider';
import { wallpapers } from '@/components/animated-wallpapers';

export const WallpaperRenderer: React.FC = () => {
  const { wallpaper } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SelectedWallpaper = React.useMemo(() => {
    const found = wallpapers.find(w => w.id === wallpaper);
    return found ? found.component : null;
  }, [wallpaper]);

  if (!isClient || !SelectedWallpaper) {
    return null;
  }

  return <SelectedWallpaper />;
};
