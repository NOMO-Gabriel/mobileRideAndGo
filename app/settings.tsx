// app/settings.tsx
import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../hooks/useTheme';
import LanguageSelector from '../components/common/LanguageSelector';
import ThemeToggle from '../components/common/ThemeToggle';
import tw from '../utils/tailwind';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Styles dynamiques basés sur le thème
  const containerStyle = tw.style(
    'flex-1 p-5',
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
  );
  
  const textStyle = tw.style(
    'text-lg',
    theme.name === 'dark' ? 'text-gray-100' : 'text-gray-800'
  );
  
  const sectionStyle = tw.style(
    'rounded-2xl p-5 mb-6 shadow-sm',
    theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
  );
  
  const headerStyle = tw.style(
    'text-xl font-bold mb-4',
    theme.name === 'dark' ? 'text-gray-100' : 'text-gray-800'
  );

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`pt-4 pb-10`}>
          <Text style={headerStyle}>{t('settings')}</Text>
          
          <View style={sectionStyle}>
            <Text style={[textStyle, tw`font-semibold mb-4`]}>
              {t('language')} & {t('theme')}
            </Text>
            <LanguageSelector />
            <ThemeToggle />
          </View>
          
          <View style={sectionStyle}>
            <Text style={[textStyle, tw`font-semibold mb-4`]}>
              À propos de l'application
            </Text>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={textStyle}>Version</Text>
              <Text style={[textStyle, tw`font-semibold`]}>1.0.0</Text>
            </View>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={textStyle}>Développeur</Text>
              <Text style={[textStyle, tw`font-semibold`]}>Votre Nom</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={textStyle}>Année</Text>
              <Text style={[textStyle, tw`font-semibold`]}>2025</Text>
            </View>
          </View>
          
          <View style={sectionStyle}>
            <Text style={[textStyle, tw`font-semibold mb-2 text-center`]}>
              Ride&Go App
            </Text>
            <Text style={[textStyle, tw`text-center`]}>
              Tous droits réservés © 2025
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}