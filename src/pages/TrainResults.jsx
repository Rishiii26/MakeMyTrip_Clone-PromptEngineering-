import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrainFront, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Calendar,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { sampleTrains } from '../data/trains';
import { useBooking } from '../context/BookingContext';
import { BookingModal } from '../components/Modals/BookingModal';

export const TrainResults = () => {
  const navigate = useNavigate();
  const { trainParams, setTrainParams } = useBooking();

  const [selectedClass, setSelectedClass] = useState('all');
  const [activeBooking, setActiveBooking] = useState(null);

  const filteredTrains = useMemo(() => {
    return sampleTrains.filter(train => {
      if (selectedClass !== 'all') {
        const hasClass = train.classes.some(c => c.code === selectedClass);
        if (!hasClass) return false;
      }
      return true;
    });
  }, [selectedClass]);

  const handleBookClass = (train, cls) => {
    setActiveBooking({
      category: 'Train',
      title: `${train.trainName} (${train.trainNumber})`,
      subtitle: `${cls.name} (${cls.code}) • ${trainParams.quota} Quota`,
      date: trainParams.travelDate || '24 Mar 2026',
      time: `${train.departureTime} (${train.fromStation}) → ${train.arrivalTime} (${train.toStation})`,
      price: cls.price,
      details: `${train.type} • Status: ${cls.status} • Duration: ${train.duration} • IRCTC Authorized Partner • Free Cancellation Guarantee.`
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
                <span className="text-xl font-black tracking-tight">{trainParams.fromCity} ({trainParams.fromStation})</span>
                <span className="text-gray-400">→</span>
                <span className="text-xl font-black tracking-tight">{trainParams.toCity} ({trainParams.toStation})</span>
                <span className="bg-emerald-600/90 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  IRCTC Authorized
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Date: <b>24 Mar 2026</b> • Quota: <b className="text-blue-300">{trainParams.quota}</b> • {filteredTrains.length} Trains Available
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

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        
        {/* Class Filter Tabs */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          <span className="text-gray-400 px-3 hidden sm:block">Filter Class:</span>
          {['all', '1A', '2A', '3A', 'SL', 'CC', 'EC'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`flex-1 py-2 px-3 rounded-lg transition-all whitespace-nowrap text-center ${
                selectedClass === cls
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cls === 'all' ? 'All Classes' : cls}
            </button>
          ))}
        </div>

        {/* Train List */}
        <div className="space-y-4">
          {filteredTrains.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden hover-card"
            >
              {/* Header inside card */}
              <div className="bg-gray-50/80 px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <TrainFront className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm sm:text-base leading-snug">
                      {train.trainName}
                    </h3>
                    <span className="text-xs font-mono font-bold text-gray-500">#{train.trainNumber} • {train.type}</span>
                  </div>
                </div>

                {/* Runs on */}
                <div className="flex items-center gap-1 text-[10px] font-bold">
                  <span className="text-gray-400 mr-1">Runs On:</span>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule Middle Row */}
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border-b border-gray-100">
                <div>
                  <span className="text-2xl font-black text-gray-900 tracking-tight">{train.departureTime}</span>
                  <p className="text-xs font-bold text-gray-700">{train.fromStation}</p>
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-gray-500">{train.duration}</span>
                  <div className="w-32 h-0.5 bg-gray-300 mx-auto my-1 relative">
                    <div className="w-2 h-2 rounded-full bg-blue-600 absolute -top-0.5 left-0"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600 absolute -top-0.5 right-0"></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{train.distanceKm} km</span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-gray-900 tracking-tight">{train.arrivalTime}</span>
                  <p className="text-xs font-bold text-gray-700">{train.toStation}</p>
                </div>
              </div>

              {/* Live Classes Grid */}
              <div className="p-4 sm:p-6 bg-gray-50/40">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {train.classes.map((cls) => {
                    const isAvail = cls.statusType === 'avail';
                    const isRac = cls.statusType === 'rac';

                    return (
                      <div
                        key={cls.code}
                        onClick={() => handleBookClass(train, cls)}
                        className="bg-white p-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-extrabold text-xs text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                            {cls.code}
                          </span>
                          <span className="font-black text-sm text-gray-900">
                            ₹{cls.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="text-left">
                          <span className={`text-xs font-black block ${
                            isAvail ? 'text-emerald-600' : isRac ? 'text-amber-600' : 'text-rose-600'
                          }`}>
                            {cls.status}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-medium">
                            {cls.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="mt-3 w-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white font-bold text-xs py-1 rounded-md transition-colors"
                        >
                          Book Ticket
                        </button>
                      </div>
                    );
                  })}
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
