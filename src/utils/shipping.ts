import { LatLng } from 'leaflet';

const STORE_LOCATION: LatLng = new LatLng(6.609511, 3.324692); // Lagos location
const BASE_RATE = 3000; // Base rate in Naira for distances within 5km
const RATE_PER_KM = 500; // Rate per kilometer in Naira

export function calculateDistance(customerLocation: LatLng): number {
  return customerLocation.distanceTo(STORE_LOCATION) / 1000; // Convert to kilometers
}

export function calculateShippingFee(distance: number): number {
  if (distance <= 5) {
    return BASE_RATE;
  }
  return BASE_RATE + (Math.ceil(distance - 5) * RATE_PER_KM);
}

export function getEstimatedDeliveryTime(distance: number): string {
  const hours = Math.ceil(distance / 10); // Assuming 10km/hour average speed
  return hours === 1 ? '1 hour' : `${hours} hours`;
}