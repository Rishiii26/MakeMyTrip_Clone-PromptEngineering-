import React, { useState } from 'react';
import { Smartphone, QrCode, CheckCircle2, ArrowRight } from 'lucide-react';

export const AppDownloadBanner = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#0a223d] via-[#103761] to-[#15457b] rounded-2xl shadow-xl overflow-hidden text-white p-6 sm:p-10 relative">
        
        {/* Decorative background circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text & Input */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30">
              <Smartphone className="w-3.5 h-3.5" />
              <span>India's #1 Travel Super App</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Download the MakeMyTrip Mobile App
            </h2>
            <p className="text-sm text-gray-300 max-w-xl">
              Get real-time flight status alerts, live bus tracking, exclusive mobile-only deals up to 40% off, and 24x7 customer support directly on WhatsApp.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md">
                <div className="flex items-center bg-white rounded-lg px-3 py-2 text-gray-900 border border-transparent focus-within:border-blue-400">
                  <span className="text-xs font-bold text-gray-500 mr-2 border-r pr-2">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number"
                    className="w-full text-sm font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-mmt-btn hover:opacity-95 text-white text-xs sm:text-sm font-black px-6 py-2.5 rounded-lg shadow-btn transition-all shrink-0 active:scale-95"
                >
                  GET APP LINK
                </button>
              </div>

              {isSent && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mt-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Download link sent successfully via SMS to +91 {phoneNumber}!</span>
                </div>
              )}
            </form>
          </div>

          {/* Right QR Code Box */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center shadow-lg max-w-xs w-full">
              <div className="bg-white p-3 rounded-lg inline-block shadow-inner mb-3">
                {/* Simulated high-fidelity SVG QR Code */}
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-gray-900">
                  <rect width="100" height="100" fill="white" />
                  {/* Top-left marker */}
                  <rect x="10" y="10" width="24" height="24" fill="black" />
                  <rect x="14" y="14" width="16" height="16" fill="white" />
                  <rect x="18" y="18" width="8" height="8" fill="black" />
                  {/* Top-right marker */}
                  <rect x="66" y="10" width="24" height="24" fill="black" />
                  <rect x="70" y="14" width="16" height="16" fill="white" />
                  <rect x="74" y="18" width="8" height="8" fill="black" />
                  {/* Bottom-left marker */}
                  <rect x="10" y="66" width="24" height="24" fill="black" />
                  <rect x="14" y="70" width="16" height="16" fill="white" />
                  <rect x="18" y="74" width="8" height="8" fill="black" />
                  {/* Data dots */}
                  <rect x="40" y="15" width="6" height="6" fill="black" />
                  <rect x="52" y="20" width="6" height="6" fill="black" />
                  <rect x="40" y="40" width="8" height="8" fill="black" />
                  <rect x="55" y="45" width="8" height="8" fill="black" />
                  <rect x="70" y="45" width="6" height="6" fill="black" />
                  <rect x="80" y="60" width="6" height="6" fill="black" />
                  <rect x="45" y="70" width="8" height="8" fill="black" />
                  <rect x="65" y="75" width="6" height="6" fill="black" />
                  <rect x="80" y="80" width="8" height="8" fill="black" />
                </svg>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Scan QR to Download
              </p>
              <p className="text-[11px] text-gray-300">
                Available on iOS & Android
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
