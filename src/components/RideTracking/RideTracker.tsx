import React, { useState, useEffect } from 'react';
import { Car, Clock, MapPin, Phone, MessageCircle, Star, User } from 'lucide-react';
import { Driver } from '../../types';
import { mockDrivers } from '../../data/mockData';

export function RideTracker() {
  const [currentDriver] = useState<Driver>(mockDrivers[0]);
  const [rideStatus, setRideStatus] = useState<'searching' | 'accepted' | 'arriving' | 'in_progress'>('searching');
  const [estimatedArrival, setEstimatedArrival] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rideStatus === 'searching') {
        setRideStatus('accepted');
      } else if (rideStatus === 'accepted') {
        setRideStatus('arriving');
      } else if (rideStatus === 'arriving') {
        if (estimatedArrival > 0) {
          setEstimatedArrival(prev => prev - 1);
        } else {
          setRideStatus('in_progress');
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [rideStatus, estimatedArrival]);

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'searching':
        return 'Finding your driver...';
      case 'accepted':
        return 'Driver accepted your ride';
      case 'arriving':
        return `Driver is ${estimatedArrival} minutes away`;
      case 'in_progress':
        return 'You\'re on your way!';
      default:
        return 'Booking your ride...';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'searching':
        return 'text-yellow-600';
      case 'accepted':
        return 'text-green-600';
      case 'arriving':
        return 'text-blue-600';
      case 'in_progress':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-64 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Interactive map would be displayed here</p>
          <p className="text-sm text-gray-500">Real-time driver location and route</p>
        </div>
      </div>

      {/* Status card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-lg font-semibold ${getStatusColor()}`}>
              {getStatusMessage()}
            </h2>
            {rideStatus === 'searching' && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-600">This usually takes 30-60 seconds</span>
              </div>
            )}
          </div>
          <Car className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      {/* Driver info */}
      {rideStatus !== 'searching' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={currentDriver.photo}
              alt={currentDriver.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{currentDriver.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{currentDriver.rating}</span>
                <span>•</span>
                <span>{currentDriver.totalRides} rides</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {currentDriver.vehicle.color} {currentDriver.vehicle.make} {currentDriver.vehicle.model}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {currentDriver.vehicle.licensePlate}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Driver</span>
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Message</span>
            </button>
          </div>
        </div>
      )}

      {/* Trip details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Trip Details</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div>
              <p className="font-medium text-gray-900">123 Main Street</p>
              <p className="text-sm text-gray-600">Pickup location</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div>
              <p className="font-medium text-gray-900">456 Broadway</p>
              <p className="text-sm text-gray-600">Destination</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">Estimated fare</span>
            <span className="font-semibold text-gray-900">$14.65</span>
          </div>
        </div>
      </div>

      {/* Cancel button */}
      {rideStatus !== 'in_progress' && (
        <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
          Cancel Ride
        </button>
      )}
    </div>
  );
}