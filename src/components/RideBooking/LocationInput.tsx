import React, { useState } from 'react';
import { MapPin, Search, Clock } from 'lucide-react';
import { Location } from '../../types';
import { mockLocations } from '../../data/mockData';

interface LocationInputProps {
  label: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
  placeholder: string;
  icon?: React.ReactNode;
}

export function LocationInput({ label, value, onChange, placeholder, icon }: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = mockLocations.filter(location =>
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location: Location) => {
    onChange(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon || <MapPin className="h-5 w-5" />}
        </div>
        <input
          type="text"
          value={value ? value.address : searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (!e.target.value) {
              onChange(null);
            }
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder={placeholder}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{location.address}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
}