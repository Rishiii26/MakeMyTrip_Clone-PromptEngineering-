import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Bus, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BusSearchWidget = () => {
  const navigate = useNavigate();
  const { busParams, setBusParams } = useBooking();

  const handleSwap = () => {
    setBusParams(prev => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity
    }));
  };

  const handleSearch = () => {
    navigate('/buses/search');
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="busMode"
              defaultChecked
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-900 font-bold">Book Intercity Bus Tickets</span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Free Cancellation & Sanitized Fleet</span>
        </div>
      </div>

      {/* Main Grid: From | To | Travel Date */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-visible bg-white relative shadow-xs">
        
        {/* FROM */}
        <div className="md:col-span-5 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">From</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
            {busParams.fromCity}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            ISBT Kashmere Gate, Majnu Ka Tilla, Dhaula Kuan
          </p>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            title="Swap Cities"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 transition-all z-20 group/swap"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 transform group-hover/swap:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* TO */}
        <div className="md:col-span-4 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">To</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
            {busParams.toCity}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Mall Road Volvo Stand, Private Bus Parking
          </p>
        </div>

        {/* TRAVEL DATE */}
        <div className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer relative group">
          <label className="block cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Travel Date
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
              value={busParams.travelDate}
              onChange={(e) => setBusParams(p => ({ ...p, travelDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

      </div>

      {/* Highlights */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <span className="font-bold text-gray-700 text-xs mr-1">Popular Operators:</span>
        {['Zingbus Plus', 'IntrCity SmartBus', 'SRS Travels', 'Orange Travels', 'VRL Luxury'].map((tag) => (
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
