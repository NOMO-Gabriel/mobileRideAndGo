// app/(tabs)/dashboard/account.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

export default function AccountScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Mock user data
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    dateOfBirth: '15/03/1990',
    address: '123 Rue de la Paix, 75001 Paris',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop&crop=face',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    Alert.alert(
      t('success') || 'Succès',
      t('profileUpdated') || 'Votre profil a été mis à jour avec succès!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const InfoField = ({ 
    label, 
    value, 
    icon, 
    onChangeText,
    editable = true,
    keyboardType = 'default' as any
  }: {
    label: string;
    value: string;
    icon: keyof typeof Feather.glyphMap;
    onChangeText?: (text: string) => void;
    editable?: boolean;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
  }) => (
    <View style={tw`mb-4`}>
      <Text style={tw.style(
        'text-sm font-medium mb-2',
        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
      )}>
        {label}
      </Text>
      <View style={tw.style(
        'flex-row items-center px-4 py-3 rounded-xl border',
        theme.name === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200',
        isEditing && editable ? 'border-primary' : ''
      )}>
        <Feather 
          name={icon} 
          size={18} 
          color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
        />
        <TextInput
          style={tw.style(
            'flex-1 ml-3 text-base',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}
          value={value}
          onChangeText={onChangeText}
          editable={isEditing && editable}
          keyboardType={keyboardType}
          placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={tw.style(
      'flex-1 px-5',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Profile Picture Section */}
      <View style={tw`items-center py-8`}>
        <View style={tw`relative`}>
          <Image
            source={{ uri: userInfo.avatar }}
            style={tw.style(
              'w-32 h-32 rounded-3xl',
              theme.name === 'dark' ? 'border-4 border-gray-700' : 'border-4 border-white'
            )}
          />
          {isEditing && (
            <TouchableOpacity
              style={tw.style(
                'absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full items-center justify-center border-4',
                theme.name === 'dark' ? 'border-gray-900' : 'border-white'
              )}
            >
              <Feather name="camera" size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={tw.style(
          'text-2xl font-bold mt-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {userInfo.name}
        </Text>
        <Text style={tw.style(
          'text-base mt-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}>
          {t('member') || 'Membre'} • {t('verified') || 'Vérifié'}
        </Text>
      </View>

      {/* Personal Information */}
      <View style={tw.style(
        'rounded-2xl p-5 mb-6',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw.style(
            'text-lg font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('personalInfo') || 'Informations personnelles'}
          </Text>
          <TouchableOpacity
            style={tw.style(
              'flex-row items-center px-3 py-2 rounded-xl',
              isEditing 
                ? 'bg-green-100' 
                : theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            )}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Feather 
              name={isEditing ? "check" : "edit-2"} 
              size={16} 
              color={isEditing ? '#10B981' : theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
            />
            <Text style={tw.style(
              'ml-2 font-medium text-sm',
              isEditing 
                ? 'text-green-600' 
                : theme.name === 'dark' ? 'text-primary' : 'text-gray-800'
            )}>
              {isEditing ? t('save') || 'Sauvegarder' : t('edit') || 'Modifier'}
            </Text>
          </TouchableOpacity>
        </View>

        <InfoField
          label={t('fullName') || 'Nom complet'}
          value={userInfo.name}
          icon="user"
          onChangeText={(text) => setUserInfo({...userInfo, name: text})}
        />

        <InfoField
          label={t('email') || 'Adresse e-mail'}
          value={userInfo.email}
          icon="mail"
          keyboardType="email-address"
          onChangeText={(text) => setUserInfo({...userInfo, email: text})}
        />

        <InfoField
          label={t('phone') || 'Téléphone'}
          value={userInfo.phone}
          icon="phone"
          keyboardType="phone-pad"
          onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
        />

        <InfoField
          label={t('dateOfBirth') || 'Date de naissance'}
          value={userInfo.dateOfBirth}
          icon="calendar"
          onChangeText={(text) => setUserInfo({...userInfo, dateOfBirth: text})}
        />

        <InfoField
          label={t('address') || 'Adresse'}
          value={userInfo.address}
          icon="map-pin"
          onChangeText={(text) => setUserInfo({...userInfo, address: text})}
        />
      </View>

      {/* Statistics */}
      <View style={tw.style(
        'rounded-2xl p-5 mb-6',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <Text style={tw.style(
          'text-lg font-bold mb-4',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('statistics') || 'Statistiques'}
        </Text>

        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>47</Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              {t('ridesCompleted') || 'Trajets effectués'}
            </Text>
          </View>
          
          <View style={tw.style(
            'w-px mx-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          )} />
          
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>4.9</Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              {t('rating') || 'Note moyenne'}
            </Text>
          </View>
          
          <View style={tw.style(
            'w-px mx-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          )} />
          
          <View style={tw`items-center flex-1`}>
            <Text style={tw`text-primary text-2xl font-bold`}>2</Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              {t('yearsActive') || 'Années d\'activité'}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View style={tw.style(
        'rounded-2xl overflow-hidden mb-8',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <TouchableOpacity
          style={tw.style(
            'flex-row items-center px-5 py-4 border-b',
            theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
          )}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        >
          <View style={tw`w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4`}>
            <Feather name="key" size={20} color="#3B82F6" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw.style(
              'text-base font-medium',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('changePassword') || 'Changer le mot de passe'}
            </Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {t('updatePassword') || 'Mettre à jour votre mot de passe'}
            </Text>
          </View>
          <Feather 
            name="chevron-right" 
            size={20} 
            color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw.style(
            'flex-row items-center px-5 py-4 border-b',
            theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'
          )}
          onPress={() => Alert.alert(t('info') || 'Info', t('featureComingSoon') || 'Fonctionnalité à venir')}
        >
          <View style={tw`w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4`}>
            <Feather name="shield" size={20} color="#10B981" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw.style(
              'text-base font-medium',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('twoFactorAuth') || 'Authentification à deux facteurs'}
            </Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {t('enableTwoFactor') || 'Sécuriser votre compte'}
            </Text>
          </View>
          <View style={tw`bg-red-100 px-2 py-1 rounded-full`}>
            <Text style={tw`text-red-600 text-xs font-medium`}>
              {t('disabled') || 'Désactivé'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center px-5 py-4`}
          onPress={() => Alert.alert(
            t('deleteAccount') || 'Supprimer le compte',
            t('deleteAccountWarning') || 'Cette action est irréversible. Êtes-vous sûr?',
            [
              { text: t('cancel') || 'Annuler', style: 'cancel' },
              { text: t('delete') || 'Supprimer', style: 'destructive' }
            ]
          )}
        >
          <View style={tw`w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4`}>
            <Feather name="trash-2" size={20} color="#EF4444" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-medium text-red-500`}>
              {t('deleteAccount') || 'Supprimer le compte'}
            </Text>
            <Text style={tw.style(
              'text-sm mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {t('permanentAction') || 'Action permanente et irréversible'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}