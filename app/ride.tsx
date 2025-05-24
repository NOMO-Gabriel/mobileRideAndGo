// app/index.tsx
import { Link } from 'expo-router';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTheme } from '../hooks/useTheme';
import tw from './../utils/tailwind';
import RideBookingComponent from '../components/features/ride/RideBookingComponent';
//import RideMapComponent from '../components/features/ride/RideMapComponent';
//import {FareCalculator} from '../components/features/Home/FareCalculator';
// app/index.tsx
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
import { LinearGradient } from 'expo-linear-gradient';

// Composant pour les destinations populaires
const DestinationCard = ({ image, title, distance }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={tw.style(
        'mr-4 rounded-2xl overflow-hidden w-40',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}
    >
      <Image
        source={{ uri: image }}
        style={tw`h-24 w-full`}
        resizeMode="cover"
      />
      <View style={tw`p-3`}>
        <Text style={tw.style(
          'font-medium text-base',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {title}
        </Text>
        <Text style={tw.style(
          'text-xs mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {distance}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Composant pour les offres du jour
const OfferCard = ({ title, discount, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity style={tw`mr-4 w-60 rounded-xl overflow-hidden`}>
      <LinearGradient
        colors={backgroundColor}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`p-4 h-32 justify-between`}
      >
        <Text style={tw.style('font-bold text-lg', `text-${textColor}`)}>
          {title}
        </Text>
        <View>
          <Text style={tw.style('text-3xl font-bold', `text-${textColor}`)}>
            {discount}
          </Text>
          <Text style={tw.style('text-xs mt-1', `text-${textColor} opacity-80`)}>
            *Terms & conditions apply
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Page d'accueil principale
export default function HomePage() {
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
      {/* En-tête de bienvenue */}
      
      
      {/* Carte de recherche */}
      {/* <RideMapComponent/>  */}
      <RideBookingComponent />
      
    </ScrollView>
  );
}