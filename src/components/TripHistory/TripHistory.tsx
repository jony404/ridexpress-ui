import React, { useState } from 'react';
import { Calendar, MapPin, Star, ChevronDown, Filter } from 'lucide-react';
import { mockRideHistory } from '../../data/mockData';
import { Ride } from '../../types';

export function TripHistory() {
  const [rides] = useState<Ride[]>(mockRideHistory);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const filteredRides = rides.filter(ride => {
    if (selectedFilter === 'all') return true;
    return ride.status === selectedFilter;
  });

  const totalSpent = rides.reduce((sum, ride) => sum + ride.fare.total, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{rides.length}</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.9</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Trip History</h2>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Rides</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Rides list */}
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ride.vehicleType.name}</p>
                    <p className="text-sm text-gray-600">{formatDate(ride.requestedAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${ride.fare.total.toFixed(2)}</div>
                  <div className={`text-sm ${
                    ride.status === 'completed' ? 'text-green-600' : 
                    ride.status === 'cancelled' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ride.status.replace('_', ' ')}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 truncate">{ride.pickupLocation.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-700 truncate">{ride.dropoffLocation.address}</span>
                </div>
              </div>

              {ride.driver && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <img
                      src={ride.driver.photo}
                      alt={ride.driver.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">{ride.driver.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-700">{ride.driver.rating}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No rides found</p>
            <p className="text-sm text-gray-500">Your trip history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}