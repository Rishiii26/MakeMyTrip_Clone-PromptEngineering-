import React, { useState } from 'react';
import { Search, MapPin, Plane, X } from 'lucide-react';
import { airports } from '../../data/airports';

export const AirportModal = ({ isOpen, onClose, onSelect, currentSelected, title = "Select City / Airport" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredAirports = airports.filter(a => 
    a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-800 text-base">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="From / To (e.g. Delhi, Mumbai, BLR)..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 font-medium placeholder-gray-400"
            />
          </div>
        </div>

        {/* Popular / Suggested list */}
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 p-2">
          <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {searchTerm ? 'Search Results' : 'Popular Indian Airports'}
          </div>

          {filteredAirports.length > 0 ? (
            filteredAirports.map((airport) => (
              <button
                key={airport.code}
                onClick={() => {
                  onSelect(airport);
                  onClose();
                }}
                className={`w-full p-3 rounded-lg text-left hover:bg-blue-50/60 transition-colors flex items-center justify-between group ${
                  currentSelected === airport.code ? 'bg-blue-50/80 border border-blue-200' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm group-hover:text-blue-600">{airport.city}</span>
                      <span className="text-xs text-gray-500 font-semibold">{airport.state}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-[280px]">{airport.airport}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
                    {airport.code}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">
              No airports found matching "{searchTerm}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
