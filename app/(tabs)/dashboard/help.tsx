// app/(tabs)/dashboard/help.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function HelpScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const helpCategories = [
    {
      id: 1,
      title: t('gettingStarted') || 'Commencer',
      icon: 'play-circle',
      color: '#4CAF50',
      description: t('basicSetup') || 'Configuration de base et première utilisation',
    },
    {
      id: 2,
      title: t('bookingRides') || 'Réserver des trajets',
      icon: 'map-pin',
      color: '#2196F3',
      description: t('howToBook') || 'Comment réserver et gérer vos trajets',
    },
    {
      id: 3,
      title: t('payments') || 'Paiements',
      icon: 'credit-card',
      color: '#FF8C00',
      description: t('paymentMethods') || 'Méthodes de paiement et facturation',
    },
    {
      id: 4,
      title: t('account') || 'Compte',
      icon: 'user',
      color: '#9C27B0',
      description: t('accountManagement') || 'Gestion de compte et sécurité',
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: t('howToCreateAccount') || 'Comment créer un compte?',
      answer: t('createAccountAnswer') || 'Téléchargez l\'application, appuyez sur "S\'inscrire", remplissez vos informations et vérifiez votre email.',
      category: 'gettingStarted',
    },
    {
      id: 2,
      question: t('howToBookRide') || 'Comment réserver un trajet?',
      answer: t('bookRideAnswer') || 'Entrez votre destination, choisissez le type de véhicule, confirmez votre réservation et attendez la confirmation.',
      category: 'bookingRides',
    },
    {
      id: 3,
      question: t('howToPayment') || 'Comment ajouter une méthode de paiement?',
      answer: t('paymentAnswer') || 'Allez dans Paramètres > Paiements, appuyez sur "Ajouter une carte" et entrez vos informations.',
      category: 'payments',
    },
    {
      id: 4,
      question: t('howToCancelRide') || 'Comment annuler un trajet?',
      answer: t('cancelRideAnswer') || 'Ouvrez votre trajet actif et appuyez sur "Annuler". Des frais peuvent s\'appliquer selon les conditions.',
      category: 'bookingRides',
    },
    {
      id: 5,
      question: t('forgotPassword') || 'J\'ai oublié mon mot de passe',
      answer: t('forgotPasswordAnswer') || 'Sur l\'écran de connexion, appuyez sur "Mot de passe oublié" et suivez les instructions par email.',
      category: 'account',
    },
  ];

  const contactOptions = [
    {
      id: 1,
      title: t('liveChat') || 'Chat en direct',
      subtitle: t('chatAvailable') || 'Disponible 24/7',
      icon: 'message-circle',
      color: '#4CAF50',
      action: () => Alert.alert(t('info') || 'Info', t('chatComingSoon') || 'Le chat en direct sera bientôt disponible'),
    },
    {
      id: 2,
      title: t('email') || 'Email',
      subtitle: 'support@ridego.com',
      icon: 'mail',
      color: '#2196F3',
      action: () => Linking.openURL('mailto:support@ridego.com'),
    },
    {
      id: 3,
      title: t('phone') || 'Téléphone',
      subtitle: '+33 1 23 45 67 89',
      icon: 'phone',
      color: '#FF8C00',
      action: () => Linking.openURL('tel:+33123456789'),
    },
  ];

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center p-4 rounded-2xl mb-3',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}
      activeOpacity={0.7}
    >
      <View style={[
        tw`w-12 h-12 rounded-2xl items-center justify-center mr-4`,
        { backgroundColor: category.color + '20' }
      ]}>
        <Feather name={category.icon as any} size={24} color={category.color} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'font-bold text-base',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {category.title}
        </Text>
        <Text style={tw.style(
          'text-sm mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}>
          {category.description}
        </Text>
      </View>
      <Feather 
        name="chevron-right" 
        size={20} 
        color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
      />
    </TouchableOpacity>
  );

  const FAQItem = ({ item }: { item: any }) => {
    const isExpanded = expandedFAQ === item.id;
    
    return (
      <View style={tw.style(
        'border-b',
        theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
      )}>
        <TouchableOpacity
          style={tw`flex-row items-center justify-between py-4`}
          onPress={() => setExpandedFAQ(isExpanded ? null : item.id)}
        >
          <Text style={tw.style(
            'flex-1 font-medium pr-4',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {item.question}
          </Text>
          <Feather 
            name={isExpanded ? "minus" : "plus"} 
            size={20} 
            color={theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={tw`pb-4`}>
            <Text style={tw.style(
              'text-sm leading-6',
              theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              {item.answer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const ContactOption = ({ option }: { option: any }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center p-4 rounded-2xl mb-3',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}
      onPress={option.action}
      activeOpacity={0.7}
    >
      <View style={[
        tw`w-12 h-12 rounded-2xl items-center justify-center mr-4`,
        { backgroundColor: option.color + '20' }
      ]}>
        <Feather name={option.icon as any} size={20} color={option.color} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'font-bold text-base',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {option.title}
        </Text>
        <Text style={tw.style(
          'text-sm mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}>
          {option.subtitle}
        </Text>
      </View>
      <Feather 
        name="external-link" 
        size={16} 
        color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
      />
    </TouchableOpacity>
  );

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Search Bar */}
      <View style={tw`px-4 pt-4 mb-6`}>
        <View style={tw.style(
          'flex-row items-center px-4 py-3 rounded-xl border',
          theme.name === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        )}>
          <Feather 
            name="search" 
            size={20} 
            color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
          />
          <TextInput
            style={tw.style(
              'flex-1 ml-3 text-base',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}
            placeholder={t('searchHelp') || 'Rechercher dans l\'aide...'}
            placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Help Categories */}
      {!searchQuery && (
        <View style={tw`px-4 mb-6`}>
          <Text style={tw.style(
            'text-xl font-bold mb-4',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('helpCategories') || 'Catégories d\'aide'}
          </Text>
          {helpCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
      )}

      {/* FAQ Section */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`px-5 py-4 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {searchQuery ? t('searchResults') || 'Résultats de recherche' : t('frequentQuestions') || 'Questions fréquentes'}
          </Text>
        </View>
        
        <View style={tw`px-5`}>
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))
          ) : (
            <View style={tw`py-8 items-center`}>
              <Feather 
                name="search" 
                size={48} 
                color={theme.name === 'dark' ? '#374151' : '#D1D5DB'} 
              />
              <Text style={tw.style(
                'text-center mt-4 text-base',
                theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>
                {t('noResultsFound') || 'Aucun résultat trouvé'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Contact Support */}
      <View style={tw`px-4 mb-8`}>
        <Text style={tw.style(
          'text-xl font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('contactSupport') || 'Contacter le support'}
        </Text>
        {contactOptions.map((option) => (
          <ContactOption key={option.id} option={option} />
        ))}
      </View>

      {/* Quick Links */}
      <View style={tw.style(
        'mx-4 mb-8 rounded-2xl p-5',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={tw.style(
          'text-lg font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('quickLinks') || 'Liens rapides'}
        </Text>
        
        <TouchableOpacity
          style={tw`flex-row items-center py-3 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        >
          <Feather name="book-open" size={18} color="#FF8C00" />
          <Text style={tw.style(
            'ml-3 flex-1',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('userGuide') || 'Guide utilisateur'}
          </Text>
          <Feather 
            name="external-link" 
            size={16} 
            color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`flex-row items-center py-3 border-b ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        >
          <Feather name="video" size={18} color="#FF8C00" />
          <Text style={tw.style(
            'ml-3 flex-1',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('videoTutorials') || 'Tutoriels vidéo'}
          </Text>
          <Feather 
            name="external-link" 
            size={16} 
            color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`flex-row items-center py-3`}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        >
          <Feather name="users" size={18} color="#FF8C00" />
          <Text style={tw.style(
            'ml-3 flex-1',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('community') || 'Communauté'}
          </Text>
          <Feather 
            name="external-link" 
            size={16} 
            color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}