import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { calculateDistance, calculateShippingFee } from '../utils/shipping';
import 'leaflet/dist/leaflet.css';

interface ShippingCalculatorProps {
  onAddressSelect: (address: string, fee: number) => void;
}

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onLocationSelect }: { onLocationSelect: (latLng: LatLng) => void }) {
  const map = useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });

  return null;
}

export default function ShippingCalculator({ onAddressSelect }: ShippingCalculatorProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isPickup, setIsPickup] = useState(false);

  const handleLocationSelect = async (latLng: LatLng) => {
    setLoading(true);
    setSelectedLocation(latLng);
    
    try {
      const distance = calculateDistance(latLng);
      const shippingFee = calculateShippingFee(distance);
      
      setDistance(distance);
      setFee(shippingFee);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latLng.lat}&lon=${latLng.lng}`
      );
      const data = await response.json();
      onAddressSelect(data.display_name, isPickup ? 0 : shippingFee);
    } catch (error) {
      console.error('Error calculating shipping:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryMethodChange = (pickup: boolean) => {
    setIsPickup(pickup);
    if (selectedLocation) {
      onAddressSelect(selectedLocation.toString(), pickup ? 0 : fee);
    }
  };

  return (
    <div className="bg-brown-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-brown-100">
        Delivery Options
      </h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleDeliveryMethodChange(false)}
          className={`flex-1 py-2 px-4 rounded-lg ${
            !isPickup ? 'bg-brown-600 text-white' : 'bg-brown-700 text-brown-300'
          }`}
        >
          Delivery
        </button>
        <button
          onClick={() => handleDeliveryMethodChange(true)}
          className={`flex-1 py-2 px-4 rounded-lg ${
            isPickup ? 'bg-brown-600 text-white' : 'bg-brown-700 text-brown-300'
          }`}
        >
          Pickup
        </button>
      </div>

      {isPickup ? (
        <div className="text-brown-200 p-4 bg-brown-700/50 rounded-lg">
          <h4 className="font-semibold mb-2">Pickup Location</h4>
          <p>HMD ARTILER Store</p>
          <p>123 Fashion Avenue</p>
          <p>Lagos, Nigeria</p>
          <p className="mt-2 text-brown-300">Available: Mon-Sat, 9AM-8PM</p>
        </div>
      ) : (
        <>
          <div className="h-[300px] rounded-lg overflow-hidden mb-4">
            <MapContainer
              center={[6.609511, 3.324692]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <LocationMarker onLocationSelect={handleLocationSelect} />
              {selectedLocation && (
                <Marker position={selectedLocation} icon={defaultIcon} />
              )}
            </MapContainer>
          </div>

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between text-brown-200">
                <span>Distance:</span>
                <span>{distance.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between text-brown-200">
                <span>Base Rate:</span>
                <span>₦3,000</span>
              </div>
              {distance > 5 && (
                <div className="flex justify-between text-brown-200">
                  <span>Additional Distance Fee:</span>
                  <span>₦{((distance - 5) * 500).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-semibold text-brown-100 border-t border-brown-700 pt-4">
                <span>Total Shipping Fee:</span>
                <span>₦{fee.toFixed(2)}</span>
              </div>
              <p className="text-brown-300 text-sm">
                Estimated delivery time: {Math.ceil(distance / 10)} hour(s)
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}