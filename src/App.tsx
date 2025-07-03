import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { BookingForm } from './components/RideBooking/BookingForm';
import { RideTracker } from './components/RideTracking/RideTracker';
import { TripHistory } from './components/TripHistory/TripHistory';
import { PaymentManagement } from './components/Payment/PaymentManagement';
import { UserProfile } from './components/Profile/UserProfile';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!state.auth.isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <BookingForm />;
      case 'current-ride':
        return <RideTracker />;
      case 'history':
        return <TripHistory />;
      case 'payment':
        return <PaymentManagement />;
      case 'profile':
        return <UserProfile />;
      default:
        return <BookingForm />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Book a Ride';
      case 'current-ride':
        return 'Current Ride';
      case 'history':
        return 'Trip History';
      case 'payment':
        return 'Payment';
      case 'profile':
        return 'Profile';
      default:
        return 'RideXpress';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col">
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            title={getPageTitle()}
          />
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;