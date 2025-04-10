import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { themes } from '../theme/theme.js';

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = themes[theme];
  
  return {
    theme,
    toggleTheme,
    colors,
  };
}