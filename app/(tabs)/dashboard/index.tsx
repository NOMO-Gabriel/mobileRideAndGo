// app/(tabs)/dashboard/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function DashboardScreen() {
  const { theme, toggleTheme } = useTheme();
  const { t, locale, changeLocale } = useTranslation();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mock user data - replace with real user context
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop&crop=face',
    ridesCount: 47,
    totalSavings: 234,
    memberSince: '2023',
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout') || 'Déconnexion',
      t('logoutConfirm') || 'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        {
          text: t('logout') || 'Déconnexion',
          style: 'destructive',
          onPress: () => {
            setShowLogoutModal(false);
            // Handle logout logic here
            Alert.alert(t('success') || 'Succès', t('loggedOut') || 'Vous avez été déconnecté');
          },
        },
      ]
    );
  };

  const toggleLanguage = () => {
    changeLocale(locale === 'fr' ? 'en' : 'fr');
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement,
    showArrow = true,
    danger = false,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showArrow?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center justify-between px-5 py-4 border-b border-opacity-20',
        theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
      )}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={tw`flex-row items-center flex-1`}>
        <View style={tw.style(
          'w-10 h-10 rounded-full items-center justify-center mr-4',
          danger 
            ? 'bg-red-100' 
            : theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        )}>
          <Feather 
            name={icon as any} 
            size={20} 
            color={danger ? '#EF4444' : theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
          />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw.style(
            'text-base font-medium',
            danger 
              ? 'text-red-500' 
              : theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {title}
          </Text>
          {subtitle && (
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (showArrow && (
        <Feather 
          name="chevron-right" 
          size={20} 
          color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
        />
      ))}
    </TouchableOpacity>
  );

  const StatCard = ({ title, value, subtitle, icon, color }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
    color: string;
  }) => (
    <View style={tw.style(
      'flex-1 p-4 rounded-2xl mx-1',
      theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
    )}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <View style={[tw`w-8 h-8 rounded-full items-center justify-center`, { backgroundColor: color + '20' }]}>
          <Feather name={icon as any} size={16} color={color} />
        </View>
      </View>
      <Text style={tw.style(
        'text-2xl font-bold mb-1',
        theme.name === 'dark' ? 'text-white' : 'text-gray-800'
      )}>
        {value}
      </Text>
      <Text style={tw.style(
        'text-xs font-medium',
        { color }
      )}>
        {title}
      </Text>
      <Text style={tw.style(
        'text-xs mt-1',
        theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
      )}>
        {subtitle}
      </Text>
    </View>
  );

  return (
    <View style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Custom Header */}
      <LinearGradient
        colors={theme.name === 'dark' ? ['#1B263B', '#263850'] : ['#FF8C00', '#FF6B00']}
        style={tw`pt-12 pb-6`}
      >
        <View style={tw`px-5`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-2xl font-bold`}>
              {t('dashboard') || 'Tableau de bord'}
            </Text>
            <TouchableOpacity
              style={tw`w-10 h-10 bg-white bg-opacity-20 rounded-full items-center justify-center`}
              onPress={() => router.back()}
            >
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* User Info */}
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: user.avatar }}
              style={tw`w-16 h-16 rounded-2xl mr-4 border-2 border-white border-opacity-30`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-xl font-bold mb-1`}>
                {user.name}
              </Text>
              <Text style={tw`text-white text-opacity-80 text-sm`}>
                {user.email}
              </Text>
              <Text style={tw`text-white text-opacity-60 text-xs mt-1`}>
                {t('memberSince') || 'Membre depuis'} {user.memberSince}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={tw`px-4 -mt-8 mb-6`}>
          <View style={tw`flex-row`}>
            <StatCard
              title={t('totalRides') || 'Trajets'}
              value={user.ridesCount}
              subtitle={t('thisMonth') || 'Ce mois-ci'}
              icon="map-pin"
              color="#4CAF50"
            />
            <StatCard
              title={t('savings') || 'Économies'}
              value={`€${user.totalSavings}`}
              subtitle={t('total') || 'Total'}
              icon="trending-up"
              color="#2196F3"
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={tw.style(
          'mx-4 mb-4 rounded-2xl overflow-hidden',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <View style={tw`px-5 py-4 border-b border-opacity-20 ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <Text style={tw.style(
              'text-lg font-bold',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('account') || 'Compte'}
            </Text>
          </View>
          <SettingItem
            icon="user"
            title={t('myAccount') || 'Mon compte'}
            subtitle={t('personalInfo') || 'Informations personnelles'}
            onPress={() => router.push('/dashboard/account')}
          />
          <SettingItem
            icon="bell"
            title={t('notifications') || 'Notifications'}
            subtitle={t('manageNotifications') || 'Gérer les notifications'}
            onPress={() => router.push('/dashboard/notifications')}
          />
          <SettingItem
            icon="credit-card"
            title={t('subscriptions') || 'Abonnements'}
            subtitle={t('manageSubscriptions') || 'Gérer vos abonnements'}
            onPress={() => router.push('/dashboard/subscriptions')}
            showArrow={false}
            rightElement={
              <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
                <Text style={tw`text-green-600 text-xs font-medium`}>
                  {t('active') || 'Actif'}
                </Text>
              </View>
            }
          />
        </View>

        {/* Preferences Section */}
        <View style={tw.style(
          'mx-4 mb-4 rounded-2xl overflow-hidden',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <View style={tw`px-5 py-4 border-b border-opacity-20 ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <Text style={tw.style(
              'text-lg font-bold',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('preferences') || 'Préférences'}
            </Text>
          </View>
          <SettingItem
            icon="moon"
            title={t('darkMode') || 'Mode sombre'}
            subtitle={`${t('currently') || 'Actuellement'}: ${theme.name === 'dark' ? t('dark') || 'Sombre' : t('light') || 'Clair'}`}
            rightElement={
              <Switch
                value={theme.name === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.name === 'dark' ? '#374151' : '#E5E7EB', true: '#FF8C00' }}
                thumbColor={theme.name === 'dark' ? '#FFFFFF' : '#FFFFFF'}
              />
            }
            showArrow={false}
          />
          <SettingItem
            icon="globe"
            title={t('language') || 'Langue'}
            subtitle={`${t('currently') || 'Actuellement'}: ${locale === 'fr' ? 'Français' : 'English'}`}
            onPress={toggleLanguage}
          />
          <SettingItem
            icon="settings"
            title={t('settings') || 'Paramètres'}
            subtitle={t('generalSettings') || 'Paramètres généraux'}
            onPress={() => router.push('/dashboard/settings')}
          />
        </View>

        {/* Help Section */}
        <View style={tw.style(
          'mx-4 mb-4 rounded-2xl overflow-hidden',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <View style={tw`px-5 py-4 border-b border-opacity-20 ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <Text style={tw.style(
              'text-lg font-bold',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('help') || 'Aide'}
            </Text>
          </View>
          <SettingItem
            icon="help-circle"
            title={t('help') || 'Aide'}
            subtitle={t('helpCenter') || 'Centre d\'aide et FAQ'}
            onPress={() => router.push('/dashboard/help')}
          />
          <SettingItem
            icon="file-text"
            title={t('terms') || 'Conditions d\'utilisation'}
            subtitle={t('consultTerms') || 'Consulter les conditions'}
            onPress={() => router.push('/dashboard/terms')}
          />
          <SettingItem
            icon="shield"
            title={t('privacy') || 'Confidentialité'}
            subtitle={t('privacyPolicy') || 'Politique de confidentialité'}
            onPress={() => router.push('/dashboard/privacy')}
          />
        </View>

        {/* Logout Section */}
        <View style={tw.style(
          'mx-4 mb-8 rounded-2xl overflow-hidden',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <SettingItem
            icon="log-out"
            title={t('logout') || 'Déconnexion'}
            onPress={handleLogout}
            showArrow={false}
            danger={true}
          />
        </View>

        {/* App Version */}
        <View style={tw`items-center pb-8 px-4`}>
          <Text style={tw.style(
            'text-sm',
            theme.name === 'dark' ? 'text-gray-500' : 'text-gray-400'
          )}>
            RideAndGo Mobile v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}