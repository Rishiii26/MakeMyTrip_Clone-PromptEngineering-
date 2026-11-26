import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Palmtree, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const HolidaySearchWidget = () => {
  const navigate = useNavigate();
  const { holidayParams, setHolidayParams } = useBooking();

  const handleSearch = () => {
    navigate('/holidays');
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="holidayType"
              defaultChecked
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-900 font-bold">Customized Holiday Packages</span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Flights + 4-Star Stays + Sightseeing Included</span>
        </div>
      </div>

      {/* Main Grid: Destination | Duration | Theme */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-visible bg-white relative shadow-xs">
        
        {/* DESTINATION */}
        <div className="md:col-span-6 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Destination / Theme
          </span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
              {holidayParams.destination}
            </h2>
            <span className="text-xs font-bold text-gray-400">[Himalayas, India]</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Srinagar, Gulmarg Gondola & Dal Lake Shikara
          </p>
        </div>

        {/* DURATION */}
        <div className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Duration
          </span>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
            5N / 6D
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Ideal Mountain Getaway
          </p>
        </div>

        {/* BUDGET / THEME */}
        <div className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Starting Price
          </span>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
            ₹16,999<span className="text-xs text-gray-500 font-normal"> / person</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            EMI Available from ₹1,499/mo
          </p>
        </div>

      </div>

      {/* Highlights */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <span className="font-bold text-gray-700 text-xs mr-1">Top Holiday Themes:</span>
        {['Kashmir Snow', 'Kerala Backwaters', 'Rajasthan Heritage', 'Goa Beach Fun', 'Dubai Special', 'Bali Island'].map((dest) => (
          <button
            key={dest}
            onClick={() => {
              setHolidayParams(p => ({ ...p, destination: dest.split(' ')[0] }));
            }}
            className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-medium cursor-pointer transition-colors border border-gray-200"
          >
            {dest}
          </button>
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
