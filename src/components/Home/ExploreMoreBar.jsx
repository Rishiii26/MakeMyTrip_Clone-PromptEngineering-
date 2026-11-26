import React from 'react';
import { Compass, ShieldCheck, Plane, Building2, Gift, Sparkles } from 'lucide-react';

const QUICK_LINKS = [
  { icon: Compass, label: 'Where2Go', desc: 'Discover hidden gems' },
  { icon: ShieldCheck, label: 'Trip Insurance', desc: 'Zero worries' },
  { icon: Plane, label: 'International Flights', desc: 'Starting ₹8,999' },
  { icon: Building2, label: 'MICE & Corporate', desc: 'Group travel savings' },
  { icon: Gift, label: 'MMT Gift Cards', desc: 'Gift memorable trips' }
];

export const ExploreMoreBar = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-20 mb-8">
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className="flex items-center gap-3 shrink-0 p-2 rounded-lg hover:bg-blue-50/60 cursor-pointer transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-blue-100 text-[#0084ff] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {link.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
