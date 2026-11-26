import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Palmtree, 
  Clock, 
  Star, 
  Check, 
  Sparkles, 
  Calendar, 
  MapPin,
  X,
  ChevronRight
} from 'lucide-react';
import { samplePackages } from '../data/packages';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const HolidayResults = () => {
  const navigate = useNavigate();
  const { holidayParams } = useBooking();
  const [selectedPackageForDetail, setSelectedPackageForDetail] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);

  const handleBookPackage = (pkg) => {
    setActiveBooking({
      category: 'Holiday Package',
      title: pkg.title,
      subtitle: `${pkg.duration} • ${pkg.destination}`,
      date: 'Flexible dates in 2026',
      time: 'Customizable flight & cab timings',
      price: pkg.pricePerPerson,
      details: `${pkg.theme} • Inclusions: ${pkg.inclusions.join(' • ')} • 4-Star Resorts & Private Guided Transfers.`
    });
    setSelectedPackageForDetail(null);
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
                <span className="text-xl font-black tracking-tight">Handcrafted Holiday Packages</span>
                <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {samplePackages.length} Curated Tours
                </span>
              </div>
              <p className="text-xs text-gray-400">
                All packages include verified stays, daily meals, local sightseeing & dedicated tour assistance
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
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card flex flex-col justify-between group"
            >
              {/* Photo Banner */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-900 font-black text-[10px] tracking-wider px-2 py-0.5 rounded uppercase shadow-xs">
                  {pkg.badge}
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{pkg.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-extrabold text-blue-300 block mb-0.5">
                    {pkg.duration} • {pkg.destination}
                  </span>
                  <h3 className="font-black text-base leading-tight drop-shadow-md">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Key Inclusions:
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-600 mb-4">
                    {pkg.inclusions.slice(0, 3).map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-1 font-medium">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-gray-900">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPackageForDetail(pkg)}
                      className="bg-blue-50 text-blue-600 font-bold text-xs px-3.5 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => handleBookPackage(pkg)}
                      className="bg-mmt-btn text-white font-black text-xs px-4 py-2 rounded-lg shadow-btn hover:opacity-95"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Itinerary Modal */}
      {selectedPackageForDetail && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[88vh] flex flex-col">
            
            <div className="bg-[#051322] text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase">{selectedPackageForDetail.duration}</span>
                <h3 className="font-black text-lg text-white">{selectedPackageForDetail.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPackageForDetail(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 text-xs">
              
              <div>
                <h4 className="font-black text-sm uppercase text-gray-900 mb-2">Package Inclusions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPackageForDetail.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-50/60 p-2 rounded-lg text-blue-900 font-semibold">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-black text-sm uppercase text-gray-900 mb-3">Day-wise Itinerary:</h4>
                <div className="space-y-2.5">
                  {selectedPackageForDetail.itineraryOverview.map((day, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 p-3 rounded-xl">
                      <span className="font-extrabold text-blue-700 block mb-0.5">{day.split(':')[0]}</span>
                      <p className="text-gray-600 font-medium">{day.split(':')[1]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Starting Price</span>
                  <span className="text-2xl font-black text-gray-900">
                    ₹{selectedPackageForDetail.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500 font-medium text-[10px]"> / person</span>
                </div>

                <button
                  onClick={() => handleBookPackage(selectedPackageForDetail)}
                  className="bg-mmt-btn text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95"
                >
                  PROCEED TO BOOK
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
