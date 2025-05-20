// src/hooks/useTheme.js
import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thèmes
export const themes = {
  light: {
    name: 'light',
    background: '#FFFFFF',
    text: '#1B263B',
    primary: '#FF8C00',
    secondary: '#1B263B',
    accent: '#FF8C00',
    border: '#E5E7EB',
    card: '#F9FAFB',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    name: 'dark',
    background: '#1B263B',
    text: '#F9FAFB',
    primary: '#FF8C00',
    secondary: '#F9FAFB',
    accent: '#FF8C00',
    border: '#374151',
    card: '#273349',
    shadow: 'rgba(0, 0, 0, 0.3)',
  }
};

// Contexte pour le thème
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  // Charger le thème au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setTheme(themes.dark);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    
    loadTheme();
  }, []);

  // Changer de thème
  const toggleTheme = async () => {
    const newTheme = theme.name === 'light' ? themes.dark : themes.light;
    try {
      await AsyncStorage.setItem('theme', newTheme.name);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour le thème
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};