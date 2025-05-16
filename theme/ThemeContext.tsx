// theme/ThemeContext.tsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { themes, ThemeColors } from './theme';

export type ThemeContextType = {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  isSystemTheme: boolean;
  useSystemTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: themes.light,
  toggleTheme: () => {},
  setTheme: () => {},
  isSystemTheme: false,
  useSystemTheme: () => {},
});

const THEME_STORAGE_KEY = '@rideandgo_theme';
const SYSTEM_THEME_KEY = '@rideandgo_use_system_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme() || 'light';
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  
  useEffect(() => {
    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (isSystemTheme) {
      //setThemeState(systemColorScheme as 'light' | 'dark');
      setThemeState( 'light' );
    }
  }, [systemColorScheme, isSystemTheme]);

  const loadSavedTheme = async () => {
    try {
      const useSystemTheme = await AsyncStorage.getItem(SYSTEM_THEME_KEY);
      setIsSystemTheme(useSystemTheme === 'true');
      
      if (useSystemTheme === 'true') {
        //setThemeState(systemColorScheme as 'light' | 'dark');
        setThemeState( 'light' );

      } else {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        setThemeState('light');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const setTheme = useCallback(async (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    setIsSystemTheme(false);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      await AsyncStorage.setItem(SYSTEM_THEME_KEY, 'false');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  const useSystemTheme = useCallback(async () => {
    setIsSystemTheme(true);
    //setThemeState(systemColorScheme as 'light' | 'dark');
    setThemeState('light' );
    try {
      await AsyncStorage.setItem(SYSTEM_THEME_KEY, 'true');
    } catch (error) {
      console.error('Failed to save system theme preference:', error);
    }
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        colors: themes[theme], 
        toggleTheme, 
        setTheme,
        isSystemTheme,
        useSystemTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}