import React, { useState } from 'react';
import { sampleOffers } from '../../data/offers';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OFFER_TABS = [
  { id: 'all', label: 'All Offers' },
  { id: 'bank', label: 'Bank Offers' },
  { id: 'flights', label: 'Flights' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'holidays', label: 'Holidays' },
  { id: 'trains', label: 'Trains' },
  { id: 'cabs', label: 'Cabs' }
];

export const OffersSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  const filteredOffers = sampleOffers.filter(o => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bank') return !!o.bank;
    return o.category === activeTab;
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleBookNow = (category) => {
    if (category === 'flights') navigate('/flights/search');
    else if (category === 'hotels') navigate('/hotels/search');
    else if (category === 'trains') navigate('/trains/search');
    else if (category === 'buses') navigate('/buses/search');
    else if (category === 'cabs') navigate('/cabs/search');
    else if (category === 'holidays') navigate('/holidays');
    else navigate('/flights/search');
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Offers For You</h2>
            <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> BEST DEALS
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Exclusive bank cards, seasonal discounts, and promotional coupons
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {OFFER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Cards Grid / Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover-card flex flex-col justify-between group"
          >
            {/* Top Image Banner with Bank Badge */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Bank pill */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-gray-900 font-black text-[10px] tracking-wider px-2.5 py-1 rounded-md shadow-xs uppercase">
                {offer.bank}
              </div>

              {/* Category pill */}
              <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                {offer.categoryLabel}
              </div>

              {/* Title inside image */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-black text-base leading-tight drop-shadow-md">
                  {offer.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                {offer.description}
              </p>

              {/* Bottom Row: Coupon code + Book Now CTA */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                
                {/* Coupon Code Pill */}
                <div className="flex items-center gap-1.5 bg-gray-50 border border-dashed border-gray-300 rounded px-2.5 py-1 text-xs">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono font-bold text-gray-800">{offer.code}</span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    title="Copy Coupon Code"
                    className="ml-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* BOOK NOW CTA */}
                <button
                  onClick={() => handleBookNow(offer.category)}
                  className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
                >
                  <span>BOOK NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
