# API Integration Documentation

## Overview
This document outlines the API integration for the RideXpress application, including endpoint specifications, request/response formats, and error handling.

## Base Configuration

### Environment URLs
```typescript
// Development
const API_BASE_URL = 'https://api-dev.ridexpress.com/v1';

// Staging  
const API_BASE_URL = 'https://api-staging.ridexpress.com/v1';

// Production
const API_BASE_URL = 'https://api.ridexpress.com/v1';
```

### Authentication
All API requests require authentication via Bearer token:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Endpoint Specifications

### Authentication Endpoints

#### POST /auth/login
Login user with email and password.

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    profilePicture?: string;
    rating: number;
    totalRides: number;
    memberSince: string;
  };
  token: string;
  expiresAt: string;
}
```

#### POST /auth/logout
Logout current user and invalidate token.

**Request:** No body required

**Response:** 
```typescript
{
  message: string;
}
```

### User Management Endpoints

#### GET /users/{id}
Get user profile information.

**Response:**
```typescript
{
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
```

#### PUT /users/{id}
Update user profile information.

**Request:**
```typescript
{
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
}
```

### Ride Management Endpoints

#### POST /rides/book
Book a new ride.

**Request:**
```typescript
{
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropoffLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  vehicleTypeId: string;
  paymentMethodId: string;
  notes?: string;
}
```

**Response:**
```typescript
{
  ride: {
    id: string;
    userId: string;
    pickupLocation: Location;
    dropoffLocation: Location;
    vehicleType: VehicleType;
    status: 'requested';
    fare: {
      baseFare: number;
      distanceFare: number;
      timeFare: number;
      total: number;
      currency: string;
    };
    estimatedDuration: number;
    distance: number;
    requestedAt: string;
    paymentMethod: PaymentMethod;
  };
}
```

#### GET /rides/{id}
Get ride details by ID.

**Response:**
```typescript
{
  ride: {
    id: string;
    userId: string;
    driverId?: string;
    pickupLocation: Location;
    dropoffLocation: Location;
    vehicleType: VehicleType;
    status: 'requested' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
    fare: FareDetails;
    estimatedDuration: number;
    actualDuration?: number;
    distance: number;
    requestedAt: string;
    completedAt?: string;
    driver?: Driver;
    paymentMethod: PaymentMethod;
  };
}
```

#### PUT /rides/{id}/cancel
Cancel a ride.

**Request:**
```typescript
{
  reason?: string;
}
```

**Response:**
```typescript
{
  ride: {
    id: string;
    status: 'cancelled';
    cancelledAt: string;
    cancellationReason?: string;
  };
}
```

#### GET /rides/history
Get user's ride history.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `status`: 'all' | 'completed' | 'cancelled' (default: 'all')

**Response:**
```typescript
{
  rides: Ride[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalRides: number;
    totalSpent: number;
    averageRating: number;
  };
}
```

### Vehicle Type Endpoints

#### GET /vehicle-types
Get available vehicle types.

**Response:**
```typescript
{
  vehicleTypes: [{
    id: string;
    name: string;
    description: string;
    baseFare: number;
    perKmRate: number;
    perMinuteRate: number;
    capacity: number;
    icon: string;
    estimatedArrival: number;
    available: boolean;
  }];
}
```

### Payment Endpoints

#### GET /payments/methods
Get user's payment methods.

**Response:**
```typescript
{
  paymentMethods: [{
    id: string;
    type: 'credit_card' | 'debit_card' | 'digital_wallet' | 'cash';
    last4?: string;
    brand?: string;
    isDefault: boolean;
    name: string;
    expiryMonth?: number;
    expiryYear?: number;
  }];
}
```

#### POST /payments/methods
Add a new payment method.

**Request:**
```typescript
{
  type: 'credit_card' | 'debit_card';
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  cardholderName: string;
  isDefault?: boolean;
}
```

#### DELETE /payments/methods/{id}
Remove a payment method.

**Response:**
```typescript
{
  message: string;
}
```

### Location Services Endpoints

#### GET /locations/search
Search for locations.

**Query Parameters:**
- `query`: string (required)
- `latitude`: number (optional)
- `longitude`: number (optional)
- `radius`: number (optional, in km)

**Response:**
```typescript
{
  locations: [{
    id: string;
    address: string;
    latitude: number;
    longitude: number;
    placeId: string;
    type: 'address' | 'poi' | 'business';
  }];
}
```

#### POST /locations/geocode
Geocode an address.

**Request:**
```typescript
{
  address: string;
}
```

**Response:**
```typescript
{
  location: {
    address: string;
    latitude: number;
    longitude: number;
    placeId: string;
  };
}
```

## WebSocket Integration

### Real-time Ride Updates
Connect to WebSocket for real-time ride updates:

```typescript
const ws = new WebSocket(`wss://api.ridexpress.com/v1/rides/${rideId}/track`);

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Handle ride status updates
};
```

**Message Format:**
```typescript
{
  type: 'status_update' | 'driver_location' | 'eta_update';
  rideId: string;
  data: {
    status?: RideStatus;
    driverLocation?: {
      latitude: number;
      longitude: number;
    };
    estimatedArrival?: number;
    driver?: Driver;
  };
  timestamp: string;
}
```

## Error Handling

### Standard Error Response
```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  requestId: string;
}
```

### Error Codes
- `UNAUTHORIZED`: Invalid or expired token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal server error

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `429`: Rate Limited
- `500`: Internal Server Error

## Implementation Example

```typescript
// API Service Class
class RideXpressAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  async login(email: string, password: string) {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async bookRide(request: RideRequest) {
    return this.request<BookRideResponse>('/rides/book', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getRideHistory(page = 1, limit = 20) {
    return this.request<RideHistoryResponse>(
      `/rides/history?page=${page}&limit=${limit}`
    );
  }
}
```

## Testing

### Mock API Responses
The application includes comprehensive mock data that mirrors the API structure. This enables full functionality testing without requiring a live API connection.

### Environment Switching
Use the environment configuration to switch between mock data and live API endpoints:

```typescript
const useRealAPI = getEnvironment().environment === 'production';
```

This documentation provides the complete API integration specification for the RideXpress application, enabling seamless connection to the backend services.