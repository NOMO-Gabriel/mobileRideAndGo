// app/(tabs)/dashboard/notifications.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    rideUpdates: true,
    promotions: true,
    newMessages: true,
    priceAlerts: false,
    weeklyReport: true,
    rideReminders: true,
    driverArrival: true,
    paymentConfirmation: true,
  });

  const [recentNotifications] = useState([
    {
      id: 1,
      title: 'Trajet confirmé',
      message: 'Votre trajet vers Paris a été confirmé pour 14h30',
      time: '2 min',
      type: 'ride',
      read: false,
    },
    {
      id: 2,
      title: 'Nouvelle offre',
      message: '20% de réduction sur votre prochain trajet',
      time: '1h',
      type: 'promotion',
      read: false,
    },
    {
      id: 3,
      title: 'Message reçu',
      message: 'Vous avez reçu un nouveau message de votre conducteur',
      time: '3h',
      type: 'message',
      read: true,
    },
    {
      id: 4,
      title: 'Paiement confirmé',
      message: 'Votre paiement de 25,50€ a été traité avec succès',
      time: '1j',
      type: 'payment',
      read: true,
    },
  ]);

  const updateSetting = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllNotifications = () => {
    Alert.alert(
      t('clearNotifications') || 'Effacer les notifications',
      t('clearNotificationsConfirm') || 'Voulez-vous vraiment effacer toutes les notifications?',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        { 
          text: t('clear') || 'Effacer', 
          style: 'destructive',
          onPress: () => Alert.alert(t('success') || 'Succès', t('notificationsCleared') || 'Notifications effacées')
        }
      ]
    );
  };

  const NotificationItem = ({ notification }: { notification: any }) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'ride': return 'map-pin';
        case 'promotion': return 'tag';
        case 'message': return 'message-circle';
        case 'payment': return 'credit-card';
        default: return 'bell';
      }
    };

    const getIconColor = (type: string) => {
      switch (type) {
        case 'ride': return '#4CAF50';
        case 'promotion': return '#FF8C00';
        case 'message': return '#2196F3';
        case 'payment': return '#9C27B0';
        default: return '#6B7280';
      }
    };

    return (
      <TouchableOpacity
        style={tw.style(
          'flex-row items-start p-4 border-b',
          theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200',
          !notification.read ? theme.name === 'dark' ? 'bg-gray-800' : 'bg-blue-50' : ''
        )}
        activeOpacity={0.7}
      >
        <View style={[
          tw`w-10 h-10 rounded-full items-center justify-center mr-3 mt-1`,
          { backgroundColor: getIconColor(notification.type) + '20' }
        ]}>
          <Feather name={getIcon(notification.type) as any} size={18} color={getIconColor(notification.type)} />
        </View>
        
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <Text style={tw.style(
              'font-bold text-base',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {notification.title}
            </Text>
            <Text style={tw.style(
              'text-xs',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {notification.time}
            </Text>
          </View>
          <Text style={tw.style(
            'text-sm leading-5',
            theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            {notification.message}
          </Text>
          {!notification.read && (
            <View style={tw`w-2 h-2 bg-primary rounded-full mt-2`} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const SettingToggle = ({ 
    title, 
    subtitle, 
    value, 
    onToggle, 
    icon 
  }: {
    title: string;
    subtitle?: string;
    value: boolean;
    onToggle: (value: boolean) => void;
    icon: string;
  }) => (
    <View style={tw.style(
      'flex-row items-center justify-between px-5 py-4 border-b',
      theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
    )}>
      <View style={tw`flex-row items-center flex-1`}>
        <View style={tw.style(
          'w-8 h-8 rounded-full items-center justify-center mr-3',
          theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        )}>
          <Feather 
            name={icon as any} 
            size={16} 
            color={theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
          />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw.style(
            'text-base font-medium',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
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
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.name === 'dark' ? '#374151' : '#E5E7EB', true: '#FF8C00' }}
        thumbColor={theme.name === 'dark' ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  return (
    <ScrollView style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Recent Notifications */}
      <View style={tw.style(
        'mx-4 mt-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw.style(
          'flex-row items-center justify-between px-5 py-4 border-b',
          theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
        )}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('recentNotifications') || 'Notifications récentes'}
          </Text>
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={clearAllNotifications}
          >
            <Feather name="trash-2" size={16} color="#EF4444" />
            <Text style={tw`text-red-500 text-sm font-medium ml-1`}>
              {t('clearAll') || 'Tout effacer'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {recentNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </View>

      {/* Notification Settings */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('notificationSettings') || 'Paramètres de notification'}
          </Text>
        </View>

        {/* General Settings */}
        <SettingToggle
          title={t('pushNotifications') || 'Notifications push'}
          subtitle={t('receiveInstantNotifications') || 'Recevoir des notifications instantanées'}
          value={notificationSettings.pushNotifications}
          onToggle={(value) => updateSetting('pushNotifications', value)}
          icon="smartphone"
        />

        <SettingToggle
          title={t('emailNotifications') || 'Notifications par e-mail'}
          subtitle={t('receiveEmailUpdates') || 'Recevoir des mises à jour par e-mail'}
          value={notificationSettings.emailNotifications}
          onToggle={(value) => updateSetting('emailNotifications', value)}
          icon="mail"
        />

        <SettingToggle
          title={t('smsNotifications') || 'Notifications SMS'}
          subtitle={t('receiveSMSAlerts') || 'Recevoir des alertes par SMS'}
          value={notificationSettings.smsNotifications}
          onToggle={(value) => updateSetting('smsNotifications', value)}
          icon="message-square"
        />
      </View>

      {/* Ride Notifications */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('rideNotifications') || 'Notifications de trajet'}
          </Text>
        </View>

        <SettingToggle
          title={t('rideUpdates') || 'Mises à jour de trajet'}
          subtitle={t('statusChanges') || 'Changements de statut et confirmations'}
          value={notificationSettings.rideUpdates}
          onToggle={(value) => updateSetting('rideUpdates', value)}
          icon="navigation"
        />

        <SettingToggle
          title={t('driverArrival') || 'Arrivée du conducteur'}
          subtitle={t('whenDriverArrives') || 'Quand le conducteur arrive au point de rendez-vous'}
          value={notificationSettings.driverArrival}
          onToggle={(value) => updateSetting('driverArrival', value)}
          icon="user-check"
        />

        <SettingToggle
          title={t('rideReminders') || 'Rappels de trajet'}
          subtitle={t('upcomingRideReminders') || 'Rappels pour vos trajets à venir'}
          value={notificationSettings.rideReminders}
          onToggle={(value) => updateSetting('rideReminders', value)}
          icon="clock"
        />
      </View>

      {/* Marketing & Others */}
      <View style={tw.style(
        'mx-4 mb-8 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('otherNotifications') || 'Autres notifications'}
          </Text>
        </View>

        <SettingToggle
          title={t('promotions') || 'Promotions et offres'}
          subtitle={t('specialOffers') || 'Offres spéciales et réductions'}
          value={notificationSettings.promotions}
          onToggle={(value) => updateSetting('promotions', value)}
          icon="tag"
        />

        <SettingToggle
          title={t('newMessages') || 'Nouveaux messages'}
          subtitle={t('messagesFromDrivers') || 'Messages des conducteurs et passagers'}
          value={notificationSettings.newMessages}
          onToggle={(value) => updateSetting('newMessages', value)}
          icon="message-circle"
        />

        <SettingToggle
          title={t('priceAlerts') || 'Alertes de prix'}
          subtitle={t('priceChangeAlerts') || 'Alertes de changement de prix'}
          value={notificationSettings.priceAlerts}
          onToggle={(value) => updateSetting('priceAlerts', value)}
          icon="trending-down"
        />

        <SettingToggle
          title={t('weeklyReport') || 'Rapport hebdomadaire'}
          subtitle={t('weeklyUsageSummary') || 'Résumé hebdomadaire de votre utilisation'}
          value={notificationSettings.weeklyReport}
          onToggle={(value) => updateSetting('weeklyReport', value)}
          icon="bar-chart-2"
        />

        <SettingToggle
          title={t('paymentConfirmation') || 'Confirmations de paiement'}
          subtitle={t('transactionConfirmations') || 'Confirmations de vos transactions'}
          value={notificationSettings.paymentConfirmation}
          onToggle={(value) => updateSetting('paymentConfirmation', value)}
          icon="credit-card"
        />
      </View>
    </ScrollView>
  );
}