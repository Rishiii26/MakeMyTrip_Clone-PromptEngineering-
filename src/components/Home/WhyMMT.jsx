import React from 'react';
import { ShieldCheck, Headphones, Percent, RefreshCw } from 'lucide-react';

const PILLARS = [
  {
    icon: Percent,
    title: 'Unmatched Travel Deals',
    description: 'Get verified lowest airfares, special bank partner discounts, and instant cashback on hotel bookings.'
  },
  {
    icon: Headphones,
    title: '24x7 Customer Support',
    description: 'Round-the-clock priority assistance on chat, call, and WhatsApp for flight rescheduling or booking help.'
  },
  {
    icon: RefreshCw,
    title: 'Zero Cancellation Guarantee',
    description: '100% full refund with zero questions asked on flight tickets canceled up to 24 hours before departure.'
  },
  {
    icon: ShieldCheck,
    title: '100% Secure Payments',
    description: 'PCI-DSS certified encryption supporting UPI, Credit Cards, Net Banking, and convenient EMI options.'
  }
];

export const WhyMMT = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Why Book With MakeMyTrip?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          India's most trusted travel platform serving over 50 million satisfied travelers every year.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover-card text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
