// app/(tabs)/dashboard/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '../../../hooks/useTheme';
import { useTranslation } from '../../../hooks/useTranslation';

export default function DashboardLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.name === 'dark' ? '#1B263B' : '#FFFFFF',
        },
        headerTintColor: theme.name === 'dark' ? '#FFFFFF' : '#1B263B',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.name === 'dark' ? '#1B263B' : '#F9FAFB',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t('dashboard') || 'Tableau de bord',
          headerShown: false, // We'll use a custom header
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: t('myAccount') || 'Mon compte',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: t('notifications') || 'Notifications',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="subscriptions"
        options={{
          title: t('subscriptions') || 'Abonnements',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t('settings') || 'Paramètres',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: t('help') || 'Aide',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: t('terms') || 'Conditions d\'utilisation',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: t('privacy') || 'Confidentialité',
          presentation: 'card',
        }}
      />
    </Stack>
  );
}