import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { sampleHotels } from '../../data/hotels';
import { useBooking } from '../../context/BookingContext';

export const HandpickedStays = () => {
  const navigate = useNavigate();
  const { setHotelParams } = useBooking();

  // Pick 6 prominent luxury/scenic stays
  const featuredHotels = sampleHotels.slice(0, 6);

  const handleSelectHotel = (hotel) => {
    setHotelParams(prev => ({
      ...prev,
      destination: hotel.city,
      city: hotel.city
    }));
    navigate('/hotels/search');
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Handpicked Collections For You
            </h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> LUXE STAYS
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Top-rated luxury resorts, palace hotels, and scenic retreats across India
          </p>
        </div>

        <button
          onClick={() => navigate('/hotels/search')}
          className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
        >
          <span>VIEW ALL HOTELS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredHotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => handleSelectHotel(hotel)}
            className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover-card cursor-pointer flex flex-col justify-between group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-900 font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded shadow-xs uppercase">
                {hotel.badge}
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-xs">
                <Star className="w-3 h-3 fill-current text-white" />
                <span>{hotel.rating}</span>
              </div>

              {/* Location inside image bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 text-white text-xs font-bold drop-shadow-md">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{hotel.location}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                  {hotel.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {hotel.description}
                </p>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 line-through mr-1.5 font-medium">
                    ₹{hotel.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-gray-900">
                      ₹{hotel.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">/ night</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">+ ₹{hotel.taxes} taxes</span>
                </div>

                <button
                  type="button"
                  className="bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
