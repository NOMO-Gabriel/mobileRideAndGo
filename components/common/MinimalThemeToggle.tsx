// src/components/MinimalThemeToggle.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTranslation } from '../../hooks/useTranslation.js'
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';
const MinimalThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme.name === 'dark';
  
  return (
    <TouchableOpacity
      style={tw.style(
        'p-2 rounded-full',
        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      )}
      onPress={toggleTheme}
    >
      {isDarkMode ? (
        <Feather name="sun" size={16} color="#FF8C00" />
      ) : (
        <Feather name="moon" size={16} color="#1B263B" />
      )}
    </TouchableOpacity>
  );
};

export default MinimalThemeToggle;
