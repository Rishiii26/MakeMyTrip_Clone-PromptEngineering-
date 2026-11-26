import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#051322] text-gray-400 text-xs border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Section: Popular Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-white/10 pb-10">
          
          {/* Col 1: Flights */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px]">
              Flight Routes
            </h4>
            <ul className="space-y-2">
              {['Delhi to Mumbai Flights', 'Bangalore to Delhi Flights', 'Delhi to Goa Flights', 'Mumbai to Bangalore Flights', 'Delhi to Kolkata Flights', 'Hyderabad to Mumbai Flights', 'Delhi to Jaipur Flights'].map((route) => (
                <li key={route}>
                  <Link to="/flights/search" className="hover:text-white transition-colors">
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Hotels */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px]">
              Top Hotel Stays
            </h4>
            <ul className="space-y-2">
              {['Hotels in Goa', 'Hotels in Jaipur', 'Hotels in Manali', 'Hotels in Udaipur', 'Hotels in New Delhi', 'Hotels in Mumbai', 'Hotels in Shimla', 'Hotels in Ooty'].map((hotel) => (
                <li key={hotel}>
                  <Link to="/hotels/search" className="hover:text-white transition-colors">
                    {hotel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Trains & Buses */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px]">
              Trains & Buses
            </h4>
            <ul className="space-y-2">
              {['Delhi to Mumbai Trains', 'Vande Bharat Express', 'Tejas Rajdhani Express', 'Delhi to Manali Buses', 'Bangalore to Hyderabad Buses', 'Mumbai to Goa Volvo Buses', 'Pune to Mumbai Cabs'].map((item) => (
                <li key={item}>
                  <Link to="/trains/search" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Holidays */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px]">
              Holiday Packages
            </h4>
            <ul className="space-y-2">
              {['Kashmir Holiday Packages', 'Kerala Backwater Tours', 'Rajasthan Royal Packages', 'Goa Honeymoon Packages', 'Himachal Adventure Tours', 'Andaman Island Packages', 'Dubai Special Tours'].map((item) => (
                <li key={item}>
                  <Link to="/holidays" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: About & Corporate */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px]">
              MakeMyTrip
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Investor Relations', 'Careers', 'myBiz for Corporate', 'MMT Foundation', 'Travel Blog', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#mmt" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Middle Section: Security & Payment Partners */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="text-white font-bold text-xs uppercase tracking-wider">
              Payment Partners:
            </span>
            <div className="flex items-center gap-3 text-white font-bold text-xs">
              <span className="bg-white/10 px-2.5 py-1 rounded">UPI / GPay / PhonePe</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">VISA</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">MasterCard</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">RuPay</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">Net Banking</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-xs uppercase tracking-wider">Follow Us:</span>
            <div className="flex items-center gap-2">
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 text-center md:text-left">
          <p>
            © 2026 MAKEMYTRIP PVT. LTD. Country: <span className="text-gray-300 font-bold">India</span> • USA • UAE
          </p>
          <p className="max-w-xl">
            MakeMyTrip clone demonstration designed with high fidelity for research & evaluation. All trademarks, logos, and airline imagery belong to their respective owners.
          </p>
        </div>

      </div>
    </footer>
  );
};
