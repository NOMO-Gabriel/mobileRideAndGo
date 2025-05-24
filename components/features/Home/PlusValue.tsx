// components/sections/PlusValue.tsx
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation.js';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const ValueCard = ({ icon, title, description }) => {
  const { theme } = useTheme();
  
  return (
    <View style={tw.style(
      'px-4 py-5 rounded-2xl mb-4 flex-row items-start',
      theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
    )}>
      <View style={tw.style(
        'w-12 h-12 rounded-full justify-center items-center mr-4',
        'bg-primary bg-opacity-20'
      )}>
        <Feather name={icon} size={20} color="#FF8C00" />
      </View>
      
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'font-bold text-base mb-1',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {title}
        </Text>
        <Text style={tw.style(
          'text-sm leading-5',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default function PlusValue() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  
  // Mock values data - would come from your translation system
  const values = [
    {
      icon: 'award',
      title: t('valueQuality'),
      description: t('valueQualityDesc')
    },
    {
      icon: 'dollar-sign',
      title: t('valuePrice'),
      description: t('valuePriceDesc')
    },
    {
      icon: 'users',
      title: t('valueCommunity'),
      description: t('valueCommunityDesc')
    },
    {
      icon: 'heart',
      title: t('valueEcoFriendly'),
      description: t('valueEcoFriendlyDesc')
    },
  ];
  
  // These translations would need to be added to your translation files
  const mockTranslations = {
    fr: {
      plusValue: 'Notre plus-value',
      plusValueDesc: 'Ce qui nous distingue de la concurrence',
      valueQuality: 'Qualité premium',
      valueQualityDesc: 'Chauffeurs professionnels et véhicules confortables pour une expérience exceptionnelle.',
      valuePrice: 'Prix compétitifs',
      valuePriceDesc: 'Des tarifs transparents sans frais cachés, économiques même aux heures de pointe.',
      valueCommunity: 'Communauté soudée',
      valueCommunityDesc: 'Un réseau de confiance avec des avis vérifiés pour des trajets en toute sérénité.',
      valueEcoFriendly: 'Respect de l\'environnement',
      valueEcoFriendlyDesc: 'Réduction de l\'empreinte carbone grâce au covoiturage et aux véhicules hybrides.',
      learnMore: 'En savoir plus'
    },
    en: {
      plusValue: 'Our plus value',
      plusValueDesc: 'What sets us apart from the competition',
      valueQuality: 'Premium quality',
      valueQualityDesc: 'Professional drivers and comfortable vehicles for an exceptional experience.',
      valuePrice: 'Competitive prices',
      valuePriceDesc: 'Transparent rates without hidden fees, economical even during peak hours.',
      valueCommunity: 'Close-knit community',
      valueCommunityDesc: 'A trusted network with verified reviews for peace of mind during your travels.',
      valueEcoFriendly: 'Environmentally friendly',
      valueEcoFriendlyDesc: 'Reduced carbon footprint thanks to carpooling and hybrid vehicles.',
      learnMore: 'Learn more'
    }
  };

  return (
    <View style={tw.style(
      'py-10 px-5',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    )}>
      <LinearGradient
        colors={theme.name === 'dark' 
          ? ['#1B263B', '#0D1B30'] 
          : ['#FFF', '#F9FAFB']}
        style={tw`rounded-3xl overflow-hidden py-8 px-5 shadow-lg`}
      >
        {/* Section Header */}
        <View style={tw`mb-8`}>
          <Text style={tw.style(
            'text-2xl font-bold mb-2',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('plusValue')}
          </Text>
          <Text style={tw.style(
            'text-base',
            theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            {t('plusValueDesc')}
          </Text>
        </View>
        
        {/* Image or Illustration */}
        <View style={tw`items-center justify-center mb-8`}>
          <View style={tw.style(
            'w-48 h-48 rounded-full mb-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-orange-100'
          )}>
            {/* This would be replaced with an actual image */}
            <View style={tw`flex-1 justify-center items-center`}>
              <Feather 
                name="thumbs-up" 
                size={80} 
                color={theme.name === 'dark' ? theme.primary : '#FF8C00'} 
              />
            </View>
          </View>
        </View>
        
        {/* Value Cards */}
        <View>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </View>
        
        {/* Learn More Button */}
        <TouchableOpacity style={tw`mt-6`}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tw`rounded-xl py-3 px-6 items-center justify-center`}
          >
            <Text style={tw`text-white font-medium text-base`}>
              {t('learnMore')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}