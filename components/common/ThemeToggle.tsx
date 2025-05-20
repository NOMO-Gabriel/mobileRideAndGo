
// src/components/ThemeToggle.tsx
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';

const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  const isDarkMode = theme.name === 'dark';
  
  // Styles dynamiques basés sur le thème
  const containerStyle = tw.style(
    'mb-4', 
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  );
  
  const labelStyle = tw.style(
    'text-base font-bold mb-2',
    theme.name === 'dark' ? 'text-gray-100' : 'text-gray-800'
  );
  
  const rowStyle = tw.style(
    'flex-row items-center justify-between p-4 rounded-xl',
    theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
  );
  
  const textStyle = tw.style(
    'text-base',
    theme.name === 'dark' ? 'text-gray-100' : 'text-gray-800'
  );

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{t('theme')}</Text>
      <View style={rowStyle}>
        <Text style={textStyle}>
          {isDarkMode ? t('darkMode') : t('lightMode')}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: theme.primary }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

export default ThemeToggle;