
// components/DynamicMapComponent.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface MapComponentProps {
  origin?: string;
  destination?: string;
  onLocationSelect?: (location: { latitude: number; longitude: number; address: string }) => void;
  showRoute?: boolean;
  height?: string;
  className?: string;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const DynamicMapComponent: React.FC<MapComponentProps> = ({
  origin,
  destination,
  onLocationSelect,
  showRoute = false,
  height = '300px',
  className = '',
  onRouteCalculated
}) => {
  const [mapComponents, setMapComponents] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originCoords, setOriginCoords] = useState<Coordinate | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<Coordinate | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);

  // Coordonnées par défaut (Yaoundé, Cameroun)
  const defaultCenter = [3.8480, 11.5021];

  // Charger les bibliothèques côté client uniquement
  useEffect(() => {
    const loadMapLibraries = async () => {
      try {
        // Charger le CSS Leaflet
        const existingLink = document.querySelector('link[href*="leaflet"]');
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        // Attendre que le CSS soit chargé
        await new Promise(resolve => setTimeout(resolve, 100));

        // Charger les modules dynamiquement
        const [leafletModule, reactLeafletModule] = await Promise.all([
          import('leaflet'),
          import('react-leaflet')
        ]);

        const L = leafletModule.default;

        // Fix des icônes Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Créer les icônes colorées
        const greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        const redIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Sauvegarder tous les composants
        setMapComponents({
          ...reactLeafletModule,
          greenIcon,
          redIcon,
          L
        });
        setIsLoaded(true);
      } catch (err) {
        console.error('Erreur lors du chargement des bibliothèques de carte:', err);
        setError('Impossible de charger la carte');
      }
    };

    // Charger seulement côté client
    if (typeof window !== 'undefined') {
      loadMapLibraries();
    }
  }, []);

  // Géocodage
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
    const R = 6371;
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
        const coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => [
          coord[1], // latitude
          coord[0]  // longitude
        ]);
        setRouteCoordinates(coordinates);
        
        const distance = data.routes[0].distance / 1000;
        const duration = data.routes[0].duration / 60;
        
        if (onRouteCalculated) {
          onRouteCalculated(Math.round(distance * 10) / 10, Math.round(duration));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'itinéraire:', error);
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
        if (coords) setOriginCoords(coords);
      });
    }
  }, [origin]);

  useEffect(() => {
    if (destination && destination.trim()) {
      geocodeAddress(destination).then(coords => {
        if (coords) setDestinationCoords(coords);
      });
    }
  }, [destination]);

  useEffect(() => {
    if (originCoords && destinationCoords && showRoute) {
      getRoute(originCoords, destinationCoords);
    }
  }, [originCoords, destinationCoords, showRoute]);

  // Calculer le centre
  const getMapCenter = () => {
    if (originCoords && destinationCoords) {
      return [
        (originCoords.latitude + destinationCoords.latitude) / 2,
        (originCoords.longitude + destinationCoords.longitude) / 2
      ];
    }
    if (originCoords) return [originCoords.latitude, originCoords.longitude];
    if (destinationCoords) return [destinationCoords.latitude, destinationCoords.longitude];
    return defaultCenter;
  };

  // Composant pour gérer les clics
  const MapClickHandler = () => {
    if (!mapComponents) return null;
    
    const { useMapEvents } = mapComponents;
    
    useMapEvents({
      click: async (e: any) => {
        if (onLocationSelect) {
          const { lat, lng } = e.latlng;
          const address = await reverseGeocode(lat, lng);
          onLocationSelect({ latitude: lat, longitude: lng, address });
        }
      },
    });
    
    return null;
  };

  // États de chargement et d'erreur
  if (error) {
    return (
      <div 
        className={`bg-red-50 border border-red-200 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-red-600 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || !mapComponents) {
    return (
      <div 
        className={`bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-blue-700 font-medium">Chargement de la carte...</span>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline, greenIcon, redIcon } = mapComponents;

  return (
    <div className={`rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={getMapCenter()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler />
        
        {originCoords && (
          <Marker 
            position={[originCoords.latitude, originCoords.longitude]}
            icon={greenIcon}
          >
            <Popup>
              <div>
                <strong>Point de départ</strong>
                <br />
                {origin}
              </div>
            </Popup>
          </Marker>
        )}
        
        {destinationCoords && (
          <Marker 
            position={[destinationCoords.latitude, destinationCoords.longitude]}
            icon={redIcon}
          >
            <Popup>
              <div>
                <strong>Destination</strong>
                <br />
                {destination}
              </div>
            </Popup>
          </Marker>
        )}
        
        {routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="#FF8C00"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default DynamicMapComponent;