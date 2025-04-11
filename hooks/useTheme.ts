// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { themes, ThemeColors } from '../theme/theme';

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Hook pour obtenir des couleurs dérivées et des utilitaires liés au thème
export function useThemedStyles() {
  const { theme, colors } = useTheme();
  
  const isDark = theme === 'dark';
  
  const getContrastColor = (bgColor: string) => {
    // Logique simple pour déterminer si le texte devrait être clair ou foncé
    // basé sur la couleur de fond
    // Pour une implémentation plus précise, utilisez une bibliothèque comme color
    return bgColor === colors.primary || bgColor === colors.secondary 
      ? '#FFFFFF' 
      : isDark ? '#FFFFFF' : '#000000';
  };
  
  return {
    isDark,
    getContrastColor,
    // Couleurs pour les états d'interaction
    pressedColor: (color: string) => isDark ? darkenColor(color, 0.1) : lightenColor(color, 0.1),
    hoverColor: (color: string) => isDark ? lightenColor(color, 0.1) : darkenColor(color, 0.1),
  };
}

// Fonctions utilitaires pour modifier les couleurs
// Ces implémentations sont simplifiées, vous pourriez utiliser une bibliothèque de couleurs
function darkenColor(hex: string, amount: number): string {
  return hex; // Implémentation simplifiée
}

function lightenColor(hex: string, amount: number): string {
  return hex; // Implémentation simplifiée
}