import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Filter, 
  Check, 
  Wifi, 
  Coffee, 
  Utensils, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { sampleHotels } from '../data/hotels';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const HotelResults = () => {
  const navigate = useNavigate();
  const { hotelParams } = useBooking();

  const destination = hotelParams.destination || 'Goa';

  // Filters state
  const [selectedStar, setSelectedStar] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(45000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price_low' | 'price_high' | 'rating'
  
  // Modals state
  const [selectedHotelForRooms, setSelectedHotelForRooms] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Filtered & Sorted hotels
  const filteredHotels = useMemo(() => {
    return sampleHotels.filter(hotel => {
      // Destination filter (if matched or fallback to popular)
      if (destination && !hotel.destination.toLowerCase().includes(destination.toLowerCase()) && !hotel.city.toLowerCase().includes(destination.toLowerCase())) {
        // If no direct match in destination, show all for demo richness
      }

      // Star filter
      if (selectedStar !== 'all' && hotel.stars !== Number(selectedStar)) return false;

      // Rating filter
      if (hotel.rating < minRating) return false;

      // Price filter
      if (hotel.price > maxPrice) return false;

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => 
          hotel.amenities.some(ha => ha.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [destination, selectedStar, minRating, maxPrice, selectedAmenities, sortBy]);

  const handleBookRoom = (hotel, room) => {
    setActiveBooking({
      category: 'Hotel',
      title: hotel.name,
      subtitle: `${room.type} (${hotel.city})`,
      date: `${hotelParams.checkInDate || '12 Apr'} - ${hotelParams.checkOutDate || '15 Apr 2026'}`,
      time: 'Check-in: 14:00 • Check-out: 11:00',
      price: room.price || hotel.price,
      details: `${hotel.location} • ${room.size} • Bed: ${room.bed} • Includes: ${room.includes.join(', ')}.`
    });
    setSelectedHotelForRooms(null);
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
                <span className="text-xl font-black tracking-tight">Hotels & Homestays in {destination}</span>
                <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {filteredHotels.length} Stays
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Check-in: <b>12 Apr 2026</b> • Check-out: <b>15 Apr 2026</b> (3 Nights) • {hotelParams.rooms || 1} Room, {hotelParams.adults || 2} Adults
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
                  setSelectedStar('all');
                  setMinRating(0);
                  setMaxPrice(45000);
                  setSelectedAmenities([]);
                }}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider">
                  Price Per Night
                </span>
                <span className="text-xs font-black text-blue-600">
                  Up to ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="45000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹2,000</span>
                <span>₹45,000+</span>
              </div>
            </div>

            {/* Star Category */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Star Rating
              </span>
              <div className="flex gap-2">
                {['all', '3', '4', '5'].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedStar(star)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      selectedStar === star
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {star === 'all' ? 'All' : `${star} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* User Rating */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Guest Rating
              </span>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: '4.5+ Exceptional', val: 4.5 },
                  { label: '4.0+ Very Good', val: 4.0 },
                  { label: '3.5+ Good', val: 3.5 },
                  { label: 'Any Rating', val: 0 }
                ].map((item) => (
                  <label key={item.val} className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                    <input
                      type="radio"
                      name="guestRating"
                      checked={minRating === item.val}
                      onChange={() => setMinRating(item.val)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Popular Amenities */}
            <div>
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wider block mb-2.5">
                Amenities
              </span>
              <div className="space-y-2 text-xs">
                {['Swimming Pool', 'Free Breakfast', 'Free WiFi', 'Spa', 'Private Beach'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="accent-blue-600 w-4 h-4 rounded"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Hotel Cards List */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Sorting Tabs */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-1.5 flex items-center justify-between text-xs font-bold">
            <span className="px-3 text-gray-400 hidden sm:block">Sort By:</span>
            
            <button
              onClick={() => setSortBy('popular')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'popular' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              POPULARITY
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'rating' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              USER RATING (HIGHEST)
            </button>
            <button
              onClick={() => setSortBy('price_low')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                sortBy === 'price_low' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              PRICE (LOW TO HIGH)
            </button>
          </div>

          {/* Results Count */}
          <div className="text-xs text-gray-500 font-medium px-1">
            Showing <b className="text-gray-800">{filteredHotels.length}</b> verified properties in {destination}
          </div>

          {/* Hotel Cards */}
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card flex flex-col md:flex-row transition-all"
              >
                {/* Photo Thumbnail */}
                <div className="md:w-72 h-52 md:h-auto shrink-0 relative overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-900 font-black text-[10px] tracking-wider px-2 py-0.5 rounded shadow-xs uppercase">
                    {hotel.badge}
                  </div>
                </div>

                {/* Info Center */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[10px] text-gray-500 font-bold ml-1">{hotel.stars} Star Property</span>
                        </div>

                        <h3 className="font-black text-lg text-gray-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => setSelectedHotelForRooms(hotel)}
                        >
                          {hotel.name}
                        </h3>
                      </div>

                      {/* Rating pill */}
                      <div className="text-right shrink-0">
                        <div className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black text-xs px-2 py-1 rounded-md">
                          <span>{hotel.rating}</span>
                          <Star className="w-3 h-3 fill-white text-white" />
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5 font-medium">
                          {hotel.reviewCount} Ratings
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Row & View Rooms Button */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-2">
                        ₹{hotel.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">
                          ₹{hotel.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">/ night</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block font-medium">
                        + ₹{hotel.taxes} taxes & fees per night
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedHotelForRooms(hotel)}
                        className="bg-mmt-btn hover:opacity-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-btn active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span>VIEW ROOMS</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-gray-200">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-800 text-lg">No Hotels Match Your Filter</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try clearing selected amenities or adjusting your price slider to see more hotels in {destination}.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Hotel Rooms Selection Modal */}
      {selectedHotelForRooms && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            
            <div className="bg-[#051322] text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Available Room Categories</span>
                <h3 className="text-lg font-black text-white">{selectedHotelForRooms.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedHotelForRooms(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {selectedHotelForRooms.rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-black text-gray-900 text-base">{room.type}</h4>
                    <p className="text-xs text-gray-500 font-semibold">
                      Bed: {room.bed} • Room Size: {room.size}
                    </p>
                    <ul className="space-y-1 text-xs text-emerald-700 font-bold">
                      {room.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div>
                      <span className="text-2xl font-black text-gray-900">
                        ₹{room.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-gray-400 block">/ night</span>
                    </div>

                    <button
                      onClick={() => handleBookRoom(selectedHotelForRooms, room)}
                      className="bg-mmt-btn text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95"
                    >
                      BOOK THIS ROOM
                    </button>
                  </div>
                </div>
              ))}
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
