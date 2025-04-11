// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  // Pour les exemples
  const recentRides = [
    { id: 1, from: 'Université', to: 'Centre-ville', date: '2025-04-08', price: '15€' },
    { id: 2, from: 'Aéroport', to: 'Hôtel Luxor', date: '2025-04-05', price: '35€' },
  ];
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Bannière d'accueil */}
      <View style={[styles.banner, { backgroundColor: colors.primary }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>{t('welcome')}</Text>
          <Text style={styles.bannerSubtitle}>{t('homeSubtitle')}</Text>
          <Button 
            label={t('bookRide')} 
            onPress={() => {}} 
            variant="secondary" 
            icon="car"
          />
        </View>
        <Image 
          source={require('@/assets/images/taxi-icon.png')} 
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Services rapides */}
      <View style={styles.quickServices}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('quickServices')}
        </Text>
        <View style={styles.serviceGrid}>
          <View style={styles.serviceRow}>
            <QuickServiceButton 
              icon="car" 
              label={t('requestRide')} 
              onPress={() => {}} 
            />
            <QuickServiceButton 
              icon="calculator" 
              label={t('estimateFare')} 
              onPress={() => {}} 
            />
          </View>
          <View style={styles.serviceRow}>
            <QuickServiceButton 
              icon="time" 
              label={t('scheduleRide')} 
              onPress={() => {}} 
            />
            <QuickServiceButton 
              icon="gift" 
              label={t('promos')} 
              onPress={() => {}} 
            />
          </View>
        </View>
      </View>
      
      {/* Derniers trajets */}
      <Card title={t('recentRides')} icon="time" rightIcon="chevron-forward">
        {recentRides.map(ride => (
          <View key={ride.id} style={[styles.rideItem, { borderBottomColor: colors.border }]}>
            <Ionicons name="map" size={18} color={colors.primary} style={styles.rideIcon} />
            <View style={styles.rideDetails}>
              <Text style={[styles.rideRoute, { color: colors.text }]}>
                {ride.from} → {ride.to}
              </Text>
              <Text style={[styles.rideDate, { color: colors.text + 'CC' }]}>
                {ride.date}
              </Text>
            </View>
            <Text style={[styles.ridePrice, { color: colors.primary }]}>
              {ride.price}
            </Text>
          </View>
        ))}
        <Button 
          label={t('viewAllRides')} 
          onPress={() => {}} 
          variant="outline" 
          size="small" 
          fullWidth
        />
      </Card>
      
      {/* Promotions */}
      <Card 
        title={t('specialOffers')} 
        icon="gift" 
        elevated
        style={{ backgroundColor: colors.card }}
      >
        <View style={[styles.promoCard, { backgroundColor: colors.secondary }]}>
          <Text style={styles.promoTitle}>{t('discount20')}</Text>
          <Text style={styles.promoDescription}>{t('discountDesc')}</Text>
          <Button 
            label={t('usePromo')} 
            onPress={() => {}} 
            variant="primary" 
            size="small" 
          />
        </View>
      </Card>
    </ScrollView>
  );
}

// Composant pour les boutons de service rapide
function QuickServiceButton({ icon, label, onPress }) {
  const { colors } = useTheme();
  
  return (
    <Button
      label={label}
      onPress={onPress}
      variant="outline"
      icon={icon}
      style={[
        styles.serviceButton,
        { backgroundColor: colors.card, borderColor: colors.border }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  banner: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  bannerContent: {
    flex: 2,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.9,
  },
  bannerImage: {
    flex: 1,
    height: 120,
  },
  quickServices: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  serviceGrid: {
    flex: 1,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceButton: {
    width: '48%',
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rideIcon: {
    marginRight: 12,
  },
  rideDetails: {
    flex: 1,
  },
  rideRoute: {
    fontSize: 16,
    fontWeight: '500',
  },
  rideDate: {
    fontSize: 14,
    marginTop: 4,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoCard: {
    borderRadius: 12,
    padding: 16,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promoDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
});