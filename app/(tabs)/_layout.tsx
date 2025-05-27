// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './../../hooks/useTheme.js';

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.name === 'dark' ? '#aaa' : '#666',
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="calculator"
        options={{
          title: t('calculator'),
          tabBarLabel: t('calculator'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'calculator' : 'calculator-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="ride"
        options={{
          title: t('ride'),
          tabBarLabel: t('ride'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'car' : 'car-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="go"
        options={{
          title: t('go'),
          tabBarLabel: t('go'),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'navigate' : 'navigate-outline'} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
    </Tabs>
  );
}