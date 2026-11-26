import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginUser } = useBooking();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);

  if (!isLoginModalOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    loginUser({
      name: fullName,
      phone: `+91 ${phoneNumber}`,
      email: `${fullName.toLowerCase().replace(' ', '.')}@example.com`
    });
    setStep('phone');
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#051322] via-[#0a223d] to-[#15457b] p-6 text-white text-center relative">
          <div className="flex items-center justify-center gap-1 mb-2 font-black text-2xl">
            <span className="text-white">make</span>
            <span className="bg-[#eb2026] text-white px-1.5 py-0.5 rounded text-xl">my</span>
            <span className="text-white">trip</span>
          </div>
          <p className="text-xs text-blue-200 font-medium">
            Unlock exclusive member discounts, faster checkouts & easy booking management
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-blue-500 focus-within:bg-white">
                  <span className="text-xs font-bold text-gray-500 mr-2 border-r pr-2">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Demo number prefilled. Press CONTINUE to proceed.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={phoneNumber.length !== 10}
                  className="w-full bg-mmt-btn hover:opacity-95 text-white py-3 rounded-xl font-black text-sm tracking-wide shadow-btn flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>By continuing, you agree to MakeMyTrip's Terms of Service</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify} className="space-y-5 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Verify OTP</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the 4-digit code sent to <span className="font-bold text-gray-800">+91 {phoneNumber}</span>
                </p>
              </div>

              {/* OTP Digits Input */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center text-xl font-black border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-mmt-btn hover:opacity-95 text-white py-3 rounded-xl font-black text-sm tracking-wide shadow-btn"
              >
                VERIFY & LOGIN
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
