import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Car, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Check, 
  Star,
  ChevronRight
} from 'lucide-react';
import { sampleCabs } from '../data/cabs';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const CabResults = () => {
  const navigate = useNavigate();
  const { cabParams } = useBooking();
  const [activeBooking, setActiveBooking] = useState(null);

  const handleBookCab = (cab) => {
    setActiveBooking({
      category: 'Cab',
      title: `${cabParams.fromCity} → ${cabParams.toCity}`,
      subtitle: `${cab.category} (${cab.models})`,
      date: cabParams.departureDate || '24 Mar 2026',
      time: `Pickup: ${cabParams.pickupTime || '06:00 AM'} • Estimated: ${cab.estimatedHours}`,
      price: cab.baseFare,
      details: `${cab.seats} Seater • ${cab.bags} Bags • ${cab.includes.join(' • ')} • ${cab.cancellation}.`
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
                <span className="text-xl font-black tracking-tight">{cabParams.fromCity}</span>
                <span className="text-gray-400">→</span>
                <span className="text-xl font-black tracking-tight">{cabParams.toCity}</span>
                <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  All Tolls Included
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Departure: <b>24 Mar 2026</b> at <b>{cabParams.pickupTime}</b> • Verified sanitized cabs & chauffeurs
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
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <p className="font-semibold">
            <b>MakeMyTrip Assured:</b> Clean sanitized cabs, zero toll surcharge at booths, professional chauffeurs & free cancellation up to 6 hours before departure.
          </p>
        </div>

        {/* Cab Cards */}
        <div className="space-y-4">
          {sampleCabs.map((cab) => (
            <div
              key={cab.id}
              className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card flex flex-col md:flex-row transition-all"
            >
              {/* Photo */}
              <div className="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={cab.image}
                  alt={cab.category}
                  className="w-full h-full object-cover rounded-xl"
                />
                {cab.badge && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[10px] tracking-wider px-2 py-0.5 rounded uppercase">
                    {cab.badge}
                  </div>
                )}
              </div>

              {/* Details Center */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-black text-xl text-gray-900">{cab.category}</h3>
                      <p className="text-xs text-gray-500 font-semibold">{cab.models}</p>
                    </div>

                    <div className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{cab.rating}</span>
                    </div>
                  </div>

                  {/* Capacities */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 font-semibold mt-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" /> {cab.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-gray-400" /> {cab.bags} Luggage Bags
                    </span>
                    <span className="text-emerald-700 font-bold">
                      • AC Vehicle
                    </span>
                  </div>

                  {/* Inclusions */}
                  <ul className="mt-3 space-y-1 text-xs text-gray-600">
                    {cab.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-1 font-medium">
                      ₹{cab.originalFare}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-900">
                        ₹{cab.baseFare.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">all inclusive</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block">
                      {cab.cancellation}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookCab(cab)}
                    className="bg-mmt-btn text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95 active:scale-95 transition-all"
                  >
                    BOOK CAB
                  </button>
                </div>

              </div>

            </div>
          ))}
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
