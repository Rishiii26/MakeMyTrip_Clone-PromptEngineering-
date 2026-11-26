import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LoginModal } from './components/Modals/LoginModal';
import { MyTripsDrawer } from './components/Modals/MyTripsDrawer';

// Pages
import { Home } from './pages/Home';
import { FlightResults } from './pages/FlightResults';
import { HotelResults } from './pages/HotelResults';
import { TrainResults } from './pages/TrainResults';
import { BusResults } from './pages/BusResults';
import { CabResults } from './pages/CabResults';
import { HolidayResults } from './pages/HolidayResults';

// Scroll to top on navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#f2f2f2] text-gray-900 font-sans">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights/search" element={<FlightResults />} />
              <Route path="/hotels/search" element={<HotelResults />} />
              <Route path="/trains/search" element={<TrainResults />} />
              <Route path="/buses/search" element={<BusResults />} />
              <Route path="/cabs/search" element={<CabResults />} />
              <Route path="/holidays" element={<HolidayResults />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          {/* Global Modals */}
          <LoginModal />
          <MyTripsDrawer />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;
