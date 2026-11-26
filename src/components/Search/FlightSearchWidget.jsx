import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, ChevronDown, CheckCircle, Calendar, Users } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { AirportModal } from './AirportModal';
import { TravellersModal } from './TravellersModal';

export const FlightSearchWidget = () => {
  const navigate = useNavigate();
  const { flightParams, setFlightParams } = useBooking();

  const [modalType, setModalType] = useState(null); // 'from' | 'to' | 'travellers' | null

  // Swap From and To
  const handleSwap = (e) => {
    e.stopPropagation();
    setFlightParams(prev => ({
      ...prev,
      from: prev.to,
      fromCity: prev.toCity,
      fromAirport: prev.toAirport,
      to: prev.from,
      toCity: prev.fromCity,
      toAirport: prev.fromAirport
    }));
  };

  const handleAirportSelect = (airport) => {
    if (modalType === 'from') {
      setFlightParams(prev => ({
        ...prev,
        from: airport.code,
        fromCity: airport.city,
        fromAirport: airport.airport
      }));
    } else if (modalType === 'to') {
      setFlightParams(prev => ({
        ...prev,
        to: airport.code,
        toCity: airport.city,
        toAirport: airport.airport
      }));
    }
  };

  // Format date helper: returns { day: 24, monthYear: "Mar'26", weekday: "Tuesday" }
  const formatDateDisplay = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { day: '24', monthYear: "Mar'26", weekday: 'Tuesday' };
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      day: day < 10 ? `0${day}` : `${day}`,
      monthYear: `${months[d.getMonth()]}'${d.getFullYear().toString().slice(-2)}`,
      weekday: days[d.getDay()]
    };
  };

  const depDate = formatDateDisplay(flightParams.departureDate);
  const retDate = formatDateDisplay(flightParams.returnDate);

  const totalTravellers = 
    (flightParams.travellers.adults || 1) + 
    (flightParams.travellers.children || 0) + 
    (flightParams.travellers.infants || 0);

  const handleSearch = () => {
    navigate('/flights/search');
  };

  return (
    <div className="relative">
      
      {/* Top Bar: Trip Type Radios & Sub-text */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-4 sm:gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="tripType"
              checked={flightParams.tripType === 'oneway'}
              onChange={() => setFlightParams(p => ({ ...p, tripType: 'oneway' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={`${flightParams.tripType === 'oneway' ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
              One Way
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="tripType"
              checked={flightParams.tripType === 'roundtrip'}
              onChange={() => setFlightParams(p => ({ ...p, tripType: 'roundtrip' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={`${flightParams.tripType === 'roundtrip' ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
              Round Trip
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="tripType"
              checked={flightParams.tripType === 'multicity'}
              onChange={() => setFlightParams(p => ({ ...p, tripType: 'multicity' }))}
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className={`${flightParams.tripType === 'multicity' ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
              Multi City
            </span>
          </label>
        </div>

        <div className="text-gray-500 font-medium hidden md:block">
          Book International and Domestic Flights
        </div>
      </div>

      {/* Main Grid: From | To | Departure | Return | Travellers */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-visible bg-white relative shadow-xs">
        
        {/* FROM */}
        <div 
          onClick={() => setModalType('from')}
          className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">From</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
              {flightParams.fromCity}
            </h2>
            <span className="text-xs font-bold text-gray-400">[{flightParams.from}]</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {flightParams.fromAirport}
          </p>

          {/* Swap Button (floating on right border) */}
          <button
            onClick={handleSwap}
            title="Swap Cities"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 transition-all z-20 group/swap"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 transform group-hover/swap:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* TO */}
        <div 
          onClick={() => setModalType('to')}
          className="md:col-span-3 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">To</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
              {flightParams.toCity}
            </h2>
            <span className="text-xs font-bold text-gray-400">[{flightParams.to}]</span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {flightParams.toAirport}
          </p>
        </div>

        {/* DEPARTURE */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <label className="block cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Departure
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
                {depDate.day}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {depDate.monthYear}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{depDate.weekday}</p>
            <input
              type="date"
              value={flightParams.departureDate}
              onChange={(e) => setFlightParams(p => ({ ...p, departureDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* RETURN */}
        <div 
          onClick={() => {
            if (flightParams.tripType === 'oneway') {
              setFlightParams(p => ({ ...p, tripType: 'roundtrip' }));
            }
          }}
          className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Return
          </span>

          {flightParams.tripType === 'roundtrip' ? (
            <label className="block cursor-pointer">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
                  {retDate.day}
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {retDate.monthYear}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{retDate.weekday}</p>
              <input
                type="date"
                value={flightParams.returnDate}
                onChange={(e) => setFlightParams(p => ({ ...p, returnDate: e.target.value }))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          ) : (
            <div className="mt-1">
              <span className="text-xs text-gray-400 leading-snug block font-medium group-hover:text-blue-600 transition-colors">
                Tap to add a return date for bigger discounts
              </span>
            </div>
          )}
        </div>

        {/* TRAVELLERS & CLASS */}
        <div 
          onClick={() => setModalType('travellers')}
          className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Travellers & Class
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
              {totalTravellers}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {totalTravellers > 1 ? 'Travellers' : 'Traveller'}
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {flightParams.travelClass}
          </p>
        </div>

      </div>

      {/* Special Fare Types Section */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <span className="font-bold text-gray-700 text-xs mr-1">Select A Fare Type:</span>

        {/* Regular */}
        <button
          type="button"
          onClick={() => setFlightParams(p => ({ ...p, fareType: 'regular' }))}
          className={`px-3 py-1.5 rounded-md border font-semibold transition-all flex items-center gap-1.5 ${
            flightParams.fareType === 'regular'
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${flightParams.fareType === 'regular' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
            {flightParams.fareType === 'regular' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </div>
          <span>Regular Fares</span>
        </button>

        {/* Student */}
        <button
          type="button"
          onClick={() => setFlightParams(p => ({ ...p, fareType: 'student' }))}
          className={`px-3 py-1.5 rounded-md border font-semibold transition-all flex items-center gap-1.5 relative ${
            flightParams.fareType === 'student'
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${flightParams.fareType === 'student' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
            {flightParams.fareType === 'student' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </div>
          <span>Student Fares</span>
          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">Extra Baggage</span>
        </button>

        {/* Senior Citizen */}
        <button
          type="button"
          onClick={() => setFlightParams(p => ({ ...p, fareType: 'senior' }))}
          className={`px-3 py-1.5 rounded-md border font-semibold transition-all flex items-center gap-1.5 ${
            flightParams.fareType === 'senior'
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${flightParams.fareType === 'senior' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
            {flightParams.fareType === 'senior' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </div>
          <span>Senior Citizen</span>
          <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">Up to ₹600 off</span>
        </button>

        {/* Armed Forces */}
        <button
          type="button"
          onClick={() => setFlightParams(p => ({ ...p, fareType: 'armed' }))}
          className={`px-3 py-1.5 rounded-md border font-semibold transition-all flex items-center gap-1.5 ${
            flightParams.fareType === 'armed'
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${flightParams.fareType === 'armed' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
            {flightParams.fareType === 'armed' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </div>
          <span>Armed Forces</span>
          <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">Up to ₹600 off</span>
        </button>

        {/* Doctors and Nurses */}
        <button
          type="button"
          onClick={() => setFlightParams(p => ({ ...p, fareType: 'doctor' }))}
          className={`px-3 py-1.5 rounded-md border font-semibold transition-all flex items-center gap-1.5 ${
            flightParams.fareType === 'doctor'
              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${flightParams.fareType === 'doctor' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
            {flightParams.fareType === 'doctor' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </div>
          <span>Doctors & Nurses</span>
          <span className="bg-purple-100 text-purple-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">Special Fare</span>
        </button>
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

      {/* Modals */}
      <AirportModal
        isOpen={modalType === 'from'}
        onClose={() => setModalType(null)}
        onSelect={handleAirportSelect}
        currentSelected={flightParams.from}
        title="Select Departure Airport"
      />

      <AirportModal
        isOpen={modalType === 'to'}
        onClose={() => setModalType(null)}
        onSelect={handleAirportSelect}
        currentSelected={flightParams.to}
        title="Select Destination Airport"
      />

      <TravellersModal
        isOpen={modalType === 'travellers'}
        onClose={() => setModalType(null)}
        travellers={flightParams.travellers}
        travelClass={flightParams.travelClass}
        onApply={({ travellers, travelClass }) => {
          setFlightParams(p => ({ ...p, travellers, travelClass }));
        }}
      />

    </div>
  );
};
