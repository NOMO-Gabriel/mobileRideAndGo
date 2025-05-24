import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet, 
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const FeatureCard = ({ icon, title, description, index }) => {
  const { theme } = useTheme();
  const isEven = index % 2 === 0;
  
  // Calculate gradient colors based on index
  const getGradientColors = () => {
    const options = [
      ['#FF8C00', '#FF6B00'],
      ['#1B263B', '#0D1B30'],
      ['#4CAF50', '#2E7D32'],
      ['#9C27B0', '#6A1B9A']
    ];
    
    return options[index % options.length];
  };
  
  return (
    <View style={tw.style(
      'rounded-2xl overflow-hidden mb-6 shadow-sm',
      theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
    )}>
      <View style={tw`flex-row items-stretch overflow-hidden`}>
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`w-1/4 justify-center items-center p-4`}
        >
          <Feather name={icon} size={32} color="#FFF" />
        </LinearGradient>
        
        <View style={tw`p-5 flex-shrink flex-1`}>
          <Text style={tw.style(
            'text-lg font-bold mb-2',
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
    </View>
  );
};

export default function FeaturesSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  
  // Sample features data - in a real app, these might come from your translation system
  const features = [
    {
      icon: 'map-pin',
      title: t('featureLocation'),
      description: t('featureLocationDesc')
    },
    {
      icon: 'shield',
      title: t('featureSecurity'),
      description: t('featureSecurityDesc')
    },
    {
      icon: 'clock',
      title: t('featureSpeed'),
      description: t('featureSpeedDesc')
    },
    {
      icon: 'credit-card',
      title: t('featurePayment'),
      description: t('featurePaymentDesc')
    }
  ];
  
  // These translations would need to be added to your translation files
  const mockTranslations = {
    fr: {
      featureLocation: 'Localisation en temps réel',
      featureLocationDesc: 'Suivez votre trajet et celui de votre chauffeur en temps réel avec une précision GPS avancée.',
      featureSecurity: 'Sécurité renforcée',
      featureSecurityDesc: 'Vérification des profils, partage d\'itinéraire et assistance 24/7 pour des trajets en toute sécurité.',
      featureSpeed: 'Rapidité inégalée',
      featureSpeedDesc: 'Trouvez un trajet en moins de 2 minutes et arrivez à destination sans stress ni retard.',
      featurePayment: 'Paiement simplifié',
      featurePaymentDesc: 'Plusieurs options de paiement sécurisées et transparentes pour votre confort.',
      featuresTitle: 'Nos fonctionnalités',
      featuresSubtitle: 'Une expérience de trajet supérieure grâce à nos outils innovants',
      viewAllFeatures: 'Voir toutes les fonctionnalités',
    },
    en: {
      featureLocation: 'Real-time location',
      featureLocationDesc: 'Track your journey and your driver\'s location in real-time with advanced GPS precision.',
      featureSecurity: 'Enhanced security',
      featureSecurityDesc: 'Profile verification, route sharing, and 24/7 assistance for safe travels.',
      featureSpeed: 'Unmatched speed',
      featureSpeedDesc: 'Find a ride in less than 2 minutes and reach your destination without stress or delay.',
      featurePayment: 'Simplified payment',
      featurePaymentDesc: 'Multiple secure and transparent payment options for your convenience.',
      featuresTitle: 'Our features',
      featuresSubtitle: 'A superior travel experience with our innovative tools',
      viewAllFeatures: 'View all features',
    }
  };

  return (
    <View style={tw.style(
      'py-8 px-5',
      theme.name === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
    )}>
      {/* Section Header */}
      <View style={tw`mb-8`}>
        <Text style={tw.style(
          'text-2xl font-bold mb-2',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('featuresTitle')}
        </Text>
        <Text style={tw.style(
          'text-base',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          {t('featuresSubtitle')}
        </Text>
      </View>
      
      {/* Feature Cards */}
      <View>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </View>
      
      {/* View All Button */}
      <TouchableOpacity style={tw`items-center mt-4`}>
        <View style={tw.style(
          'flex-row items-center py-3 px-6 rounded-full',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <Text style={tw.style(
            'font-medium mr-2',
            theme.name === 'dark' ? 'text-primary' : 'text-primary'
          )}>
            {t('viewAllFeatures')}
          </Text>
          <Feather 
            name="arrow-right" 
            size={16} 
            color={theme.primary} 
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}