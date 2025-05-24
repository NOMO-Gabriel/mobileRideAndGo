// components/fare/FareCalculator.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const { width, height } = Dimensions.get('window');

const FareCalculator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // States
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [calculatedFare, setCalculatedFare] = useState(0);
  const [proposedFare, setProposedFare] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  
  // Mock calculation function
  const calculateFare = async () => {
    if (!origin.trim() || !destination.trim()) {
      Alert.alert(
        t('error') || 'Erreur',
        t('fillAllFields') || 'Veuillez remplir tous les champs'
      );
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockDistance = Math.floor(Math.random() * 50) + 5;
      const mockDuration = Math.floor(mockDistance / 2) + 10;
      const baseFare = 3.50;
      const perKmRate = 1.25;
      const calculated = baseFare + (mockDistance * perKmRate);
      
      setDistance(mockDistance);
      setDuration(mockDuration);
      setCalculatedFare(calculated);
      setShowResults(true);
      setIsCalculating(false);
      
      // Animate results
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  };
  
  const handleProposeFare = () => {
    if (!proposedFare.trim()) {
      Alert.alert(
        t('error') || 'Erreur',
        t('enterProposedFare') || 'Veuillez entrer votre tarif proposé'
      );
      return;
    }
    
    Alert.alert(
      t('fareProposed') || 'Tarif proposé',
      t('fareProposedSuccess') || `Votre tarif de ${proposedFare}€ a été proposé avec succès!`,
      [{ text: 'OK', onPress: () => setShowProposeModal(false) }]
    );
    setProposedFare('');
  };
  
  const resetCalculation = () => {
    setOrigin('');
    setDestination('');
    setShowResults(false);
    setProposedFare('');
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
  };
  
  // Styles
  const containerStyle = tw.style(
    'flex-1 p-5',
    theme.name === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
  );
  
  const cardStyle = tw.style(
    'rounded-2xl p-5 mb-4 shadow-sm',
    theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
  );
  
  const inputStyle = tw.style(
    'flex-1 text-base px-4 py-3 rounded-xl border',
    theme.name === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-gray-50 border-gray-200 text-gray-800'
  );
  
  const textStyle = tw.style(
    'text-base',
    theme.name === 'dark' ? 'text-white' : 'text-gray-800'
  );
  
  const subtextStyle = tw.style(
    'text-sm',
    theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
  );

  return (
    <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`mb-6`}>
        <Text style={tw.style(
          'text-2xl font-bold mb-2',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('fareCalculator') || 'Calculateur de tarifs'}
        </Text>
        <Text style={subtextStyle}>
          {t('calculateFareDescription') || 'Calculez le tarif de votre trajet instantanément'}
        </Text>
      </View>
      
      {/* Map Placeholder */}
      <View style={[cardStyle, tw`h-48 mb-6 justify-center items-center`]}>
        <LinearGradient
          colors={theme.name === 'dark' ? ['#1B263B', '#263850'] : ['#FFE0B2', '#FFF3E0']}
          style={tw`absolute inset-0 rounded-2xl`}
        />
        <Feather 
          name="map" 
          size={48} 
          color={theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
        />
        <Text style={[textStyle, tw`mt-3 font-medium`]}>
          {t('interactiveMap') || 'Carte interactive'}
        </Text>
        <Text style={[subtextStyle, tw`text-center mt-1`]}>
          {t('mapDescription') || 'Sélectionnez vos points de départ et d\'arrivée'}
        </Text>
      </View>
      
      {/* Input Form */}
      <View style={cardStyle}>
        <Text style={[textStyle, tw`font-bold text-lg mb-4`]}>
          {t('tripDetails') || 'Détails du trajet'}
        </Text>
        
        {/* Origin Input */}
        <View style={tw`mb-4`}>
          <Text style={[textStyle, tw`font-medium mb-2`]}>
            {t('startingPoint') || 'Point de départ'}
          </Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-3 p-2 rounded-full bg-green-100`}>
              <Feather name="map-pin" size={16} color="#10B981" />
            </View>
            <TextInput
              style={inputStyle}
              value={origin}
              onChangeText={setOrigin}
              placeholder={t('enterStartingPoint') || 'Entrez votre point de départ'}
              placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'}
            />
          </View>
        </View>
        
        {/* Destination Input */}
        <View style={tw`mb-6`}>
          <Text style={[textStyle, tw`font-medium mb-2`]}>
            {t('destination') || 'Destination'}
          </Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-3 p-2 rounded-full bg-red-100`}>
              <Feather name="navigation" size={16} color="#EF4444" />
            </View>
            <TextInput
              style={inputStyle}
              value={destination}
              onChangeText={setDestination}
              placeholder={t('enterDestination') || 'Entrez votre destination'}
              placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'}
            />
          </View>
        </View>
        
        {/* Calculate Button */}
        <TouchableOpacity
          style={tw`rounded-xl overflow-hidden`}
          onPress={calculateFare}
          disabled={isCalculating}
        >
          <LinearGradient
            colors={['#FF8C00', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`py-4 items-center justify-center`}
          >
            {isCalculating ? (
              <View style={tw`flex-row items-center`}>
                <Feather name="loader" size={20} color="white" />
                <Text style={tw`text-white font-bold text-base ml-2`}>
                  {t('calculating') || 'Calcul en cours...'}
                </Text>
              </View>
            ) : (
              <View style={tw`flex-row items-center`}>
                <Feather name="calculator" size={20} color="white" />
                <Text style={tw`text-white font-bold text-base ml-2`}>
                  {t('calculateFare') || 'Calculer le tarif'}
                </Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      {/* Results */}
      {showResults && (
        <Animated.View
          style={[
            cardStyle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={[textStyle, tw`font-bold text-lg`]}>
              {t('fareEstimate') || 'Estimation du tarif'}
            </Text>
            <TouchableOpacity onPress={resetCalculation}>
              <Feather 
                name="refresh-cw" 
                size={20} 
                color={theme.name === 'dark' ? '#FF8C00' : '#1B263B'} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Trip Info */}
          <View style={tw`flex-row justify-between mb-4`}>
            <View style={tw`flex-1 mr-2`}>
              <View style={tw`flex-row items-center mb-1`}>
                <Feather name="navigation" size={16} color="#6B7280" />
                <Text style={[subtextStyle, tw`ml-2`]}>
                  {t('distance') || 'Distance'}
                </Text>
              </View>
              <Text style={[textStyle, tw`font-bold text-lg`]}>
                {distance} km
              </Text>
            </View>
            
            <View style={tw`flex-1 ml-2`}>
              <View style={tw`flex-row items-center mb-1`}>
                <Feather name="clock" size={16} color="#6B7280" />
                <Text style={[subtextStyle, tw`ml-2`]}>
                  {t('duration') || 'Durée'}
                </Text>
              </View>
              <Text style={[textStyle, tw`font-bold text-lg`]}>
                {duration} min
              </Text>
            </View>
          </View>
          
          {/* Calculated Fare */}
          <View style={tw.style(
            'p-4 rounded-xl mb-4',
            theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          )}>
            <Text style={[subtextStyle, tw`text-center mb-1`]}>
              {t('estimatedFare') || 'Tarif estimé'}
            </Text>
            <Text style={tw`text-center text-3xl font-bold text-primary`}>
              {calculatedFare.toFixed(2)}€
            </Text>
          </View>
          
          {/* Action Buttons */}
          <View style={tw`flex-row space-x-3`}>
            <TouchableOpacity
              style={tw.style(
                'flex-1 py-3 rounded-xl border-2 border-primary items-center',
                theme.name === 'dark' ? 'bg-transparent' : 'bg-transparent'
              )}
              onPress={() => setShowProposeModal(true)}
            >
              <Text style={tw`text-primary font-bold`}>
                {t('proposeFare') || 'Proposer mon tarif'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={tw`flex-1 py-3 rounded-xl bg-primary items-center`}
            >
              <Text style={tw`text-white font-bold`}>
                {t('bookNow') || 'Réserver'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      
      {/* Propose Fare Modal */}
      <Modal
        visible={showProposeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProposeModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw.style(
            'rounded-t-3xl p-6',
            theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
          )}>
            <View style={tw`flex-row items-center justify-between mb-6`}>
              <Text style={[textStyle, tw`font-bold text-xl`]}>
                {t('proposeFare') || 'Proposer mon tarif'}
              </Text>
              <TouchableOpacity onPress={() => setShowProposeModal(false)}>
                <Feather 
                  name="x" 
                  size={24} 
                  color={theme.name === 'dark' ? 'white' : '#1B263B'} 
                />
              </TouchableOpacity>
            </View>
            
            <Text style={[subtextStyle, tw`mb-4`]}>
              {t('proposeFareDescription') || 'Proposez votre propre tarif pour ce trajet'}
            </Text>
            
            <View style={tw`mb-6`}>
              <Text style={[textStyle, tw`font-medium mb-2`]}>
                {t('yourFare') || 'Votre tarif (€)'}
              </Text>
              <TextInput
                style={[inputStyle, tw`text-center text-2xl font-bold`]}
                value={proposedFare}
                onChangeText={setProposedFare}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'}
              />
            </View>
            
            <TouchableOpacity
              style={tw`bg-primary py-4 rounded-xl items-center`}
              onPress={handleProposeFare}
            >
              <Text style={tw`text-white font-bold text-base`}>
                {t('confirmProposal') || 'Confirmer la proposition'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FareCalculator;