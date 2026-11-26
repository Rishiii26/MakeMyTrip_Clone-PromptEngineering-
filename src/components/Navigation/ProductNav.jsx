import React from 'react';
import { 
  Plane, 
  Building, 
  Home, 
  Palmtree, 
  TrainFront, 
  Bus, 
  Car, 
  CreditCard, 
  ShieldCheck 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CATEGORIES = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Building },
  { id: 'homestays', label: 'Homestays & Villas', icon: Home },
  { id: 'holidays', label: 'Holiday Packages', icon: Palmtree },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'buses', label: 'Buses', icon: Bus },
  { id: 'cabs', label: 'Cabs', icon: Car },
  { id: 'forex', label: 'Forex Card & Currency', icon: CreditCard },
  { id: 'insurance', label: 'Travel Insurance', icon: ShieldCheck }
];

export const ProductNav = () => {
  const { activeTab, setActiveTab } = useBooking();

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <nav className="bg-white rounded-xl shadow-card border border-gray-100 p-2 sm:p-3 relative z-20 overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-between min-w-max gap-1 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <li key={cat.id} className="flex-1 min-w-[85px] sm:min-w-[95px]">
                <button
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all relative group ${
                    isActive 
                      ? 'text-[#0084ff] font-bold' 
                      : 'text-gray-500 hover:text-gray-800 font-semibold'
                  }`}
                >
                  <div className={`p-1.5 rounded-full mb-1 transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-[#0084ff] transform scale-110' 
                      : 'group-hover:bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[11px] sm:text-[13px] text-center leading-tight tracking-tight line-clamp-1">
                    {cat.label}
                  </span>

                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-1 bg-[#0084ff] rounded-t-full shadow-sm"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
