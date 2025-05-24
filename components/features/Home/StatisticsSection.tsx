// components/sections/StatisticsSection.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  Easing,
  useWindowDimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation.js';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const StatCard = ({ icon, value, label, animationDelay = 0 }) => {
  const { theme } = useTheme();
  const [animatedValue] = useState(new Animated.Value(0));
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      delay: animationDelay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
    
    const listener = animatedValue.addListener(({ value: v }) => {
      setDisplayValue(Math.floor(v * value));
    });
    
    return () => {
      animatedValue.removeListener(listener);
    };
  }, []);
  
  return (
    <View style={tw.style(
      'rounded-2xl p-5 items-center justify-center flex-1 m-2',
      theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
    )}>
      <View style={tw.style(
        'w-14 h-14 rounded-full mb-3 items-center justify-center',
        'bg-primary bg-opacity-20'
      )}>
        <Feather name={icon} size={22} color="#FF8C00" />
      </View>
      
      <Text style={tw.style(
        'text-2xl font-bold mb-1',
        theme.name === 'dark' ? 'text-white' : 'text-gray-800'
      )}>
        {displayValue.toLocaleString()}
      </Text>
      
      <Text style={tw.style(
        'text-sm text-center',
        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
      )}>
        {label}
      </Text>
    </View>
  );
};

const ProgressBar = ({ percent, label, color = '#FF8C00', delay = 0 }) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic)
    }).start();
  }, []);
  
  const progressWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${percent}%`]
  });
  
  return (
    <View style={tw`mb-5`}>
      <View style={tw`flex-row justify-between mb-1`}>
        <Text style={tw.style(
          'font-medium',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
        )}>
          {label}
        </Text>
        <Text style={tw.style(
          'font-bold',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
        )}>
          {percent}%
        </Text>
      </View>
      
      <View style={tw.style(
        'h-2 rounded-full overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      )}>
        <Animated.View 
          style={[
            tw`h-full rounded-full`,
            { backgroundColor: color, width: progressWidth }
          ]} 
        />
      </View>
    </View>
  );
};

export default function StatisticsSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Mock statistics data - would come from your API or state management
  const stats = [
    { icon: 'users', value: 15600, label: t('activeUsers') },
    { icon: 'map', value: 250, label: t('citiesCovered') },
    { icon: 'calendar', value: 12500, label: t('ridesDaily') },
    { icon: 'star', value: 97, label: t('satisfactionRate') }
  ];
  
  const progressStats = [
    { label: t('userGrowth'), percent: 78, color: '#FF8C00' },
    { label: t('marketShare'), percent: 65, color: '#4CAF50' },
    { label: t('appDownloads'), percent: 92, color: '#2196F3' },
  ];
  
  // These translations would need to be added to your translation files
  const mockTranslations = {
    fr: {
      statisticsTitle: 'Nos statistiques',
      statisticsSubtitle: 'Des chiffres qui parlent d\'eux-mêmes',
      activeUsers: 'Utilisateurs actifs',
      citiesCovered: 'Villes couvertes',
      ridesDaily: 'Trajets par jour',
      satisfactionRate: '% Satisfaction',
      userGrowth: 'Croissance utilisateurs',
      marketShare: 'Part de marché',
      appDownloads: 'Téléchargements',
      andCounting: 'et ça continue'
    },
    en: {
      statisticsTitle: 'Our statistics',
      statisticsSubtitle: 'Numbers that speak for themselves',
      activeUsers: 'Active users',
      citiesCovered: 'Cities covered',
      ridesDaily: 'Daily rides',
      satisfactionRate: '% Satisfaction',
      userGrowth: 'User growth',
      marketShare: 'Market share',
      appDownloads: 'App downloads',
      andCounting: 'and counting'
    }
  };

  return (
    <LinearGradient
      colors={theme.name === 'dark' 
        ? ['#0D1B30', '#1B263B'] 
        : ['#F9FAFB', '#FFE0B2']}
      style={tw`py-10 px-5`}
    >
      {/* Section Header */}
      <View style={tw`mb-8 items-center`}>
        <Text style={tw.style(
          'text-2xl font-bold mb-2 text-center',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('statisticsTitle')}
        </Text>
        <Text style={tw.style(
          'text-base text-center max-w-xs',
          theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          {t('statisticsSubtitle')}
        </Text>
      </View>
      
      {/* Stats Cards - Row 1 */}
      <View style={tw`flex-row mb-4`}>
        <StatCard
          icon={stats[0].icon}
          value={stats[0].value}
          label={stats[0].label}
          animationDelay={0}
        />
        <StatCard
          icon={stats[1].icon}
          value={stats[1].value}
          label={stats[1].label}
          animationDelay={200}
        />
      </View>
      
      {/* Stats Cards - Row 2 */}
      <View style={tw`flex-row mb-8`}>
        <StatCard
          icon={stats[2].icon}
          value={stats[2].value}
          label={stats[2].label}
          animationDelay={400}
        />
        <StatCard
          icon={stats[3].icon}
          value={stats[3].value}
          label={`${stats[3].label}${stats[3].value}%`}
          animationDelay={600}
        />
      </View>
      
      {/* Progress Bars */}
      <View style={tw.style(
        'p-5 rounded-2xl mt-4',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={tw.style(
          'text-lg font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('andCounting')}
        </Text>
        
        {progressStats.map((stat, index) => (
          <ProgressBar
            key={index}
            label={stat.label}
            percent={stat.percent}
            color={stat.color}
            delay={index * 200}
          />
        ))}
      </View>
    </LinearGradient>
  );
}