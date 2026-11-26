import React, { useState } from 'react';
import { 
  X, 
  Luggage, 
  Plane, 
  Building, 
  TrainFront, 
  Bus, 
  Car, 
  Palmtree, 
  Download, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  QrCode 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const MyTripsDrawer = () => {
  const { isMyTripsOpen, setIsMyTripsOpen, myTrips } = useBooking();
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (!isMyTripsOpen) return null;

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'flight': return Plane;
      case 'hotel': return Building;
      case 'train': return TrainFront;
      case 'bus': return Bus;
      case 'cab': return Car;
      default: return Luggage;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Slide-out Drawer Panel */}
      <div className="bg-[#f2f2f2] w-full max-w-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-[#051322] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">My Trips & Bookings</h2>
              <p className="text-xs text-gray-400">
                {myTrips.length} active or completed reservation{myTrips.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {myTrips.length > 0 ? (
            myTrips.map((trip) => {
              const Icon = getCategoryIcon(trip.category);
              return (
                <div
                  key={trip.bookingId}
                  className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden"
                >
                  {/* Top Bar of Card */}
                  <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 font-bold">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-gray-700">{trip.category} Booking</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                      </span>
                      <span className="font-mono text-gray-400 text-[11px]">PNR: {trip.pnr}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-extrabold text-base text-gray-900">{trip.title}</h3>
                        <p className="text-xs text-blue-600 font-bold">{trip.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-gray-900">
                          ₹{trip.amount?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-gray-400 block font-medium">All inclusive</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1 pt-1 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Date: <b>{trip.date}</b></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Schedule: <b>{trip.time}</b></span>
                      </div>
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg mt-2 font-medium">
                        {trip.details}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        Lead Passenger: <b className="text-gray-700">{trip.traveller}</b>
                      </span>

                      <button
                        onClick={() => setSelectedTicket(trip)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View Ticket</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-gray-200">
              <Luggage className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-700 text-base">No Bookings Yet</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore flights, hotels, trains and packages to make your next travel memory!
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Ticket / Boarding Pass Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Ticket Header */}
            <div className="bg-[#051322] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl">make<span className="bg-[#eb2026] text-white px-1 rounded text-lg mx-0.5">my</span>trip</span>
                <span className="text-xs text-blue-300 border-l border-white/20 pl-2">Official E-Ticket Voucher</span>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Boarding Pass Body */}
            <div className="p-6 space-y-6 bg-white text-gray-900">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 relative">
                
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Service Category</span>
                    <h3 className="text-xl font-black text-gray-900">{selectedTicket.title}</h3>
                    <p className="text-xs font-bold text-blue-600">{selectedTicket.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">PNR Reference</span>
                    <span className="font-mono font-black text-lg text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {selectedTicket.pnr}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 text-xs border-b border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Travel Date</span>
                    <span className="font-black text-gray-800">{selectedTicket.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Timing</span>
                    <span className="font-black text-gray-800">{selectedTicket.time}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Passenger</span>
                    <span className="font-black text-gray-800">{selectedTicket.traveller}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Booking Status</span>
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed & Paid
                    </span>
                  </div>

                  {/* Simulated Barcode */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-0.5 h-8">
                      {[2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 2, 1, 3].map((w, i) => (
                        <div key={i} className="bg-gray-800 h-full" style={{ width: `${w}px` }}></div>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 tracking-widest mt-1">
                      {selectedTicket.bookingId}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => alert('Printing electronic boarding pass & invoice...')}
                  className="bg-mmt-btn text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-btn hover:opacity-95 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Pass</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
