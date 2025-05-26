// app/(tabs)/dashboard/subscriptions.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function SubscriptionsScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const currentPlan = {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'month',
    features: [
      'Accès aux trajets standards',
      'Support client de base',
      'Historique limité (30 jours)',
    ],
    isActive: true,
  };

  const availablePlans = [
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      period: 'month',
      popular: true,
      features: [
        'Trajets prioritaires',
        'Support client 24/7',
        'Historique illimité',
        'Réservations anticipées',
        'Annulation gratuite',
        'Réductions exclusives',
      ],
      savings: '20% d\'économies',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      features: [
        'Tous les avantages Premium',
        'Accès VIP aux véhicules premium',
        'Assistant personnel dédié',
        'Rapports détaillés',
        'API personnalisée',
        'Facturation entreprise',
      ],
      savings: '30% d\'économies',
    },
  ];

  const subscriptionHistory = [
    {
      id: 1,
      date: '15 Nov 2024',
      plan: 'Basic',
      amount: 0,
      status: 'active',
    },
    {
      id: 2,
      date: '15 Oct 2024',
      plan: 'Premium Trial',
      amount: 0,
      status: 'expired',
    },
  ];

  const handleUpgrade = (planId: string) => {
    Alert.alert(
      t('upgradePlan') || 'Mettre à niveau',
      t('upgradeConfirm') || 'Voulez-vous vraiment mettre à niveau votre abonnement?',
      [
        { text: t('cancel') || 'Annuler', style: 'cancel' },
        { 
          text: t('upgrade') || 'Mettre à niveau', 
          onPress: () => {
            setShowUpgradeModal(false);
            Alert.alert(t('success') || 'Succès', t('planUpgraded') || 'Votre plan a été mis à niveau avec succès!');
          }
        }
      ]
    );
  };

  const PlanCard = ({ plan, isCurrent = false }: { plan: any; isCurrent?: boolean }) => (
    <View style={tw.style(
      'rounded-2xl overflow-hidden mb-4',
      isCurrent 
        ? 'border-2 border-primary' 
        : theme.name === 'dark' ? 'bg-gray-800' : 'bg-white',
      plan.popular ? 'border-2 border-primary' : ''
    )}>
      {plan.popular && (
        <View style={tw`bg-primary py-2`}>
          <Text style={tw`text-white text-center font-bold text-sm`}>
            {t('mostPopular') || 'Le plus populaire'}
          </Text>
        </View>
      )}
      
      <View style={tw`p-5`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View>
            <Text style={tw.style(
              'text-xl font-bold',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {plan.name}
            </Text>
            {plan.savings && (
              <Text style={tw`text-green-500 text-sm font-medium mt-1`}>
                {plan.savings}
              </Text>
            )}
          </View>
          <View style={tw`items-end`}>
            <Text style={tw.style(
              'text-2xl font-bold',
              isCurrent ? 'text-primary' : theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {plan.price === 0 ? t('free') || 'Gratuit' : `€${plan.price}`}
            </Text>
            {plan.price > 0 && (
              <Text style={tw.style(
                'text-sm',
                theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>
                /{t(plan.period) || plan.period}
              </Text>
            )}
          </View>
        </View>

        <View style={tw`mb-6`}>
          {plan.features.map((feature: string, index: number) => (
            <View key={index} style={tw`flex-row items-center mb-2`}>
              <Feather 
                name="check" 
                size={16} 
                color={isCurrent ? '#FF8C00' : '#10B981'} 
              />
              <Text style={tw.style(
                'ml-3 text-sm',
                theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {isCurrent ? (
          <View style={tw.style(
            'py-3 rounded-xl items-center',
            'bg-primary bg-opacity-20'
          )}>
            <Text style={tw`text-primary font-bold`}>
              {t('currentPlan') || 'Plan actuel'}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={tw`bg-primary py-3 rounded-xl items-center`}
            onPress={() => handleUpgrade(plan.id)}
          >
            <Text style={tw`text-white font-bold`}>
              {t('selectPlan') || 'Sélectionner ce plan'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const HistoryItem = ({ item }: { item: any }) => (
    <View style={tw.style(
      'flex-row items-center justify-between py-4 border-b',
      theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
    )}>
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'font-medium',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {item.plan}
        </Text>
        <Text style={tw.style(
          'text-sm mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {item.date}
        </Text>
      </View>
      
      <View style={tw`items-end`}>
        <Text style={tw.style(
          'font-bold',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {item.amount === 0 ? t('free') || 'Gratuit' : `€${item.amount}`}
        </Text>
        <View style={tw.style(
          'px-2 py-1 rounded-full mt-1',
          item.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
        )}>
          <Text style={tw.style(
            'text-xs font-medium',
            item.status === 'active' ? 'text-green-600' : 'text-gray-600'
          )}>
            {item.status === 'active' ? t('active') || 'Actif' : t('expired') || 'Expiré'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={tw.style(
      'flex-1',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Current Plan */}
      <View style={tw`px-4 pt-4 mb-6`}>
        <Text style={tw.style(
          'text-2xl font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('yourCurrentPlan') || 'Votre plan actuel'}
        </Text>
        <PlanCard plan={currentPlan} isCurrent={true} />
      </View>

      {/* Upgrade Options */}
      <View style={tw`px-4 mb-6`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw.style(
            'text-xl font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('upgradePlans') || 'Plans de mise à niveau'}
          </Text>
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => setShowUpgradeModal(true)}
          >
            <Feather name="info" size={16} color="#FF8C00" />
            <Text style={tw`text-primary text-sm font-medium ml-1`}>
              {t('compareFeatures') || 'Comparer'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {availablePlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </View>

      {/* Payment Method */}
      <View style={tw.style(
        'mx-4 mb-6 rounded-2xl p-5',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={tw.style(
          'text-lg font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('paymentMethod') || 'Méthode de paiement'}
        </Text>
        
        <TouchableOpacity
          style={tw.style(
            'flex-row items-center p-4 rounded-xl border',
            theme.name === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
          )}
        >
          <View style={tw`w-12 h-8 bg-blue-600 rounded mr-3 items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>VISA</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw.style(
              'font-medium',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              •••• •••• •••• 1234
            </Text>
            <Text style={tw.style(
              'text-sm',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {t('expiresOn') || 'Expire le'} 12/26
            </Text>
          </View>
          <Feather 
            name="edit-2" 
            size={18} 
            color={theme.name === 'dark' ? '#FF8C00' : '#6B7280'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`flex-row items-center justify-center mt-3 py-3`}
        >
          <Feather name="plus" size={16} color="#FF8C00" />
          <Text style={tw`text-primary font-medium ml-2`}>
            {t('addPaymentMethod') || 'Ajouter une méthode de paiement'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subscription History */}
      <View style={tw.style(
        'mx-4 mb-8 rounded-2xl overflow-hidden',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw.style(
          'px-5 py-4 border-b',
          theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
        )}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('subscriptionHistory') || 'Historique des abonnements'}
          </Text>
        </View>
        
        <View style={tw`px-5`}>
          {subscriptionHistory.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </View>
      </View>

      {/* Compare Features Modal */}
      <Modal
        visible={showUpgradeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUpgradeModal(false)}
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
                {t('compareFeatures') || 'Comparer les fonctionnalités'}
              </Text>
              <TouchableOpacity
                style={tw.style(
                  'w-8 h-8 rounded-full items-center justify-center',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                )}
                onPress={() => setShowUpgradeModal(false)}
              >
                <Feather 
                  name="x" 
                  size={18} 
                  color={theme.name === 'dark' ? 'white' : 'black'} 
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={tw`mb-4`}>
                {/* Feature comparison table */}
                <View style={tw.style(
                  'rounded-xl p-4',
                  theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                )}>
                  <Text style={tw.style(
                    'font-bold text-base mb-3',
                    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {t('featureComparison') || 'Comparaison des fonctionnalités'}
                  </Text>
                  
                  {[
                    { feature: 'Trajets standards', basic: true, premium: true, pro: true },
                    { feature: 'Support client', basic: 'De base', premium: '24/7', pro: 'Dédié' },
                    { feature: 'Historique', basic: '30 jours', premium: 'Illimité', pro: 'Illimité' },
                    { feature: 'Réservations anticipées', basic: false, premium: true, pro: true },
                    { feature: 'Annulation gratuite', basic: false, premium: true, pro: true },
                    { feature: 'Véhicules premium', basic: false, premium: false, pro: true },
                    { feature: 'API personnalisée', basic: false, premium: false, pro: true },
                  ].map((item, index) => (
                    <View key={index} style={tw.style(
                      'flex-row items-center py-2 border-b border-opacity-20',
                      theme.name === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    )}>
                      <Text style={tw.style(
                        'flex-1 text-sm',
                        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        {item.feature}
                      </Text>
                      <View style={tw`flex-row justify-between w-48`}>
                        <View style={tw`w-16 items-center`}>
                          {typeof item.basic === 'boolean' ? (
                            <Feather 
                              name={item.basic ? "check" : "x"} 
                              size={16} 
                              color={item.basic ? "#10B981" : "#EF4444"} 
                            />
                          ) : (
                            <Text style={tw.style(
                              'text-xs',
                              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            )}>
                              {item.basic}
                            </Text>
                          )}
                        </View>
                        <View style={tw`w-16 items-center`}>
                          {typeof item.premium === 'boolean' ? (
                            <Feather 
                              name={item.premium ? "check" : "x"} 
                              size={16} 
                              color={item.premium ? "#10B981" : "#EF4444"} 
                            />
                          ) : (
                            <Text style={tw.style(
                              'text-xs',
                              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            )}>
                              {item.premium}
                            </Text>
                          )}
                        </View>
                        <View style={tw`w-16 items-center`}>
                          {typeof item.pro === 'boolean' ? (
                            <Feather 
                              name={item.pro ? "check" : "x"} 
                              size={16} 
                              color={item.pro ? "#10B981" : "#EF4444"} 
                            />
                          ) : (
                            <Text style={tw.style(
                              'text-xs',
                              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            )}>
                              {item.pro}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
                
                <View style={tw`flex-row justify-between mt-6`}>
                  <TouchableOpacity
                    style={tw`flex-1 bg-primary py-3 rounded-xl items-center mr-2`}
                    onPress={() => handleUpgrade('premium')}
                  >
                    <Text style={tw`text-white font-bold`}>
                      {t('upgradeToPremium') || 'Passer à Premium'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw.style(
                      'flex-1 py-3 rounded-xl items-center border-2 border-primary ml-2'
                    )}
                    onPress={() => handleUpgrade('pro')}
                  >
                    <Text style={tw`text-primary font-bold`}>
                      {t('upgradeToPro') || 'Passer à Pro'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}