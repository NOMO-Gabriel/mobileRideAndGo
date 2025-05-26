// app/(tabs)/dashboard/terms.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function TermsScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

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

  return (
    <ScrollView style={tw.style(
      'flex-1 px-5',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <View style={tw`py-6`}>
        <Text style={tw.style(
          'text-sm mb-4',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {t('lastUpdated') || 'Dernière mise à jour'}: 15 novembre 2024
        </Text>

        <Section title={t('introduction') || '1. Introduction'}>
          {t('termsIntro') || 'Bienvenue sur RideAndGo. En utilisant notre application, vous acceptez les présentes conditions d\'utilisation. Veuillez les lire attentivement avant d\'utiliser nos services.'}
        </Section>

        <Section title={t('serviceDescription') || '2. Description du service'}>
          {t('serviceDesc') || 'RideAndGo est une plateforme de covoiturage qui connecte les conducteurs et les passagers. Nous facilitons les réservations de trajets mais ne sommes pas responsables des interactions entre utilisateurs.'}
        </Section>

        <Section title={t('userResponsibilities') || '3. Responsabilités de l\'utilisateur'}>
          {t('userResp') || 'En utilisant RideAndGo, vous vous engagez à :\n\n• Fournir des informations exactes et à jour\n• Respecter les autres utilisateurs\n• Ne pas utiliser le service à des fins illégales\n• Maintenir la confidentialité de votre compte\n• Signaler tout comportement inapproprié'}
        </Section>

        <Section title={t('bookingCancellation') || '4. Réservation et annulation'}>
          {t('bookingRules') || 'Les réservations sont confirmées en temps réel. Les annulations sont possibles selon nos conditions :\n\n• Annulation gratuite jusqu\'à 1 heure avant le départ\n• Des frais peuvent s\'appliquer pour les annulations tardives\n• Les remboursements sont traités sous 3-5 jours ouvrables'}
        </Section>

        <Section title={t('paymentTerms') || '5. Conditions de paiement'}>
          {t('paymentInfo') || 'Les paiements sont sécurisés et traités par nos partenaires certifiés. Les prix incluent toutes les taxes applicables. Nous nous réservons le droit de modifier nos tarifs avec un préavis de 30 jours.'}
        </Section>

        <Section title={t('liability') || '6. Limitation de responsabilité'}>
          {t('liabilityText') || 'RideAndGo agit comme intermédiaire. Nous ne sommes pas responsables des dommages, retards, ou incidents durant les trajets. Les utilisateurs interagissent à leurs propres risques.'}
        </Section>

        <Section title={t('dataProtection') || '7. Protection des données'}>
          {t('dataProtectionText') || 'Nous respectons votre vie privée et protégeons vos données selon notre politique de confidentialité et le RGPD. Vous pouvez consulter, modifier ou supprimer vos données à tout moment.'}
        </Section>

        <Section title={t('termination') || '8. Résiliation'}>
          {t('terminationText') || 'Vous pouvez fermer votre compte à tout moment. Nous nous réservons le droit de suspendre ou fermer des comptes en cas de violation de ces conditions.'}
        </Section>

        <Section title={t('changes') || '9. Modifications'}>
          {t('changesText') || 'Nous pouvons modifier ces conditions à tout moment. Les utilisateurs seront informés des changements importants par email ou notification dans l\'application.'}
        </Section>

        <Section title={t('contact') || '10. Contact'}>
          {t('contactText') || 'Pour toute question concernant ces conditions, contactez-nous :\n\nEmail: legal@ridego.com\nTéléphone: +33 1 23 45 67 89\nAdresse: 123 Rue de la Tech, 75001 Paris, France'}
        </Section>
      </View>
    </ScrollView>
  );
}
