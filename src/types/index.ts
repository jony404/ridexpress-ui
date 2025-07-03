// Type definitions for RideXpress application
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  rating: number;
  totalRides: number;
  memberSince: string;
  paymentMethods: PaymentMethod[];
}

export interface Location {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

export interface VehicleType {
  id: string;
  name: string;
  description: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  capacity: number;
  icon: string;
  estimatedArrival: number;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  phone: string;
  photo: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  location: Location;
}

export interface Ride {
  id: string;
  userId: string;
  driverId?: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  vehicleType: VehicleType;
  status: 'requested' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  fare: {
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    total: number;
    currency: string;
  };
  estimatedDuration: number;
  actualDuration?: number;
  distance: number;
  requestedAt: string;
  completedAt?: string;
  driver?: Driver;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'digital_wallet' | 'cash';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  name: string;
}

export interface TripHistory {
  rides: Ride[];
  totalSpent: number;
  totalRides: number;
  averageRating: number;
}

export interface RideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  vehicleTypeId: string;
  paymentMethodId: string;
  notes?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AppState {
  auth: AuthState;
  currentRide: Ride | null;
  loading: boolean;
  error: string | null;
}