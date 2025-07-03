import React from 'react';
import { Car, Truck, Clock, DollarSign } from 'lucide-react';
import { VehicleType } from '../../types';
import { mockVehicleTypes } from '../../data/mockData';

interface VehicleSelectionProps {
  selectedVehicle: VehicleType | null;
  onVehicleSelect: (vehicle: VehicleType) => void;
  estimatedFare: number;
}

const getVehicleIcon = (iconName: string) => {
  switch (iconName) {
    case 'truck':
      return <Truck className="h-6 w-6" />;
    default:
      return <Car className="h-6 w-6" />;
  }
};

export function VehicleSelection({ selectedVehicle, onVehicleSelect, estimatedFare }: VehicleSelectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Choose a ride</h3>
      
      {mockVehicleTypes.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onVehicleSelect(vehicle)}
          className={`w-full p-4 rounded-lg border-2 transition-all ${
            selectedVehicle?.id === vehicle.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                selectedVehicle?.id === vehicle.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getVehicleIcon(vehicle.icon)}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                <p className="text-sm text-gray-600">{vehicle.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{vehicle.estimatedArrival} min</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{vehicle.capacity} seats</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                ${selectedVehicle?.id === vehicle.id ? estimatedFare.toFixed(2) : vehicle.baseFare.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {selectedVehicle?.id === vehicle.id ? 'Estimated' : 'Starting at'}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}