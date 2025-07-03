// Mock data for development and testing
import { User, VehicleType, Driver, Ride, PaymentMethod, Location } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  rating: 4.8,
  totalRides: 127,
  memberSince: '2022-01-15',
  paymentMethods: [
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      brand: 'visa',
      isDefault: true,
      name: 'Visa ending in 4242'
    },
    {
      id: '2',
      type: 'digital_wallet',
      isDefault: false,
      name: 'PayPal'
    }
  ]
};

export const mockVehicleTypes: VehicleType[] = [
  {
    id: '1',
    name: 'RideXpress',
    description: 'Affordable everyday rides',
    baseFare: 2.50,
    perKmRate: 1.20,
    perMinuteRate: 0.25,
    capacity: 4,
    icon: 'car',
    estimatedArrival: 5
  },
  {
    id: '2',
    name: 'RideXpress Premium',
    description: 'Premium vehicles with extra comfort',
    baseFare: 5.00,
    perKmRate: 2.00,
    perMinuteRate: 0.45,
    capacity: 4,
    icon: 'car',
    estimatedArrival: 3
  },
  {
    id: '3',
    name: 'RideXpress XL',
    description: 'Extra space for groups',
    baseFare: 4.00,
    perKmRate: 1.75,
    perMinuteRate: 0.35,
    capacity: 6,
    icon: 'truck',
    estimatedArrival: 7
  }
];

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    rating: 4.9,
    totalRides: 1250,
    phone: '+1234567891',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      color: 'Silver',
      licensePlate: 'ABC123'
    },
    location: {
      id: '1',
      address: 'Downtown Area',
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  {
    id: '2',
    name: 'Sarah Williams',
    rating: 4.8,
    totalRides: 890,
    phone: '+1234567892',
    photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    vehicle: {
      make: 'Honda',
      model: 'Accord',
      year: 2019,
      color: 'Blue',
      licensePlate: 'XYZ789'
    },
    location: {
      id: '2',
      address: 'Midtown',
      latitude: 40.7589,
      longitude: -73.9851
    }
  }
];

export const mockLocations: Location[] = [
  {
    id: '1',
    address: '123 Main Street, New York, NY 10001',
    latitude: 40.7128,
    longitude: -74.0060,
    placeId: 'place_1'
  },
  {
    id: '2',
    address: '456 Broadway, New York, NY 10013',
    latitude: 40.7205,
    longitude: -74.0052,
    placeId: 'place_2'
  },
  {
    id: '3',
    address: '789 Fifth Avenue, New York, NY 10022',
    latitude: 40.7614,
    longitude: -73.9776,
    placeId: 'place_3'
  }
];

export const mockRideHistory: Ride[] = [
  {
    id: '1',
    userId: '1',
    driverId: '1',
    pickupLocation: mockLocations[0],
    dropoffLocation: mockLocations[1],
    vehicleType: mockVehicleTypes[0],
    status: 'completed',
    fare: {
      baseFare: 2.50,
      distanceFare: 8.40,
      timeFare: 3.75,
      total: 14.65,
      currency: 'USD'
    },
    estimatedDuration: 15,
    actualDuration: 18,
    distance: 7.2,
    requestedAt: '2024-01-15T14:30:00Z',
    completedAt: '2024-01-15T14:48:00Z',
    driver: mockDrivers[0],
    paymentMethod: mockUser.paymentMethods[0]
  },
  {
    id: '2',
    userId: '1',
    driverId: '2',
    pickupLocation: mockLocations[2],
    dropoffLocation: mockLocations[0],
    vehicleType: mockVehicleTypes[1],
    status: 'completed',
    fare: {
      baseFare: 5.00,
      distanceFare: 12.00,
      timeFare: 6.75,
      total: 23.75,
      currency: 'USD'
    },
    estimatedDuration: 20,
    actualDuration: 22,
    distance: 6.8,
    requestedAt: '2024-01-14T09:15:00Z',
    completedAt: '2024-01-14T09:37:00Z',
    driver: mockDrivers[1],
    paymentMethod: mockUser.paymentMethods[0]
  }
];