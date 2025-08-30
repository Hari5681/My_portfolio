
"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode } from 'react';
import { themes, type Theme as ThemeType } from '@/lib/themes';
import { accents, type Accent as AccentType } from '@/lib/accents';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  selectedTheme: ThemeType | undefined;
  accent: string;
  setAccent: (accent: string) => void;
  selectedAccent: AccentType | undefined;
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'theme-cyber-dark';
  return localStorage.getItem('theme') || 'theme-cyber-dark';
};

const getInitialAccent = () => {
    if (typeof window === 'undefined') return 'accent-yellow';
    return localStorage.getItem('accent') || 'accent-yellow';
};

const getInitialWallpaper = () => {
  if (typeof window === 'undefined') return 'constellation';
  return localStorage.getItem('wallpaper') || 'constellation';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, _setTheme] = useState(getInitialTheme);
  const [accent, _setAccent] = useState(getInitialAccent);
  const [wallpaper, _setWallpaper] = useState(getInitialWallpaper);
  const [isMounted, setIsMounted] = useState(false);

  const selectedTheme = useMemo(() => themes.find(t => t.id === theme), [theme]);
  const selectedAccent = useMemo(() => accents.find(a => a.id === accent), [accent]);

  const applyTheme = useCallback((theme: ThemeType | undefined, accent: AccentType | undefined) => {
    if (!theme || !accent) return;

    const root = document.documentElement;
    const body = document.body;
    
    body.dataset.theme = theme.id;
    body.dataset.accent = accent.id;

    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    const rootStyle = root.style;
    const themeVars = theme.cssVars.dark;
    const accentVars = accent.cssVars.dark;

    // Apply theme vars
    rootStyle.setProperty('--background', themeVars.background);
    rootStyle.setProperty('--foreground', themeVars.foreground);
    rootStyle.setProperty('--card', themeVars.card);
    rootStyle.setProperty('--card-foreground', themeVars.cardForeground);
    rootStyle.setProperty('--popover', themeVars.popover);
    rootStyle.setProperty('--popover-foreground', themeVars.popoverForeground);
    rootStyle.setProperty('--secondary', themeVars.secondary);
    rootStyle.setProperty('--secondary-foreground', themeVars.secondaryForeground);
    rootStyle.setProperty('--muted', themeVars.muted);
    rootStyle.setProperty('--muted-foreground', themeVars.mutedForeground);
    rootStyle.setProperty('--destructive', themeVars.destructive);
    rootStyle.setProperty('--destructive-foreground', themeVars.destructiveForeground);
    rootStyle.setProperty('--border', themeVars.border);
    rootStyle.setProperty('--input', themeVars.input);
    rootStyle.setProperty('--ring', themeVars.ring);
    
    // Apply accent vars
    rootStyle.setProperty('--primary', accentVars.primary);
    rootStyle.setProperty('--primary-foreground', accentVars.primaryForeground);
    rootStyle.setProperty('--accent', accentVars.accent);
    rootStyle.setProperty('--accent-foreground', accentVars.accentForeground);

    body.style.background = theme.background;
    rootStyle.setProperty('--theme-background', theme.background);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      applyTheme(selectedTheme, selectedAccent);
    }
  }, [selectedTheme, selectedAccent, applyTheme, isMounted]);

  const setTheme = (themeId: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', themeId);
    }
    _setTheme(themeId);
  };

  const setAccent = (accentId: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accent', accentId);
    }
    _setAccent(accentId);
    
    const body = document.body;
    body.classList.add('theme-swing');
    setTimeout(() => {
        body.classList.remove('theme-swing');
    }, 500);
  }
  
  const setWallpaper = (wallpaperId: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('wallpaper', wallpaperId);
    }
    _setWallpaper(wallpaperId);
  };

  const value = useMemo(() => ({
      theme,
      setTheme,
      selectedTheme,
      accent,
      setAccent,
      selectedAccent,
      wallpaper,
      setWallpaper,
  }), [theme, selectedTheme, accent, selectedAccent, wallpaper, setAccent]);

  useEffect(() => {
    const body = document.body;
    if (isMounted && selectedTheme) {
        body.dataset.theme = selectedTheme.id;
    }
  }, [isMounted, selectedTheme]);


  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  );
}
