import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { FlightSearchWidget } from './FlightSearchWidget';
import { HotelSearchWidget } from './HotelSearchWidget';
import { TrainSearchWidget } from './TrainSearchWidget';
import { BusSearchWidget } from './BusSearchWidget';
import { CabSearchWidget } from './CabSearchWidget';
import { HolidaySearchWidget } from './HolidaySearchWidget';
import { CreditCard, ShieldCheck } from 'lucide-react';

export const UniversalSearchWidget = () => {
  const { activeTab } = useBooking();

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-2">
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-6 pb-12 sm:pb-14 relative z-10">
        {activeTab === 'flights' && <FlightSearchWidget />}
        {(activeTab === 'hotels' || activeTab === 'homestays') && <HotelSearchWidget />}
        {activeTab === 'trains' && <TrainSearchWidget />}
        {activeTab === 'buses' && <BusSearchWidget />}
        {activeTab === 'cabs' && <CabSearchWidget />}
        {activeTab === 'holidays' && <HolidaySearchWidget />}

        {activeTab === 'forex' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">MakeMyTrip Multi-Currency Forex Card</h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Zero markup foreign exchange, instant app top-up, accepted in 150+ countries. Get home delivery in 2 hours!
            </p>
            <button className="bg-mmt-btn text-white px-8 py-2.5 rounded-full font-bold shadow-btn">
              Apply For Forex Card
            </button>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Comprehensive Travel Insurance</h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Covers trip cancellations, baggage loss, medical emergencies, flight delays up to ₹50,00,000 worldwide.
            </p>
            <button className="bg-mmt-btn text-white px-8 py-2.5 rounded-full font-bold shadow-btn">
              Get Instant Policy Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
