// src/components/MinimalLanguageToggle.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation.js'
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';

const MinimalLanguageToggle = () => {
  const { locale, changeLocale } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <View style={tw.style(
      'flex-row rounded-full overflow-hidden border',
      theme.name === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
    )}>
      <TouchableOpacity
        style={tw.style(
          'py-1 px-2 rounded-full',
          locale === 'fr' ? 'bg-primary' : 'bg-transparent'
        )}
        onPress={() => changeLocale('fr')}
      >
        <Text style={tw.style(
          'text-xs font-medium',
          locale === 'fr' ? 'text-white' : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          FR
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={tw.style(
          'py-1 px-2 rounded-full',
          locale === 'en' ? 'bg-primary' : 'bg-transparent'
        )}
        onPress={() => changeLocale('en')}
      >
        <Text style={tw.style(
          'text-xs font-medium',
          locale === 'en' ? 'text-white' : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MinimalLanguageToggle;

