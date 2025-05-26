// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nProvider } from '../hooks/useTranslation.js';
import { ThemeProvider, useTheme } from '../hooks/useTheme.js';

// app/_layout.tsx
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderRightIcons from './../components/common/HeaderRightIcons';
import BottomTabBar from './../components/common/BottomTabBar';
import tw from './../utils/tailwind.js';

export default function RootLayout() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </I18nProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'
    )}>
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
          headerRight: () => <HeaderRightIcons />,
          contentStyle: {
            backgroundColor: theme.name === 'dark' ? '#1B263B' : '#FFFFFF',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Ride&Go',
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="ride"
          options={{
            title: 'Ride',
          }}
        />
        <Stack.Screen
          name="go"
          options={{
            title: 'Go',
          }}
        />
        <Stack.Screen
          name="fare-calculator"
          options={{
            title: 'Fare Calculator',
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: 'Search',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: false, // Dashboard has its own header
          }}
        />
      </Stack>
      
      <View style={{ 
        paddingBottom: insets.bottom,
        backgroundColor: theme.name === 'dark' ? '#111827' : '#FFFFFF',
      }}>
        <BottomTabBar />
      </View>
      
      <StatusBar style={theme.name === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}