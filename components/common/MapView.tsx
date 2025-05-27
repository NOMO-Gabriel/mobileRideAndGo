// components/MapView.tsx
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

interface MapViewProps {
  origin?: string;
  destination?: string;
  onLocationSelect?: (location: { latitude: number; longitude: number; address: string }) => void;
  showRoute?: boolean;
  style?: any;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const CustomMapView: React.FC<MapViewProps> = ({
  origin,
  destination,
  onLocationSelect,
  showRoute = false,
  style,
  onRouteCalculated
}) => {
  const mapRef = useRef<MapView>(null);
  
  const [originCoords, setOriginCoords] = useState<Coordinate | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<Coordinate | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [selectingLocation, setSelectingLocation] = useState<'origin' | 'destination' | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 3.8480, // Yaoundé coordinates
    longitude: 11.5021,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Géocodage OpenStreetMap
  const geocodeAddress = async (address: string): Promise<Coordinate | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      return null;
    }
  };

  // Géocodage inverse
  const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.error('Erreur de géocodage inverse:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  // Calculer la distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Obtenir l'itinéraire
  const getRoute = async (start: Coordinate, end: Coordinate) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        setRouteCoordinates(coordinates);
        
        // Calculer distance et durée
        const distance = data.routes[0].distance / 1000; // Convertir en km
        const duration = data.routes[0].duration / 60; // Convertir en minutes
        
        if (onRouteCalculated) {
          onRouteCalculated(Math.round(distance * 10) / 10, Math.round(duration));
        }
        
        // Ajuster la vue pour inclure tout l'itinéraire
        if (mapRef.current) {
          mapRef.current.fitToCoordinates([start, end], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'itinéraire:', error);
      // Fallback: utiliser la distance à vol d'oiseau
      const distance = calculateDistance(start.latitude, start.longitude, end.latitude, end.longitude);
      const estimatedDuration = distance * 2;
      
      if (onRouteCalculated) {
        onRouteCalculated(Math.round(distance * 10) / 10, Math.round(estimatedDuration));
      }
    }
  };

  // Effects pour géocodage
  useEffect(() => {
    if (origin && origin.trim()) {
      geocodeAddress(origin).then(coords => {
        if (coords) {
          setOriginCoords(coords);
          setRegion(prev => ({ ...prev, ...coords }));
        }
      });
    }
  }, [origin]);

  useEffect(() => {
    if (destination && destination.trim()) {
      geocodeAddress(destination).then(coords => {
        if (coords) {
          setDestinationCoords(coords);
        }
      });
    }
  }, [destination]);

  useEffect(() => {
    if (originCoords && destinationCoords && showRoute) {
      getRoute(originCoords, destinationCoords);
    }
  }, [originCoords, destinationCoords, showRoute]);

  // Gestion du tap sur la carte
  const handleMapPress = async (event: any) => {
    if (onLocationSelect) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      const address = await reverseGeocode(latitude, longitude);
      onLocationSelect({ latitude, longitude, address });
    }
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        region={region}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard" // Utilise les cartes standards (similaire à OpenStreetMap)
      >
        {/* Marqueur origine */}
        {originCoords && (
          <Marker
            coordinate={originCoords}
            title="Départ"
            description={origin}
            pinColor="green"
          />
        )}
        
        {/* Marqueur destination */}
        {destinationCoords && (
          <Marker
            coordinate={destinationCoords}
            title="Arrivée"
            description={destination}
            pinColor="red"
          />
        )}
        
        {/* Itinéraire */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF8C00"
            strokeWidth={4}
            lineDashPattern={[1]}
          />
        )}
      </MapView>
      
      {/* Instructions d'utilisation */}
      {onLocationSelect && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Touchez la carte pour sélectionner un point
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden'
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
  instructionsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  }
});

export default CustomMapView;