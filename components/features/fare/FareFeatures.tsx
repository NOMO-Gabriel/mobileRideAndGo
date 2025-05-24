// components/fare/FareFeatures.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const FareFeatures = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();
  
  // Feature data
  const features = [
    {
      id: 1,
      title: t('priceComparison') || 'Comparaison de prix',
      description: t('priceComparisonDesc') || 'Comparez les tarifs de différents trajets',
      icon: 'bar-chart-2',
      colors: ['#FF8C00', '#FF6B00'],
      route: '/fare-comparison',
      stats: '15%',
      statsLabel: t('savings') || 'd\'économies'
    },
    {
      id: 2,
      title: t('fareHistory') || 'Historique des tarifs',
      description: t('fareHistoryDesc') || 'Consultez l\'évolution des prix',
      icon: 'trending-up',
      colors: ['#1B263B', '#0D1B30'],
      route: '/fare-history',
      stats: '30j',
      statsLabel: t('dataHistory') || 'de données'
    },
    {
      id: 3,
      title: t('smartNotifications') || 'Alertes prix',
      description: t('smartNotificationsDesc') || 'Soyez notifié des meilleures offres',
      icon: 'bell',
      colors: ['#10B981', '#059669'],
      route: '/price-alerts',
      stats: '24/7',
      statsLabel: t('monitoring') || 'surveillance'
    }
  ];
  
  // Styles
  const containerStyle = tw.style(
    'flex-1 p-5',
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
  );
  
  const textStyle = tw.style(
    'text-base',
    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
  );
  
  const subtextStyle = tw.style(
    'text-sm',
    theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
  );
  
  const renderFeatureCard = (feature, index) => {
    const isLargeCard = index === 0;
    
    return (
      <TouchableOpacity
        key={feature.id}
        style={[
          tw`rounded-2xl overflow-hidden mb-4 shadow-sm`,
          isLargeCard ? { width: width - 40 } : { width: cardWidth }
        ]}
        onPress={() => router.push(feature.route)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={feature.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`p-5 ${isLargeCard ? 'h-48' : 'h-52'} justify-between`}
        >
          {/* Header */}
          <View>
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <View style={tw`bg-white bg-opacity-20 p-3 rounded-full`}>
                <Feather name={feature.icon} size={24} color="white" />
              </View>
              <View style={tw`items-end`}>
                <Text style={tw`text-white text-2xl font-bold`}>
                  {feature.stats}
                </Text>
                <Text style={tw`text-white text-xs opacity-80`}>
                  {feature.statsLabel}
                </Text>
              </View>
            </View>
            
            <Text style={tw`text-white font-bold text-lg mb-2`}>
              {feature.title}
            </Text>
            <Text style={tw`text-white opacity-90 text-sm leading-5`}>
              {feature.description}
            </Text>
          </View>
          
          {/* Footer */}
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-white font-medium mr-2`}>
                {t('explore') || 'Explorer'}
              </Text>
              <Feather name="arrow-right" size={16} color="white" />
            </View>
            
            {/* Decorative dots */}
            <View style={tw`flex-row`}>
              {[0, 1, 2].map((dot) => (
                <View
                  key={dot}
                  style={tw`w-1.5 h-1.5 bg-white bg-opacity-40 rounded-full mr-1`}
                />
              ))}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <Text style={tw.style(
          'text-2xl font-bold mb-2',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('fareTools') || 'Outils tarifaires'}
        </Text>
        <Text style={subtextStyle}>
          {t('fareToolsDescription') || 'Découvrez nos fonctionnalités avancées pour optimiser vos trajets'}
        </Text>
      </View>
      
      {/* Stats Overview */}
      <View style={tw.style(
        'rounded-2xl p-5 mb-6 shadow-sm',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={[textStyle, tw`font-bold text-lg mb-4`]}>
          {t('thisMonth') || 'Ce mois-ci'}
        </Text>
        
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>
              127
            </Text>
            <Text style={[subtextStyle, tw`text-center mt-1`]}>
              {t('ridesCalculated') || 'Trajets calculés'}
            </Text>
          </View>
          
          <View style={tw.style(
            'w-px mx-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          )} />
          
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>
              €234
            </Text>
            <Text style={[subtextStyle, tw`text-center mt-1`]}>
              {t('totalSavings') || 'Économies totales'}
            </Text>
          </View>
          
          <View style={tw.style(
            'w-px mx-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          )} />
          
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>
              4.8
            </Text>
            <Text style={[subtextStyle, tw`text-center mt-1`]}>
              {t('satisfaction') || 'Satisfaction'}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Feature Cards */}
      <View style={tw`mb-6`}>
        <Text style={[textStyle, tw`font-bold text-lg mb-4`]}>
          {t('availableFeatures') || 'Fonctionnalités disponibles'}
        </Text>
        
        {/* Large card */}
        {renderFeatureCard(features[0], 0)}
        
        {/* Small cards row */}
        <View style={tw`flex-row justify-between`}>
          {features.slice(1).map((feature, index) => 
            renderFeatureCard(feature, index + 1)
          )}
        </View>
      </View>
      
      {/* Quick Actions */}
      <View style={tw.style(
        'rounded-2xl p-5 mb-6 shadow-sm',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={[textStyle, tw`font-bold text-lg mb-4`]}>
          {t('quickActions') || 'Actions rapides'}
        </Text>
        
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={tw.style(
              'flex-1 p-4 rounded-xl mr-2 items-center',
              theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            )}
            onPress={() => router.push('/fare-calculator')}
          >
            <View style={tw`bg-primary bg-opacity-20 p-3 rounded-full mb-2`}>
              <Feather name="calculator" size={20} color="#FF8C00" />
            </View>
            <Text style={[textStyle, tw`font-medium text-center text-sm`]}>
              {t('newCalculation') || 'Nouveau calcul'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw.style(
              'flex-1 p-4 rounded-xl mx-1 items-center',
              theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            )}
            onPress={() => router.push('/recent-searches')}
          >
            <View style={tw`bg-primary bg-opacity-20 p-3 rounded-full mb-2`}>
              <Feather name="clock" size={20} color="#FF8C00" />
            </View>
            <Text style={[textStyle, tw`font-medium text-center text-sm`]}>
              {t('recentSearches') || 'Recherches récentes'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw.style(
              'flex-1 p-4 rounded-xl ml-2 items-center',
              theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            )}
            onPress={() => router.push('/saved-routes')}
          >
            <View style={tw`bg-primary bg-opacity-20 p-3 rounded-full mb-2`}>
              <Feather name="bookmark" size={20} color="#FF8C00" />
            </View>
            <Text style={[textStyle, tw`font-medium text-center text-sm`]}>
              {t('savedRoutes') || 'Trajets sauvés'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Tips Card */}
      <View style={tw.style(
        'rounded-2xl p-5 mb-6 shadow-sm border-l-4 border-primary',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`flex-row items-start`}>
          <View style={tw`bg-primary bg-opacity-20 p-2 rounded-full mr-3 mt-1`}>
            <Feather name="lightbulb" size={16} color="#FF8C00" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={[textStyle, tw`font-bold mb-2`]}>
              {t('proTip') || 'Astuce pro'}
            </Text>
            <Text style={[subtextStyle, tw`leading-5`]}>
              {t('proTipDescription') || 'Utilisez les alertes prix pour être notifié quand le tarif d\'un trajet diminue. Économisez jusqu\'à 30% sur vos trajets réguliers!'}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Bottom spacing */}
      <View style={tw`h-6`} />
    </ScrollView>
  );
};

export default FareFeatures;