// components/layout/Header.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeSwitcher } from '../components/common/ThemeSwitcher';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';

type Props = {
  title?: string;
  showBack?: boolean;
  transparent?: boolean;
};

export default function Header({ title, showBack = false, transparent = false }: Props) {
  const { theme } = useTheme(); // Only destructure theme
  const { t } = useTranslation();
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <>
      <View
        style={[
          styles.header,
          { backgroundColor: transparent ? 'transparent' : theme.background }, // Use theme.background
        ]}
      >
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
          )}
          {title && (
            <Text style={[styles.title, { color: theme.text }]}>
              {title}
            </Text>
          )}
        </View>
        
        <View style={styles.rightSection}>
          {/* Bouton de recherche */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={24} color={theme.text} />
          </TouchableOpacity>
          
          {/* Bouton de profil utilisateur */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle" size={24} color={theme.text} />
          </TouchableOpacity>
          
          {/* Bouton de paramètres */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Modal pour les paramètres (thème et langue) */}
      <Modal
        visible={showSettings}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowSettings(false)}
        >
          <View 
            style={[
              styles.settingsContainer, 
              { backgroundColor: theme.background }
            ]}
          >
            <View style={styles.settingsHeader}>
              <Text style={[styles.settingsTitle, { color: theme.text }]}>
                {t('common:settings')}
              </Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('common:language')}
              </Text>
              <LanguageSwitcher />
            </View>
            
            <View style={styles.settingsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {t('common:darkMode')}
              </Text>
              <ThemeSwitcher />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginRight: 12,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  settingsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
});