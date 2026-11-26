import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bus, 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  ShieldCheck, 
  X,
  ChevronRight
} from 'lucide-react';
import { sampleBuses } from '../data/buses';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const BusResults = () => {
  const navigate = useNavigate();
  const { busParams } = useBooking();

  const [filterType, setFilterType] = useState('all'); // 'all' | 'sleeper' | 'seater'
  const [selectedBusForSeats, setSelectedBusForSeats] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);

  const filteredBuses = useMemo(() => {
    return sampleBuses.filter(bus => {
      if (filterType === 'sleeper' && !bus.busType.toLowerCase().includes('sleeper')) return false;
      if (filterType === 'seater' && !bus.busType.toLowerCase().includes('seater')) return false;
      return true;
    });
  }, [filterType]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length === 0) return;
    const totalFare = selectedSeats.length * selectedBusForSeats.price;

    setActiveBooking({
      category: 'Bus',
      title: `${selectedBusForSeats.fromCity} → ${selectedBusForSeats.toCity}`,
      subtitle: `${selectedBusForSeats.operator} • Seats: ${selectedSeats.join(', ')}`,
      date: busParams.travelDate || '24 Mar 2026',
      time: `${selectedBusForSeats.departureTime} - ${selectedBusForSeats.arrivalTime} (${selectedBusForSeats.duration})`,
      price: totalFare,
      details: `${selectedBusForSeats.busType} • Boarding: ${selectedBusForSeats.departurePoint} • Dropping: ${selectedBusForSeats.droppingPoint} • Free Live Tracking Included.`
    });
    setSelectedBusForSeats(null);
    setSelectedSeats([]);
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
                <span className="text-xl font-black tracking-tight">{busParams.fromCity}</span>
                <span className="text-gray-400">→</span>
                <span className="text-xl font-black tracking-tight">{busParams.toCity}</span>
                <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {filteredBuses.length} Buses
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Departure: <b>24 Mar 2026</b> • Sanitized AC Sleeper & Seater Fleet
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          <span className="text-gray-400 px-3 hidden sm:block">Filter:</span>
          {[
            { id: 'all', label: 'All Buses' },
            { id: 'sleeper', label: 'AC Sleeper Only' },
            { id: 'seater', label: 'AC Seater Only' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`py-2 px-4 rounded-lg transition-all ${
                filterType === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bus Cards List */}
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card transition-all"
            >
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Operator info */}
                <div className="sm:w-64 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-gray-900 text-base">{bus.operator}</h3>
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-white" /> {bus.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-semibold">{bus.busType}</p>
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded inline-block">
                    {bus.badge}
                  </span>
                </div>

                {/* Timing */}
                <div className="flex items-center justify-between sm:justify-center gap-6 flex-1">
                  <div>
                    <span className="text-xl font-black text-gray-900">{bus.departureTime}</span>
                    <p className="text-xs text-gray-500 line-clamp-1 max-w-[150px]">{bus.departurePoint}</p>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold text-gray-400">{bus.duration}</span>
                    <div className="w-24 h-0.5 bg-gray-200 mx-auto my-1"></div>
                    <span className="text-[10px] text-emerald-600 font-bold">{bus.seatsAvailable} Seats Left</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-gray-900">{bus.arrivalTime}</span>
                    <p className="text-xs text-gray-500 line-clamp-1 max-w-[150px]">{bus.droppingPoint}</p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-1 font-medium">
                      ₹{bus.originalPrice}
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      ₹{bus.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBusForSeats(bus);
                      setSelectedSeats(['L2']);
                    }}
                    className="bg-mmt-btn text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95 active:scale-95 transition-all"
                  >
                    SELECT SEATS
                  </button>
                </div>

              </div>

              {/* Amenities Bar */}
              <div className="bg-gray-50 px-4 sm:px-6 py-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                  {bus.amenities.map((amenity) => (
                    <span key={amenity} className="text-[11px] font-medium whitespace-nowrap">
                      • {amenity}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Seat Selection Modal */}
      {selectedBusForSeats && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="bg-[#051322] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase">Select Your Berth / Seat</span>
                <h3 className="font-black text-base">{selectedBusForSeats.operator}</h3>
              </div>
              <button onClick={() => setSelectedBusForSeats(null)}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded border border-gray-300 bg-white"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-blue-600"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-gray-200"></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Lower Deck Berth layout */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3 text-center">
                  Lower Deck (Sleeper Berths)
                </span>

                <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                  {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'].map((seat, i) => {
                    const isSelected = selectedSeats.includes(seat);
                    const isBooked = seat === 'L4' || seat === 'L7';

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seat)}
                        className={`h-14 rounded-lg font-bold text-xs border flex items-center justify-center transition-all ${
                          isBooked 
                            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-gray-300 text-gray-800 hover:border-blue-400'
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upper Deck Berth layout */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3 text-center">
                  Upper Deck (Sleeper Berths)
                </span>

                <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                  {['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8'].map((seat, i) => {
                    const isSelected = selectedSeats.includes(seat);
                    const isBooked = seat === 'U2' || seat === 'U6';

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seat)}
                        className={`h-14 rounded-lg font-bold text-xs border flex items-center justify-center transition-all ${
                          isBooked 
                            ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-gray-300 text-gray-800 hover:border-blue-400'
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selection Summary & Proceed */}
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <span className="text-xs text-gray-500 block">Selected: <b>{selectedSeats.join(', ') || 'None'}</b></span>
                  <span className="text-xl font-black text-gray-900">
                    ₹{(selectedSeats.length * selectedBusForSeats.price).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  disabled={selectedSeats.length === 0}
                  onClick={handleConfirmSeats}
                  className="bg-mmt-btn disabled:opacity-50 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95"
                >
                  CONTINUE TO BOOK
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Booking Checkout Modal */}
      <BookingModal
        isOpen={!!activeBooking}
        onClose={() => setActiveBooking(null)}
        bookingData={activeBooking}
      />

    </div>
  );
};
