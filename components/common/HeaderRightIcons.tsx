
// src/components/HeaderRightIcons.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useTranslation } from '../../hooks/useTranslation.js'
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tailwind';
import MinimalLanguageToggle from './MinimalLanguageToggle';
import MinimalThemeToggle from './MinimalThemeToggle';

const HeaderRightIcons = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const iconColor = theme.name === 'dark' ? '#FFFFFF' : '#1B263B';
  
  return (
    <View style={tw`flex-row items-center space-x-3`}>
      <MinimalLanguageToggle />
      <MinimalThemeToggle />
      
      <TouchableOpacity
        style={tw.style(
          'p-2 rounded-full',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        )}
        onPress={() => router.push('/search')}
      >
        <Feather name="search" size={16} color={iconColor} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={tw.style(
          'p-2 rounded-full',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        )}
        onPress={() => router.push('/dashboard')}
      >
        <Feather name="user" size={16} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightIcons;