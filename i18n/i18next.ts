// i18n/i18next.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// Importez tous les fichiers de traduction
import translationEn from './locales/en/translation.json';
import translationFr from './locales/fr/translation.json';

// Organisez les traductions par namespace
const resources = {
  en: {
    translation: translationEn,
    common: require('./locales/en/common.json'),
    rides: require('./locales/en/rides.json'),
    profile: require('./locales/en/profile.json'),
  },
  fr: {
    translation: translationFr,
    common: require('./locales/fr/common.json'),
    rides: require('./locales/fr/rides.json'),
    profile: require('./locales/fr/profile.json'),
  },
};

const LANGUAGE_STORAGE_KEY = '@rideandgo_language';

// Détectez la langue du système
const deviceLanguage = getLocales()[0]?.languageCode || 'en';
const supportedLanguages = ['en', 'fr'];
const defaultLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

// Chargez la langue sauvegardée ou utilisez la langue du système
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage || defaultLanguage;
  } catch (error) {
    console.error('Failed to load language:', error);
    return defaultLanguage;
  }
};

// Sauvegardez la langue sélectionnée
export const saveLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save language:', error);
  }
};

// Changez la langue et sauvegardez la préférence
export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);
  saveLanguage(language);
  
  // Pour les langues RTL (si nécessaire pour l'arabe, l'hébreu, etc.)
  const isRTL = language === 'ar' || language === 'he';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    // Nécessite un rechargement de l'application
  }
};

// Initialisez i18next
loadSavedLanguage().then(language => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'en',
      supportedLngs: supportedLanguages,
      interpolation: {
        escapeValue: false,
      },
      cleanCode: true,
      ns: ['translation', 'common', 'rides', 'profile'],
      defaultNS: 'translation',
      compatibilityJSON: 'v3',
    });
});

export default i18next;