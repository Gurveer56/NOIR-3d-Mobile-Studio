import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode, Themes } from '../constants/theme';

interface AppThemeValue {
  themeMode: ThemeMode;
  colors: (typeof Themes)[ThemeMode];
  isDark: boolean;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(systemTheme === 'light' ? 'light' : 'dark');

  const value = useMemo<AppThemeValue>(() => {
    const toggleTheme = () => {
      setThemeMode((value) => (value === 'dark' ? 'light' : 'dark'));
    };

    return {
      themeMode,
      colors: Themes[themeMode],
      isDark: themeMode === 'dark',
      toggleTheme,
    };
  }, [themeMode]);

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    return {
      themeMode: 'dark' as const,
      colors: Themes.dark,
      isDark: true,
      toggleTheme: () => {},
    };
  }

  return {
    ...context,
    colors: context.colors ?? Themes.dark,
  };
}
