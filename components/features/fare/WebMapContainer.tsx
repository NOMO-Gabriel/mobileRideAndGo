// components/fare/WebMapContainer.tsx
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { MapContainer as Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface WebMapContainerProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  originCoords: LocationCoords | null;
  destinationCoords: LocationCoords | null;
  routeCoordinates: LocationCoords[];
}

const WebMapContainer: React.FC<WebMapContainerProps> = ({
  region,
  originCoords,
  destinationCoords,
  routeCoordinates
}) => {
  // Convertir les coordonnées pour Leaflet
  const center: [number, number] = [region.latitude, region.longitude];
  const zoom = Math.round(14 - Math.log2(region.latitudeDelta));

  // Convertir les coordonnées de route pour Leaflet
  const leafletRouteCoords: [number, number][] = routeCoordinates.map(coord => [
    coord.latitude,
    coord.longitude
  ]);

  return (
    <Map
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Marqueur de départ */}
      {originCoords && (
        <Marker position={[originCoords.latitude, originCoords.longitude]}>
          <Popup>
            <strong>Point de départ</strong>
          </Popup>
        </Marker>
      )}
      
      {/* Marqueur d'arrivée */}
      {destinationCoords && (
        <Marker position={[destinationCoords.latitude, destinationCoords.longitude]}>
          <Popup>
            <strong>Destination</strong>
          </Popup>
        </Marker>
      )}
      
      {/* Ligne de route */}
      {leafletRouteCoords.length > 0 && (
        <Polyline 
          positions={leafletRouteCoords}
          pathOptions={{ 
            color: '#FF8C00', 
            weight: 3,
            dashArray: '5, 10'
          }}
        />
      )}
    </Map>
  );
};

export default WebMapContainer;