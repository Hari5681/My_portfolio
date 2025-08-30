
export type Theme = {
  name: string;
  id: string;
  isDark: boolean;
  background: string;
  cssVars: {
    dark: {
        background: string,
        foreground: string,
        card: string,
        cardForeground: string,
        popover: string,
        popoverForeground: string,
        secondary: string,
        secondaryForeground: string,
        muted: string,
        mutedForeground: string,
        destructive: string,
        destructiveForeground: string,
        border: string,
        input: string,
        ring: string,
    }
  }
};

export const themes: Theme[] = [
  {
    name: 'Cyber Dark',
    id: 'theme-cyber-dark',
    isDark: true,
    background: 'radial-gradient(ellipse at bottom, hsl(225 7% 8%) 0%, hsl(225 7% 3%) 100%)',
    cssVars: {
        dark: {
            background: '225 7% 5%',
            foreground: '210 40% 98%',
            card: '225 7% 8%',
            cardForeground: '210 40% 98%',
            popover: '225 7% 5%',
            popoverForeground: '210 40% 98%',
            secondary: '217 33% 17%',
            secondaryForeground: '210 40% 98%',
            muted: '217 33% 17%',
            mutedForeground: '215 20% 65%',
            destructive: '0 63% 31%',
            destructiveForeground: '210 40% 98%',
            border: '217 33% 17%',
            input: '217 33% 17%',
            ring: '213 27% 84%',
        }
    }
  },
];
