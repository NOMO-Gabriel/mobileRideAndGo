// components/ride/RideBookingComponent.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface RideDetails {
  startLocation: Location;
  endLocation: Location;
  distance: number;
  estimatedDuration: number;
  estimatedPrice: number;
  proposedPrice?: number;
}

interface RideBookingComponentProps {
  onBookingConfirm: (rideDetails: RideDetails) => void;
}

const RideBookingComponent: React.FC<RideBookingComponentProps> = ({
  onBookingConfirm,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const [bookingMode, setBookingMode] = useState<'direct' | 'calculate'>('calculate');
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [proposedPrice, setProposedPrice] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);

  // Mock calculation function
  const calculatePrice = async () => {
    if (!startAddress.trim() || !endAddress.trim()) {
      Alert.alert(t('error'), t('pleaseEnterBothAddresses'));
      return;
    }

    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockDistance = Math.random() * 50 + 5; // 5-55 km
      const mockDuration = Math.random() * 60 + 15; // 15-75 minutes
      const basePrice = mockDistance * 0.8 + 5; // Base calculation
      const finalPrice = Math.round(basePrice * 100) / 100;
      
      setCalculatedPrice(finalPrice);
      
      const details: RideDetails = {
        startLocation: {
          latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
          longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
          address: startAddress,
        },
        endLocation: {
          latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
          longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
          address: endAddress,
        },
        distance: Math.round(mockDistance * 10) / 10,
        estimatedDuration: Math.round(mockDuration),
        estimatedPrice: finalPrice,
      };
      
      setRideDetails(details);
      setIsCalculating(false);
    }, 2000);
  };

  const handleDirectBooking = () => {
    if (!startAddress.trim() || !endAddress.trim() || !proposedPrice.trim()) {
      Alert.alert(t('error'), t('pleaseCompleteAllFields'));
      return;
    }

    const price = parseFloat(proposedPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert(t('error'), t('pleaseEnterValidPrice'));
      return;
    }

    const details: RideDetails = {
      startLocation: {
        latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
        longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
        address: startAddress,
      },
      endLocation: {
        latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
        longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
        address: endAddress,
      },
      distance: Math.random() * 50 + 5,
      estimatedDuration: Math.random() * 60 + 15,
      estimatedPrice: price,
      proposedPrice: price,
    };

    setRideDetails(details);
    setShowConfirmModal(true);
  };

  const handleCalculatedBooking = () => {
    if (rideDetails) {
      setShowConfirmModal(true);
    }
  };

  const confirmBooking = () => {
    if (rideDetails) {
      onBookingConfirm(rideDetails);
      setShowConfirmModal(false);
      // Reset form
      setStartAddress('');
      setEndAddress('');
      setProposedPrice('');
      setCalculatedPrice(null);
      setRideDetails(null);
    }
  };

  const ModeSelector = () => (
    <View style={tw.style(
      'flex-row mb-6 rounded-xl overflow-hidden',
      theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    )}>
      <TouchableOpacity
        style={tw.style(
          'flex-1 py-3 items-center',
          bookingMode === 'calculate' ? 'bg-primary' : 'bg-transparent'
        )}
        onPress={() => setBookingMode('calculate')}
      >
        <Text style={tw.style(
          'font-medium',
          bookingMode === 'calculate' 
            ? 'text-white' 
            : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
        )}>
          {t('calculatePrice')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={tw.style(
          'flex-1 py-3 items-center',
          bookingMode === 'direct' ? 'bg-primary' : 'bg-transparent'
        )}
        onPress={() => setBookingMode('direct')}
      >
        <Text style={tw.style(
          'font-medium',
          bookingMode === 'direct' 
            ? 'text-white' 
            : theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
        )}>
          {t('proposePrice')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const AddressInput = ({ 
    placeholder, 
    value, 
    onChangeText, 
    icon 
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    icon: string;
  }) => (
    <View style={tw.style(
      'flex-row items-center px-4 py-3 mb-3 rounded-xl border',
      theme.name === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
    )}>
      <Feather 
        name={icon as any} 
        size={18} 
        color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
      />
      <TextInput
        style={tw.style(
          'flex-1 ml-3 text-base',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}
        placeholder={placeholder}
        placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <View style={tw.style(
      'flex-1 p-5',
      theme.name === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'
    )}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw.style(
          'text-2xl font-bold mb-6',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {t('bookRide')}
        </Text>

        <ModeSelector />

        <AddressInput
          placeholder={t('startingPoint')}
          value={startAddress}
          onChangeText={setStartAddress}
          icon="map-pin"
        />

        <AddressInput
          placeholder={t('destination')}
          value={endAddress}
          onChangeText={setEndAddress}
          icon="navigation"
        />

        {bookingMode === 'direct' && (
          <View style={tw.style(
            'flex-row items-center px-4 py-3 mb-4 rounded-xl border',
            theme.name === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gray-50 border-gray-200'
          )}>
            <Feather 
              name="dollar-sign" 
              size={18} 
              color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
            <TextInput
              style={tw.style(
                'flex-1 ml-3 text-base',
                theme.name === 'dark' ? 'text-white' : 'text-gray-800'
              )}
              placeholder={t('proposedPrice')}
              placeholderTextColor={theme.name === 'dark' ? '#9CA3AF' : '#9CA3AF'}
              value={proposedPrice}
              onChangeText={setProposedPrice}
              keyboardType="numeric"
            />
            <Text style={tw.style(
              'text-base',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              €
            </Text>
          </View>
        )}

        {bookingMode === 'calculate' && (
          <TouchableOpacity
            style={tw.style(
              'py-4 rounded-xl mb-4 items-center',
              isCalculating ? 'bg-gray-400' : 'bg-secondary'
            )}
            onPress={calculatePrice}
            disabled={isCalculating}
          >
            <Text style={tw`text-white font-bold text-base`}>
              {isCalculating ? t('calculating') : t('calculatePrice')}
            </Text>
          </TouchableOpacity>
        )}

        {calculatedPrice !== null && (
          <View style={tw.style(
            'p-4 rounded-xl mb-4',
            theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
          )}>
            <Text style={tw.style(
              'text-lg font-bold text-center mb-2',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('estimatedPrice')}: {calculatedPrice}€
            </Text>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw.style(
                'text-sm',
                theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
              )}>
                {t('distance')}:
              </Text>
              <Text style={tw.style(
                'text-sm font-medium',
                theme.name === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                {rideDetails?.distance} km
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw.style(
                'text-sm',
                theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
              )}>
                {t('duration')}:
              </Text>
              <Text style={tw.style(
                'text-sm font-medium',
                theme.name === 'dark' ? 'text-white' : 'text-gray-800'
              )}>
                {rideDetails?.estimatedDuration} min
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={tw`bg-primary py-4 rounded-xl items-center`}
          onPress={bookingMode === 'direct' ? handleDirectBooking : handleCalculatedBooking}
          disabled={bookingMode === 'calculate' && calculatedPrice === null}
        >
          <Text style={tw`text-white font-bold text-base`}>
            {t('bookRide')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw.style(
            'rounded-t-3xl p-6',
            theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
          )}>
            <Text style={tw.style(
              'text-xl font-bold text-center mb-4',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {t('confirmBooking')}
            </Text>
            
            {rideDetails && (
              <View style={tw`mb-6`}>
                <View style={tw`flex-row items-center mb-3`}>
                  <View style={tw`w-3 h-3 bg-green-500 rounded-full mr-3`} />
                  <Text style={tw.style(
                    'flex-1 text-sm',
                    theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {rideDetails.startLocation.address}
                  </Text>
                </View>
                
                <View style={tw`flex-row items-center mb-3`}>
                  <View style={tw`w-3 h-3 bg-red-500 rounded-full mr-3`} />
                  <Text style={tw.style(
                    'flex-1 text-sm',
                    theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {rideDetails.endLocation.address}
                  </Text>
                </View>
                
                <View style={tw.style(
                  'bg-primary bg-opacity-10 p-3 rounded-xl',
                )}>
                  <Text style={tw.style(
                    'text-center text-lg font-bold',
                    'text-primary'
                  )}>
                    {rideDetails.estimatedPrice}€
                  </Text>
                </View>
              </View>
            )}
            
            <View style={tw`flex-row space-x-3`}>
              <TouchableOpacity
                style={tw.style(
                  'flex-1 py-3 rounded-xl items-center',
                  theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                )}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={tw.style(
                  'font-medium',
                  theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
                )}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={tw`flex-1 bg-primary py-3 rounded-xl items-center`}
                onPress={confirmBooking}
              >
                <Text style={tw`text-white font-bold`}>
                  {t('confirm')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RideBookingComponent;