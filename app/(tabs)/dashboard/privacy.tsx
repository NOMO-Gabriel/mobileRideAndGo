
// app/(tabs)/dashboard/privacy.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export function PrivacyScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleDataRequest = (type: string) => {
    Alert.alert(
      t('dataRequest') || 'Demande de données',
      t('dataRequestInfo') || 'Votre demande sera traitée sous 30 jours selon le RGPD.',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        { 
          text: t('submit') || 'Soumettre', 
          onPress: () => Alert.alert(t('success') || 'Succès', t('requestSubmitted') || 'Demande soumise avec succès')
        }
      ]
    );
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={tw`mb-6`}>
      <Text style={tw.style(
        'text-lg font-bold mb-3',
        theme.name === 'dark' ? 'text-white' : 'text-gray-800'
      )}>
        {title}
      </Text>
      <Text style={tw.style(
        'text-sm leading-6',
        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
      )}>
        {children}
      </Text>
    </View>
  );

  const ActionButton = ({ title, subtitle, icon, onPress }: {
    title: string;
    subtitle: string;
    icon: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center p-4 rounded-xl mb-3',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}
      onPress={onPress}
    >
      <View style={tw.style(
        'w-10 h-10 rounded-full items-center justify-center mr-4',
        theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      )}>
        <Feather 
          name={icon as any} 
          size={18} 
          color={theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'font-medium',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {title}
        </Text>
        <Text style={tw.style(
          'text-sm mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {subtitle}
        </Text>
      </View>
      <Feather 
        name="chevron-right" 
        size={20} 
        color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <View style={tw`px-5 py-6`}>
        <Text style={tw.style(
          'text-sm mb-6',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {t('lastUpdated') || 'Dernière mise à jour'}: 15 novembre 2024
        </Text>

        <Section title={t('dataCollection') || '1. Collecte des données'}>
          {t('dataCollectionDetail') || 'Nous collectons les informations que vous nous fournissez directement (compte, profil), les données d\'utilisation (trajets, préférences), et les données techniques (localisation, appareil) nécessaires au fonctionnement du service.'}
        </Section>

        <Section title={t('dataUsage') || '2. Utilisation des données'}>
          {t('dataUsageDetail') || 'Vos données sont utilisées pour :\n\n• Fournir et améliorer nos services\n• Faciliter les connexions entre utilisateurs\n• Assurer la sécurité et prévenir la fraude\n• Personnaliser votre expérience\n• Communiquer avec vous\n• Respecter nos obligations légales'}
        </Section>

        <Section title={t('dataSharing') || '3. Partage des données'}>
          {t('dataSharingDetail') || 'Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :\n\n• D\'autres utilisateurs (profil public uniquement)\n• Nos prestataires de services (paiement, cartes)\n• Les autorités légales si requis par la loi\n• En cas de fusion ou acquisition'}
        </Section>

        <Section title={t('dataRetention') || '4. Conservation des données'}>
          {t('dataRetentionDetail') || 'Nous conservons vos données tant que votre compte est actif et pendant 3 ans après sa fermeture pour les obligations légales. Certaines données peuvent être conservées plus longtemps si requises par la loi.'}
        </Section>

        <Section title={t('yourRights') || '5. Vos droits (RGPD)'}>
          {t('yourRightsDetail') || 'Vous avez le droit de :\n\n• Accéder à vos données personnelles\n• Rectifier les informations incorrectes\n• Supprimer vos données (droit à l\'oubli)\n• Limiter le traitement de vos données\n• Portabilité de vos données\n• Opposition au traitement\n• Retirer votre consentement'}
        </Section>

        <Section title={t('dataSecurity') || '6. Sécurité des données'}>
          {t('dataSecurityDetail') || 'Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre l\'accès non autorisé, la perte, la destruction ou l\'altération.'}
        </Section>

        <Section title={t('cookies') || '7. Cookies et technologies similaires'}>
          {t('cookiesDetail') || 'Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, analyser l\'utilisation et personnaliser le contenu. Vous pouvez gérer vos préférences dans les paramètres.'}
        </Section>

        <Section title={t('contact') || '8. Contact'}>
          {t('privacyContactText') || 'Pour toute question concernant cette politique ou pour exercer vos droits :\n\nDélégué à la Protection des Données\nEmail: dpo@ridego.com\nTéléphone: +33 1 23 45 67 89\nAdresse: 123 Rue de la Tech, 75001 Paris, France'}
        </Section>
      </View>

      {/* Action Buttons */}
      <View style={tw`px-5 pb-8`}>
        <Text style={tw.style(
          'text-lg font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('exerciseYourRights') || 'Exercer vos droits'}
        </Text>

        <ActionButton
          title={t('accessMyData') || 'Accéder à mes données'}
          subtitle={t('downloadDataCopy') || 'Télécharger une copie de toutes vos données'}
          icon="download"
          onPress={() => handleDataRequest('access')}
        />

        <ActionButton
          title={t('correctMyData') || 'Corriger mes données'}
          subtitle={t('updateIncorrectInfo') || 'Signaler des informations incorrectes'}
          icon="edit"
          onPress={() => handleDataRequest('correction')}
        />

        <ActionButton
          title={t('deleteMyData') || 'Supprimer mes données'}
          subtitle={t('permanentDeletion') || 'Suppression permanente de votre compte et données'}
          icon="trash-2"
          onPress={() => handleDataRequest('deletion')}
        />

        <ActionButton
          title={t('limitProcessing') || 'Limiter le traitement'}
          subtitle={t('restrictDataUsage') || 'Restreindre l\'utilisation de vos données'}
          icon="shield"
          onPress={() => handleDataRequest('limitation')}
        />

        <ActionButton
          title={t('dataPortability') || 'Portabilité des données'}
          subtitle={t('transferToOther') || 'Transférer vos données vers un autre service'}
          icon="external-link"
          onPress={() => handleDataRequest('portability')}
        />
      </View>
    </ScrollView>
  );
}

export default PrivacyScreen;