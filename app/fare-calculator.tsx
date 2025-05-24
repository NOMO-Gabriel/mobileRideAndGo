import React from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTheme } from '../hooks/useTheme';
import tw from './../utils/tailwind';
import FareCalculator from '../components/features/fare/FareCalculator';
import FareFeatures from '../components/features/fare/FareFeatures';

// Page d'accueil principale
export default function FarePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Styles basés sur le thème
  const containerStyle = tw.style(
    'flex-1',
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
  );
  
  const cardStyle = tw.style(
    'rounded-2xl p-4 mb-6 shadow-sm',
    theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
  );
  
  const inputContainerStyle = tw.style(
    'flex-row items-center px-4 py-3 mb-2 rounded-xl border',
    theme.name === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-gray-50 border-gray-200'
  );
  
  const inputStyle = tw.style(
    'flex-1 ml-2 text-base',
    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
  );
  
  const sectionTitleStyle = tw.style(
    'text-lg font-bold mb-4',
    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
  );

  return (
    <ScrollView 
      style={containerStyle}
      contentContainerStyle={tw`pb-4`}
      showsVerticalScrollIndicator={false}
    >
       <FareCalculator/>
       <FareFeatures/> 
     
    </ScrollView>
  );
}