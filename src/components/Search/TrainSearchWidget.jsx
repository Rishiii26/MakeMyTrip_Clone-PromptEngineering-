import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, TrainFront, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const TrainSearchWidget = () => {
  const navigate = useNavigate();
  const { trainParams, setTrainParams } = useBooking();

  const handleSwap = () => {
    setTrainParams(prev => ({
      ...prev,
      fromStation: prev.toStation,
      fromCity: prev.toCity,
      toStation: prev.fromStation,
      toCity: prev.fromCity
    }));
  };

  const handleSearch = () => {
    navigate('/trains/search');
  };

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="trainMode"
              defaultChecked
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-900 font-bold">Book Train Tickets</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="trainMode"
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-600 font-medium">Check PNR Status</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="trainMode"
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-600 font-medium">Live Train Running Status</span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>IRCTC Authorized Partner</span>
        </div>
      </div>

      {/* Main Grid: From Station | To Station | Travel Date | Class | Quota */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-visible bg-white relative shadow-xs">
        
        {/* FROM */}
        <div className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">From</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
              {trainParams.fromCity}
            </h2>
            <span className="text-xs font-bold text-gray-400">[{trainParams.fromStation}]</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Railway Station • North India
          </p>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            title="Swap Stations"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 transition-all z-20 group/swap"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 transform group-hover/swap:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* TO */}
        <div className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">To</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
              {trainParams.toCity}
            </h2>
            <span className="text-xs font-bold text-gray-400">[{trainParams.toStation}]</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Railway Station • Western Railway
          </p>
        </div>

        {/* TRAVEL DATE */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
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
              value={trainParams.travelDate}
              onChange={(e) => setTrainParams(p => ({ ...p, travelDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* CLASS */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Class
          </span>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
            All Classes
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            1A, 2A, 3A, SL, CC, EC
          </p>
        </div>

        {/* QUOTA */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Quota
          </span>
          <select
            value={trainParams.quota}
            onChange={(e) => setTrainParams(p => ({ ...p, quota: e.target.value }))}
            className="w-full bg-transparent text-lg font-black text-gray-900 focus:outline-none cursor-pointer mt-1"
          >
            <option value="General">General Quota</option>
            <option value="Tatkal">Tatkal Quota</option>
            <option value="Ladies">Ladies Quota</option>
            <option value="Senior">Senior Citizen</option>
          </select>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Live IRCTC Seat Status
          </p>
        </div>

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
