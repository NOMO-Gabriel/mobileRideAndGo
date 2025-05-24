// components/ride/RideMapComponent.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const { width, height } = Dimensions.get('window');

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface RideMapComponentProps {
  startLocation?: Location;
  endLocation?: Location;
  onLocationSelect?: (location: Location, type: 'start' | 'end') => void;
  showRoute?: boolean;
}

const RideMapComponent: React.FC<RideMapComponentProps> = ({
  startLocation,
  endLocation,
  onLocationSelect,
  showRoute = false,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mapRegion, setMapRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectingLocation, setSelectingLocation] = useState<'start' | 'end' | null>(null);

  // Mock route coordinates (in real app, you'd get this from a routing service)
  const routeCoordinates = startLocation && endLocation ? [
    { latitude: startLocation.latitude, longitude: startLocation.longitude },
    { latitude: endLocation.latitude, longitude: endLocation.longitude },
  ] : [];

  const mapStyle = theme.name === 'dark' ? [
    {
      elementType: 'geometry',
      stylers: [{ color: '#1B263B' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#F9FAFB' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#1B263B' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#374151' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0F172A' }],
    },
  ] : [];

  const handleMapPress = (event: any) => {
    if (selectingLocation && onLocationSelect) {
      const coordinate = event.nativeEvent.coordinate;
      onLocationSelect(coordinate, selectingLocation);
      setSelectingLocation(null);
    }
  };

  const LocationButton = ({ type, location, onPress }: {
    type: 'start' | 'end';
    location?: Location;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center p-3 mx-4 mb-2 rounded-xl border',
        theme.name === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200',
        selectingLocation === type ? 'border-primary' : ''
      )}
      onPress={onPress}
    >
      <View style={tw.style(
        'w-3 h-3 rounded-full mr-3',
        type === 'start' ? 'bg-green-500' : 'bg-red-500'
      )} />
      <View style={tw`flex-1`}>
        <Text style={tw.style(
          'text-xs font-medium mb-1',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
        )}>
          {type === 'start' ? t('startingPoint') : t('destination')}
        </Text>
        <Text style={tw.style(
          'text-sm',
          theme.name === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          {location?.address || (selectingLocation === type ? t('selectOnMap') : t('tapToSelect'))}
        </Text>
      </View>
      <Feather
        name={selectingLocation === type ? 'check-circle' : 'map-pin'}
        size={18}
        color={selectingLocation === type ? '#FF8C00' : theme.name === 'dark' ? '#9CA3AF' : '#6B7280'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1`}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        onPress={handleMapPress}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {startLocation && (
          <Marker
            coordinate={{
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
            }}
            pinColor="#10B981"
            title={t('startingPoint')}
          />
        )}
        
        {endLocation && (
          <Marker
            coordinate={{
              latitude: endLocation.latitude,
              longitude: endLocation.longitude,
            }}
            pinColor="#EF4444"
            title={t('destination')}
          />
        )}

        {showRoute && routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF8C00"
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* Location Selection UI */}
      <View style={tw`absolute top-4 left-0 right-0`}>
        <LocationButton
          type="start"
          location={startLocation}
          onPress={() => setSelectingLocation(selectingLocation === 'start' ? null : 'start')}
        />
        <LocationButton
          type="end"
          location={endLocation}
          onPress={() => setSelectingLocation(selectingLocation === 'end' ? null : 'end')}
        />
      </View>

      {/* My Location Button */}
      <TouchableOpacity
        style={tw.style(
          'absolute bottom-6 right-4 w-12 h-12 rounded-full items-center justify-center shadow-lg',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}
        onPress={() => {
          // In real app, get user's current location
          Alert.alert(t('location'), t('gettingLocation'));
        }}
      >
        <Feather
          name="navigation"
          size={20}
          color={theme.name === 'dark' ? '#FFFFFF' : '#1B263B'}
        />
      </TouchableOpacity>

      {selectingLocation && (
        <View style={tw.style(
          'absolute bottom-20 left-4 right-4 p-4 rounded-xl',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        )}>
          <Text style={tw.style(
            'text-center font-medium',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {selectingLocation === 'start' ? t('selectStartPoint') : t('selectDestination')}
          </Text>
          <TouchableOpacity
            style={tw`bg-gray-500 rounded-lg py-2 mt-2`}
            onPress={() => setSelectingLocation(null)}
          >
            <Text style={tw`text-white text-center font-medium`}>
              {t('cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RideMapComponent;