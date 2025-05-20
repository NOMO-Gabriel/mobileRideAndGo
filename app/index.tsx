// app/index.tsx
import { Link } from 'expo-router';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTheme } from '../hooks/useTheme';
import tw from './../utils/tailwind';

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
      <LinearGradient
        colors={theme.name === 'dark' 
          ? ['#1B263B', '#263850'] 
          : ['#FFE0B2', '#FFFFFF']}
        style={tw`pt-4 pb-6 px-5`}
      >
        <Text style={tw.style(
          'text-2xl font-bold mb-1',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('welcome')}
        </Text>
        
        <Text style={tw.style(
          'text-base mb-6',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          {t('whereToGo')}
        </Text>
        
        {/* Carte de recherche */}
        <View style={cardStyle}>
          <View style={inputContainerStyle}>
            <Feather 
              name="map-pin" 
              size={18} 
              color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
            <TextInput
              style={inputStyle}
              placeholder={t('startingPoint')}
              placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
            />
          </View>
          
          <View style={inputContainerStyle}>
            <Feather 
              name="navigation" 
              size={18} 
              color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
            <TextInput
              style={inputStyle}
              placeholder={t('destination')}
              placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
            />
          </View>
          
          <TouchableOpacity 
            style={tw`bg-primary rounded-xl py-3 items-center mt-3`}
            onPress={() => router.push('/search')}
          >
            <Text style={tw`text-white font-bold text-base`}>
              {t('searchRides')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Offres du jour */}
      <View style={tw`px-5 mt-6`}>
        <Text style={sectionTitleStyle}>{t('todaysOffers')}</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pb-2`}
        >
          <OfferCard 
            title="Weekend Special"
            discount="-20%"
            backgroundColor={['#FF8C00', '#FF6B00']}
            textColor="white"
          />
          <OfferCard 
            title="First Ride"
            discount="FREE"
            backgroundColor={['#1B263B', '#0D1B30']}
            textColor="white"
          />
          <OfferCard 
            title="Long Distance"
            discount="-15%"
            backgroundColor={['#4CAF50', '#2E7D32']}
            textColor="white"
          />
        </ScrollView>
      </View>
      
      {/* Destinations populaires */}
      <View style={tw`px-5 mt-8`}>
        <Text style={sectionTitleStyle}>{t('popularDestinations')}</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pb-2`}
        >
          <DestinationCard 
            image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=300"
            title="Paris"
            distance="25 km"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=300"
            title="Marseille"
            distance="750 km"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=300"
            title="Lyon"
            distance="450 km"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1414397686303-96a146a05efd?q=80&w=300"
            title="Bordeaux"
            distance="580 km"
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}