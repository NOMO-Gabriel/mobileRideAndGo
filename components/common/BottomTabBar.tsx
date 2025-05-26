// src/components/BottomTabBar.tsx - Version avec types stricts
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../hooks/useTranslation.js'
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';

// Définir les routes valides de votre app
type AppRoute = 
  | '/' 
  | '/ride' 
  | '/go' 
  | '/fare-calculator'
  | '/dashboard'
  | '/dashboard/subscriptions'  // Si vous avez des sous-routes
  | '/dashboard/settings'
  | '/dashboard/help';

type TabItem = {
  name: string;
  route: AppRoute;
  icon: keyof typeof Feather.glyphMap;
  translationKey: string;
};

const tabs: TabItem[] = [
  { name: 'home', route: '/', icon: 'home', translationKey: 'home' },
  { name: 'ride', route: '/ride', icon: 'map-pin', translationKey: 'ride' },
  { name: 'go', route: '/go', icon: 'navigation', translationKey: 'go' },
  { name: 'fare', route: '/fare-calculator', icon: 'dollar-sign', translationKey: 'fareCalculator' },
  { name: 'dashboard', route: '/dashboard', icon: 'user', translationKey: 'dashboard' },
];

const BottomTabBar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Check if current path starts with any tab route (for nested routes)
  const isActiveTab = (tabRoute: string) => {
    if (tabRoute === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(tabRoute);
  };

  return (
    <View style={tw.style(
      'flex-row items-center justify-around pb-2 pt-3 border-t',
      theme.name === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    )}>
      {tabs.map((tab) => {
        const isActive = isActiveTab(tab.route);
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={tw`items-center py-1 px-2 flex-1`}
            onPress={() => router.push(tab.route)}
            activeOpacity={0.7}
          >
            <View style={tw.style(
              'p-2 rounded-full mb-1 items-center justify-center',
              isActive ? 'bg-primary bg-opacity-20' : 'bg-transparent'
            )}>
              <Feather
                name={tab.icon}
                size={18}
                color={isActive ? '#FF8C00' : theme.name === 'dark' ? '#9CA3AF' : '#6B7280'}
              />
            </View>
            <Text style={tw.style(
              'text-xs text-center',
              isActive 
                ? 'text-primary font-medium' 
                : theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {t(tab.translationKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;