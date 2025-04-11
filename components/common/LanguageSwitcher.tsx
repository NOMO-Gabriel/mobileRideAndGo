// components/LanguageSwitcher.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { changeLanguage } from '@/i18n/i18next';

// Utilisez des drapeaux ou icônes pour les langues
const FLAGS = {
  en: require('@/assets/images/flags/en.png'),
  fr: require('@/assets/images/flags/fr.png'),
};

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { colors } = useTheme();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t('common:selectLanguage')}
      </Text>
      
      <View style={styles.languageOptions}>
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              currentLanguage === language.code && { 
                backgroundColor: colors.primary,
                borderColor: colors.primaryDark 
              },
              { borderColor: colors.border }
            ]}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Image 
              source={FLAGS[language.code as keyof typeof FLAGS]} 
              style={styles.flag} 
            />
            <Text style={[
              styles.languageName,
              { color: currentLanguage === language.code ? '#FFF' : colors.text }
            ]}>
              {language.nativeName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  languageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 5,
    minWidth: 120,
    justifyContent: 'center',
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  languageName: {
    fontSize: 16,
  }
});