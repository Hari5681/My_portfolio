
export type Accent = {
    name: string;
    id: string;
    cssVars: {
      dark: {
          primary: string,
          primaryForeground: string,
          accent: string,
          accentForeground: string,
      }
    }
  };
  
  export const accents: Accent[] = [
    {
        name: 'Default',
        id: 'accent-yellow',
        cssVars: {
            dark: {
                primary: '45 93% 47%',
                primaryForeground: '45 93% 10%',
                accent: '45 93% 60%',
                accentForeground: '45 93% 10%',
            }
        }
    },
    {
      name: 'Cyan',
      id: 'accent-cyan',
      cssVars: {
          dark: {
              primary: '180 100% 50%',
              primaryForeground: '180 100% 10%',
              accent: '180 100% 70%',
              accentForeground: '180 100% 10%',
          }
      }
    },
    {
        name: 'Pink',
        id: 'accent-pink',
        cssVars: {
            dark: {
                primary: '330 100% 71.4%',
                primaryForeground: '330 100% 10%',
                accent: '330 100% 80%',
                accentForeground: '330 100% 10%',
            }
        }
    },
    {
        name: 'Orange',
        id: 'accent-orange',
        cssVars: {
            dark: {
                primary: '24 94% 52%',
                primaryForeground: '24 94% 10%',
                accent: '24 94% 65%',
                accentForeground: '24 94% 10%',
            }
        }
    },
    {
        name: 'Green',
        id: 'accent-green',
        cssVars: {
            dark: {
                primary: '142 76% 36%',
                primaryForeground: '142 76% 8%',
                accent: '142 76% 50%',
                accentForeground: '142 76% 8%',
            }
        }
    },
    {
        name: 'Violet',
        id: 'accent-violet',
        cssVars: {
            dark: {
                primary: '262 86% 62%',
                primaryForeground: '262 86% 12%',
                accent: '262 86% 75%',
                accentForeground: '262 86% 12%',
            }
        }
    },
    {
        name: 'Rose',
        id: 'accent-rose',
        cssVars: {
            dark: {
                primary: '340 82% 62%',
                primaryForeground: '340 82% 12%',
                accent: '340 82% 75%',
                accentForeground: '340 82% 12%',
            }
        }
    },
    {
        name: 'Lime',
        id: 'accent-lime',
        cssVars: {
            dark: {
                primary: '84 80% 44%',
                primaryForeground: '84 80% 10%',
                accent: '84 80% 55%',
                accentForeground: '84 80% 10%',
            }
        }
    },
    {
        name: 'Blue',
        id: 'accent-blue',
        cssVars: {
            dark: {
                primary: '221 83% 53%',
                primaryForeground: '221 83% 10%',
                accent: '221 83% 65%',
                accentForeground: '221 83% 10%',
            }
        }
    },
    {
        name: 'Red',
        id: 'accent-red',
        cssVars: {
            dark: {
                primary: '0 72% 51%',
                primaryForeground: '0 72% 10%',
                accent: '0 72% 65%',
                accentForeground: '0 72% 10%',
            }
        }
    },
    {
        name: 'Indigo',
        id: 'accent-indigo',
        cssVars: {
            dark: {
                primary: '243 82% 62%',
                primaryForeground: '243 82% 12%',
                accent: '243 82% 75%',
                accentForeground: '243 82% 12%',
            }
        }
    },
    {
        name: 'Teal',
        id: 'accent-teal',
        cssVars: {
            dark: {
                primary: '166 84% 39%',
                primaryForeground: '166 84% 8%',
                accent: '166 84% 50%',
                accentForeground: '166 84% 8%',
            }
        }
    },
    {
        name: 'Sky',
        id: 'accent-sky',
        cssVars: {
            dark: {
                primary: '198 93% 60%',
                primaryForeground: '198 93% 12%',
                accent: '198 93% 75%',
                accentForeground: '198 93% 12%',
            }
        }
    },
    {
        name: 'Amber',
        id: 'accent-amber',
        cssVars: {
            dark: {
                primary: '38 92% 50%',
                primaryForeground: '38 92% 10%',
                accent: '38 92% 65%',
                accentForeground: '38 92% 10%',
            }
        }
    },
    {
        name: 'Emerald',
        id: 'accent-emerald',
        cssVars: {
            dark: {
                primary: '145 63% 42%',
                primaryForeground: '145 63% 8%',
                accent: '145 63% 55%',
                accentForeground: '145 63% 8%',
            }
        }
    },
    {
      name: 'Bridge',
      id: 'accent-bridge',
      cssVars: {
          dark: {
              primary: '30 50% 50%',
              primaryForeground: '30 50% 10%',
              accent: '30 50% 65%',
              accentForeground: '30 50% 10%',
          }
      }
    },
    {
      name: 'Beige',
      id: 'accent-beige',
      cssVars: {
          dark: {
              primary: '35 40% 60%',
              primaryForeground: '35 40% 10%',
              accent: '35 40% 75%',
              accentForeground: '35 40% 10%',
          }
      }
    }
  ];
  
