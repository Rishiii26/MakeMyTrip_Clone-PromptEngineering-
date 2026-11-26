import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  Sparkles,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BookingModal = ({ isOpen, onClose, bookingData }) => {
  const { user, addBooking, setIsMyTripsOpen } = useBooking();

  const [step, setStep] = useState('details'); // 'details' | 'payment' | 'success'
  const [passengerName, setPassengerName] = useState(user?.name || 'Rahul Sharma');
  const [passengerAge, setPassengerAge] = useState('28');
  const [passengerGender, setPassengerGender] = useState('Male');
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '+91 98765 43210');
  const [passengerEmail, setPassengerEmail] = useState(user?.email || 'rahul.sharma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [promoCode, setPromoCode] = useState('MMTWELCOME');
  const [promoApplied, setPromoApplied] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !bookingData) return null;

  const basePrice = bookingData.price || 4899;
  const discount = promoApplied ? Math.min(500, Math.floor(basePrice * 0.1)) : 0;
  const taxes = Math.floor(basePrice * 0.12);
  const finalTotal = basePrice - discount + taxes;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'MMTWELCOME' || promoCode.toUpperCase() === 'MMTHDFC') {
      setPromoApplied(true);
    }
  };

  const handlePayAndConfirm = (e) => {
    e.preventDefault();
    const newReservation = addBooking({
      category: bookingData.category || 'Flight',
      title: bookingData.title,
      subtitle: bookingData.subtitle,
      date: bookingData.date || '24 Mar 2026',
      time: bookingData.time || '06:00 - 08:15',
      amount: finalTotal,
      traveller: passengerName,
      details: bookingData.details || 'Standard booking confirmed with MakeMyTrip Assured guarantee.'
    });

    setConfirmedBooking(newReservation);
    setStep('success');
  };

  const handleClose = () => {
    onClose();
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#051322] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl">make<span className="bg-[#eb2026] text-white px-1.5 py-0.5 rounded text-lg mx-0.5">my</span>trip</span>
            <span className="text-xs text-blue-300 border-l border-white/20 pl-2">Complete Reservation</span>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {step === 'details' && (
            <div className="space-y-6">
              
              {/* Trip Summary Card */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {bookingData.category || 'Booking'}
                    </span>
                    <h3 className="font-black text-gray-900 text-lg mt-1">
                      {bookingData.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-700">
                      {bookingData.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-gray-900">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-500 block">Total fare</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 mt-3 pt-2 border-t border-blue-200/50 flex flex-wrap gap-x-4 gap-y-1">
                  <span>📅 Date: <b>{bookingData.date || '24 Mar 2026'}</b></span>
                  <span>⏰ Time: <b>{bookingData.time || 'Direct'}</b></span>
                </div>
              </div>

              {/* Passenger Info Form */}
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-3">
                  Passenger / Primary Guest Details
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      value={passengerAge}
                      onChange={(e) => setPassengerAge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gender</label>
                    <select
                      value={passengerGender}
                      onChange={(e) => setPassengerGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email for E-Ticket</label>
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code section */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-xs font-bold text-gray-800">Coupon: MMTWELCOME</span>
                    <p className="text-[11px] text-emerald-600 font-bold">₹{discount} instant discount applied!</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded">
                  APPLIED
                </span>
              </div>

              {/* Continue to Payment button */}
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="w-full bg-mmt-btn hover:opacity-95 text-white py-3 rounded-xl font-black text-sm tracking-wide shadow-btn flex items-center justify-center gap-2"
              >
                <span>PROCEED TO PAYMENT (₹{finalTotal.toLocaleString('en-IN')})</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">
                  Select Payment Option
                </h4>
                <span className="text-xs font-extrabold text-blue-600">
                  Payable: ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                
                {/* UPI */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#0084ff] w-4 h-4"
                      />
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-xs text-gray-500">Fastest checkout with 0 convenience fee</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">FREE</span>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#0084ff] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Credit / Debit Card (Visa, MasterCard, RuPay)</span>
                      <span className="text-xs text-gray-500">All major bank cards supported</span>
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50/50 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-[#0084ff] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Net Banking</span>
                      <span className="text-xs text-gray-500">HDFC, ICICI, SBI, Axis, Kotak and 40+ banks</span>
                    </div>
                  </div>
                </label>

              </div>

              {/* Fare Breakdown Summary */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Base Fare / Stay Charges</span>
                  <span className="font-semibold text-gray-800">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Special Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes & Service Fees</span>
                  <span className="font-semibold text-gray-800">+ ₹{taxes}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-black text-sm text-gray-900">
                  <span>Final Payable Amount</span>
                  <span className="text-blue-600">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Pay and Confirm button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePayAndConfirm}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white py-3 rounded-xl font-black text-sm tracking-wide shadow-btn flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>PAY ₹{finalTotal.toLocaleString('en-IN')} & CONFIRM</span>
                </button>
              </div>

            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900">Booking Confirmed!</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Confirmation SMS & Email sent to <span className="font-bold text-gray-800">{passengerPhone}</span>
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 max-w-sm mx-auto text-left space-y-2 border border-gray-200 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 font-bold">Booking ID</span>
                  <span className="font-mono font-bold text-blue-600">{confirmedBooking?.bookingId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 font-bold">PNR</span>
                  <span className="font-mono font-bold text-gray-900">{confirmedBooking?.pnr}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 font-bold">Passenger</span>
                  <span className="font-bold text-gray-900">{passengerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Total Paid</span>
                  <span className="font-black text-emerald-700">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    handleClose();
                    setIsMyTripsOpen(true);
                  }}
                  className="bg-mmt-btn text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-btn"
                >
                  View In My Trips
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
