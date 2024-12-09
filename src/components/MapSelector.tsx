import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface MapSelectorProps {
  onAddressSelect: (address: string) => void;
}

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function LocationMarker({ onAddressSelect }: MapSelectorProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name;
        onAddressSelect(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

function MapController() {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default to Lagos, Nigeria if geolocation fails
        map.setView([6.5244, 3.3792], 13);
      }
    );
  }, [map]);

  return null;
}

export default function MapSelector({ onAddressSelect }: MapSelectorProps) {
  const defaultPosition: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onAddressSelect={onAddressSelect} />
        <MapController />
      </MapContainer>
    </div>
  );
}