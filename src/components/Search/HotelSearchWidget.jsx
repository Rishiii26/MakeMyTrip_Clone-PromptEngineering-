import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Calendar, Users, X, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const POPULAR_DESTINATIONS = [
  { city: 'Goa', state: 'India', desc: 'Beaches, Nightlife & Heritage' },
  { city: 'Jaipur', state: 'Rajasthan', desc: 'Forts, Palaces & Royal Havelis' },
  { city: 'Manali', state: 'Himachal Pradesh', desc: 'Snow Peaks, Beas River & Adventure' },
  { city: 'Udaipur', state: 'Rajasthan', desc: 'Lakes, Mewar Palaces & Romance' },
  { city: 'Delhi', state: 'Delhi NCR', desc: 'Monuments, Shopping & Street Food' },
  { city: 'Mumbai', state: 'Maharashtra', desc: 'Gateway of India, Marine Drive' },
  { city: 'Shimla', state: 'Himachal Pradesh', desc: 'Colonial Architecture, Mall Road' },
  { city: 'Rishikesh', state: 'Uttarakhand', desc: 'Ganga Aarti, Yoga & River Rafting' },
  { city: 'Bengaluru', state: 'Karnataka', desc: 'Silicon Valley, Pubs & Gardens' },
  { city: 'Ooty', state: 'Tamil Nadu', desc: 'Nilgiri Hills, Tea Estates & Lakes' }
];

export const HotelSearchWidget = () => {
  const navigate = useNavigate();
  const { hotelParams, setHotelParams } = useBooking();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const formatDateDisplay = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { day: '12', monthYear: "Apr'26", weekday: 'Sunday' };
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      day: day < 10 ? `0${day}` : `${day}`,
      monthYear: `${months[d.getMonth()]}'${d.getFullYear().toString().slice(-2)}`,
      weekday: days[d.getDay()]
    };
  };

  const cinDate = formatDateDisplay(hotelParams.checkInDate);
  const coutDate = formatDateDisplay(hotelParams.checkOutDate);

  const handleSearch = () => {
    navigate('/hotels/search');
  };

  return (
    <div className="relative">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="hotelType"
              defaultChecked
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-900 font-bold">Upto 4 Rooms</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="hotelType"
              className="accent-[#0084ff] w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-600 font-medium">Group Deals (5+ Rooms)</span>
          </label>
        </div>

        <div className="text-gray-500 font-medium hidden md:block">
          Book Handpicked International & Domestic Hotels
        </div>
      </div>

      {/* Main Grid: City | Check-In | Check-Out | Rooms & Guests | Price Filter */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        
        {/* CITY / DESTINATION */}
        <div 
          onClick={() => setIsCityModalOpen(true)}
          className="md:col-span-4 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            City, Destination or Property
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
            {hotelParams.destination}
          </h2>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            India • Popular Vacation Spot
          </p>
        </div>

        {/* CHECK-IN */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <label className="block cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Check-In
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
                {cinDate.day}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {cinDate.monthYear}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{cinDate.weekday}</p>
            <input
              type="date"
              value={hotelParams.checkInDate}
              onChange={(e) => setHotelParams(p => ({ ...p, checkInDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* CHECK-OUT */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 relative group">
          <label className="block cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Check-Out
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
                {coutDate.day}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {coutDate.monthYear}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{coutDate.weekday}</p>
            <input
              type="date"
              value={hotelParams.checkOutDate}
              onChange={(e) => setHotelParams(p => ({ ...p, checkOutDate: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* ROOMS & GUESTS */}
        <div 
          onClick={() => setIsGuestModalOpen(true)}
          className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer border-b md:border-b-0 md:border-r border-gray-200 group"
        >
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Rooms & Guests
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 tracking-tight">
              {hotelParams.rooms}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {hotelParams.rooms > 1 ? 'Rooms' : 'Room'}, {hotelParams.adults} Adults
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {hotelParams.children ? `${hotelParams.children} Child` : '0 Children'}
          </p>
        </div>

        {/* PRICE PER NIGHT */}
        <div className="md:col-span-2 p-3.5 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer group">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Price Per Night
          </span>
          <div className="text-lg sm:text-xl font-black text-gray-900 mt-1">
            ₹0 - ₹25000+
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            Standard & Luxury Options
          </p>
        </div>

      </div>

      {/* Special Highlights Bar */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <span className="font-bold text-gray-700 text-xs mr-1">Trending Filters:</span>
        {['Free Breakfast Included', 'Free Cancellation', 'Swimming Pool', '5 Star Luxe Properties', 'Couple Friendly'].map((tag) => (
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

      {/* Destination Picker Modal */}
      {isCityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800 text-base">Select Hotel Destination</h3>
              <button 
                onClick={() => setIsCityModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-50">
              {POPULAR_DESTINATIONS.map((d) => (
                <button
                  key={d.city}
                  onClick={() => {
                    setHotelParams(p => ({ ...p, destination: d.city, city: d.city }));
                    setIsCityModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg text-left hover:bg-blue-50 transition-colors flex items-center justify-between ${
                    hotelParams.destination === d.city ? 'bg-blue-50/80 border border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{d.city}, {d.state}</div>
                      <p className="text-xs text-gray-500">{d.desc}</p>
                    </div>
                  </div>
                  {hotelParams.destination === d.city && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guest Picker Modal */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-gray-800">Select Rooms & Guests</h3>
              <button onClick={() => setIsGuestModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Rooms counter */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-gray-800">Rooms</p>
                <p className="text-xs text-gray-400">Number of rooms</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setHotelParams(p => ({ ...p, rooms: Math.max(1, p.rooms - 1) }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >-</button>
                <span className="font-bold text-sm w-4 text-center">{hotelParams.rooms}</span>
                <button 
                  onClick={() => setHotelParams(p => ({ ...p, rooms: Math.min(6, p.rooms + 1) }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >+</button>
              </div>
            </div>

            {/* Adults counter */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-gray-800">Adults</p>
                <p className="text-xs text-gray-400">12 yrs and above</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setHotelParams(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >-</button>
                <span className="font-bold text-sm w-4 text-center">{hotelParams.adults}</span>
                <button 
                  onClick={() => setHotelParams(p => ({ ...p, adults: Math.min(12, p.adults + 1) }))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
                >+</button>
              </div>
            </div>

            <button
              onClick={() => setIsGuestModalOpen(false)}
              className="w-full bg-mmt-btn text-white py-2 rounded-lg font-bold text-sm shadow-btn mt-4"
            >
              APPLY
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
