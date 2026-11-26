import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CabSearchWidget = () => {
  const navigate = useNavigate();
  const { cabParams, setCabParams } = useBooking();

  const handleSearch = () => {
    navigate('/cabs/search');
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="cabType"
              checked={cabParams.type === 'outstation_oneway'}
              onChange={() => setCabParams(p => ({ ...p, type: 'outstation_oneway' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={cabParams.type === 'outstation_oneway' ? 'text-gray-900 font-bold' : 'text-gray-600'}>
              Outstation One-Way
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="cabType"
              checked={cabParams.type === 'outstation_round'}
              onChange={() => setCabParams(p => ({ ...p, type: 'outstation_round' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={cabParams.type === 'outstation_round' ? 'text-gray-900 font-bold' : 'text-gray-600'}>
              Outstation Round-Trip
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="cabType"
              checked={cabParams.type === 'airport'}
              onChange={() => setCabParams(p => ({ ...p, type: 'airport' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={cabParams.type === 'airport' ? 'text-gray-900 font-bold' : 'text-gray-600'}>
              Airport Transfers
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="cabType"
              checked={cabParams.type === 'hourly'}
              onChange={() => setCabParams(p => ({ ...p, type: 'hourly' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={cabParams.type === 'hourly' ? 'text-gray-900 font-bold' : 'text-gray-600'}>
              Hourly Rentals
            </span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>All Tolls & Taxes Included</span>
        </div>
      </div>

      {/* Main Grid: From | To | Departure Date | Pickup Time */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-visible bg-white relative shadow-xs">
        
        {/* FROM */}
        <div className="md:col-span-4 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">From</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
            {cabParams.fromCity}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Doorstep Pickup Available
          </p>
        </div>

        {/* TO */}
        <div className="md:col-span-4 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">To</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
            {cabParams.toCity}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Taj Mahal, Agra Fort, Express Highway
          </p>
        </div>

        {/* DEPARTURE DATE */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <label className="block cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Departure
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
                24
              </span>
              <span className="text-sm font-bold text-gray-800">
                Mar'26
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Tuesday</p>
            <input
              type="date"
              value={cabParams.departureDate}
              onChange={(e) => setCabParams(p => ({ ...p, departureDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* PICKUP TIME */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Pickup Time
          </span>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
            {cabParams.pickupTime}
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            24x7 Chauffeur
          </p>
        </div>

      </div>

      {/* Highlights */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <span className="font-bold text-gray-700 text-xs mr-1">Available Fleet:</span>
        {['Sedan (Dzire/Etios)', 'SUV (Ertiga/Carens)', 'Prime SUV (Innova Crysta)', 'Hatchback (WagonR)'].map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-medium cursor-pointer transition-colors border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Floating Centered SEARCH Button */}
      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleSearch}
          className="bg-mmt-btn hover:opacity-95 text-white font-black text-xl sm:text-2xl px-12 sm:px-16 py-3 rounded-full shadow-2xl tracking-wider active:scale-95 transition-all transform hover:-translate-y-0.5 border-2 border-white/40 flex items-center gap-2"
        >
          <span>SEARCH</span>
        </button>
      </div>

    </div>
  );
};
