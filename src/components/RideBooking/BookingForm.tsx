import React, { useState } from 'react';
import { ArrowUpDown, MapPin, Navigation } from 'lucide-react';
import { LocationInput } from './LocationInput';
import { VehicleSelection } from './VehicleSelection';
import { PaymentSelection } from './PaymentSelection';
import { Location, VehicleType, PaymentMethod } from '../../types';
import { useApp } from '../../context/AppContext';

export function BookingForm() {
  const { state } = useApp();
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    state.auth.user?.paymentMethods.find(pm => pm.isDefault) || null
  );
  const [isBooking, setIsBooking] = useState(false);

  const estimatedFare = selectedVehicle && pickupLocation && dropoffLocation
    ? selectedVehicle.baseFare + (Math.random() * 15) + 5 // Simple fare estimation
    : 0;

  const handleBookRide = async () => {
    if (!pickupLocation || !dropoffLocation || !selectedVehicle || !selectedPayment) {
      return;
    }

    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      // Reset form or navigate to ride tracking
    }, 2000);
  };

  const swapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  const canBookRide = pickupLocation && dropoffLocation && selectedVehicle && selectedPayment;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Where to?</h2>
        
        <div className="space-y-4">
          <LocationInput
            label="Pickup Location"
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Enter pickup location"
            icon={<Navigation className="h-5 w-5" />}
          />
          
          <div className="flex justify-center">
            <button
              onClick={swapLocations}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowUpDown className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <LocationInput
            label="Dropoff Location"
            value={dropoffLocation}
            onChange={setDropoffLocation}
            placeholder="Enter destination"
            icon={<MapPin className="h-5 w-5" />}
          />
        </div>
      </div>

      {pickupLocation && dropoffLocation && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <VehicleSelection
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
            estimatedFare={estimatedFare}
          />
        </div>
      )}

      {selectedVehicle && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <PaymentSelection
            paymentMethods={state.auth.user?.paymentMethods || []}
            selectedPayment={selectedPayment}
            onPaymentSelect={setSelectedPayment}
          />
        </div>
      )}

      {canBookRide && (
        <button
          onClick={handleBookRide}
          disabled={isBooking}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Booking your ride...</span>
            </div>
          ) : (
            `Book Ride • $${estimatedFare.toFixed(2)}`
          )}
        </button>
      )}
    </div>
  );
}