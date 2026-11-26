import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  Luggage, 
  User, 
  ChevronDown, 
  LogOut, 
  CheckCircle,
  Globe,
  Bell,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser, setIsLoginModalOpen, setIsMyTripsOpen, myTrips } = useBooking();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#051322] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <div className="flex items-center select-none tracking-tight font-black text-2xl">
            <span className="text-white font-extrabold tracking-tighter">make</span>
            <span className="bg-[#eb2026] text-white px-1.5 py-0.5 rounded-md mx-0.5 text-xl font-black shadow-sm transform group-hover:scale-105 transition-transform">
              my
            </span>
            <span className="text-white font-extrabold tracking-tighter">trip</span>
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          
          {/* List Your Property */}
          <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-mmtBlue-light transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-mmtBlue/20">
              <Building2 className="w-4 h-4 text-gray-300 group-hover:text-mmtBlue-light" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[13px] text-gray-100 group-hover:text-mmtBlue-light">List Your Property</span>
              <span className="text-[10px] text-gray-400">Grow your business!</span>
            </div>
          </div>

          {/* Introducing myBiz */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-mmtBlue-light transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-mmtBlue/20">
              <Briefcase className="w-4 h-4 text-gray-300 group-hover:text-mmtBlue-light" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[13px] text-gray-100 group-hover:text-mmtBlue-light">Introducing myBiz</span>
                <span className="bg-[#0084ff] text-[9px] font-bold px-1.5 py-0.2 rounded text-white uppercase tracking-wider">New</span>
              </div>
              <span className="text-[10px] text-gray-400">Business Travel Solution</span>
            </div>
          </div>

          {/* My Trips */}
          <button 
            onClick={() => setIsMyTripsOpen(true)}
            className="flex items-center gap-2 hover:text-mmtBlue-light transition-colors group text-left relative"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-mmtBlue/20">
              <Luggage className="w-4 h-4 text-gray-300 group-hover:text-mmtBlue-light" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-[13px] text-gray-100 group-hover:text-mmtBlue-light">My Trips</span>
              <span className="text-[10px] text-gray-400">Manage Bookings</span>
            </div>
            {myTrips.length > 0 && (
              <span className="absolute -top-1 -right-1 sm:static bg-[#eb2026] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {myTrips.length}
              </span>
            )}
          </button>

          {/* Language / Currency */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold cursor-pointer hover:bg-white/10">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>IN | ENG | INR</span>
          </div>

          {/* User Login / Profile */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-bold truncate max-w-[100px]">{user.name || 'My Account'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-2xl py-2 z-50 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold truncate text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.phone || user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setIsMyTripsOpen(true);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                  >
                    <Luggage className="w-4 h-4 text-blue-600" />
                    My Bookings ({myTrips.length})
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-mmt-btn hover:opacity-95 text-white px-3.5 sm:px-5 py-2 rounded-md font-bold text-xs sm:text-sm flex items-center gap-2 shadow-btn transition-all active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span>Login / Sign up</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
