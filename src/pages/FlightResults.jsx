import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Plane, 
  Clock, 
  Luggage, 
  Check, 
  Info, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { sampleFlights } from '../data/flights';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const FlightResults = () => {
  const navigate = useNavigate();
  const { flightParams } = useBooking();

  // Search parameters
  const origin = flightParams.from || 'DEL';
  const destination = flightParams.to || 'BOM';
  const originCity = flightParams.fromCity || 'Delhi';
  const destCity = flightParams.toCity || 'Mumbai';

  // State
  const [selectedAirline, setSelectedAirline] = useState('all');
  const [stopsFilter, setStopsFilter] = useState('all');
  const [timeSlot, setTimeSlot] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'fastest' | 'early'
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [selectedFareOption, setSelectedFareOption] = useState({});
  const [activeBooking, setActiveBooking] = useState(null);

  // 7-Day Date Strip
  const dateStrip = [
    { date: 'Mon, 23 Mar', price: 5120 },
    { date: 'Tue, 24 Mar', price: 4320, active: true },
    { date: 'Wed, 25 Mar', price: 4499 },
    { date: 'Thu, 26 Mar', price: 4890 },
    { date: 'Fri, 27 Mar', price: 5450 },
    { date: 'Sat, 28 Mar', price: 5890 },
    { date: 'Sun, 29 Mar', price: 6200 }
  ];

  // Filtering
  const filteredFlights = useMemo(() => {
    return sampleFlights.filter(f => {
      // Airline filter
      if (selectedAirline !== 'all' && f.airline !== selectedAirline) return false;
      // Stops filter
      if (stopsFilter === 'nonstop' && f.stops !== 0) return false;
      if (stopsFilter === '1stop' && f.stops !== 1) return false;
      // Price slider
      if (f.price > maxPrice) return false;
      // Time slots
      if (timeSlot === 'early' && parseInt(f.departureTime.split(':')[0]) >= 6) return false;
      if (timeSlot === 'morning') {
        const hour = parseInt(f.departureTime.split(':')[0]);
        if (hour < 6 || hour >= 12) return false;
      }
      if (timeSlot === 'afternoon') {
        const hour = parseInt(f.departureTime.split(':')[0]);
        if (hour < 12 || hour >= 18) return false;
      }
      if (timeSlot === 'evening') {
        const hour = parseInt(f.departureTime.split(':')[0]);
        if (hour < 18) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price;
      if (sortBy === 'fastest') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'early') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [selectedAirline, stopsFilter, timeSlot, maxPrice, sortBy]);

  const toggleFlightDetails = (id) => {
    setExpandedFlightId(expandedFlightId === id ? null : id);
  };

  const handleBookFlight = (flight) => {
    const selectedFare = selectedFareOption[flight.id] || flight.fareOptions?.[0];
    setActiveBooking({
      category: 'Flight',
      title: `${flight.fromCity} (${flight.from}) → ${flight.toCity} (${flight.to})`,
      subtitle: `${flight.airline} ${flight.flightNumber} • ${selectedFare ? selectedFare.type : 'Saver'}`,
      date: '24 Mar 2026',
      time: `${flight.departureTime} - ${flight.arrivalTime} (${flight.duration})`,
      price: selectedFare ? selectedFare.price : flight.price,
      details: `${flight.aircraft} • ${flight.stopDetails} • Terminal ${flight.fromTerminal} to ${flight.toTerminal} • Baggage: ${flight.baggage.checkIn} check-in, ${flight.baggage.cabin} cabin.`
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-16">
      
      {/* Top Search Modifier Bar */}
      <div className="bg-[#051322] text-white py-4 px-4 sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight">{originCity} ({origin})</span>
                <span className="text-gray-400">→</span>
                <span className="text-lg font-black tracking-tight">{destCity} ({destination})</span>
                <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {flightParams.tripType === 'roundtrip' ? 'Round Trip' : 'One Way'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Departure: <b>24 Mar 2026</b> • 1 Adult • {flightParams.travelClass}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/20 transition-all"
            >
              MODIFY SEARCH
            </button>
          </div>

        </div>
      </div>

      {/* 7-Day Price Carousel Strip */}
      <div className="bg-white border-b border-gray-200 py-2.5 shadow-xs overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 min-w-max">
          {dateStrip.map((item, idx) => (
            <button
              key={item.date}
              className={`px-4 py-2 rounded-xl text-center transition-all ${
                item.active 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'hover:bg-blue-50 text-gray-700'
              }`}
            >
              <span className="text-xs block font-semibold">{item.date}</span>
              <span className={`text-xs font-black ${item.active ? 'text-white' : 'text-blue-600'}`}>
                ₹{item.price.toLocaleString('en-IN')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-200 space-y-6">
            
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-extrabold text-sm text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" /> Filters
              </span>
              <button
                onClick={() => {
                  setSelectedAirline('all');
                  setStopsFilter('all');
                  setTimeSlot('all');
                  setMaxPrice(10000);
                }}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Stops */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Stops From {origin}
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input
                    type="radio"
                    name="stops"
                    checked={stopsFilter === 'all'}
                    onChange={() => setStopsFilter('all')}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>All Flights</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input
                    type="radio"
                    name="stops"
                    checked={stopsFilter === 'nonstop'}
                    onChange={() => setStopsFilter('nonstop')}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span>Non-Stop Only</span>
                </label>
              </div>
            </div>

            {/* Departure Time Slots */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Departure Time
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <button
                  onClick={() => setTimeSlot(timeSlot === 'early' ? 'all' : 'early')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    timeSlot === 'early' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span>Before 6 AM</span>
                </button>
                <button
                  onClick={() => setTimeSlot(timeSlot === 'morning' ? 'all' : 'morning')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    timeSlot === 'morning' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span>6 AM - 12 PM</span>
                </button>
                <button
                  onClick={() => setTimeSlot(timeSlot === 'afternoon' ? 'all' : 'afternoon')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    timeSlot === 'afternoon' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span>12 PM - 6 PM</span>
                </button>
                <button
                  onClick={() => setTimeSlot(timeSlot === 'evening' ? 'all' : 'evening')}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    timeSlot === 'evening' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <span>After 6 PM</span>
                </button>
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider">
                  One-Way Price
                </span>
                <span className="text-xs font-black text-blue-600">
                  Up to ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹2,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Airlines checkboxes */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Airlines
              </span>
              <div className="space-y-2 text-xs">
                {['IndiGo', 'Air India', 'Akasa Air', 'SpiceJet', 'Vistara'].map((airline) => (
                  <label key={airline} className="flex items-center justify-between cursor-pointer text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAirline === airline}
                        onChange={() => setSelectedAirline(selectedAirline === airline ? 'all' : airline)}
                        className="accent-blue-600 w-4 h-4 rounded"
                      />
                      <span>{airline}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Flights List */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Sorting Tabs */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-1.5 flex items-center justify-between text-xs font-bold">
            <span className="px-3 text-gray-400 hidden sm:block">Sort By:</span>
            
            <button
              onClick={() => setSortBy('cheapest')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'cheapest' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              CHEAPEST FIRST
            </button>
            <button
              onClick={() => setSortBy('fastest')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'fastest' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              FASTEST FIRST
            </button>
            <button
              onClick={() => setSortBy('early')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'early' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              EARLIEST DEPARTURE
            </button>
          </div>

          {/* Results Count */}
          <div className="text-xs text-gray-500 font-medium px-1">
            Showing <b className="text-gray-800">{filteredFlights.length}</b> verified flights from {originCity} to {destCity}
          </div>

          {/* Flight Cards */}
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => {
              const isExpanded = expandedFlightId === flight.id;
              const selectedFare = selectedFareOption[flight.id] || flight.fareOptions?.[0];
              const currentPrice = selectedFare ? selectedFare.price : flight.price;

              return (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card transition-all"
                >
                  {/* Card Main Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Airline & Code */}
                    <div className="flex items-center gap-3 sm:w-44 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-blue-700 text-sm">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-900 leading-tight">
                          {flight.airline}
                        </h4>
                        <span className="text-[11px] font-mono text-gray-400 block">
                          {flight.flightNumber}
                        </span>
                      </div>
                    </div>

                    {/* Schedule: Departure -> Flight Bar -> Arrival */}
                    <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 flex-1">
                      
                      {/* Departure */}
                      <div className="text-left sm:text-right">
                        <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                          {flight.departureTime}
                        </span>
                        <p className="text-xs font-bold text-gray-700">{flight.fromCity}</p>
                        <span className="text-[10px] text-gray-400 font-medium">Terminal {flight.fromTerminal}</span>
                      </div>

                      {/* Flight Duration Bar */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-gray-500 mb-1">{flight.duration}</span>
                        <div className="w-24 sm:w-32 h-0.5 bg-gray-300 relative flex items-center justify-between">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          <Plane className="w-3.5 h-3.5 text-blue-600" />
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-600 mt-1">
                          {flight.stopDetails}
                        </span>
                      </div>

                      {/* Arrival */}
                      <div className="text-right sm:text-left">
                        <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                          {flight.arrivalTime}
                        </span>
                        <p className="text-xs font-bold text-gray-700">{flight.toCity}</p>
                        <span className="text-[10px] text-gray-400 font-medium">Terminal {flight.toTerminal}</span>
                      </div>

                    </div>

                    {/* Pricing & BOOK CTA */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <div>
                        <span className="text-2xl font-black text-gray-900 block leading-tight">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium block text-right">
                          per adult
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookFlight(flight)}
                        className="bg-mmt-btn hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-btn active:scale-95 transition-all"
                      >
                        BOOK NOW
                      </button>
                    </div>

                  </div>

                  {/* Card Bottom Micro-actions */}
                  <div className="bg-gray-50/70 px-4 py-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Luggage className="w-3.5 h-3.5 text-gray-400" />
                        {flight.baggage.checkIn} Check-in, {flight.baggage.cabin} Cabin
                      </span>
                      {flight.mealIncluded && (
                        <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-bold">
                          <Utensils className="w-3.5 h-3.5 text-emerald-600" /> Free Meal
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFlightDetails(flight.id)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide Fares & Details' : 'View Fares & Details'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expandable Fare Options & Flight Details */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 bg-white border-t border-gray-100 space-y-4 animate-in fade-in duration-150">
                      <h5 className="font-extrabold text-xs text-gray-700 uppercase tracking-wider">
                        Select Fare Category
                      </h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {flight.fareOptions.map((fare) => {
                          const isFareSelected = (selectedFareOption[flight.id]?.type || flight.fareOptions[0].type) === fare.type;
                          return (
                            <div
                              key={fare.type}
                              onClick={() => setSelectedFareOption(prev => ({ ...prev, [flight.id]: fare }))}
                              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                isFareSelected
                                  ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex justify-between items-baseline mb-2">
                                <span className="font-bold text-sm text-gray-900">{fare.type}</span>
                                <span className="font-black text-sm text-blue-600">₹{fare.price.toLocaleString('en-IN')}</span>
                              </div>
                              <ul className="space-y-1 text-[11px] text-gray-600">
                                {fare.benefits.map((b, i) => (
                                  <li key={i} className="flex items-center gap-1.5">
                                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleBookFlight(flight)}
                          className="bg-mmt-btn text-white text-xs font-black px-6 py-2 rounded-lg shadow-btn"
                        >
                          PROCEED WITH {(selectedFareOption[flight.id]?.type || flight.fareOptions[0].type).toUpperCase()}
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-gray-200">
              <Plane className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-800 text-lg">No Flights Match Your Filter</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your price filter or selecting "All Flights" to see available flights.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Booking Checkout Modal */}
      <BookingModal
        isOpen={!!activeBooking}
        onClose={() => setActiveBooking(null)}
        bookingData={activeBooking}
      />

    </div>
  );
};
