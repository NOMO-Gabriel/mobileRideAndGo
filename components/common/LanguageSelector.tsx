// src/components/LanguageSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation.js'
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';

const LanguageSelector = () => {
  const { locale, changeLocale, t } = useTranslation();
  const { theme } = useTheme();
  
  // Styles dynamiques basés sur le thème
  const containerStyle = tw.style(
    'mb-4', 
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  );
  
  const labelStyle = tw.style(
    'text-base font-bold mb-2',
    theme.name === 'dark' ? 'text-gray-100' : 'text-gray-800'
  );
  
  const optionsContainerStyle = tw.style(
    'flex-row rounded-xl overflow-hidden',
    theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
  );
  
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{t('language')}</Text>
      <View style={optionsContainerStyle}>
        <TouchableOpacity
          style={tw.style(
            'flex-1 py-3 items-center justify-center',
            locale === 'fr' ? 'bg-primary' : 'bg-transparent'
          )}
          onPress={() => changeLocale('fr')}
        >
          <Text
            style={tw.style(
              'font-medium',
              locale === 'fr' ? 'text-white' : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            Français
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            'flex-1 py-3 items-center justify-center',
            locale === 'en' ? 'bg-primary' : 'bg-transparent'
          )}
          onPress={() => changeLocale('en')}
        >
          <Text
            style={tw.style(
              'font-medium',
              locale === 'en' ? 'text-white' : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            English
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelector;
