// app/(tabs)/dashboard/settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function SettingsScreen() {
  const { t, locale, changeLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    locationServices: true,
    autoBooking: false,
    pushNotifications: true,
    emailMarketing: false,
    dataCollection: true,
    analytics: true,
    crashReports: true,
    offlineMode: false,
  });

  const [showDataModal, setShowDataModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const updateSetting = (key: string, value: boolean) => {
    if (key === 'locationServices' && !value) {
      Alert.alert(
        t('warning') || 'Attention',
        t('locationWarning') || 'Désactiver les services de localisation peut affecter la fonctionnalité de l\'application',
        [
          { text: t('cancel') || 'Annuler', style: 'cancel' },
          { 
            text: t('disable') || 'Désactiver', 
            onPress: () => setSettings(prev => ({ ...prev, [key]: value }))
          }
        ]
      );
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  const clearAppData = () => {
    Alert.alert(
      t('clearData') || 'Effacer les données',
      t('clearDataWarning') || 'Cette action effacera toutes vos données locales. Cette action est irréversible.',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        { 
          text: t('clear') || 'Effacer', 
          style: 'destructive',
          onPress: () => Alert.alert(t('success') || 'Succès', t('dataCleared') || 'Données effacées avec succès')
        }
      ]
    );
  };

  const exportData = () => {
    Alert.alert(
      t('exportData') || 'Exporter les données',
      t('exportDataInfo') || 'Vos données seront exportées dans un fichier que vous pourrez télécharger.',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        { 
          text: t('export') || 'Exporter', 
          onPress: () => Alert.alert(t('success') || 'Succès', t('exportStarted') || 'Exportation démarrée. Vous recevrez un email quand ce sera prêt.')
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onToggle, 
    showSwitch = true,
    onPress,
    danger = false,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onToggle?: (value: boolean) => void;
    showSwitch?: boolean;
    onPress?: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center px-5 py-4 border-b',
        theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
      )}
      onPress={onPress}
      disabled={!onPress && !onToggle}
      activeOpacity={0.7}
    >
      <View style={tw.style(
        'w-10 h-10 rounded-full items-center justify-center mr-4',
        danger 
          ? 'bg-red-100' 
          : theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      )}>
        <Feather 
          name={icon as any} 
          size={18} 
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
      {showSwitch && onToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: theme.name === 'dark' ? '#374151' : '#E5E7EB', true: '#FF8C00' }}
          thumbColor={theme.name === 'dark' ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <Feather 
          name="chevron-right" 
          size={20} 
          color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* App Preferences */}
      <View style={tw.style(
        'mx-4 mt-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('appPreferences') || 'Préférences de l\'application'}
          </Text>
        </View>

        <SettingItem
          icon="moon"
          title={t('darkMode') || 'Mode sombre'}
          subtitle={`${t('currently') || 'Actuellement'}: ${theme.name === 'dark' ? t('enabled') || 'Activé' : t('disabled') || 'Désactivé'}`}
          value={theme.name === 'dark'}
          onToggle={toggleTheme}
        />

        <SettingItem
          icon="globe"
          title={t('language') || 'Langue'}
          subtitle={`${t('currently') || 'Actuellement'}: ${locale === 'fr' ? 'Français' : 'English'}`}
          showSwitch={false}
          onPress={() => changeLocale(locale === 'fr' ? 'en' : 'fr')}
        />

        <SettingItem
          icon="map-pin"
          title={t('locationServices') || 'Services de localisation'}
          subtitle={t('requiredForRides') || 'Nécessaire pour les trajets et la navigation'}
          value={settings.locationServices}
          onToggle={(value) => updateSetting('locationServices', value)}
        />

        <SettingItem
          icon="zap"
          title={t('autoBooking') || 'Réservation automatique'}
          subtitle={t('autoBookingDesc') || 'Réserver automatiquement des trajets récurrents'}
          value={settings.autoBooking}
          onToggle={(value) => updateSetting('autoBooking', value)}
        />
      </View>

      {/* Privacy & Security */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('privacySecurity') || 'Confidentialité et sécurité'}
          </Text>
        </View>

        <SettingItem
          icon="shield"
          title={t('dataCollection') || 'Collecte de données'}
          subtitle={t('dataCollectionDesc') || 'Autoriser la collecte de données pour améliorer le service'}
          value={settings.dataCollection}
          onToggle={(value) => updateSetting('dataCollection', value)}
        />

        <SettingItem
          icon="bar-chart"
          title={t('analytics') || 'Analyses'}
          subtitle={t('analyticsDesc') || 'Partager des données d\'utilisation anonymes'}
          value={settings.analytics}
          onToggle={(value) => updateSetting('analytics', value)}
        />

        <SettingItem
          icon="alert-triangle"
          title={t('crashReports') || 'Rapports de plantage'}
          subtitle={t('crashReportsDesc') || 'Envoyer automatiquement les rapports de plantage'}
          value={settings.crashReports}
          onToggle={(value) => updateSetting('crashReports', value)}
        />

        <SettingItem
          icon="download"
          title={t('offlineMode') || 'Mode hors ligne'}
          subtitle={t('offlineModeDesc') || 'Télécharger les cartes pour une utilisation hors ligne'}
          value={settings.offlineMode}
          onToggle={(value) => updateSetting('offlineMode', value)}
        />
      </View>

      {/* Data Management */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('dataManagement') || 'Gestion des données'}
          </Text>
        </View>

        <SettingItem
          icon="download-cloud"
          title={t('exportData') || 'Exporter mes données'}
          subtitle={t('exportDataDesc') || 'Télécharger une copie de vos données'}
          showSwitch={false}
          onPress={exportData}
        />

        <SettingItem
          icon="info"
          title={t('dataUsage') || 'Utilisation des données'}
          subtitle={t('dataUsageDesc') || 'Voir comment vos données sont utilisées'}
          showSwitch={false}
          onPress={() => setShowDataModal(true)}
        />

        <SettingItem
          icon="trash-2"
          title={t('clearAppData') || 'Effacer les données de l\'app'}
          subtitle={t('clearAppDataDesc') || 'Supprimer toutes les données stockées localement'}
          showSwitch={false}
          onPress={clearAppData}
          danger={true}
        />
      </View>

      {/* Legal */}
      <View style={tw.style(
        'mx-4 mb-8 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('legal') || 'Légal'}
          </Text>
        </View>

        <SettingItem
          icon="file-text"
          title={t('terms') || 'Conditions d\'utilisation'}
          showSwitch={false}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        />

        <SettingItem
          icon="shield"
          title={t('privacy') || 'Politique de confidentialité'}
          showSwitch={false}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        />

        <SettingItem
          icon="book"
          title={t('licenses') || 'Licences'}
          subtitle={t('openSourceLicenses') || 'Licences open source'}
          showSwitch={false}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        />
      </View>

      {/* Data Usage Modal */}
      <Modal
        visible={showDataModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDataModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw.style(
            'rounded-t-3xl p-6 max-h-4/5',
            theme.name === 'dark' ? 'bg-gray-900' : 'bg-white'
          )}>
            <View style={tw`flex-row items-center justify-between mb-6`}>
              <Text style={tw.style(
                'text-xl font-bold',
                theme.name === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                {t('dataUsage') || 'Utilisation des données'}
              </Text>
              <TouchableOpacity
                style={tw.style(
                  'w-8 h-8 rounded-full items-center justify-center',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                )}
                onPress={() => setShowDataModal(false)}
              >
                <Feather 
                  name="x" 
                  size={18} 
                  color={theme.name === 'dark' ? 'white' : 'black'} 
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={tw`space-y-4`}>
                <View style={tw.style(
                  'p-4 rounded-xl',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                )}>
                  <Text style={tw.style(
                    'font-bold text-base mb-2',
                    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {t('dataWeCollect') || 'Données que nous collectons'}
                  </Text>
                  <Text style={tw.style(
                    'text-sm leading-6',
                    theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    • Informations de profil (nom, email, téléphone){'\n'}
                    • Données de localisation pour les trajets{'\n'}
                    • Historique des trajets et préférences{'\n'}
                    • Données d'utilisation de l'application{'\n'}
                    • Informations de paiement (sécurisées)
                  </Text>
                </View>

                <View style={tw.style(
                  'p-4 rounded-xl',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                )}>
                  <Text style={tw.style(
                    'font-bold text-base mb-2',
                    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {t('howWeUseData') || 'Comment nous utilisons vos données'}
                  </Text>
                  <Text style={tw.style(
                    'text-sm leading-6',
                    theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    • Fournir et améliorer nos services{'\n'}
                    • Personnaliser votre expérience{'\n'}
                    • Assurer la sécurité et prévenir la fraude{'\n'}
                    • Communiquer avec vous{'\n'}
                    • Analyses et recherche (données anonymisées)
                  </Text>
                </View>

                <View style={tw.style(
                  'p-4 rounded-xl',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                )}>
                  <Text style={tw.style(
                    'font-bold text-base mb-2',
                    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {t('yourRights') || 'Vos droits'}
                  </Text>
                  <Text style={tw.style(
                    'text-sm leading-6',
                    theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    • Accéder à vos données{'\n'}
                    • Corriger les informations incorrectes{'\n'}
                    • Supprimer votre compte et vos données{'\n'}
                    • Exporter vos données{'\n'}
                    • Contrôler les paramètres de confidentialité
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}