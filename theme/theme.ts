// theme/theme.ts
export const themes = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#ff8c00', // Orange (couleur principale)
    secondary: '#1b263b', // Bleu foncé (couleur secondaire)
    accent: '#ff9f1c', // Orange légèrement plus claire
    border: '#E5E5EA',
    card: '#F2F2F7',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
    // Dégradés de la couleur principale
    primaryLight: '#ffaa42',
    primaryDark: '#e67e00',
    // Dégradés de la couleur secondaire
    secondaryLight: '#2c3c59',
    secondaryDark: '#111927',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#ff8c00', // On garde la même couleur primaire pour maintenir l'identité
    secondary: '#1b263b',
    accent: '#ffaa42', // Version plus claire pour dark mode
    border: '#383838',
    card: '#1e1e1e',
    success: '#81C784',
    error: '#E57373',
    warning: '#FFD54F',
    info: '#64B5F6',
    // Dégradés de la couleur principale
    primaryLight: '#ffaa42',
    primaryDark: '#e67e00',
    // Dégradés de la couleur secondaire
    secondaryLight: '#2c3c59',
    secondaryDark: '#111927',
  },
};

// Type pour les couleurs du thème
export type ThemeColors = typeof themes.light;

// Utilitaire pour accéder à la palette selon le thème actuel
export function useThemeColors(theme: 'light' | 'dark'): ThemeColors {
  return themes[theme];
}