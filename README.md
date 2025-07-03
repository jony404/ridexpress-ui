# RideXpress - Modern Ride Sharing Application

A comprehensive, production-ready ride-sharing web application built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **User Authentication**: Secure login system with session management
- **Ride Booking**: Interactive ride booking with location selection and vehicle options
- **Real-time Tracking**: Live ride status updates and driver tracking
- **Payment Integration**: Multiple payment methods and transaction history
- **Trip Management**: Comprehensive trip history and ride management
- **User Profile**: Complete profile management with statistics

### Technical Features
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Type Safety**: Full TypeScript implementation
- **State Management**: Context API for global state management
- **Environment Configuration**: Multi-environment support (dev/staging/prod)
- **Mock Data**: Comprehensive mock data for development and testing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Login
Use any email and password to access the demo application.

## Environment Configuration

The application supports multiple environments through configuration files:

### Development
```typescript
// Located in src/config/environments.ts
{
  apiBaseUrl: 'https://api-dev.ridexpress.com/v1',
  authEndpoint: 'https://auth-dev.ridexpress.com',
  environment: 'development'
}
```

### Staging
```typescript
{
  apiBaseUrl: 'https://api-staging.ridexpress.com/v1',
  authEndpoint: 'https://auth-staging.ridexpress.com',
  environment: 'staging'
}
```

### Production
```typescript
{
  apiBaseUrl: 'https://api.ridexpress.com/v1',
  authEndpoint: 'https://auth.ridexpress.com',
  environment: 'production'
}
```

## API Integration

The application is designed to integrate with the RideXpress Experience API. Key endpoints include:

- **Authentication**: `/auth/login`, `/auth/logout`
- **Ride Management**: `/rides`, `/rides/{id}`, `/rides/book`
- **User Management**: `/users/{id}`, `/users/{id}/profile`
- **Payment**: `/payments`, `/payments/methods`
- **Location Services**: `/locations/search`, `/locations/geocode`

## File Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Layout/          # Layout components (Header, Sidebar)
│   ├── RideBooking/     # Ride booking components
│   ├── RideTracking/    # Real-time tracking components
│   ├── TripHistory/     # Trip history components
│   ├── Payment/         # Payment management components
│   └── Profile/         # User profile components
├── context/             # React context providers
├── types/               # TypeScript type definitions
├── data/                # Mock data for development
├── config/              # Environment configuration
└── App.tsx              # Main application component
```

## Mock Data Structure

The application includes comprehensive mock data that follows the expected API structure:

### User Data
- User profiles with ratings and statistics
- Payment methods with different types
- Authentication state management

### Ride Data
- Vehicle types with pricing and availability
- Driver information with photos and ratings
- Trip history with detailed fare breakdowns
- Real-time ride status updates

### Location Data
- Predefined locations for testing
- Address formatting and display
- Geographic coordinates for mapping

## Features by Section

### Authentication
- Secure login form with validation
- Session persistence with localStorage
- Logout functionality with state cleanup

### Ride Booking
- Interactive location selection
- Vehicle type comparison
- Fare estimation
- Payment method selection
- Real-time booking status

### Ride Tracking
- Live ride status updates
- Driver information display
- Communication options (call/message)
- Trip details and fare information
- Cancellation options

### Trip History
- Filterable ride history
- Detailed trip information
- Spending analytics
- Rating and review system

### Payment Management
- Multiple payment methods
- Card addition and removal
- Transaction history
- Default payment selection

### User Profile
- Profile editing capabilities
- Ride statistics
- Account settings
- Photo upload (UI ready)

## Development Notes

### State Management
The application uses React Context API for global state management, handling:
- Authentication state
- Current ride information
- Loading states
- Error handling

### Error Handling
Comprehensive error handling includes:
- Network error handling
- Form validation
- Loading states
- User feedback

### Performance Optimizations
- Lazy loading for components
- Memoization for expensive calculations
- Optimized re-renders
- Image optimization

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables
Set the following environment variables for different environments:
- `VITE_APP_ENV`: Environment name (development/staging/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.